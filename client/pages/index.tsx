import type { GetStaticPropsContext, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

interface homeGSPprops {
  locale: string;
}

export async function getStaticProps({ locale }: homeGSPprops) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["home", "common", "layout"])),
    },
  };
}
const Home: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1 style={{ margin: "1rem" }}>{t("home:welcome_msg")}</h1>
      <NotificationsManager />
    </>
  );
};

export default Home;
