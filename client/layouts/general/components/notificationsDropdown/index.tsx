import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { routes } from "../../../../configs/clientRoutes";
import css from "./notificationsDropdown.module.css";

type Props = {};

function NotificationsDropdown({}: Props) {
  const { t } = useTranslation();

  return (
    <div className={css["notificationsDropdown"]}>
      <div className={css["notificationsDropdown__header"]}>
        <span className={css["notificationsDropdown__status-newNotifications"]}>
          •
        </span>
        <h2 className={css["notificationsDropdown__title"]}>
          New notifications
        </h2>
      </div>
      <div className={css["notificationsDropdown__content"]}>
        <div className={css["notification"]}>
          <div className={css["notification__left"]}>
            <div className={css["notification__thumbnail"]}>
              <img src="https://blog.vantagecircle.com/content/images/2020/08/teamwork-and-team-building.png" />
              <div className={css["notification__users"]}>
                <div className={css["notification__user"]}>
                  <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=585" />
                  <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=585" />
                </div>
              </div>
            </div>
          </div>
          <div className={css["notification__right"]}>
            <h3 className={css["notification__title"]}>new user in group</h3>
            <p className={css["notification__content"]}>
              uga buga bungale uga buga bungale uga buga bungale
            </p>
            <div className={css["notification__creationTime"]}>Today</div>
          </div>
        </div>
        <div className={css["notification"]}>
          <div className={css["notification__left"]}>
            <div className={css["notification__thumbnail"]}>
              <img src="https://blog.vantagecircle.com/content/images/2020/08/teamwork-and-team-building.png" />
              <div className={css["notification__users"]}>
                <div className={css["notification__user"]}>
                  <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=585" />
                  <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=585" />
                </div>
              </div>
            </div>
          </div>
          <div className={css["notification__right"]}>
            <h3 className={css["notification__title"]}>new user in group</h3>
            <p className={css["notification__content"]}>
              uga buga bungale uga buga bungale uga buga bungale
            </p>
            <div className={css["notification__creationTime"]}>Today</div>
          </div>
        </div>
        <div className={css["notification"]}>
          <div className={css["notification__left"]}>
            <div className={css["notification__thumbnail"]}>
              <img src="https://blog.vantagecircle.com/content/images/2020/08/teamwork-and-team-building.png" />
              <div className={css["notification__users"]}>
                <div className={css["notification__user"]}>
                  <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=585" />
                  <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=585" />
                </div>
              </div>
            </div>
          </div>
          <div className={css["notification__right"]}>
            <h3 className={css["notification__title"]}>new user in group</h3>
            <p className={css["notification__content"]}>
              uga buga bungale uga buga bungale uga buga bungale
            </p>
            <div className={css["notification__creationTime"]}>Today</div>
          </div>
        </div>
        <div className={css["notification"]}>
          <div className={css["notification__left"]}>
            <div className={css["notification__thumbnail"]}>
              <img src="https://blog.vantagecircle.com/content/images/2020/08/teamwork-and-team-building.png" />
              <div className={css["notification__users"]}>
                <div className={css["notification__user"]}>
                  <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=585" />
                  <img src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=585" />
                </div>
              </div>
            </div>
          </div>
          <div className={css["notification__right"]}>
            <h3 className={css["notification__title"]}>new user in group</h3>
            <p className={css["notification__content"]}>
              uga buga bungale uga buga bungale uga buga bungale
            </p>
            <div className={css["notification__creationTime"]}>Today</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsDropdown;
