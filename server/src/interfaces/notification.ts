import { NOTIFICATION_TYPES } from "../configs/constants"

// notification:data:user type.
export type UserMetadata = { username: string, user_id: string, profile_pic: string, token?: string }

// A redis:notification (on create) data type (with a single user).
export type CreateNotificationType = {
    group_title: string,
    n_type: NOTIFICATION_TYPES,
    thumbnail: string,
    user: UserMetadata
}

// A redis:notification data type.
export type NotificationType = {
    created_at: number,
    group_title: string,
    n_type: NOTIFICATION_TYPES,
    thumbnail: string,
    user: UserMetadata[]
}

// Convert <CreateNotificationType> to <NotificationType>
export const ConvertToNotificationType = (data: CreateNotificationType): NotificationType =>
    ({ ...data, created_at: new Date().getTime(), user: [data.user] })