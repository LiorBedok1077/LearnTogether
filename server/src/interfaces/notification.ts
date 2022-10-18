
// notification:data:user type.
export type UserMetadata = { username: string, user_id: string, profile_pic: string, token?: string }

// The notification:data type (single user).
export type NotificationJsonDataTypeWithSingleUser = { thumbnail: string, group_title: string, user: UserMetadata }

// The notification:data type.
export type NotificationJsonDataType = { thumbnail: string, group_title: string, user: UserMetadata[] }