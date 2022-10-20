import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import { CLIENT_ROOTPAGE, routes } from "../../../configs/clientRoutes";
import css from "./navbar.module.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { multipleModules } from "../../../utils/styles.utils";

const getStyles = multipleModules(css);

type Props = {
  navbarStatus: boolean;
};

function Navbar({ navbarStatus }: Props) {
  const updateLang = (lang: any) => {
    document.location.href = `${CLIENT_ROOTPAGE}/${lang.value}`;
  };

  const { t, i18n } = useTranslation();
  return (
    <nav className={getStyles(`navbar ${!navbarStatus && "navbar--disabled"}`)}>
      <div className={getStyles(`navbar__section navbar__section-links`)}>
        <Link href={routes.discover}>
          <a className={css["navbar__link"]}>{t("layout:navbar__discover")}</a>
        </Link>
        <Link href={routes.learningGroups}>
          <a className={css["navbar__link"]}>
            {t("layout:navbar__learningGroups")}
          </a>
        </Link>
        <Link href={routes.articles}>
          <a className={css["navbar__link"]}>{t("layout:navbar__articles")}</a>
        </Link>
        <Link href={routes.privateTutors}>
          <a className={css["navbar__link"]}>
            {t("layout:navbar__privateTutors")}
          </a>
        </Link>
      </div>
      <div className={css["navbar__section"]}>
        <Dropdown
          controlClassName={css["dropdown__control"]}
          value={i18n.language}
          options={[
            {
              value: "en",
              label: t("languages:english"),
            },
            {
              value: "he",
              label: t("languages:hebrew"),
            },
            {
              value: "ru",
              label: t("languages:russian"),
            },
          ]}
          placeholder="Language"
          onChange={updateLang}
        />
      </div>
    </nav>
  );
}

export default Navbar;
