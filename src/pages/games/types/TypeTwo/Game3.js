import React, { lazy, useEffect, useState } from "react";
import styles from "../../type2.module.css";
import { useGlobalContext } from "../../../../context/globalContext";
import { useParams } from "react-router-dom";

const Button = lazy(() => import("../../../../components/button/button"));
const Alert = lazy(() => import("../../../../components/alert/alert"));
const SpeakerIcon = lazy(() => import("../../../../components/speaker"));
const GameVideo = lazy(() => import("../../../../components/gameVideo/gameVideo"));


const Type2 = React.memo(() => {
    const { id } = useParams()
    const [lessonId, gameId] = id.split(".");

    const { isCorrect, setIsCorrect, handleSpeak, setOpenResultCard, setCurrentLessonId, setCurrentGameId } = useGlobalContext();
    const [activeButtonIndex, setActiveButtonIndex] = useState(null);
    const [alertHandler, setAlertHandler] = useState(false);
    const [videoPlayed, setVideoPlayed] = useState(false);

    const handleButtonClick = (index, correct) => {
        setActiveButtonIndex(index);
        setIsCorrect(correct);
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
                    <div className={`${styles.Type2} heightScroll`}>
                        <div className={styles.speaker}>
                            <button onClick={() => handleSpeak("Выберите картинку «Добрый вечер!»")}>
                                <SpeakerIcon />
                            </button>
                            <h3 >
                                Выберите картинку <br />
                                Добрый вечер!
                            </h3>
                        </div>

                        <div className={styles.blocks}>
                            {[
                                { src: "/assets/images/2.3-1.png", correct: false },
                                { src: "/assets/images/2.3-2.png", correct: false },
                                { src: "/assets/images/2.3-3.png", correct: false },
                                { src: "/assets/images/2.3-4.png", correct: true },
                            ].map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleButtonClick(index, item.correct)}
                                    className={activeButtonIndex === index ? styles.active : ""}
                                >
                                    <img src={`${item.src}`} alt={""} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={"fixedButton"}>
                        <Button
                            value={"ПРОВЕРИТЬ"}
                            className={activeButtonIndex !== null && "blue"}
                            onClick={() => setAlertHandler(true)}
                        />
                    </div>
                    {alertHandler && (
                        <Alert
                            wrong={!isCorrect}
                            correctText={!isCorrect && "Слово или фраза, из карточки 1"}
                            setActiveButton={setActiveButtonIndex}
                            setAlertHandler={setAlertHandler}
                            onRepeat={() => {
                                setAlertHandler(false);
                                setActiveButtonIndex(null);
                            }}
                            onClick={() => {
                                setAlertHandler(false);
                                setActiveButtonIndex(null);
                                setIsCorrect(null);
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