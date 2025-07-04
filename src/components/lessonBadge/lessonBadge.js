// LessonBadge.jsx
import React, { useEffect, useState } from "react";
import styles from "./lessonBadge.module.css";
import Button from "../button/button";
import { useGlobalContext } from "../../context/globalContext";
import { useNavigate } from "react-router-dom";
import ConfettiCanvas from "../confettiCanvas/ConfettiCanvas.js";

const LessonBadge = () => {
  const [openCard, setOpenCard] = useState(false);
  const navigate = useNavigate();
  const [isActiveButton, setIsActiveButton] = useState(true)
  const { lessonBadge, setLessonBadge, finishedLessonId } = useGlobalContext();

  const handleButtonClick = () => {
    if (!openCard) {
      setOpenCard(true);
    } else {
      setLessonBadge(false);
      navigate("/");
    }
  };

  useEffect(() => {
    if (openCard) {
      setIsActiveButton(false)
      setTimeout(() => {
        setIsActiveButton(true)
      }, 1500);
    }
  }, [openCard])

  return (
    <div className={styles.screen}>
      <div className={styles.container}>
        <ConfettiCanvas openCard={openCard} />
        <div className={`${styles.cardWrapper} ${openCard ? styles.flipped : ""}`}>
          <div className={styles.cardFront}>
            <img src="/assets/images/closedLessonBadge.png" alt="" />
            <p>
              <span>?</span> <br /> СЕКРЕТНАЯ КАРТОЧКА
            </p>
          </div>

          <div className={styles.cardBack}>
            <div className={styles.title}>УРОК {finishedLessonId}</div>
            <div className={styles.info}>
              <img src="/assets/images/lessonBadgeStar.png" alt="" />
              <p>4/6</p>
              <p>1/2</p>
              <p>3/4</p>
              <p>2/2</p>
            </div>
            <img src="/assets/images/lessonBadgeTop.png" alt="" />
            <div className={styles.bottom}>
              <img src="/assets/images/lessonBadgeBottom.png" alt="" />
            </div>
          </div>
        </div>
        <div className={styles.button}>
          <Button
            value={openCard ? "ЗАВЕРШИТЬ" : "ОТКРЫТЬ КАРТОЧКУ"}
            className={isActiveButton ? "blue" : ""}
            onClick={handleButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default LessonBadge;
