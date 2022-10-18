// Prisma-service types

import { NOTIFICATION_TYPES } from "../../configs/constants"
import { AppendUserToNotificationData, CreateNotification, NotificationJsonDataType } from "../notification"

// Prisma::updateOrCreateNotification method (args) type.
export type UpdateOrCreateNotificationArgsType = {
    data: {
        n_type: NOTIFICATION_TYPES,
        user_id: string,
        last_seen_notifications: Date,
    }
    create: () => ReturnType<typeof CreateNotification>,
    update: (data: NotificationJsonDataType) => ReturnType<typeof AppendUserToNotificationData>
}