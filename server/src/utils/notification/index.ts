import { NOTIFICATION_TYPES } from "../../configs/constants"
import { NotificationJsonDataType, NotificationJsonDataTypeWithSingleUser, UserMetadata } from "../../interfaces/notification"

// Notificaiton data shorthand for creating notificaiton.
type CreateNotification = <T extends NOTIFICATION_TYPES>
    (email: string, n_type: T, data: NotificationJsonDataTypeWithSingleUser) =>
    { user: { connect: { email: string } }, n_type: T, data: NotificationJsonDataType }

export const CreateNotification: CreateNotification = (email, n_type, data) => ({
    user: { connect: { email } }, n_type, data: { ...data, user: [data.user] }
})

// Append user to notification:data:user array.
type AppendUserToNotificationData = (data: NotificationJsonDataType, user: UserMetadata) => { data: NotificationJsonDataType }

export const AppendUserToNotificationData: AppendUserToNotificationData = (data, user) => ({
    data: { ...data, user: [...data.user, user] }
})