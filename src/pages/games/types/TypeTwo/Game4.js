import React, { lazy, useEffect, useState } from "react";
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

    const imagesStep = ["/assets/images/1.5-1.png", "/assets/images/1.5-2.png", "/assets/images/1.5-2.png", "/assets/images/1.5-3.png"]


    const [clickMessages, setClickMessages] = useState([])
    const [startGame, setStartGame] = useState(false)
    const [chekcing, setCheking] = useState(false)
    const [currentButtons, setCurrentButtons] = useState(null);
    const [data, setData] = useState({
        name: "Анвар"
    })


    useEffect(() => {
        const chatBox = document.querySelector(`.${styles.chat}`);
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, [clickMessages]);

    const handleButtonClick = (option) => {
        if (clickMessages.length >= 2) return

        setStartGame(true)
        setClickMessages([...clickMessages, "Привет"])
        handleSpeak("Привет");
        setCurrentButtons(phrases1)
    }

    useEffect(() => {
        if (activeButton === "Привет" ||
            activeButton === `Меня зовут ${data.name}`) {
            setIsCorrect(true);
            setAlertHandler(true);
            setClickMessages(prev => [...prev, activeButton]);
        }
    }, activeButton)


    const phrases1 = [
        { id: 1, text: "Привет" },
        { id: 2, text: "Пока" },
    ]

    const phrases2 = [
        { id: 1, text: "Меня зовут Анвар" },
        { id: 2, text: "А тебя как зовут?" },
    ]

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
                        <div style={{ alignItems: "start", justifyContent: "" }} className={`${styles.picture} ${styles.pictureThree}`}>
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
                        <div className={styles.buttons}>
                            {startGame && currentButtons.map(({ id, text }) => (
                                <button
                                    key={id}
                                    className={`${activeButton === text ? styles.active : ""}
                                    `}
                                    onClick={() => {
                                        setActiveButton(text)
                                        handleSpeak(text)
                                    }}
                                >
                                    {text}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={"fixedButton"}>
                        <Button
                            value={!startGame ? "НАЧАТЬ" : "ПРОВЕРИТЬ"}
                            className={"blue"}
                            onClick={() => handleButtonClick()}
                        />
                    </div>
                    {alertHandler && (
                        <Alert
                            wrong={!isCorrect}
                            correctText={!isCorrect && "Попробуйте еще раз"}
                            setActiveButton={setActiveButton}
                            setAlertHandler={setAlertHandler}
                            onClick={() => {
                                if (isCorrect && clickMessages.length <= 2) {
                                    setCurrentButtons(phrases2)
                                    setClickMessages([...clickMessages, "Как тебя зовут?"])
                                    handleSpeak("Как тебя зовут?")
                                }
                                setOpenResultCard(true)
                                setActiveButton(null);
                                setIsCorrect(null);
                                setAlertHandler(false);
                            }}
                        />
                    )}
                </>
            )}
        </div>
    );
});

export default TypeOne;
