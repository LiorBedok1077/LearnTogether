// Mail utility file

import { TemplateContext } from "../../interfaces/services/notification"
import { FILENAMES } from "../../constants"

type link = { link: string }

/**
 * mail-subjects utility - shorthand methods
 */
export const MailSubject = {
    // send-mail utility - invite to group:
    inviteToGroup: (to: string, context: TemplateContext['invite-to-group'] & link) => ({
        to, context,
        subject: `LearnTogether - New Invite from ${context.invitor_username} to group "${context.group_title}"`,
        template: FILENAMES.hbs_template.invite_to_group
    }),
    // send-mail utility - user joined group:
    userJoinedGroup: (to: string, context: TemplateContext['user-joined-group'] & link) => ({
        to, context,
        subject: `LearnTogether - Congrats! You are now a Member of group "${context.group_title}".`,
        template: FILENAMES.hbs_template.user_joined_group
    }),
    // send-mail utility - request join group:
    requestJoinGroup: (to: string, context: TemplateContext['request-join-group'] & link) => ({
        to, context,
        subject: `LearnTogether - New Request to Join Group`,
        template: FILENAMES.hbs_template.request_join_group
    }),
    // send-mail utility - reset password:
    resetPassword: (to: string, context: TemplateContext['reset-password'] & link) => ({
        to, context,
        subject: 'LearnTogether - Reset Forgotten Password',
        template: FILENAMES.hbs_template.reset_password,
    })
}