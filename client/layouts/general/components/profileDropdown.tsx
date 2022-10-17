import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import { routes } from "../../../configs/clientRoutes";
import profileDropdownCss from "./profileDropdown.module.css";

type Props = {};

function ProfileDropdown({}: Props) {
  const { t } = useTranslation();

  return (
    <div className={profileDropdownCss["profileDropdown"]}>
      <div className={profileDropdownCss["profileDropdown__right"]}>
        <Link href={routes.profile.overview}>
          <a className={profileDropdownCss["profileDropdown__link"]}>
            {t("layout:profile__overview")}
          </a>
        </Link>
        <Link href={routes.profile.personalDetails}>
          <a className={profileDropdownCss["profileDropdown__link"]}>
            {t("layout:profile__personalDetails")}
          </a>
        </Link>
        <Link href={routes.profile.privacySettings}>
          <a className={profileDropdownCss["profileDropdown__link"]}>
            {t("layout:profile__privacySettings")}
          </a>
        </Link>
        <Link href={routes.profile.notificationsCenter}>
          <a className={profileDropdownCss["profileDropdown__link"]}>
            {t("layout:profile__notificationsCenter")}
          </a>
        </Link>
        <Link href={routes.profile.previewYourProfile}>
          <a className={profileDropdownCss["profileDropdown__link"]}>
            {t("layout:profile__previewYourProfile")}
          </a>
        </Link>
        <Link href="/">
          <a className={profileDropdownCss["profileDropdown__link"]}>Logout</a>
        </Link>
      </div>
      <div className={profileDropdownCss["profileDropdown__left"]}>
        <img
          className={profileDropdownCss["profileDropdown__image"]}
          src="https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000"
        />
      </div>
    </div>
  );
}

export default ProfileDropdown;
