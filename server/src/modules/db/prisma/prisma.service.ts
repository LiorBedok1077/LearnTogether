import { Injectable } from '@nestjs/common'
import { PrismaClient, Users } from '@prisma/client'
// configs
import { ENV_VARS } from '../../../common/constants'
// utils
import { PrismaRedisCacheMiddleware } from '../../../common/utils/prisma'
// services
import { ConfigService } from "@nestjs/config"
import { RedisService } from '../redis/redis.service'

/**
 * (Prisma) Service wraps prisma-functionallity with custom methods (e.g. cleanDB).
 */
@Injectable()
export class PrismaService extends PrismaClient {

    constructor(
        config: ConfigService, redis: RedisService
    ) {
        super({
            datasources: {
                db: { url: config.get(ENV_VARS.DATABASE_URL) }
            }
        })
        // use redis as cache-layer middleware (optimizing prisma-queries)
        // fix: currently not suited for testing.
        // this.$use(PrismaRedisCacheMiddleware(redis.cache))
    }

    /**
     * Method updates a user by a given id and payload while updating analytical fields (e.g. "num_edited_profile").
     * @param user_id the user id.
     * @param data the updated data.
     * @returns The updated user.
     */
    async updateUserById(user_id: string, data: Partial<Users>): Promise<Users> {
        return await this.users.update({
            where: { user_id },
            data: { ...data, num_edited_profile: { increment: 1 } }
        })
    }

    /**
     * Method finds a user by a given id while updating analytical fields (e.g. "num_viewed_profile")
     * @param user_id the used id.
     * @param opts the searching options.
     * @returns a user by the given id.
     */
    async findUserById(user_id: string, opts?: { isForeign: boolean }) {
        if (opts?.isForeign) {
            return await this.users.update({
                where: { user_id },
                data: { num_viewed_profile: { increment: 1 } }
            })
        }
        else return await this.users.findUniqueOrThrow({ where: { user_id } })
    }

    /**
     * Method cleans the test database for optimal testing.
     */
    async cleanDB() {
        return void await this.$transaction([
            // from low-relevancy to high-relevancy
            this.roles.deleteMany(),
            this.favorite_tags.deleteMany(),
            this.comments.deleteMany(),
            this.articles.deleteMany(),
            this.learning_groups.deleteMany(),
            this.users.deleteMany(),
        ])
    }
}