import { Injectable, Inject, ForbiddenException } from '@nestjs/common'
import { ConfigService } from "@nestjs/config"
import { JwtService as NestJwtService } from '@nestjs/jwt'
// configs
import { ENV_VARS } from '../../configs/constants'
// types
import { JwtPayloadTypes } from '../../interfaces/jwt'

/**
 * (JWT) Service wraps normal jwt-functionallity with custom methods (e.g. signToken_<...any>).
 */
@Injectable()
export class JwtService extends NestJwtService {
    constructor(@Inject(ConfigService) private config: ConfigService) {
        super({ secret: config.get(ENV_VARS.JWT_SECRET) })
    }

    // custom jwt-methods:

    /**
     * Method signs a token, given the payload and expiration-date.
     * @param payload the token payload.
     * @param _t the token type.
     * @param expiresIn the expiration time (defaults to 5 minutes).
     * @returns a signed token with the given payload and expiration-date.
     */
    async signToken<T extends keyof JwtPayloadTypes>(
        payload: JwtPayloadTypes[T],
        _t: T,
        expiresIn: string = '5m'
    ): Promise<string> {
        return await this.signAsync({ ...payload, _t }, { expiresIn })
    }

    /**
     * Method returns a payload, corresponding to the given `t` type.
     * @param token the string token.
     * @param t the token type.
     * @returns an object (payload) corresponding to the `JwtPayloadTypes` specified by `t`.
     */
    async verifyToken<T extends keyof JwtPayloadTypes>(token: string, t: T): Promise<JwtPayloadTypes[T]> {
        const result = await this.verifyAsync(token)
        if (result._t === t) return { ...result, _t: undefined }
        else throw new ForbiddenException('Token is invalid')
    }
}