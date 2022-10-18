import { Injectable } from '@nestjs/common'
// configs
import { JWT_EXPIRE_TOKEN, CLIENT_URLS } from '../../configs/constants'
import { MailSubject } from '../../configs/data'
// types
import { NotificationTypes } from '../../interfaces/notification'
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
    async readNotifications(user_id: string) {
        await this.prisma.users.update({
            where: { user_id },
            data: { last_seen_notifications: new Date() }
        })
    }

    /**
     * Method sends an 'invite-to-group' notification (and email, if enabled) to a given user.
     * @param metadata the email destination, the ejs-context & the token payload.
     * @returns the email-token, for testing only.
     */
    inviteToGroup: NotificationTypes['invite-to-group'] = async ({ to, context, token_payload }) => {
        // generate link with expiring token as a parameter
        const token = await this.jwt.signToken(token_payload, 'join-group', JWT_EXPIRE_TOKEN.REQUEST_JOIN_GROUP)
        const link = CLIENT_URLS.JOIN_GROUP(token)
        // send email in the background (if option is enabled by the user)
        this.mailer.sendMail(MailSubject.inviteToGroup(to, { ...context, link }))
        // send notification
        await this.prisma.notification.create({
            data: {
                user: { connect: { email: to } }, link,
                title: 'New Invite to a Group',
                description: `${context.invitor_username} has invited you to his group: ${context.group_title}!`,
            }
        })
        return token
    }

    /**
     * Method sends a 'user-joined-group' notification (and email, if enabled) to a given user.
     * @param metadata the email destination, the ejs-context & the token payload.
     * @returns the email-token, for testing only.
     */
    userJoinedGroup: NotificationTypes['user-joined-group'] = async ({ to, context, group_id }) => {
        // generate group link
        const link = CLIENT_URLS.GROUP(group_id)
        // send email in the background (if option is enabled by the user)
        this.mailer.sendMail(MailSubject.userJoinedGroup(to, { ...context, link }))
        // send notification
        await this.prisma.notification.create({
            data: {
                user: { connect: { email: to } }, link,
                title: `You are now a member of group ${context.group_title}.`,
                description: `Step up and meet your new friends!`,
            }
        })
    }

    /**
     * Method sends a 'request-join-group' notification (and email, if enabled) to a given user.
     * @param metadata the email destination, the ejs-context & the token payload.
     * @returns the email-token, for testing only.
     */
    requestJoinGroup: NotificationTypes['request-join-group'] = async ({ to, context, token_payload }) => {
        // generate link with expiring token as a parameter
        const token = await this.jwt.signToken(token_payload, 'join-group', JWT_EXPIRE_TOKEN.REQUEST_JOIN_GROUP)
        const link = CLIENT_URLS.JOIN_GROUP(token)
        // send email in the background (if option is enabled by the user)
        this.mailer.sendMail(MailSubject.requestJoinGroup(to, { ...context, link }))
        // send notification
        await this.prisma.notification.create({
            data: {
                user: { connect: { email: to } }, link,
                title: 'New Request to Join Group',
                description: `${context.requesting_username} has requested to join your group: ${context.group_title}.`,
            }
        })
        return token
    }

    /**
     * Method sends a 'reset-password' email (if enabled) to a given user.
     * @param metadata the email destination, the ejs-context & the token payload.
     * @returns the email-token, for testing only.
     */
    sendResetPassword: NotificationTypes['reset-password'] = async ({ to, context, token_payload }) => {
        // generate link with expiring token as a parameter
        const token = await this.jwt.signToken(token_payload, 'forgot-password', JWT_EXPIRE_TOKEN.FORGOT_PASSWORD)
        // send email in the background
        this.mailer.sendMail(MailSubject.resetPassword(to, { ...context, link: CLIENT_URLS.RESET_PASSWORD(token) }))
        // return email-token (for testing)
        return token
    }
}