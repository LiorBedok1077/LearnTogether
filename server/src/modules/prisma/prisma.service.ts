import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { ConfigService } from "@nestjs/config"
// configs
import { ENV_VARS } from '../../configs/constants'

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get(ENV_VARS.DATABASE_URL)
                }
            }
        })
    }

    /**
     * Method cleans the test database for optimal testing.
     */
    async cleanDB() {
        return void await this.$transaction([
            // from low-relevant to high-relevant
            this.roles.deleteMany(),
            this.favorite_tags.deleteMany(),
            this.comments.deleteMany(),
            this.articles.deleteMany(),
            this.learning_groups.deleteMany(),
            this.users.deleteMany(),
        ])
    }
}