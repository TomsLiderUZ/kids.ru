import React, { lazy, useState, useEffect } from "react";
import axios from "axios";
import styles from "../../type2.module.css";
import { useGlobalContext } from "../../../../context/globalContext";

const Button = lazy(() => import("../../../../components/button/button"));
const Alert = lazy(() => import("../../../../components/alert/alert"));
const Title = lazy(() => import("../../../../components/title/title"));
const GameVideo = lazy(() => import("../../../../components/gameVideo/gameVideo"));

const Type3 = React.memo(() => {
    const [gameData, setGameData] = useState(null);
    const [clickMessages, setClickMessages] = useState([])
    const [selectedColors, setSelectedColors] = useState([])

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
        setOpenResultCard
    } = useGlobalContext();

    useEffect(() => {
        const chatBox = document.querySelector(`.${styles.chat}`);
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, [clickMessages]);

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
            selectedColors.join(",") === ["Привет", "Как тебя зовут?", "Меня зовут Маша. А тебя?", "Я Коля. Очень приятно!"].join(",")) {
            setIsCorrect(true);
            setAlertHandler(true);
            console.log("ishladi");
        } else if (selectedColors.length === 4 &&
            selectedColors.join(",") !== ["Привет", "Как тебя зовут?", "Меня зовут Маша. А тебя?", "Я Коля. Очень приятно!"].join(",")) {
            setIsCorrect(false);
            setAlertHandler(true);
        }
    }, [selectedColors]);

    console.log(selectedColors);


    const handleCheckResult = () => {

    };

    const phrases = [
        { id: 1, text: 'Меня зовут Маша. А тебя?' },
        { id: 2, text: 'Привет' },
        { id: 3, text: 'Как тебя зовут?' },
        { id: 4, text: 'Я Коля. Очень приятно!' },
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
                        <div style={{ alignItems: "start", justifyContent: "" }} className={`${styles.picture} ${styles.pictureThree}`}>
                            <div className={styles.imgDiv}>
                                <div>
                                    <img src="https://i.ibb.co/VW9SyRFC/7f29600c994bac0d724335ea5bb2a92d471ade14.png" alt="" />
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
                        <Title text="Перетащите реплики в правильном порядке" />
                        <div className={styles.buttons}>
                            {phrases.map(({ id, text }) => (
                                <button style={{ width: "fit-content", padding: "12px 20px", margin: "8px" }}
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
