import { Injectable, Inject, ForbiddenException } from '@nestjs/common'
import { ConfigService } from "@nestjs/config"
import { JwtService as NestJwtService } from '@nestjs/jwt'
// configs
import { ENV_VARS, JWT_EXPIRE_TOKEN } from '../../configs/constants'
// types
import { JwtAuthTokenPayload, JwtForgotPasswordTokenPayload, JwtPayloadTypes, JwtRequestJoinGroupPayload } from '../../interfaces/jwt'

/**
 * (JWT) Service wraps normal jwt-functionallity with custom methods (e.g. signToken_<...any>).
 */
@Injectable()
export class JwtService extends NestJwtService {
    constructor(@Inject(ConfigService) private config: ConfigService) {
        super({ secret: config.get(ENV_VARS.JWT_SECRET_EMAIL) })
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
        const _payload = this.createTokenPayload(payload, 'forgot-password')
        return await this.signAsync(_payload, { expiresIn: JWT_EXPIRE_TOKEN.FORGOT_PASSWORD })
    }

    /**
     * @param payload the forgot-password payload.
     * @returns a signed token for email (forgot-password).
     */
    async signToken_joinGroup(payload: JwtRequestJoinGroupPayload) {
        const _payload = this.createTokenPayload(payload, 'request-join-group')
        return await this.signAsync(_payload, { expiresIn: JWT_EXPIRE_TOKEN.FORGOT_PASSWORD })
    }

    // verify-tokens ("auth" is already verified in auth-strategy)

    /**
     * @param token the string token.
     * @returns a forgot-password-payload.
     */
    async verifyToken<T extends keyof JwtPayloadTypes>(token: string, t: T): Promise<JwtPayloadTypes[T]> {
        const result = await this.verifyAsync(token)
        if (result._t === t) return { ...result, _t: undefined }
        else throw new ForbiddenException('Token is invalid')
    }


    /**
     * Method appends a type field into a given payload by a given type.
     * @param payload the token payload.
     * @param _t the payload type.
     * @returns the given payload object with a type field.
     */
    private createTokenPayload<T extends keyof JwtPayloadTypes>(payload: JwtPayloadTypes[T], _t: T) {
        return ({ ...payload, _t })
    }
}