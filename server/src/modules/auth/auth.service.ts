import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { verify, hash } from 'argon2'
// types
import { SignupDto, SigninDto, ChangeForgottenPasswordDto, ForgotPasswordDto } from "./dto";
import { ENV_VARS, JWT_EXPIRES_AT } from "../../configs/constants";
import { JwtForgotPasswordTokenPayload } from "../../interfaces/globals";
// services
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { updateUserByIdOptions } from "../../utils/db";


/**
 * (Auth) Service handles user-authorization functionallities (e.g. sign-in, sign-up, etc.)
 */
@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService
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
        const { email, user_id, username } = user
        const token = await this.signToken({ email, user_id, username })
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
            const { email, user_id, username } = user
            const token = await this.signToken({ email, user_id, username })
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
    async forgotPassword(dto: ForgotPasswordDto) {
        try {
            // find user via dto parameters
            const { user_id, num_edited_profile } = await this.prisma.users.findFirstOrThrow({
                where: { OR: [{ email: dto.username_or_email }, { username: dto.username_or_email }] }
            })
            // generating link with expiring token as a parameter (2m)
            const token = await this.signToken<JwtForgotPasswordTokenPayload>(
                { user_id, num_edited_profile }, JWT_EXPIRES_AT.FORGOT_PASSWORD
            )
            // send link to mail (in a styled html message)
            // end connection (side-request should come after with the generated token & the new password)
            // # await MailerService.mail(token)
        }
        catch (err) {
            throw new BadRequestException('User does not exist')
        }
    }

    /**
     * Method changes (forgotten) password (step 2) - verifies email-token and changes the password.
     * @param dto The new password & the token to verify before changing the password
     */
    async changeForgottenPassword(dto: ChangeForgottenPasswordDto) {
        try {
            // validate token
            const token = await this.jwt.verifyAsync<JwtForgotPasswordTokenPayload>(dto.verification_token)
            if (!token) {
                throw new ForbiddenException('Token is invalid or expired')
            }
            const hashed = await hash(dto.new_password)
            const result = await this.prisma.users.update(
                updateUserByIdOptions(token.user_id, { password: hashed })
            )
            return result
        }
        catch (err) {
            throw new ForbiddenException('Token is invalid or expired')
        }
    }

    /**
     * Method signs a jwt-token with the given parameters.
     * @param user_id a user id (string)
     * @param username a user's username (string)
     * @returns a signed jwt-token with the given parameters as the payload
     */
    private async signToken<T extends Object>(payload: T, expiresIn: JWT_EXPIRES_AT = JWT_EXPIRES_AT.AUTH__TEST): Promise<string> {
        // -- demo jwt payload
        return this.jwt.signAsync(payload, {
            expiresIn,
            secret: this.config.get(ENV_VARS.JWT_SECRET)
        })
    }
}