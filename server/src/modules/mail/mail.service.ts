import { Injectable } from '@nestjs/common'
// configs
import { JOIN_GROUP_CLIENT_URL, JWT_EXPIRE_TOKEN, RESET_PASSWORD_CLIENT_URL } from '../../configs/constants'
// services
import { JwtService } from '../jwt/jwt.service'
import { MailerService } from '@nestjs-modules/mailer'
import { SendMailTypes } from '../../interfaces/mail'

/**
 * (Mail) Service wraps normal mailer-functionallities with custom methods.
 */
@Injectable()
export class MailService {
    constructor(
        private jwt: JwtService,
        private mailer: MailerService
    ) { }

    /**
     * Method sends a 'forgot-password' email in the background.
     * @param to The destination mail.
     * @param context The ejs-params.
     * @param token_payload The email-token payload.
     */
    sendResetPaswordMail: SendMailTypes['reset-password'] = async (to, context, token_payload) => {
        // generate link with expiring token as a parameter
        const token = await this.jwt.signToken(token_payload, 'forgot-password', JWT_EXPIRE_TOKEN.FORGOT_PASSWORD)
        // send email in the background & return email-token (temp)
        this.mailer.sendMail({
            to,
            subject: 'LearnTogether - Reset Forgotten Password',
            template: 'reset-password',
            context: {
                username: context.username,
                link: RESET_PASSWORD_CLIENT_URL(token)
            }
        })
        return token
    }

    /**
     * Method sends a 'request-join-group' email in the background.
     * @param to The destination mail.
     * @param context The ejs-params.
     * @param token_payload The email-token payload.
     */
    sendRequestJoinGroupMail: SendMailTypes['request-join-group'] = async (to, context, token_payload) => {
        // generate link with expiring token as a parameter
        const token = await this.jwt.signToken(token_payload, 'request-join-group', JWT_EXPIRE_TOKEN.REQUEST_JOIN_GROUP)
        // send email in the background & return email-token (temp)
        this.mailer.sendMail({
            to,
            subject: 'LearnTogether - New Request to Join Group',
            template: 'request-join-group',
            context: {
                username: context.username,
                requesting_username: context.requesting_username,
                group_title: context.group_title,
                link: JOIN_GROUP_CLIENT_URL(token)
            }
        })
        return token
    }

    /**
     * Method sends a 'invite-to-group' email in the background.
     * @param to The destination mail.
     * @param context The ejs-params.
     * @param token_payload The email-token payload.
     */
    sendInviteToGroupMail: SendMailTypes['invite-to-group'] = async (to, context, token_payload) => {
        // generate link with expiring token as a parameter
        const token = await this.jwt.signToken(token_payload, 'invite-to-group', JWT_EXPIRE_TOKEN.REQUEST_JOIN_GROUP)
        // send email in the background & return email-token (temp)
        this.mailer.sendMail({
            to,
            subject: `LearnTogether - New Invite from ${context.invitor_username} to group "${context.group_title}"`,
            template: 'invite-to-group',
            context: {
                invitor_username: context.invitor_username,
                target_username: context.target_username,
                group_title: context.group_title,
                link: JOIN_GROUP_CLIENT_URL(token)
            }
        })
        return token
    }
}