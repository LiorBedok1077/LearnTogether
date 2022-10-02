import { Injectable } from '@nestjs/common'
// configs
import { JOIN_GROUP_CLIENT_URL, JWT_EXPIRE_TOKEN, RESET_PASSWORD_CLIENT_URL } from '../../configs/constants'
// types
import { JwtForgotPasswordTokenPayload, JwtRequestJoinGroupPayload } from '../../interfaces/jwt'
// services
import { JwtService } from '../jwt/jwt.service'
import { MailerService } from '@nestjs-modules/mailer'

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
    async sendResetPaswordMail(
        to: string,
        context: { username: string, full_name: string },
        { num_edited_profile, user_id }: JwtForgotPasswordTokenPayload
    ): Promise<string> {
        // generate link with expiring token as a parameter
        const token = await this.jwt.signToken(
            { user_id, num_edited_profile },
            'forgot-password',
            JWT_EXPIRE_TOKEN.FORGOT_PASSWORD
        )
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
     * Method sends a 'request-join-group' email in the background
     * @param to The destination mail.
     * @param context The ejs-params.
     * @param token_payload The email-token payload.
     */
    async sendRequestJoinGroupMail(
        to: string,
        context: { username: string, requesting_username: string, group_title: string },
        { group_id, user_id }: JwtRequestJoinGroupPayload
    ) {
        const token = await this.jwt.signToken(
            { group_id, user_id }, 'request-join-group', JWT_EXPIRE_TOKEN.REQUEST_JOIN_GROUP
        )
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
}