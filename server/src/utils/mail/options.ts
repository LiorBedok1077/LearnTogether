// Utils for shorthand mailing options
import { ISendMailOptions } from '@nestjs-modules/mailer'
import { RESET_PASSWORD_CLIENT_URL } from '../../configs/constants'

/**
 * @param to The destination mail.
 * @param context The ejs-params.
 * @returns Shorthand options for `reset-password` related mails
 */
type resetPasswordMailOptions = (to: string, context: { username: string, full_name: string, token: string }) => ISendMailOptions
export const resetPasswordMailOptions: resetPasswordMailOptions = (to, context) => ({
    to,
    subject: 'LearnTogether - Reset Forgotten Password',
    template: 'reset-password',
    context: {
        username: context.username,
        link: RESET_PASSWORD_CLIENT_URL(context.token),
    }
})