import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { multipleModules } from "../../../../utils/styles.utils";
import css from "./header.module.css";
import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import { GoBell } from "react-icons/go";
import headerTitle from "../../assets/headerTitle.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";

type Props = {
  setDropdownShow: any;
  dropdownShow: any;
  setNotificationsDropdownShow: any;
  notificationsDropdownShow: any;
  setNavbarStatus: any;
  navbarStatus: any;
};

function Header({
  setDropdownShow,
  dropdownShow,
  setNotificationsDropdownShow,
  notificationsDropdownShow,
  setNavbarStatus,
  navbarStatus,
}: Props) {
  const { i18n, t } = useTranslation();

  const getStyles = multipleModules(css);

  const { notifications } = useSelector(
    (store: RootState) => store.notifications
  );

  return (
    <header className={css["header"]}>
      <div className={css["header__section"]}>
        <img
          onMouseDown={() => {
            if (!dropdownShow) {
              setDropdownShow(true);
              setNotificationsDropdownShow(false);
            } else setDropdownShow(false);
          }}
          className={css["header__profileImage"]}
          src="https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000"
        ></img>
        <div className={css["header__notifications"]}>
          <small
            className={getStyles(
              `header__notificationsCounter header__notificationsCounter-${
                i18n.dir() === "rtl" ? "rtl" : "ltr"
              }`
            )}
          >
            {notifications.length}
          </small>
          <GoBell
            onMouseDown={() => {
              if (!notificationsDropdownShow) {
                setNotificationsDropdownShow(true);
                setDropdownShow(false);
              } else setNotificationsDropdownShow(false);
            }}
            className={css["header__notificationsIcon"]}
            fontSize={"28"}
            cursor="pointer"
          />
        </div>
      </div>

      <div className={css["header__section"]}>
        <Link href="/">
          <Image
            width="180px"
            height="25px"
            src={headerTitle}
            className={css["header__title"]}
          />
        </Link>
      </div>
      <div className={css["header__section"]}>
        <div className={css["header__section-hamburger"]}>
          <GiHamburgerMenu
            fontSize={"35"}
            color="white"
            cursor="pointer"
            onClick={() => setNavbarStatus(!navbarStatus)}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
