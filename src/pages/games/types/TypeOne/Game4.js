import React, { lazy, useEffect } from "react";
import { useGlobalContext } from "../../../../context/globalContext";
import styles from "../../type2.module.css";
import { useParams } from "react-router-dom";

const Button = lazy(() => import("../../../../components/button/button"));
const Microphone = lazy(() => import("../../../../components/microphone/microphone"));
const Alert = lazy(() => import("../../../../components/alert/alert"));
const Title = lazy(() => import("../../../../components/title/title"));
const GameVideo = lazy(() => import("../../../../components/gameVideo/gameVideo"));

const TypeOne = React.memo(() => {
    const { id } = useParams()
    const [lessonId, gameId] = id.split(".");

    const {
        activeButton,
        setActiveButton,
        isCorrect,
        setIsCorrect,
        alertHandler,
        setAlertHandler,
        videoPlayed,
        setVideoPlayed,
        micActive,
        handleSpeechRecognition,
        setCurrentPhrase,
        setOpenResultCard,
        setCurrentLessonId, setCurrentGameId

    } = useGlobalContext();


    useEffect(() => {
        setCurrentPhrase("Жёлтый");
    }, [setCurrentPhrase]);

    useEffect(() => {
        setCurrentLessonId(lessonId);
        setCurrentGameId(gameId);
    }, [lessonId, gameId]);


    return (
        <div className={styles.gameO}>
            {!videoPlayed ? (
                <GameVideo
                    poster={""}
                    video={""}
                    onClick={() => setVideoPlayed(true)}
                />
            ) : (
                <>
                    <div className={`${styles.Type2} heightScroll`}>
                        <div className={styles.picture}>
                            <img
                                src="https://i.ibb.co/4ZKpF5Lt/99c6662e04acf466ae48ee6a8c33b0497ceab3c2.png"
                                alt=""
                            />
                        </div>
                        <Title text={"Какого цвета корпус футболки?"} />
                        <div className={styles.colors}>
                            <div className={styles.microphoneHandler}>
                                <Microphone
                                    onClick={handleSpeechRecognition}
                                    className={`${styles.microphoneBase} ${micActive ? "activeMic" : ""}`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={"fixedButton"}>
                        <Button
                            value={"ПРОВЕРИТЬ"}
                            className={activeButton && "blue"}
                            onClick={() => setAlertHandler(true)}
                        />
                    </div>
                    {alertHandler && (
                        <Alert
                            wrong={!isCorrect}
                            correctText={!isCorrect && "Попробуйте еще раз"}
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
            )}
        </div>
    );
});

export default TypeOne;
