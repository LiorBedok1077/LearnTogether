import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { routes, socials } from "../../../../configs/clientRoutes.ts";
import facebookIcon from "../../assets/social_icons/facebook.png";
import instagramIcon from "../../assets/social_icons/instagram.webp";
import twitterIcon from "../../assets/social_icons/twitter.webp";
import css from "./footer.module.css";

type Props = {};

function Footer({}: Props) {
  const { t } = useTranslation();
  return (
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
  );
}

export default Footer;
