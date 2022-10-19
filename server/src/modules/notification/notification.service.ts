import { BadRequestException, Injectable } from '@nestjs/common'
// configs
import { JWT_EXPIRE_TOKEN, CLIENT_URLS, DB_PAGINATE } from '../../configs/constants'
// types
import { NotificationServiceMethodType } from '../../interfaces/services/notification'
// utils
import { AppendUserToNotificationData, CreateNotification, MailSubject } from '../../utils'
// services
import { MailerService } from '@nestjs-modules/mailer'
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '../jwt/jwt.service'

/**
 * (Notification) Service handles app-notification operations (e.g. sending emails, pushing notificaitons).
 */
@Injectable()
export class NotificationService {
    constructor(
        private jwt: JwtService,
        private prisma: PrismaService,
        private mailer: MailerService
    ) { }

    /**
     * Method updates the <last_seen_notifications> value.
     * @param user_id the user id.
     */
    async getNotifications(user_id: string, page: number) {
        if (page < 0) {
            throw new BadRequestException('Page can be 0 or above')
        }
        const result = await this.prisma.notification.findMany({
            where: { user_id },
            orderBy: { created_at: 'desc' },
            skip: DB_PAGINATE.notification * page,
            take: DB_PAGINATE.notification
        })
        if (page === 0) {
            this.prisma.users.update({ where: { user_id }, data: { last_seen_notifications: new Date() } })
        }
        return result
    }

    /**
     * Method sends an 'invite-to-group' notification (and email, if enabled) to a given user.
     * @param metadata the email destination, the ejs-context & the token payload.
     * @returns the email-token, for testing only.
     */
    inviteToGroup: NotificationServiceMethodType['invite-to-group'] = async ({ email, context, token_payload }) => {
        // generate link with expiring token as a parameter
        const token = await this.jwt.signToken(token_payload, 'join-group', JWT_EXPIRE_TOKEN.REQUEST_JOIN_GROUP)
        const link = CLIENT_URLS.JOIN_GROUP(token)
        // send email in the background (if option is enabled by the user)
        this.mailer.sendMail(MailSubject.inviteToGroup(email, { ...context.template, link }))
        // send notification
        await this.prisma.notification.create({
            data: CreateNotification(email, 'invite-to-group', {
                ...context.metadata, user: { ...context.metadata.user, token }
            })
        })
        return token
    }

    /**
     * Method sends a 'user-joined-group' notification (and email, if enabled) to a given user.
     * @param metadata the email destination, the ejs-context & the token payload.
     * @returns the email-token, for testing only.
     */
    userJoinedGroup: NotificationServiceMethodType['user-joined-group'] = async ({ email, context, group_id }) => {
        // generate group link
        const link = CLIENT_URLS.GROUP(group_id)
        // send email in the background (if option is enabled by the user)
        this.mailer.sendMail(MailSubject.userJoinedGroup(email, { ...context.template, link }))
        // send notification
        await this.prisma.notification.create({
            data: CreateNotification(email, 'user-joined-group', context.metadata)
        })
    }

    /**
     * Method sends a 'request-join-group' notification (and email, if enabled) to a given user.
     * @param metadata the email destination, the ejs-context & the token payload.
     * @returns the email-token, for testing only.
     */
    requestJoinGroup: NotificationServiceMethodType['request-join-group'] = async ({ email, context, token_payload }) => {
        // generate link with expiring token as a parameter
        const token = await this.jwt.signToken(token_payload, 'join-group', JWT_EXPIRE_TOKEN.REQUEST_JOIN_GROUP)
        const link = CLIENT_URLS.JOIN_GROUP(token)
        // send email in the background (if option is enabled by the user)
        this.mailer.sendMail(MailSubject.requestJoinGroup(email, { ...context.template, link }))
        // send notification
        // -- append requesting-user to found-notification, create one otherwise.
        await this.prisma.updateOrCreateNotification({
            data: {
                user_id: token_payload.user_id,
                n_type: 'request-join-group',
                last_seen_notifications: context.last_seen_notifications
            },
            update: (data) => AppendUserToNotificationData(data, { ...context.metadata.user, token }),
            create: () => CreateNotification(email, 'request-join-group', {
                ...context.metadata, user: { ...context.metadata.user, token }
            })
        })
        return token
    }

    /**
     * Method sends a 'reset-password' email (if enabled) to a given user.
     * @param metadata the email destination, the ejs-context & the token payload.
     * @returns the email-token, for testing only.
     */
    sendResetPassword: NotificationServiceMethodType['reset-password'] = async ({ email, context, token_payload }) => {
        // generate link with expiring token as a parameter
        const token = await this.jwt.signToken(token_payload, 'forgot-password', JWT_EXPIRE_TOKEN.FORGOT_PASSWORD)
        // send email in the background
        this.mailer.sendMail(MailSubject.resetPassword(email, { ...context.template, link: CLIENT_URLS.RESET_PASSWORD(token) }))
        // return email-token (for testing)
        return token
    }
}