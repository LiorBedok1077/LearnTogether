import { Injectable } from '@nestjs/common'
import { ConfigService } from "@nestjs/config"
// redis
import Redis from 'ioredis'
// configs
import { REDIS_DB_INDEX } from '../../configs/constants'
// types
import { RedisConfigOptions } from '../../configs/module-options'

/**
 * (Redis) Service allows access to multiple redis clients.
 */
@Injectable()
export class RedisService {

    // redis cache layer client
    public cache: Redis
    // redis notifications database client
    public notifications: Redis

    constructor(config: ConfigService) {
        // -- instanciate redis clients
        this.cache = new Redis(RedisConfigOptions(config, REDIS_DB_INDEX.CACHE_LAYER))
        this.notifications = new Redis(RedisConfigOptions(config, REDIS_DB_INDEX.NOTIFICATIONS))
    }
}