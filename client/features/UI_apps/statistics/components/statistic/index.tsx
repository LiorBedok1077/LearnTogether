import { useTranslation } from "next-i18next";
import React from "react";
import { multipleModules } from "../../../../../utils/styles.utils";
import styles from "./statistic.module.css";

type Props = {
  size: String;
  title: String;
  value: String;
  valueColor: String | undefined;
  withBtn: Boolean | undefined;
  btnValue: String;
  btnColor: String | undefined;
};

function Statistic({
  size,
  title,
  value,
  valueColor,
  withBtn,
  btnValue,
  btnColor,
}: Props) {
  const getStyles = multipleModules(styles);

  return (
    <div
      className={getStyles(
        `statistic statistic-${size === "large" ? "lg" : "sm"}`
      )}
    >
      <div className={styles["statistic__content"]}>
        <h3 className={styles["statistic__title"]}>{title}</h3>
        <h4
          style={{ color: `${valueColor ?? "black"}` }}
          className={styles["statistic__value"]}
        >
          {value}
        </h4>
      </div>
      {withBtn && (
        <button
          style={{ backgroundColor: `${btnColor ?? "blue"}` }}
          className={styles["statistic__action"]}
        >
          {btnValue}
        </button>
      )}
    </div>
  );
}

export default Statistic;
