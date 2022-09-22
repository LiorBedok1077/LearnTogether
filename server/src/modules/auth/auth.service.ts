import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";


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

    async writeNew() {
        return await this.prisma.users.create({
            data: {
                full_name: 'Netanel Michaeli',
                gender: "MALE",
                email: "natanelmich103@gmail.com",
                password: "123456789",
                username: "Artemixx",
                bio: "I like gaming, art, food and being alone most of the time",
                interests: ["Art", "Gaming", "Food", "Being alone"],
                prefered_langs: ["ENGLISH", "RUSSIAN", "KOREAN", "HEBREW"]
            }
        })
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
    async signup(dto /* auth signup payload */) {
        // signup functionallity
        return 'signup sucessful'
    }
}