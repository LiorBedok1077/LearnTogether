import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { routes } from "../../../../configs/clientRoutes";
import { multipleModules } from "../../../../utils/styles.utils";
import css from "./notificationsDropdown.module.css";

type Props = {};

function NotificationsDropdown({}: Props) {
  const { t, i18n } = useTranslation();

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
        <span className={css["notificationsDropdown__status-newNotifications"]}>
          •
        </span>
        <h2 className={css["notificationsDropdown__title"]}>התראות חדשות</h2>
      </div>
      <div className={css["notificationsDropdown__content"]}>
        <div className={css["notification"]}>
          <div className={css["notification__left"]}>
            <img
              className={getStyles(
                `notification__thumbnail notification__thumbnail-${
                  i18n.dir() === "rtl" ? "rtl" : "ltr"
                }`
              )}
              src="https://blog.vantagecircle.com/content/images/2020/08/teamwork-and-team-building.png"
            />
            <div
              className={getStyles(
                `notification__users notification__users-${
                  i18n.dir() === "rtl" ? "rtl" : "ltr"
                }`
              )}
            >
              <img
                className={css["notification__user"]}
                src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=585"
              />
              <img
                className={css["notification__user"]}
                src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=585"
              />
            </div>
          </div>
          <div
            className={getStyles(
              `notification__right notification__right-${
                i18n.dir() === "rtl" ? "rtl" : "ltr"
              }`
            )}
          >
            <h3 className={css["notification__title"]}>משתמש חדש נוסף!</h3>
            <p className={css["notification__content"]}>
              <b className={css["notification__content-bold"]}>Liorson10772</b>{" "}
              הצטרף לקבוצה. לפרטים הצטרף לקבוצה. לפרטים נוספים הקש 1 או המתן.
            </p>
            <div className={css["notification__creationTime"]}>לפני 3 שעות</div>
          </div>
        </div>
        <div className={css["notification"]}>
          <div className={css["notification__left"]}>
            <img
              className={getStyles(
                `notification__thumbnail notification__thumbnail-${
                  i18n.dir() === "rtl" ? "rtl" : "ltr"
                }`
              )}
              src="https://blog.vantagecircle.com/content/images/2020/08/teamwork-and-team-building.png"
            />
            <div
              className={getStyles(
                `notification__users notification__users-${
                  i18n.dir() === "rtl" ? "rtl" : "ltr"
                }`
              )}
            >
              <img
                className={css["notification__user"]}
                src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=585"
              />
              <img
                className={css["notification__user"]}
                src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=585"
              />
            </div>
          </div>
          <div
            className={getStyles(
              `notification__right notification__right-${
                i18n.dir() === "rtl" ? "rtl" : "ltr"
              }`
            )}
          >
            <h3 className={css["notification__title"]}>משתמש חדש נוסף!</h3>
            <p className={css["notification__content"]}>
              <b style={{ color: "cyan" }}>Liorson10772</b> הצטרף לקבוצה. לפרטים
              הצטרף לקבוצה. לפרטים נוספים הקש 1 או המתן.
            </p>
            <div className={css["notification__creationTime"]}>לפני 3 שעות</div>
          </div>
        </div>
        <div className={css["notification"]}>
          <div className={css["notification__left"]}>
            <img
              className={getStyles(
                `notification__thumbnail notification__thumbnail-${
                  i18n.dir() === "rtl" ? "rtl" : "ltr"
                }`
              )}
              src="https://blog.vantagecircle.com/content/images/2020/08/teamwork-and-team-building.png"
            />
            <div
              className={getStyles(
                `notification__users notification__users-${
                  i18n.dir() === "rtl" ? "rtl" : "ltr"
                }`
              )}
            >
              <img
                className={css["notification__user"]}
                src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=585"
              />
              <img
                className={css["notification__user"]}
                src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=585"
              />
            </div>
          </div>
          <div
            className={getStyles(
              `notification__right notification__right-${
                i18n.dir() === "rtl" ? "rtl" : "ltr"
              }`
            )}
          >
            <h3 className={css["notification__title"]}>משתמש חדש נוסף!</h3>
            <p className={css["notification__content"]}>
              <b style={{ color: "cyan" }}>Liorson10772</b> הצטרף לקבוצה. לפרטים
              הצטרף לקבוצה. לפרטים נוספים הקש 1 או המתן.
            </p>
            <div className={css["notification__creationTime"]}>לפני 3 שעות</div>
          </div>
        </div>
        <div className={css["notification"]}>
          <div className={css["notification__left"]}>
            <img
              className={getStyles(
                `notification__thumbnail notification__thumbnail-${
                  i18n.dir() === "rtl" ? "rtl" : "ltr"
                }`
              )}
              src="https://blog.vantagecircle.com/content/images/2020/08/teamwork-and-team-building.png"
            />
            <div
              className={getStyles(
                `notification__users notification__users-${
                  i18n.dir() === "rtl" ? "rtl" : "ltr"
                }`
              )}
            >
              <img
                className={css["notification__user"]}
                src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=585"
              />
              <img
                className={css["notification__user"]}
                src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=585"
              />
            </div>
          </div>
          <div
            className={getStyles(
              `notification__right notification__right-${
                i18n.dir() === "rtl" ? "rtl" : "ltr"
              }`
            )}
          >
            <h3 className={css["notification__title"]}>משתמש חדש נוסף!</h3>
            <p className={css["notification__content"]}>
              <b style={{ color: "cyan" }}>Liorson10772</b> הצטרף לקבוצה. לפרטים
              הצטרף לקבוצה. לפרטים נוספים הקש 1 או המתן.
            </p>
            <div className={css["notification__creationTime"]}>לפני 3 שעות</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsDropdown;
