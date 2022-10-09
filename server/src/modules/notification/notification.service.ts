import { Injectable } from '@nestjs/common'
// configs
import { JWT_EXPIRE_TOKEN, CLIENT_URLS, FILENAMES } from '../../configs/constants'
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
        const link = CLIENT_URLS.JOIN_GROUP(token)
        // send email in the background (if option is enabled by the user)
        this.mailer.sendMail({
            to, subject: `LearnTogether - New Invite from ${context.invitor_username} to group "${context.group_title}"`,
            template: FILENAMES.hbs_template.invite_to_group,
            context: { ...context, link }
        })
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
        this.mailer.sendMail({
            to, subject: `LearnTogether - Congrats! You are now a Member of group "${context.group_title}".`,
            template: FILENAMES.hbs_template.user_joined_group,
            context: { ...context, link },
        })
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
        this.mailer.sendMail({
            to, subject: `LearnTogether - New Request to Join Group`,
            template: FILENAMES.hbs_template.request_join_group,
            context: { ...context, link },
        })
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
        // send email in the background & return email-token (temp)
        this.mailer.sendMail({
            to, subject: 'LearnTogether - Reset Forgotten Password',
            template: FILENAMES.hbs_template.reset_password,
            context: { username: context.username, link: CLIENT_URLS.RESET_PASSWORD(token) }
        })
        return token
    }
}