import { Injectable } from '@nestjs/common'
import { ConfigService } from "@nestjs/config"
// redis
import Redis from 'ioredis'
// configs
import { REDIS_DB_INDEX, REDIS_EXPIRE_NOTIFICATION_TIME, REDIS_KEYS } from '../../configs/constants'
// types
import { RedisConfigOptions } from '../../configs/module-options'
import { ConvertToNotificationType, CreateNotificationType, NotificationType, NotificationTypesEnum } from '../../interfaces/notification'

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

    /**
     * Method creates new notifications to a given user.
     * @param user_id the user id.
     * @param lastSeenNotifications number (`ReturnType<Date.getTime>`).
     * @param data the notification information.
     */
    async createNotification(
        user_id: string,
        lastSeenNotifications: number,
        data: CreateNotificationType
    ) {
        const result = await this.readUserNotifications(user_id)
        const n_latest = result.find(n => n.created_at > lastSeenNotifications && n.group_title === data.group_title)
        // append to latest notification
        if (n_latest) {
            // (existing) notification entry key
            const n_key = REDIS_KEYS.CreateNotificationKey(user_id, n_latest.created_at)
            // (existing) notification entry
            const n_data = JSON.stringify({ ...n_latest, user: [...n_latest.user, data.user] })
            // update existing entry with the new user
            await this.notifications.set(n_key, n_data, 'KEEPTTL')
        }
        // create a notification entry (otherwise)
        else {
            // notification entry key
            const n_data = ConvertToNotificationType(data)
            const n_key = REDIS_KEYS.CreateNotificationKey(user_id, n_data.created_at)
            // create a notification entry
            await this.notifications.set(n_key, JSON.stringify(n_data))
            // add new entry to notification-keys-list
            await this.notifications.sadd(user_id, n_data.created_at)
        }
    }

    /**
     * Method returns all notifications for a given user (and sets an expiration date to the unread ones).
     * @param user_id the user id.
     * @param n_type the notification type to filter (optional).
     * @returns a notifications array.
     */
    async getNotifications(user_id: string, n_type?: NotificationTypesEnum): Promise<NotificationType[]> {
        // set expiration to unset keys (read all expires them)
        return await this.readUserNotifications(user_id, { setExpiration: true, nType: n_type })
    }

    /**
     * Method cleans the redis database for optimal testing.
     */
    async cleanDB() {
        await this.cache.flushdb()
        await this.notifications.flushdb()
    }

    // private methods

    /**
     * Method reads a key and sets an expiration date if found. O(2n)
     * @param user_id the user id.
     * @param opts method options.
     * @returns the value of a given key.
     */
    private async readUserNotifications(
        user_id: string, opts?: { setExpiration?: boolean, nType?: NotificationTypesEnum }
    ): Promise<NotificationType[]> {
        // get notification
        const n_keys_list = await this.notifications.smembers(user_id)
        let notifications: NotificationType[] = []
        await Promise.all(
            n_keys_list.map(async key_date => {
                // get key
                const n_key = REDIS_KEYS.CreateNotificationKey(user_id, parseInt(key_date))
                const result = await this.notifications.get(n_key)
                // delete unexisting keys from list
                if (!result) this.notifications.srem(user_id, key_date)
                // parse & filter notifications
                const data: NotificationType = JSON.parse(result)
                if (!(opts?.nType) || data.n_type === opts?.nType) {
                    // set expiration to notification (because we read it)
                    if (opts?.setExpiration) this.notifications.expire(n_key, REDIS_EXPIRE_NOTIFICATION_TIME, 'NX')
                    // push value to notifications list
                    notifications.push(data)
                }
            })
        )
        return notifications
    }
}