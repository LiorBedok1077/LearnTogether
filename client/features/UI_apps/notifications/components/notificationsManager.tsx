import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import { pushNotification as pn } from "../slice";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { bindActionCreators } from "redux";

function NotificationsManager() {
  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  const dispatch = useDispatch();
  const pushNotification = bindActionCreators(pn, dispatch);
  const { t } = useTranslation();

  return (
    <div>
      {notifications.map((n) => (
        <h1>{t("home:welcome_msg")}</h1>
      ))}
      <button onClick={() => pushNotification("nana")}>
        {t("home:welcome_msg")}
      </button>
    </div>
  );
}

export default NotificationsManager;
