import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from "@nestjs/config"

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

    async cleanDB() {
        return await this.$transaction([
            this.users.deleteMany(),
            this.articles.deleteMany(),
            this.comments.deleteMany(),
            this.roles.deleteMany(),
            this.favorite_tags.deleteMany(),
            this.learning_groups.deleteMany()
        ])
    }
}