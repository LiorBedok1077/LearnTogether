import { JwtForgotPasswordTokenPayload, JwtRequestJoinGroupPayload } from "./jwt";

// Notification methods types
// *Each returns a string (the generated email token) for testing pusposes, and will be returning `void` in production.
export interface NotificationTypes {
    'reset-password': (metadata: {
        to: string,
        context: { username: string, full_name: string },
        token_payload: JwtForgotPasswordTokenPayload
    }) => Promise<string>
    'request-join-group': (metadata: {
        to: string,
        context: { username: string, requesting_username: string, group_title: string },
        token_payload: JwtRequestJoinGroupPayload
    }) => Promise<string>
    'user-joined-group': (metadata: {
        to: string,
        context: { username: string, group_title: string },
        group_id: string
    }) => Promise<void>
    'invite-to-group': (metadata: {
        to: string,
        context: { target_username: string, invitor_username: string, group_title: string },
        token_payload: JwtRequestJoinGroupPayload
    }) => Promise<string>
}