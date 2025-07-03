import React, { lazy, useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../../../../context/globalContext";
import styles from "../../type2.module.css";
import { useParams } from "react-router-dom";

const Button = lazy(() => import("../../../../components/button/button"));
const Microphone = lazy(() => import("../../../../components/microphone/microphone"));
const Alert = lazy(() => import("../../../../components/alert/alert"));
const Title = lazy(() => import("../../../../components/title/title"));
const GameVideo = lazy(() => import("../../../../components/gameVideo/gameVideo"));
const Loading = lazy(() => import("../../../../components/loading/loading"));

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
        setCurrentPhrase, setOpenResultCard,
        setCurrentLessonId, setCurrentGameId
    } = useGlobalContext();

    const [gameData, setGameData] = useState(null);
    const [currentOrder, setCurrentOrder] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getGameData = async (order) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`https://api.kidsru.uz/api/greetings/next/${order}`);
            if (res?.data) {
                setGameData(res.data);
                setCurrentPhrase(res.data.word);
            } else {
                setGameData(null);
            }
        } catch (err) {
            console.error(err);
            setError("Savolni yuklashda xatolik.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getGameData(currentOrder);
    }, [currentOrder]);

    const handleCheckResult = async () => {
        if (gameData) {
            try {
                const res = await axios.post(`https://api.kidsru.uz/api/greetings/check`, {
                    word: gameData.word,
                    userInput: activeButton
                });
                setIsCorrect(res.data.isCorrect);
                setAlertHandler(true);
            } catch (err) {
                console.error(err);
            }
        }
    };

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
            ) : !gameData ? (
                <GameVideo url={"/assets/video/ending-1.0.mp4"} poster="" video="" onClick={() => {
                    setVideoPlayed(true)
                    setOpenResultCard(true)
                }} />
            ) : !videoPlayed ? (
                <GameVideo url={"/assets/lessons/start-1-0.mp4"} poster="" video="" onClick={() => setVideoPlayed(true)} />
            ) : (
                <>
                    <div className={`${styles.Type2} heightScroll`}>
                        <div className={styles.picture}>
                            <img src={gameData?.image} alt="image" />
                        </div>
                        <Title text={gameData?.question} />
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
                            onClick={handleCheckResult}
                        />
                    </div>
                    {alertHandler && (
                        <Alert
                            wrong={!isCorrect}
                            correctText={!isCorrect && "Qayta urunib ko’ring"}
                            setActiveButton={setActiveButton}
                            setAlertHandler={setAlertHandler}
                            onRepeat={() => {
                                setAlertHandler(false);
                                setActiveButton(null);
                            }}
                            onClick={() => {
                                setIsCorrect(null);
                                setAlertHandler(false);
                                setActiveButton(null);
                                // video holati o'zgarmaydi
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
