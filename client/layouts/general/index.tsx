import React, { useEffect, useState } from "react";
import css from "./general.module.css";

import headerTitle from "./assets/headerTitle.png";
import Image from "next/image";
import facebookIcon from "./assets/social_icons/facebook.png";
import instagramIcon from "./assets/social_icons/instagram.webp";
import twitterIcon from "./assets/social_icons/twitter.webp";
import { useTranslation } from "next-i18next";

import { useRouter } from "next/router";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsBell } from "react-icons/bs";
import Link from "next/link";
import { routes, socials } from "../../configs/clientRoutes";
import ProfileDropdown from "./components/profileDropdown";
import Navbar from "./components/navbar";
import Feedback from "../../features/UI_apps/feedbacks/components/feedback";
import { useDispatch } from "react-redux";
import { pushFeedback } from "../../features/UI_apps/feedbacks/slice";
import { multipleModules } from "../../utils/styles.utils";
import NotificationsDropdown from "./components/notificationsDropdown";

const getStyles = multipleModules(css);

type Props = { children: JSX.Element[] | JSX.Element };

function General({ children }: Props) {
  const { i18n, t } = useTranslation();
  const router = useRouter();

  const [navbarStatus, setNavbarStatus] = useState(false);
  const [dropdownShow, setDropdownShow] = useState(false);
  const [notificationsDropdownShow, setNotificationsDropdownShow] =
    useState(false);

  useEffect(() => {
    document.body.dir = i18n?.dir() || "ltr";
    if (!(window.innerWidth < 800)) setNavbarStatus(true);
  }, []);

  const dispatch = useDispatch();

  return (
    <>
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
            <small className={css["header__notificationsCounter"]}>1</small>
            <BsBell
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
      <Navbar navbarStatus={navbarStatus} />
      {dropdownShow && <ProfileDropdown />}
      <main className={css["main"]}>
        <h1>Testing system</h1>
        <button
          onClick={() => {
            dispatch(
              pushFeedback({
                color: "green",
                title: "Feedback system test",
                content: "fdfdf",
              })
            );
          }}
        >
          Test feedback feauture
        </button>
      </main>
      <footer className={css["footer"]}>
        <div className={css["footer__links"]}>
          <Link href={routes.aboutUs}>
            <a className={css["footer__link"]}>{t("layout:footer__aboutUs")}</a>
          </Link>
          <Link href={routes.contact}>
            <a className={css["footer__link"]}>{t("layout:footer__contact")}</a>
          </Link>
          <Link href={routes.TOS}>
            <a className={css["footer__link"]}>{t("layout:footer__TOS")}</a>
          </Link>
          <Link href="/">
            <a className={css["footer__link"]}>{t("layout:footer__Github")}</a>
          </Link>
        </div>
        <div className={css["footer__socials"]}>
          <Link href={socials.facebook}>
            <a>
              <Image width="25px" height="25px" src={facebookIcon} />
            </a>
          </Link>
          <Link href={socials.instagram}>
            <a>
              <Image width="25px" height="25px" src={instagramIcon} />
            </a>
          </Link>
          <Link href={socials.twitter}>
            <a>
              <Image width="25px" height="25px" src={twitterIcon} />
            </a>
          </Link>
        </div>
      </footer>
      <Feedback />
      {notificationsDropdownShow && <NotificationsDropdown />}
      {dropdownShow && <ProfileDropdown />}
    </>
  );
}

export default General;
