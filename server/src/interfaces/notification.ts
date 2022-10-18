import { NOTIFICATION_TYPES } from "../configs/constants"

// notification:data:user type.
export type UserMetadata = { username: string, user_id: string, profile_pic: string, token?: string }

// The notification:data type (single user).
export type NotificationJsonDataTypeWithSingleUser = { thumbnail: string, group_title: string, user: UserMetadata }

// The notification:data type.
export type NotificationJsonDataType = { thumbnail: string, group_title: string, user: UserMetadata[] }

// Notificaiton data shorthand type.
type CreateNotification = <T extends NOTIFICATION_TYPES>
    (email: string, n_type: T, data: NotificationJsonDataTypeWithSingleUser) =>
    { user: { connect: { email: string } }, n_type: T, data: NotificationJsonDataType }

// Notificaiton data shorthand for creating notificaiton.
export const CreateNotification: CreateNotification = (email, n_type, data) => ({
    n_type,
    data: { ...data, user: [data.user] },
    user: { connect: { email } }
})

// Append user to notification:data:user array.
type AppendUserToNotificationData = (data: NotificationJsonDataType, user: UserMetadata) => { data: NotificationJsonDataType }
export const AppendUserToNotificationData: AppendUserToNotificationData = (data, user) => ({
    data: { ...data, user: [...data.user, user] }
})