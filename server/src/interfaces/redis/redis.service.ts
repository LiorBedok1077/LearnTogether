import { Injectable } from '@nestjs/common'
import { ConfigService } from "@nestjs/config"
// redis
import Redis from 'ioredis'
// configs
import { ENV_VARS, REDIS_DB_INDEX } from '../../configs/constants'

/**
 * (Redis) Service instanciates a redis-client to a global module level.
 */
@Injectable()
export class RedisService extends Redis {
    constructor(config: ConfigService) {
        super({
            host: config.get(ENV_VARS.CACHE_REDIS_HOST),
            port: config.get(ENV_VARS.CACHE_REDIS_PORT),
            // username: config.get(ENV_VARS.CACHE_REDIS_USERNAME),
            // password: config.get(ENV_VARS.CACHE_REDIS_PASSWORD),
            db: REDIS_DB_INDEX.CACHE_LAYER
        })
    }
}