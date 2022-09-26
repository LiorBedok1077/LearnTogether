import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { verify, hash } from 'argon2'
// types
import { SignupDto, SigninDto, ChangeForgottenPasswordDto, ForgotPasswordDto } from "./dto";
import { JwtAuthTokenPayload, JwtForgotPasswordTokenPayload, signToken } from "../../interfaces/jwt";
// utils
import { resetPasswordMailOptions, GetSignTokenOptions, updateUserByIdOptions } from "../../utils";
// services
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from "../prisma/prisma.service";
import { MailerService } from '@nestjs-modules/mailer'
import { ENV_VARS } from "../../configs/constants";

/**
 * (Auth) Service handles user-authorization functionallities (e.g. sign-in, sign-up, etc.)
 */
@Injectable()
export class AuthService {
    constructor(
        private config: ConfigService,
        private jwt: JwtService,
        private prisma: PrismaService,
        private mailerService: MailerService
    ) { }

    /**
     * Method tries to sign-in a user.
     * @param dto A sign-in request payload with the required sign-in information.
     * @returns (on sign-in-success): a signed JWT token.
     */
    async signin(dto: SigninDto) {
        const user = await this.prisma.users.findUnique({
            where: { username: dto.username }
        })
        if (!user) throw new ForbiddenException('User does not exist')
        // compare passwords
        const pwmatches = await verify(user.password, dto.password)
        if (!pwmatches) {
            throw new ForbiddenException('Password is incorrect')
        }
        // return token & data
        const token = await this.signToken<JwtAuthTokenPayload>({ user_id: user.user_id })
        return { token }
    }

    /**
     * Method creates a user.
     * @param dto A sign-up request payload with the required sign-up information.
     * @returns (on sign-up-success): a signed JWT token, the created user data.
     */
    async signup(dto: SignupDto) {
        // generate pw
        const hashed = await hash(dto.password)
        try {
            // create user
            const user = await this.prisma.users.create({
                data: { ...dto, password: hashed }
            })
            // generate token
            const token = await this.signToken<JwtAuthTokenPayload>({ user_id: user.user_id })
            // return token & data
            return {
                token, data: { ...user, password: undefined }
            }
        }
        catch (err) {
            if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
                throw new BadRequestException('Credentials already taken')
            }
            throw err
        }
    }

    /**
     * Method changes (forgotten) password (step 1) - sends verification email.
     * @param dto The new password & the token to verify before changing the password
     */
    async forgotPassword({ username_or_email }: ForgotPasswordDto) {
        // find user via dto parameters
        const { user_id, num_edited_profile, email, username, full_name } = await this.prisma.users.findFirstOrThrow({
            where: { OR: [{ email: username_or_email }, { username: username_or_email }] }
        })
        // generate link with expiring token as a parameter
        const token = await this.signToken<JwtForgotPasswordTokenPayload>({ user_id, num_edited_profile }, 'EMAIL')
        // send link to mail synchronously 
        this.mailerService.sendMail(
            resetPasswordMailOptions(email, { full_name, token, username })
        )
        // end connection (side-request should come after with the generated token & the new password)
        return {
            msg: (`A reset link has been sent to ${email}. Please use it to reset your password`),
            // temp response field - simulating email verification - testing change-password (step 2)
            EMAIL_TOKEN__FOR_TESTING_ONLY: token
        }
    }

    /**
     * Method changes (forgotten) password (step 2) - verifies email-token and changes the password.
     * @param dto The new password & the token to verify before changing the password
     */
    async changeForgottenPassword(dto: ChangeForgottenPasswordDto) {
        try {
            // validate email-token
            const token = await this.jwt.verifyAsync<JwtForgotPasswordTokenPayload>(dto.verification_token, {
                secret: this.config.get(ENV_VARS.JWT_SECRET_EMAIL)
            })
            if (!token) {
                throw new BadRequestException('Token is invalid or expired')
            }
            const hashed = await hash(dto.new_password)
            const { user_id } = await this.prisma.users.update(
                updateUserByIdOptions(token.user_id, { password: hashed })
            )
            const new_token = await this.signToken<JwtAuthTokenPayload>({ user_id })
            return { new_token }
        }
        catch (err) {
            throw new BadRequestException('Token is invalid or expired')
        }
    }

    /**
     * Method signs a jwt-token with the given parameters.
     * @param payload the token's payload.
     * @param expiresIn (optional) the expiring timeout for the token.
     * @returns a signed jwt-token with the given parameters as the payload
     */
    private signToken: signToken = async (payload, token_type = 'AUTH') => {
        return await this.jwt.signAsync(payload, GetSignTokenOptions(this.config, token_type))
    }
}