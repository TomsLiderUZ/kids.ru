import React, { useEffect, useState } from "react";
import styles from "./gameResultCard.module.css";
import Button from "../button/button";
import { useGlobalContext } from "../../context/globalContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfettiCanvas from "../confettiCanvas/ConfettiCanvas.js";

const GameResultCard = () => {
  const [openCard, setOpenCard] = useState(false);
  const games = [
    "1.0", "1.1", "1.2", "1.3", "1.4", "1.5",
    "2.0", "2.1", "2.2", "2.3", "2.4",
    "3.0", "3.1", "3.2", "4.0", "5.0"
  ];

  const { id } = useParams();
  const navigate = useNavigate();
  const { openResultCard, setOpenResultCard, isUz } = useGlobalContext();

  const handleNextGame = () => {
    const currentIndex = games.indexOf(id);
    if (currentIndex !== -1 && currentIndex + 1 < games.length) {
      const nextGame = games[currentIndex + 1];
      navigate(`/games/${nextGame}`);
    }
    window.location.reload();
  };

  return (
    <>
      {openResultCard && (
        <div className={styles.screen}>
          <div className={styles.container}>
            <ConfettiCanvas openCard={openCard} />
            <div
              className={`${styles.cardWrapper} ${openCard ? styles.flipped : ""}`}
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
                  {isUz
                    ? <>O‘YIN 1: <br /> «Men bilan takrorlang»</>
                    : <>ИГРА 1: <br /> «Повторяй за мной» («Men bilan takrorlang»)</>
                  }
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
                  value={isUz ? "KARTANI OCHISH" : "ОТКРЫТЬ КАРТОЧКУ"}
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
                  {isUz ? "XARITAGA QAYTISH" : "ВЕРНУТЬСЯ НА КАРТУ"}
                </Link>
                <Link
                  to="/"
                  className={styles.hexButton}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenResultCard(false);
                    handleNextGame();
                  }}
                >
                  {isUz ? "KEYINGI O‘YINGA O‘TISH" : "ПЕРЕЙТИ К СЛЕДУЮЩЕЙ ИГРЕ"}
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