import { Injectable } from '@nestjs/common'
import { PrismaClient, Users } from '@prisma/client'
import { ConfigService } from "@nestjs/config"
// configs
import { ENV_VARS } from '../../configs/constants'
// types
import { NotificationJsonDataType } from '../../interfaces/notification'
import { UpdateOrCreateNotificationArgsType } from '../../interfaces/services/prisma'

/**
 * (Prisma) Service wraps prisma-functionallity with custom methods (e.g. cleanDB).
 */
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
     * Method updates (or creates) a notification data.
     * @param args the notification-filtering data & the create/update methods for each scenario.
     */
    async updateOrCreateNotification({ data, create, update }: UpdateOrCreateNotificationArgsType) {
        // find an unread notification.
        const n_latest = await this.notification.findFirst({
            where: {
                user_id: data.user_id,
                created_at: { gt: data.last_seen_notifications },
                n_type: data.n_type
            }
        })
        // update if unread-notification exists.
        if (n_latest) {
            return await this.notification.update({
                where: { id: n_latest.id },
                data: update(n_latest.data as NotificationJsonDataType)
            })
        }
        // create a new notification.
        else return await this.notification.create({ data: create() })
    }

    /**
     * Method cleans the test database for optimal testing.
     */
    async cleanDB() {
        return void await this.$transaction([
            // from low-relevancy to high-relevancy
            this.notification.deleteMany(),
            this.roles.deleteMany(),
            this.favorite_tags.deleteMany(),
            this.comments.deleteMany(),
            this.articles.deleteMany(),
            this.learning_groups.deleteMany(),
            this.users.deleteMany(),
        ])
    }
}