import React, { useState } from "react";
import styles from "./gameResultCard.module.css";
import Button from "../button/button";
import { useGlobalContext } from "../../context/globalContext";
import { Link } from "react-router-dom";
import ConfettiCanvas from "../confettiCanvas/ConfettiCanvas.js";

const GameResultCard = () => {
  const [openCard, setOpenCard] = useState(false);

  const { openResultCard, setOpenResultCard } = useGlobalContext();

  return (
    <>
      {openResultCard && (
        <div className={styles.screen}>
          <div className={styles.container}>
            <ConfettiCanvas openCard={openCard} />
            <div
              className={`${styles.cardWrapper} ${
                openCard ? styles.flipped : ""
              }`}
            >
              {/* FRONT SIDE */}
              <div className={styles.cardFront}>
                <img src="/assets/images/closedResultCard.png" alt="" />
              </div>

              {/* BACK SIDE */}
              <div className={styles.cardBack}>
                <img
                  className={styles.star2}
                  src="/assets/images/openResultCardStar.png"
                  alt=""
                />
                <img src="/assets/images/openResultCard.png" alt="" />
                <div className={styles.stepCounter}>5/6</div>
                <div className={styles.text}>
                  ИГРА 1: <br /> «Повторяй за мной» («Men bilan takrorlang»)
                </div>
                <img
                  className={styles.bottomImg}
                  src="/assets/images/openResultCardBottom.png"
                  alt=""
                />
              </div>
            </div>

            {!openCard ? (
              <div className={styles.button}>
                <Button
                  value="ОТКРЫТЬ КАРТОЧКУ"
                  className="blue"
                  onClick={() => setOpenCard(true)}
                />
              </div>
            ) : (
              <div className={styles.buttonGroup}>
                <Link
                  to="/"
                  className={styles.hexButton}
                  onClick={() => setOpenResultCard(false)}
                >
                  ВЕРНУТЬСЯ НА КАРТУ
                </Link>
                <Link
                  to="/"
                  className={styles.hexButton}
                  onClick={() => setOpenResultCard(false)}
                >
                  ПЕРЕЙТИ К СЛЕДУЮЩЕЙ ИГРЕ
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default GameResultCard;
