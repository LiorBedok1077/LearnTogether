// Prisma utils file

import Redis from "ioredis"
import { createPrismaRedisCache } from "prisma-redis-middleware"

/**
 * 
 * @param redis_client a redis client.
 * @returns a prisma middleware which uses redis as a cache layer.
 */
export const PrismaRedisCacheMiddleware = (redis_client: Redis) => createPrismaRedisCache({
    models: [
        { model: 'Users', cacheTime: 120 },
        { model: 'Articles', cacheTime: 60 },
        { model: 'Learning_groups', cacheTime: 40 }
    ],
    storage: { type: 'redis', options: { invalidation: true, client: redis_client } },
    cacheTime: 1000
})