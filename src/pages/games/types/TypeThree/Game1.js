import React, { lazy, useEffect, useState } from "react";
import axios from "axios";
import styles from "../../type2.module.css";
import { useGlobalContext } from "../../../../context/globalContext";
import { useParams } from "react-router-dom";

const Button = lazy(() => import("../../../../components/button/button"));
const Alert = lazy(() => import("../../../../components/alert/alert"));
const Title = lazy(() => import("../../../../components/title/title"));
const GameVideo = lazy(() => import("../../../../components/gameVideo/gameVideo"));

const Type3 = React.memo(() => {
    const [gameData, setGameData] = useState(null);
    const [clickMessages, setClickMessages] = useState([])
    const [selectedColors, setSelectedColors] = useState([])

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
        handleSpeak,
        setOpenResultCard,
        setCurrentLessonId, setCurrentGameId
    } = useGlobalContext();

    const handleButtonClick = (option) => {
        if (selectedColors.length === 4) {
            setSelectedColors([])
            setClickMessages([])
        }
        setActiveButton(option);
        handleSpeak(option);
        setSelectedColors(prev => [...prev, option]);
        setClickMessages(prev => [...prev, option])
    };

    useEffect(() => {
        if (selectedColors.length === 4 &&
            selectedColors.join(",") === ["Привет", "Как тебя зовут?", "Меня зовут Лена", "Приятно познакомиться"].join(",")) {
            setIsCorrect(true);
            setAlertHandler(true);
            console.log("ishladi");
        } else if (selectedColors.length === 4 &&
            selectedColors.join(",") !== ["Привет", "Как тебя зовут?", "Меня зовут Лена", "Приятно познакомиться"].join(",")) {
            setIsCorrect(false);
            setAlertHandler(true);
        }
    }, [selectedColors]);

    console.log(selectedColors);

    useEffect(() => {
        setCurrentLessonId(lessonId);
        setCurrentGameId(gameId);
    }, [lessonId, gameId]);



    const handleCheckResult = () => {

    };

    const phrases = [
        { id: 1, text: 'Привет' },
        { id: 3, text: 'Меня зовут Лена' },
        { id: 4, text: 'Приятно познакомиться' },
        { id: 2, text: 'Как тебя зовут?' },
    ];


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
                        <div className={styles.picture}>
                            <div className={styles.chat}>
                                {
                                    clickMessages.map((msg, index) => (
                                        <div
                                            key={index}
                                            className={`${styles.message} ${index % 2 === 0 ? styles.left : styles.right
                                                }`}
                                        >
                                            {msg}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <Title text="Перетащите реплики в правильном порядке" />
                        <div className={styles.buttons}>
                            {phrases.map(({ id, text }) => (
                                <button
                                    key={id}
                                    className={`${styles[text.toLowerCase()] || ""} ${activeButton === text ? styles.active : ""}
                                    `}
                                    onClick={() => handleButtonClick(text)}
                                >
                                    {text}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="fixedButton">
                        <Button
                            value="ПРОВЕРИТЬ"
                            className={activeButton ? "blue" : ""}
                            onClick={handleCheckResult}
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
                                setSelectedColors([])
                                setClickMessages([])
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

export default Type3;
