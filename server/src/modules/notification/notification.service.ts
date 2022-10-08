import { Injectable } from '@nestjs/common'
// configs
import { JOIN_GROUP_CLIENT_URL, JWT_EXPIRE_TOKEN, RESET_PASSWORD_CLIENT_URL } from '../../configs/constants'
// types
import { NotificationTypes } from '../../interfaces/notification'
// services
import { PrismaService } from '../prisma/prisma.service'
import { JwtService } from '../jwt/jwt.service'
import { MailerService } from '@nestjs-modules/mailer'

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
     * Method sends an 'invite-to-group' notification (and email, if enabled) to a given user.
     * @param metadata the email destination, the ejs-context & the token payload.
     * @returns the email-token, for testing only.
     */
    inviteToGroup: NotificationTypes['invite-to-group'] = async ({ to, context, token_payload }) => {
        // generate link with expiring token as a parameter
        const token = await this.jwt.signToken(token_payload, 'join-group', JWT_EXPIRE_TOKEN.REQUEST_JOIN_GROUP)
        const link = JOIN_GROUP_CLIENT_URL(token)
        // send email in the background (if option is enabled by the user)
        this.mailer.sendMail({
            to, context: { ...context, link },
            subject: `LearnTogether - New Invite from ${context.invitor_username} to group "${context.group_title}"`,
            template: 'invite-to-group'
        })
        // send notification
        await this.prisma.notification.create({
            data: {
                user: { connect: { email: to } },
                title: 'New Invite to a Group',
                description: `${context.invitor_username} has invited you to his group: ${context.group_title}!`,
                link
            }
        })
        return token
    }

    /**
     * Method sends a 'request-join-group' notification (and email, if enabled) to a given user.
     * @param metadata the email destination, the ejs-context & the token payload.
     * @returns the email-token, for testing only.
     */
    requestJoinGroup: NotificationTypes['request-join-group'] = async ({ to, context, token_payload }) => {
        // generate link with expiring token as a parameter
        const token = await this.jwt.signToken(token_payload, 'join-group', JWT_EXPIRE_TOKEN.REQUEST_JOIN_GROUP)
        const link = JOIN_GROUP_CLIENT_URL(token)
        // send email in the background (if option is enabled by the user)
        this.mailer.sendMail({
            to, context: { ...context, link },
            subject: `LearnTogether - New Request to Join Group`,
            template: 'request-join-group'
        })
        // send notification
        await this.prisma.notification.create({
            data: {
                user: { connect: { email: to } },
                title: 'New Request to Join Group',
                description: `${context.requesting_username} has requested to join your group: ${context.group_title}.`,
                link
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
        // send email in the background & return email-token (temp)
        this.mailer.sendMail({
            to, subject: 'LearnTogether - Reset Forgotten Password',
            template: 'reset-password',
            context: {
                username: context.username,
                link: RESET_PASSWORD_CLIENT_URL(token)
            }
        })
        return token
    }
}