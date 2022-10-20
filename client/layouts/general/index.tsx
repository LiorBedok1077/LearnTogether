import React, { useEffect, useState } from "react";
import css from "./general.module.css";

import Image from "next/image";

import { useTranslation } from "next-i18next";

import { useRouter } from "next/router";
import ProfileDropdown from "./components/profileDropdown";
import Navbar from "./components/navbar";
import Feedback from "../../features/UI_apps/feedbacks/components/feedback";
import { useDispatch } from "react-redux";
import { pushFeedback } from "../../features/UI_apps/feedbacks/slice";
import { multipleModules } from "../../utils/styles.utils";
import NotificationsDropdown from "../../features/UI_apps/notifications/components/notificationsDropdown";
import Header from "./components/header";
import Footer from "./components/footer";

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
      <Header
        setDropdownShow={setDropdownShow}
        setNavbarStatus={setNavbarStatus}
        setNotificationsDropdownShow={setNotificationsDropdownShow}
        notificationsDropdownShow={notificationsDropdownShow}
        dropdownShow={dropdownShow}
        navbarStatus={navbarStatus}
      />
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
      <Footer />
      <Feedback />
      {notificationsDropdownShow && <NotificationsDropdown />}
      {dropdownShow && <ProfileDropdown />}
    </>
  );
}

export default General;
