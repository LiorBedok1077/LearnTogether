import React, { useEffect, useState } from "react";
import css from "./feedback.module.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../state/store";
import { pushFeedback } from "../../slice";
import ReactDom from "react-dom";
type Props = {};

function Feedback({}: Props) {
  const { i18n, t } = useTranslation();
  const [isClosed, setIsClosed] = useState(false);

  const handleClose = () => {
    setIsClosed(true);
  };

  const dispatch = useDispatch();
  const feedback = useSelector((store: RootState) => store.feedback);

  useEffect(() => {
    if (feedback.content !== undefined) {
      console.log(feedback);
      setTimeout(() => {
        dispatch(
          pushFeedback({
            color: undefined,
            title: undefined,
            content: undefined,
          })
        );
      }, 5000);
      setIsClosed(false);
    }
  }, [feedback.content]);

  if (feedback.title && typeof window === "object")
    return ReactDom.createPortal(
      <div
        className={`${css["feedback"]} ${css[`feedback-${i18n.dir()}`]} ${
          isClosed && css[`feedback-minimized-${i18n.dir()}`]
        }`}
      >
        <span onClick={handleClose} className={css["feedback__close"]}>
          x
        </span>
        <div
          style={{
            backgroundColor: feedback.color || "rgba(84, 72, 255, 0.927)",
          }}
          className={css["feedback__header"]}
        >
          {feedback.title}
        </div>
        {feedback.content && (
          <div className={css["feedback__content"]}>{feedback.content}</div>
        )}
      </div>,
      document.getElementById("feedback")
    );
  return null;
}

export default Feedback;
