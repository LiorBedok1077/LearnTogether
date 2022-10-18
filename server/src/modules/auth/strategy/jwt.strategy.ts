import { Injectable } from '@nestjs/common'
// configs
import { ENV_VARS } from '../../../configs/constants'
// types
import { Users } from 'prisma/prisma-client'
import { JwtAuthTokenPayload } from '../../../interfaces/jwt'
// jwt
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
// services
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '../../prisma/prisma.service'
import { Request } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private prisma: PrismaService,
        config: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get(ENV_VARS.JWT_SECRET)   // use jwt-auth-secret for user-authentication
        })
    }

    /**
     * Method passes the extracted data from the request token to the controller.
     * @param payload the extracted data from the request token
     * @returns the payload to be accessed inside the request parameter
     */
    async validate(payload: JwtAuthTokenPayload): Promise<Users> {
        const user = await this.prisma.users.findUnique({
            where: { user_id: payload.user_id },
            // include other models
            include: { groups: true, articles: true, comments: true, notifications: true }
        })
        return user
    }
}