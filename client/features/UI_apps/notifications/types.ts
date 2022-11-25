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

export type NotificationDataStruct = {
  thumbnail: string; // url
  group_title: string;
  user: {
    username: string;
    user_id: string;
    profile_pic: string; // url
    token?: string;
  }[];
};

export type page = string | undefined;
