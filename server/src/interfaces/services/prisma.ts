// Prisma-service types

import { AppendUserToNotificationData, CreateNotification } from "../../utils"
import { NOTIFICATION_TYPES } from "../../configs/constants"
import { NotificationJsonDataType } from "../notification"

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