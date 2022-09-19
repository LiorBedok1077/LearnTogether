import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import { addNotification } from "../slice";
import { useTranslation } from "react-i18next";

function NotificationsManager() {
  const notifications = useSelector((state: RootState) => state.notifications);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  return (
    <div>
      {notifications.notifications.map((n) => (
        <h1>{n}</h1>
      ))}
      <button
        suppressHydrationWarning={true}
        onClick={() => dispatch(addNotification("nana"))}
      >
        {t("btn")}
      </button>
    </div>
  );
}

export default NotificationsManager;
