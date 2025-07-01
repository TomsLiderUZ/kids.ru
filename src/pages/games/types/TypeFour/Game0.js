import React, { lazy, useState, useEffect } from "react";
import styles from "../../type2.module.css";
import { useGlobalContext } from "../../../../context/globalContext";

const Button = lazy(() => import("../../../../components/button/button"));
const Alert = lazy(() => import("../../../../components/alert/alert"));
const Title = lazy(() => import("../../../../components/title/title"));
const GameVideo = lazy(() => import("../../../../components/gameVideo/gameVideo"));

const Type4 = React.memo(() => {
  const { handleSpeak, setOpenResultCard } = useGlobalContext();
  const [gameData, setGameData] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [alertHandler, setAlertHandler] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [videoPlayed, setVideoPlayed] = useState(false);
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);

  const cards = [
    { id: 1, text: "Как дела?" },
    { id: 2, text: "Привет" },
    { id: 3, text: "Как тебя зовут?" },
    { id: 4, text: "Как тебя зовут?" },
    { id: 5, text: "Привет" },
    { id: 6, text: "Как дела?" },
  ]

  const handleButtonClick = (index) => {
    if (selected.includes(index) || matched.includes(index)) return;
    setActiveButton(index)
    const newSelected = [...selected, index];
    setSelected(newSelected);
    handleSpeak(cards[index].text);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (cards[first].text === cards[second].text) {
        console.log("teng")
        setMatched([...matched, first, second]);
        setSelected([]);
      } else {
        setTimeout(() => setSelected([]), 800);
      }
    }
  };

  const handleCheckResult = () => {

  };



  return (
    <>
      {!videoPlayed ? (
        <GameVideo
          poster={""}
          video={""}
          onClick={() => setVideoPlayed(true)}
        />
      ) : (
        // gameData && (
        <>
          <div className={`${styles.Type2} heightScroll`}>
            <Title text="Найдите одинаковые карточки" />
            <div className={styles.cardsWrapper}>
              {cards.map(({ text }, index) => {
                const isSelected = selected.includes(index);
                const isMatched = matched.includes(index);
                const flipped = isSelected || isMatched;

                return (
                  <div key={index} className={styles.cardContainer}>
                    <div className={`${styles.cardInner} ${flipped ? styles.flipped : ""}`}>
                      <button
                        style={{
                          backgroundColor:
                            isMatched
                              ? "white"
                              : isSelected
                                ? "var(--lights_buttons_active_primary)"
                                : "white"
                        }}
                        className={`${styles.card} ${isMatched ? styles.matched : ""}`}
                        onClick={() => handleButtonClick(index)}
                      >
                        <span className={`${styles.cardFace} ${styles.front}`}></span>
                        <span className={`${styles.cardFace} ${styles.back}`}>
                          {text}
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>


          </div>
          <div className="fixedButton">
            <Button
              value={"ПРОВЕРИТЬ"}
              className={activeButton ? "blue" : ""}
              onClick={handleCheckResult}
            />
          </div>
          {alertHandler && (
            <Alert
              wrong={!isCorrect}
              correctText={!isCorrect && `Правильный ответ: ${gameData.options[gameData.correctIndex].text}`}
              setActiveButton={setActiveButton}
              setAlertHandler={setAlertHandler}
              onClick={() => {
                setActiveButton(null);
                setIsCorrect(null);
                setAlertHandler(false);
                setOpenResultCard(true)
              }}
            />
          )}
        </>
        // )
      )}
    </>
  );
});

export default Type4;
