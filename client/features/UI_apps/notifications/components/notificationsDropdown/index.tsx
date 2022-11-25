import { useTranslation } from "next-i18next";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../state/store";
import { multipleModules } from "../../../../../utils/styles.utils";
import NotificationType from "../../notificationTypes";
import css from "./notificationsDropdown.module.css";

type Props = {};

function NotificationsDropdown({}: Props) {
  const { t, i18n } = useTranslation();
  const { notifications } = useSelector(
    (store: RootState) => store.notifications
  );

  const getStyles = multipleModules(css);
  return (
    <div
      className={getStyles(
        `notificationsDropdown notificationsDropdown-${
          i18n.dir() === "rtl" ? "rtl" : "ltr"
        }`
      )}
    >
      <div className={css["notificationsDropdown__header"]}>
        <span
          className={
            css[
              `notificationsDropdown__status-${
                notifications.length === 0 ? "empty" : "newNotifications"
              }`
            ]
          }
        >
          •
        </span>
        <h2 className={css["notificationsDropdown__title"]}>
          {notifications.length !== 0
            ? t("layout:notifications__title-new")
            : t("layout:notifications__title-empty")}
        </h2>
      </div>
      <div className={css["notificationsDropdown__content"]}>
        {notifications.map((notification) => (
          <div className={css["notification"]}>
            <div className={css["notification__left"]}>
              <img
                className={getStyles(
                  `notification__thumbnail notification__thumbnail-${
                    i18n.dir() === "rtl" ? "rtl" : "ltr"
                  }`
                )}
                src={notification.data.data.thumbnail}
              />
              <div
                className={getStyles(
                  `notification__users notification__users-${
                    i18n.dir() === "rtl" ? "rtl" : "ltr"
                  }`
                )}
              >
                {notification.data.data.user.map((user) => (
                  <img
                    className={css["notification__user"]}
                    src={user.profile_pic}
                  />
                ))}
              </div>
            </div>
            <div
              className={getStyles(
                `notification__right notification__right-${
                  i18n.dir() === "rtl" ? "rtl" : "ltr"
                }`
              )}
            >
              {NotificationType[notification.data.n_type](
                notification.data.data
              )}
              <div className={css["notification__creationTime"]}>
                {notification.created_at.toDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationsDropdown;
