import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { ConfigService } from "@nestjs/config"
// types
import { Users } from 'prisma/prisma-client'

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        super({
            datasources: {
                db: {
                    url: config.get("DATABASE_URL")
                }
            }
        })
    }

    /**
     * Method cleans the test database for optimal testing.
     */
    async cleanDB() {
        return void await this.$transaction([
            this.users.deleteMany(),
            this.articles.deleteMany(),
            this.comments.deleteMany(),
            this.roles.deleteMany(),
            this.favorite_tags.deleteMany(),
            this.learning_groups.deleteMany()
        ])
    }
}