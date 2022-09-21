import { Injectable } from "@nestjs/common";


/**
 * (Auth) Service handles user-authorization functionallities (e.g. sign-in, sign-up, etc.)
 */
@Injectable()
export class AuthService {
    constructor(
        // PrismaService,
        // jwt,
        // config
    ) { }

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