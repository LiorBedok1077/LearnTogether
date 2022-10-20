export type NotificationStruct = {
  id: string;
  user_id: string;
  created_at: Date;
  data: {
    n_type: string; // acts as enum - used to determine & parse the notification accordingly
    data: {
      thumbnail: string; // url
      group_title: string;
      user: {
        username: string;
        user_id: string;
        profile_pic: string; // url
        token?: string;
      }[];
    };
  };
};

export type page = string | undefined;

export const NotificationType = {
  // e.g. in case of 1 user (user[0]), the notification-title will be: `${user[0].username} has joined your group!`
  "user-joined-group": "user-joined-group",
  // e.g. in case of 1 user (user[0]), the notification-title will be: `New join request from: ${user[0].username}`
  "request-join-group": "request-join-group",
  "invite-to-group": "invite-to-group",
};
