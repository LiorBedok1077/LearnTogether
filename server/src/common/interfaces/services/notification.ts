// Notification-service types
// Fix: better service codeflow & functionallity.

import { JwtForgotPasswordTokenPayload, JwtRequestJoinGroupPayload } from "../jwt"
import { UserMetadata } from "../notification"

// Template context types (will be passed to the related template)
export type TemplateContext = {
    'reset-password': { username: string, full_name: string }
    'request-join-group': { username: string, requesting_username: string, group_title: string }
    'user-joined-group': { username: string, group_title: string }
    'invite-to-group': { target_username: string, invitor_username: string, group_title: string }
}

// Metadata context type
export type MetadataContext = { thumbnail: string, group_title: string, user: UserMetadata }

// *Each returns a string (the generated email token) for testing pusposes, and will be returning `void` in production.
export interface NotificationServiceMethodType {
    'reset-password': (args: {
        email: string,
        context: {
            template: TemplateContext['reset-password']
        }
        token_payload: JwtForgotPasswordTokenPayload
    }) => Promise<string>
    'request-join-group': (args: {
        email: string,
        context: {
            template: TemplateContext['request-join-group']
            metadata: MetadataContext
            last_seen_notifications: number
        }
        token_payload: JwtRequestJoinGroupPayload
    }) => Promise<string>
    'user-joined-group': (args: {
        email: string,
        context: {
            template: TemplateContext['user-joined-group']
            metadata: MetadataContext
            last_seen_notifications: number
        }
        group_id: string
    }) => Promise<void>
    'invite-to-group': (args: {
        email: string,
        context: {
            template: TemplateContext['invite-to-group']
            metadata: MetadataContext
            last_seen_notifications: number
        }
        token_payload: JwtRequestJoinGroupPayload
    }) => Promise<string>
}