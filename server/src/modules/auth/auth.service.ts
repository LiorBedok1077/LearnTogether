import { BadRequestException, ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
// types
import { JwtTokenPayload } from "../../../interfaces/globals";
import { SignupDto, SigninDto } from "./dto";
import { verify, hash } from 'argon2'
// services
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { ENV_VARS } from "../../../configs/constants";


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

    async readAll() {
        return await this.prisma.users.findMany({})
    }

    /**
     * Method tries to sign-in a user.
     * @param dto A sign-in request payload with the required sign-in information.
     * @returns (on sign-in-success): a signed JWT token.
     */
    async signin(dto: SigninDto) {
        // signin functionallity
        console.log({ dto })
        const user = await this.prisma.users.findUnique({
            where: {
                username: dto.username
            }
        })
        if (!user) throw new ForbiddenException('User does not exist')
        // compare passwords
        const pwmatches = await verify(user.password, dto.password)
        if (!pwmatches) {
            throw new ForbiddenException('Password is incorrect')
        }
        // return data & token
        const token = await this.signToken(user)
        return { token }
    }

    /**
     * Method creates a user.
     * @param dto A sign-up request payload with the required sign-up information.
     * @returns (on sign-up-success): a signed JWT token, the created user data.
     */
    async signup(dto: SignupDto) {
        // signup functionallity
        // generate pw
        const hashed = await hash(dto.password)
        try {
            // create user
            const user = await this.prisma.users.create({
                data: {
                    ...dto,
                    password: hashed
                }
            })
            // generate token
            const token = await this.signToken(user)
            // return data & token
            return {
                token, data: { ...user, password: undefined }
            }
        }
        catch (err) {
            if (err instanceof PrismaClientKnownRequestError) {
                if (err.code === 'P2002') {
                    throw new BadRequestException('Credentials already taken')
                }
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
    async signToken(payload: JwtTokenPayload): Promise<string> {
        // -- demo jwt payload
        return this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: this.config.get(ENV_VARS.JWT_SECRET)
        })
    }
}