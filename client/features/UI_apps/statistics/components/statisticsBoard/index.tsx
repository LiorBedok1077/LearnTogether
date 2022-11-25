import { useTranslation } from "next-i18next";
import React, { useState } from "react";
import { multipleModules } from "../../../../../utils/styles.utils";
import Statistic from "../statistic";

import styles from "./statisticsBoard.module.css";
type Props = {};

function StatisticsBoard({}: Props) {
  const { t, i18n } = useTranslation();

  const getStyles = multipleModules(styles);
  const [isDisabled, setIsDisabled] = useState(false);

  if (!isDisabled)
    return (
      <div className={getStyles(`statisticsBoard statisticsBoard-${i18n.dir() === 'rtl' ? 'rtl' : 'ltr'}`)}>
        <span
          onClick={() => {
            setIsDisabled(true);
          }}
          className={styles["statisticsBoard__x"]}
        >
          x
        </span>
        <div className={styles["statisticsBoard__stage-lg"]}>
          <Statistic
            value="6"
            title={t("home:statistic__title-myLearningGroups")}
            btnColor="#00B81D"
            size="large"
            btnValue={t("home:statistic__action-manage")}
            withBtn={true}
            valueColor="#000A61"
          />
          <Statistic
            value="6"
            title={t("home:statistic__title-createdLearningGroups")}
            btnColor="#FF5FAC"
            size="large"
            btnValue={t("home:statistic__action-manage")}
            withBtn={true}
            valueColor="#000A61"
          />
          <Statistic
            value="6"
            title={t("home:statistic__title-prescribedClasses")}
            btnColor="#FF8F5F"
            size="large"
            btnValue={t("home:statistic__action-manage")}
            withBtn={true}
            valueColor="#000A61"
          />
          <Statistic
            value="6"
            title={t("home:statistic__title-createdArticles")}
            btnColor="#625FFF"
            size="large"
            btnValue={t("home:statistic__action-manage")}
            withBtn={true}
            valueColor="#000A61"
          />
        </div>
        <div className={styles["statisticsBoard__stage-sm"]}>
          <Statistic
            value="6"
            title={t("home:statistic__title-likes")}
            btnColor="green"
            size="small"
            btnValue={t("home:statistic__action-manage")}
            withBtn={false}
            valueColor="#FF0000"
          />
          <Statistic
            value="6"
            title={t("home:statistic__title-role")}
            btnColor="green"
            size="small"
            btnValue={t("home:statistic__action-manage")}
            withBtn={false}
            valueColor="#B99000"
          />
        </div>
      </div>
    );
  return null;
}

export default StatisticsBoard;
