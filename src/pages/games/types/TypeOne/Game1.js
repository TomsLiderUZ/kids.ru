import React, { lazy, useEffect, useState } from "react";
import { useGlobalContext } from "../../../../context/globalContext";
import styles from "../../type2.module.css";
import { useParams } from "react-router-dom";

const Button = lazy(() => import("../../../../components/button/button"));
const Microphone = lazy(() => import("../../../../components/microphone/microphone"));
const Alert = lazy(() => import("../../../../components/alert/alert"));
const Title = lazy(() => import("../../../../components/title/title"));
const GameVideo = lazy(() => import("../../../../components/gameVideo/gameVideo"));
const Loading = lazy(() => import("../../../../components/loading/loading"));

const TypeTwo = React.memo(() => {
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

    const [chestWord, setChestWord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chestOpen, setChestOpen] = useState(false);
    const [showMicrophone, setShowMicrophone] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(1);

    const getGameData = async (order) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`https://api.kidsru.uz/api/chest-words/next/${order}`);
            const data = await res.json();
            console.log(data);
            setChestWord(data);
            setCurrentPhrase(data?.word);
        } catch (err) {
            setError("So'zni yuklashda xatolik.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getGameData(currentOrder);
    }, [currentOrder]);


    const handleChestClick = () => {
        setChestOpen(true);
        setShowMicrophone(true);
    };

    // Tekshiruv
    const handleCheck = async () => {
        if (chestWord && activeButton) {
            try {
                const res = await fetch(`https://api.kidsru.uz/api/chest-words/check`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ word: chestWord?.word, userInput: activeButton })
                });

                const data = await res.json();
                setIsCorrect(data.isCorrect);
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
        <div className={styles.game1}>
            {loading ? (
                <div className="loading-item">
                    <Loading />
                </div>
            ) : !chestWord ? (
                <GameVideo url={"/assets/video/ending-1.1.mp4"} poster="" video="" onClick={() => {
                    setVideoPlayed(true)
                    setOpenResultCard(true)
                }} />
            ) : !videoPlayed ? (
                <GameVideo url={"/assets/lessons/start-1-1.mp4"} poster="" video="" onClick={() => setVideoPlayed(true)} />
            ) : (
                <>
                    <div className={`${styles.Type2} heightScroll`}>
                        <div className={styles.picture} onClick={handleChestClick}>
                            <img src="/assets/images/chest.png" alt="" style={{ opacity: chestOpen ? 0 : 1 }} />
                            <img src="/assets/images/chest-open.png" alt="" style={{ opacity: chestOpen ? 1 : 0 }} />
                        </div>

                        {chestOpen ? (
                            <>
                                <div className={styles.titleText}>
                                    {chestWord?.word}
                                </div>
                                <Title text={"Повторите слово или фразу в микрофон"} />
                            </>
                        ) : (
                            <p className={styles.openChest}>
                                Откройте сундук
                            </p>
                        )}

                        <div className={styles.colors}>
                            {showMicrophone && (
                                <div className={styles.microphoneHandler}>
                                    <Microphone
                                        onClick={handleSpeechRecognition}
                                        className={`${styles.microphoneBase} ${micActive ? "activeMic" : ""}`}
                                    />
                                </div>
                            )}

                        </div>
                    </div>
                    <div className={"fixedButton"}>
                        <Button
                            value={"ПРОВЕРИТЬ"}
                            className={activeButton && "blue"}
                            onClick={handleCheck}
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
                                setIsCorrect(null);
                                setAlertHandler(false);
                                setActiveButton(null);
                                setChestOpen(false);
                                setShowMicrophone(false);
                                setCurrentOrder((prev) => prev + 1);
                            }}
                        />
                    )}

                </>
            )}

        </div>
    )
});

export default TypeTwo;
