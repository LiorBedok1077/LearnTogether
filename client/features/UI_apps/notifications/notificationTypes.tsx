import { useTranslation } from "next-i18next";
import css from "./components/notificationsDropdown/notificationsDropdown.module.css";
import { NotificationDataStruct } from "./types";

const NotificationType = {
  "user-joined-group": (data: NotificationDataStruct) => {
    const { t } = useTranslation();
    let nickname;
    if (data.user.length === 1) nickname = data.user[0].username;
    else nickname = `${data.user.length} ${t("layout:notifications__users")}`;

    return (
      <>
        <h3 className={css["notification__title"]}>
          {t("layout:notifications__newMembers")} {data.group_title}
        </h3>
        <p className={css["notification__content"]}>
          <b className={css["notification__content-bold"]}>{nickname}</b>{" "}
          {t("layout:notifications__joinedGroupMsg")}
        </p>
      </>
    );
  },

  "request-join-group": (data: NotificationDataStruct) => {
    const { t } = useTranslation();
    let nickname;   
    if (data.user.length === 1) nickname = data.user[0].username;
    else nickname = `${data.user.length} ${t("layout:notifications__users")}`;

    return (
      <>
        <h3 className={css["notification__title"]}>
          {t("layout:notifications__joinRequest")} {data.group_title}
        </h3>
        <p className={css["notification__content"]}>
          <b className={css["notification__content-bold"]}>{nickname}</b>{" "}
          {t("layout:notifications__joinRequest")}
        </p>
      </>
    );
  },
};

export default NotificationType;
