import React, { lazy, use, useCallback, useEffect, useState } from "react";
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
        currentPhrase,
        handleSpeak,
        userSpeech,
        setOpenResultCard,
        setCurrentLessonId, setCurrentGameId
    } = useGlobalContext();

    const [clickMessages, setClickMessages] = useState([])
    const [startGame, setStartGame] = useState(false)
    const [chekcing, setCheking] = useState(false)
    const [data, setData] = useState({
        name: "Анвар"
    })

    const imagesStep = ["/assets/images/1.5-1.png", "/assets/images/1.5-2.png", "/assets/images/1.5-2.png", "/assets/images/1.5-3.png"]

    useEffect(() => {
        setCurrentPhrase("Привет");
    }, [setCurrentPhrase]);

    useEffect(() => {
        const chatBox = document.querySelector(`.${styles.chat}`);
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, [clickMessages]);

    const handleClickButton = useCallback(() => {
        if (clickMessages.length >= 2) return

        setStartGame(true)
        setClickMessages(prev => [...prev, "Привет"]);
        handleSpeak("Привет");
    }, [clickMessages]);

    useEffect(() => {
        if (isCorrect) {
            setClickMessages(prev => [...prev, userSpeech]);
        }
    }, [userSpeech]);

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
                        <div style={{ alignItems: "start", justifyContent: "" }} className={`${styles.picture} ${styles.pictureThree}  ${styles.bigChat}`}>
                            <div className={styles.imgDiv}>
                                <div>
                                    <img src={imagesStep[clickMessages.length] || imagesStep[0]} alt="" />
                                </div>
                            </div>
                            <div className={styles.chat}>
                                {clickMessages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.message} ${index % 2 === 0 ? styles.left : styles.right}`}
                                    >
                                        {msg}
                                    </div>
                                ))}

                            </div>
                        </div>
                        <Title text={!startGame ? "Ответьте на реплики 1 и 2" : clickMessages.length <= 2 ? "Ответьте на реплику 1" : "Ответьте на реплику 2"} />
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
                            value={!startGame ? "НАЧАТЬ" : "ПРОВЕРИТЬ"}
                            className={"blue"}
                            onClick={() => handleClickButton()}
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
                                if (isCorrect && clickMessages.length <= 2) {
                                    setClickMessages(prev => [...prev, "Как тебя зовут?"]);
                                    setCurrentPhrase(`Меня зовут ${data.name}`);
                                    handleSpeak("Как тебя зовут?");
                                }
                            }}
                        />
                    )}
                </>
            )}
        </div>
    );
});

export default TypeOne;
