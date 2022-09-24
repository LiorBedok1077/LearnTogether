import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { verify, hash } from 'argon2'
// types
import { JwtTokenPayload } from "../../../interfaces/globals";
import { SignupDto, SigninDto } from "./dto";
import { ENV_VARS, TEST__JWT_EXPIRATION_TIME } from "../../../configs/constants";
// services
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'


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
     * Method signs a jwt-token with the given parameters.
     * @param user_id a user id (string)
     * @param username a user's username (string)
     * @returns a signed jwt-token with the given parameters as the payload
     */
    private async signToken(payload: JwtTokenPayload): Promise<string> {
        // -- demo jwt payload
        return this.jwt.signAsync(payload, {
            expiresIn: TEST__JWT_EXPIRATION_TIME,
            secret: this.config.get(ENV_VARS.JWT_SECRET)
        })
    }
}