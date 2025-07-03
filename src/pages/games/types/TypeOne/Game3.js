import React, { lazy, useEffect, useState } from "react";
import { useGlobalContext } from "../../../../context/globalContext";
import styles from "../../type2.module.css";
import Loading from "../../../../components/loading/loading";
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

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentOrder, setCurrentOrder] = useState(1);

    const getGameData = async (order) => {
        try {
            const res = await fetch(`https://api.kidsru.uz/api/game1_3/next/${order}`);
            const data = await res.json();
            setData(data);
            setCurrentPhrase(data.answer);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        getGameData(currentOrder);
    }, [currentOrder]);

    useEffect(() => {
        setCurrentLessonId(lessonId);
        setCurrentGameId(gameId);
    }, [lessonId, gameId]);

    return (
        <div className={styles.gameO}>
            {loading ? (
                <div className="loading-item">
                    <Loading />
                </div>
            ) : !data ? (
                <GameVideo url={"/assets/video/ending-1.3.mp4"} poster="" video="" onClick={() => {
                    setVideoPlayed(true)
                    setOpenResultCard(true)
                }} />
            ) : !videoPlayed ? (
                <GameVideo url={"/assets/lessons/start-1-3.mp4"} poster="" video="" onClick={() => setVideoPlayed(true)} />
            ) : (
                <>
                    <div className={`${styles.Type2} heightScroll`}>
                        <div className={styles.picture}>
                            <img src={data.image} alt="Game" />
                        </div>
                        <Title text={data.question} />
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
                            onRepeat={() => {
                                setAlertHandler(false);
                                setActiveButton(null);
                            }}
                            onClick={() => {
                                setActiveButton(null);
                                setIsCorrect(null);
                                setAlertHandler(false);
                                setCurrentOrder((prev) => prev + 1);
                            }}
                        />
                    )}
                </>
            )}
        </div>
    );
});

export default TypeOne;
