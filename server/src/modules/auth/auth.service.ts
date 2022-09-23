import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SignupDto } from "./dto";


/**
 * (Auth) Service handles user-authorization functionallities (e.g. sign-in, sign-up, etc.)
 */
@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService
        // jwt,
        // config
    ) { }

    async readAll() {
        return await this.prisma.users.findMany({})
    }

    /**
     * Service method tries to sign-in a user.
     * @param dto A sign-in request payload with the required sign-in information.
     * @returns (on sign-in-success): a signed JWT token.
     */
    async signin(dto /* auth signin payload */) {
        // signin functionallity
        return 'signin sucessful'
    }

    /**
     * Service method creates a user.
     * @param dto A sign-up request payload with the required sign-up information.
     * @returns (on sign-up-success): a signed JWT token, the created user data.
     */
    async signup(dto: SignupDto /* auth signup payload */) {
        // signup functionallity
        const result = await this.prisma.users.create({ data: dto })
        return result
    }
}