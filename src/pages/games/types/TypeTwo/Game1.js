import React, { lazy, useEffect, useState } from "react";
import styles from "../../type2.module.css";
import { useGlobalContext } from "../../../../context/globalContext";
import { useParams } from "react-router-dom";

const Button = lazy(() => import("../../../../components/button/button"));
const Alert = lazy(() => import("../../../../components/alert/alert"));
const Title = lazy(() => import("../../../../components/title/title"));
const GameVideo = lazy(() => import("../../../../components/gameVideo/gameVideo"));

const Type2 = React.memo(() => {
    const { id } = useParams()
    const [lessonId, gameId] = id.split(".");

    const { isCorrect, setIsCorrect, handleSpeak, setOpenResultCard, setCurrentLessonId, setCurrentGameId } = useGlobalContext();
    const [activeButton, setActiveButton] = useState(null);
    const [alertHandler, setAlertHandler] = useState(false);
    const [videoPlayed, setVideoPlayed] = useState(false);

    const handleButtonClick = (e, correct) => {
        const clickedButton = e.target;
        setActiveButton(clickedButton.textContent);  // Buttonning matnini saqlaymiz
        setIsCorrect(correct);
        handleSpeak(clickedButton.textContent);
    };

    useEffect(() => {
        setCurrentLessonId(lessonId);
        setCurrentGameId(gameId);
    }, [lessonId, gameId]);

    return (
        <>
            {!videoPlayed ? (
                <GameVideo
                    poster={""}
                    video={""}
                    onClick={() => setVideoPlayed(true)}
                />
            ) : (
                <>
                    <div className={styles.Type2}>
                        <div className={styles.picture}>
                            <img src="/assets/images/мяц.png" alt="" />
                        </div>
                        <Title text={"Что это за игрушка?"} />
                        <div className={styles.colors}>
                            <button
                                className={`${styles.buttonTwoo1} ${activeButton === "Кукла" ? styles.active : ""}`}
                                onClick={(e) => handleButtonClick(e, false)}
                                data-value="Кукла"
                            >
                                Кукла
                            </button>

                            <button
                                className={`${styles.buttonTwoo1} ${activeButton === "Мяч" ? styles.active : ""}`}
                                onClick={(e) => handleButtonClick(e, true)}
                            >
                                Мяч
                            </button>
                        </div>
                    </div>
                    <div className={"fixedButton"}>
                        <Button
                            value={"ПРОВЕРИТЬ"}
                            className={activeButton ? "blue" : ""}
                            onClick={() => setAlertHandler(true)}
                        />
                    </div>
                    {alertHandler && (
                        <Alert
                            wrong={!isCorrect}
                            correctText={!isCorrect && "Слово или фраза, из карточки 1"}
                            setActiveButton={setActiveButton}
                            setAlertHandler={setAlertHandler}
                            onRepeat={() => {
                                setAlertHandler(false);
                                setActiveButton(null);
                            }}
                            onClick={() => {
                                setActiveButton(null);
                                setIsCorrect(null);
                                setAlertHandler(false);
                                setOpenResultCard(true)
                            }}
                        />
                    )}
                </>
            )}
        </>
    );
});

export default Type2;
