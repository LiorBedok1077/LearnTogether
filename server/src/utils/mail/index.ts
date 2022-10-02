// Utils for shorthand mailing options
import { ISendMailOptions } from '@nestjs-modules/mailer'
import { JOIN_GROUP_CLIENT_URL, RESET_PASSWORD_CLIENT_URL } from '../../configs/constants'

/**
 * @param to The destination mail.
 * @param context The ejs-params.
 * @returns Shorthand options for `reset-password` related mails.
 */
export const resetPasswordMailOptions = (
    to: string,
    context: { username: string, full_name: string, token: string }
): ISendMailOptions => ({
    to,
    subject: 'LearnTogether - Reset Forgotten Password',
    template: 'reset-password',
    context: {
        username: context.username,
        link: RESET_PASSWORD_CLIENT_URL(context.token)
    }
})

/**
 * @param to The destination mail.
 * @param context The ejs-params.
 * @returns Shorthand options for `request-join-group` related mails.
 */
export const requestJoinGroupMailOptions = (
    to: string,
    context: { username: string, requesting_username: string, group_title: string, token: string }
): ISendMailOptions => ({
    to,
    subject: 'LearnTogether - New Request to Join Group',
    template: 'request-join-group',
    context: {
        username: context.username,
        requesting_username: context.requesting_username,
        group_title: context.group_title,
        link: JOIN_GROUP_CLIENT_URL(context.token)
    }
})

