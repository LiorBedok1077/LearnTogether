import { Injectable, Inject } from '@nestjs/common'
import { ConfigService } from "@nestjs/config"
import { JwtService as NestJwtService } from '@nestjs/jwt'
// configs
import { ENV_VARS, JWT_EXPIRE_TOKEN } from '../../configs/constants'
// types
import { JwtAuthTokenPayload, JwtForgotPasswordTokenPayload } from '../../interfaces/jwt'

/**
 * (JWT) Service wraps normal jwt-functionallity with custom methods (e.g. signToken_<...any>).
 */
@Injectable()
export class JwtService extends NestJwtService {
    constructor(@Inject(ConfigService) private config: ConfigService) {
        super({})
    }

    // custom jwt-methods:

    // sign-tokens

    /**
     * @param payload the authorization payload
     * @returns a signed token for authorization.
     */
    async signToken_auth(payload: JwtAuthTokenPayload) {
        return await this.signAsync(payload, {
            secret: this.config.get(ENV_VARS.JWT_SECRET_AUTH),
            expiresIn: JWT_EXPIRE_TOKEN.AUTH__TEST
        })
    }

    /**
     * @param payload the forgot-password payload.
     * @returns a signed token for email (forgot-password).
     */
    async signToken_forgotPassword(payload: JwtForgotPasswordTokenPayload) {
        return await this.signAsync(payload, {
            secret: this.config.get(ENV_VARS.JWT_SECRET_EMAIL),
            expiresIn: JWT_EXPIRE_TOKEN.FORGOT_PASSWORD
        })
    }

    // verify-tokens ("auth" is already verified in auth-strategy)

    /**
     * @param token the string token.
     * @returns a forgot-password-payload.
     */
    async verifyToken_forgotPassword(token: string): Promise<JwtForgotPasswordTokenPayload> {
        return await this.verifyAsync(token, { secret: this.config.get(ENV_VARS.JWT_SECRET_EMAIL) })
    }
}