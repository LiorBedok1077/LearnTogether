import React, { useEffect } from "react";
import css from "./general.module.css";
import headerTitle from "./assets/headerTitle.png";
import Image from "next/image";
import socialIcons from "./assets/socialIcons.png";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

type Props = { children: JSX.Element[] | JSX.Element };

function General({ children }: Props) {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.body.dir = i18n.dir();
  }, []);

  return (
    <>
      <header className={css["header"]}>
        <div className={css["header-section"]}></div>
        <div className={css["header-section"]}>
          <Image
            width="180px"
            height="25px"
            src={headerTitle}
            className={css["header-title"]}
          />
        </div>
        <div className={css["header-section"]}>
          <img
            className={css["header-profileImage"]}
            src="https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000"
          ></img>
        </div>
      </header>
      <nav className={css["navbar"]}>
        <div className={css["navbar-section"]}>
          <a href="#" className={css["navbar-link"]}>
            Link
          </a>
          <a href="#" className={css["navbar-link"]}>
            Link
          </a>
          <a href="#" className={css["navbar-link"]}>
            Link
          </a>
          <a href="#" className={css["navbar-link"]}>
            Link
          </a>
        </div>
        <div className={css["navbar-section"]}>
          <a href="#" className={css["navbar-link"]}>
            English
          </a>
        </div>
      </nav>
      <main>{children}</main>
      <footer className={css["footer"]}>
        <div className={css["footer-section"]}>
          <a href="#" className={css["footer-link"]}>
            Link
          </a>
          <a href="#" className={css["footer-link"]}>
            Link
          </a>
          <a href="#" className={css["footer-link"]}>
            Link
          </a>
          <a href="#" className={css["footer-link"]}>
            Link
          </a>
        </div>
        <div className={css["footer-section"]}>
          <Image
            width="180px"
            height="25px"
            src={socialIcons}
            className={css["footer-social"]}
          />
        </div>
      </footer>
    </>
  );
}

export default General;
