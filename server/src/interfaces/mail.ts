import { JwtForgotPasswordTokenPayload, JwtInviteToGroupPayload, JwtRequestJoinGroupPayload } from "./jwt";

// MailService methods types
// *Each returns a string (the generated email token) for testing pusposes, and will be returning `void` in production.
export interface SendMailTypes {
    'reset-password': (
        to: string,
        context: { username: string, full_name: string },
        token_payload: JwtForgotPasswordTokenPayload
    ) => Promise<string>
    'request-join-group': (
        to: string,
        context: { username: string, requesting_username: string, group_title: string },
        token_payload: JwtRequestJoinGroupPayload
    ) => Promise<string>
    'invite-to-group': (
        to: string,
        context: { target_username: string, invitor_username: string, group_title: string },
        token_payload: JwtInviteToGroupPayload
    ) => Promise<string>
}