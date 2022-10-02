import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common"
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { verify, hash } from 'argon2'
// types
import { SignupDto, SigninDto, ChangeForgottenPasswordDto, ForgotPasswordDto } from "./dto"
import { JWT_EXPIRE_TOKEN } from "../../configs/constants"
// services
import { PrismaService } from "../prisma/prisma.service"
import { JwtService } from '../jwt/jwt.service'
import { MailService } from "../mail/mail.service"

/**
 * (Auth) Service handles user-authorization functionallities (e.g. sign-in, sign-up, etc.)
 */
@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private prisma: PrismaService,
        private mailer: MailService
    ) { }

    /**
     * Method tries to sign-in a user.
     * @param dto A sign-in request payload with the required sign-in information.
     * @returns (on sign-in-success): a signed JWT token.
     */
    async signin(dto: SigninDto) {
        const user = await this.prisma.users.findUniqueOrThrow({ where: { username: dto.username } })
        // compare passwords
        const pwmatches = await verify(user.password, dto.password)
        if (!pwmatches) {
            throw new ForbiddenException('Password is incorrect')
        }
        // return token & data
        const token = await this.jwt.signToken({ user_id: user.user_id }, 'auth', JWT_EXPIRE_TOKEN.AUTH__TEST)
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
            const user = await this.prisma.users.create({ data: { ...dto, password: hashed } })
            // generate token
            const token = await this.jwt.signToken({ user_id: user.user_id }, 'auth', JWT_EXPIRE_TOKEN.AUTH__TEST)
            // return token & data
            return { token, data: { ...user, password: undefined } }
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
        // send 'reset-password' email (asynchronously, with token as temporary return value)
        const email_token = await this.mailer.sendResetPaswordMail(
            email, { full_name, username }, { num_edited_profile, user_id }
        )
        // return email-token for testing (temp)
        return {
            msg: (`A reset link has been sent to ${email}. Please use it to reset your password`),
            // temp response field - simulating email verification - testing change-password (step 2)
            EMAIL_TOKEN__FOR_TESTING_ONLY: email_token
        }
    }

    /**
     * Method changes (forgotten) password (step 2) - verifies email-token and changes the password.
     * @param dto The new password & the token to verify before changing the password
     */
    async changeForgottenPassword(dto: ChangeForgottenPasswordDto) {
        try {
            // validate email-token
            const verification_token = await this.jwt.verifyToken(dto.verification_token, 'forgot-password')
            const hashed = await hash(dto.new_password)
            // update database with the hashed password 
            const { user_id } = await this.prisma.updateUserById(verification_token.user_id, { password: hashed })
            // generate and return a new token
            const new_token = await this.jwt.signToken({ user_id }, 'auth', JWT_EXPIRE_TOKEN.AUTH__TEST)
            return { new_token }
        }
        catch (err) {
            throw new BadRequestException({ msg: 'Token is invalid or expired', err })
        }
    }
}