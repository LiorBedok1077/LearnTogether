import { JwtForgotPasswordTokenPayload, JwtRequestJoinGroupPayload } from "./jwt";

// Template context types (will be passed to the related template)
export type TemplateContext = {
    'reset-password': { username: string, full_name: string }
    'request-join-group': { username: string, requesting_username: string, group_title: string }
    'user-joined-group': { username: string, group_title: string }
    'invite-to-group': { target_username: string, invitor_username: string, group_title: string }
}

// Notification methods types
// *Each returns a string (the generated email token) for testing pusposes, and will be returning `void` in production.
export interface NotificationTypes {
    'reset-password': (metadata: {
        to: string,
        context: TemplateContext['reset-password'],
        token_payload: JwtForgotPasswordTokenPayload
    }) => Promise<string>
    'request-join-group': (metadata: {
        to: string,
        context: TemplateContext['request-join-group'],
        token_payload: JwtRequestJoinGroupPayload
    }) => Promise<string>
    'user-joined-group': (metadata: {
        to: string,
        context: TemplateContext['user-joined-group'],
        group_id: string
    }) => Promise<void>
    'invite-to-group': (metadata: {
        to: string,
        context: TemplateContext['invite-to-group'],
        token_payload: JwtRequestJoinGroupPayload
    }) => Promise<string>
}