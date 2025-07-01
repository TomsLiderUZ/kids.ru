import React, { lazy, useState } from "react";
import styles from "../../type2.module.css";
import { useGlobalContext } from "../../../../context/globalContext";

const Button = lazy(() => import("../../../../components/button/button"));
const Alert = lazy(() => import("../../../../components/alert/alert"));
const Title = lazy(() => import("../../../../components/title/title"));
const GameVideo = lazy(() => import("../../../../components/gameVideo/gameVideo"));

const Type2 = React.memo(() => {
    const { handleSpeak, setOpenResultCard } = useGlobalContext();
    const [activeButton, setActiveButton] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [alertHandler, setAlertHandler] = useState(false);
    const [videoPlayed, setVideoPlayed] = useState(false);

    const handleButtonClick = (e, correct) => {
        const clickedButton = e.target;
        setActiveButton(clickedButton);
        setIsCorrect(correct);
        handleSpeak(clickedButton.textContent);
    };

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
                            <img
                                src="/assets/images/8eec3277778dc01a19cc3c9b11af51dfd3bc21ce.png"
                                alt=""
                            />
                        </div>
                        <Title text={"Как правильно поздороваться с учителем?"} />
                        <div className={styles.colors}>
                            <button
                                className={`${styles.buttonTwoo1} ${activeButton?.textContent === "Привет" ? styles.active : ""
                                    }`}
                                onClick={(e) => handleButtonClick(e, false)}
                            >
                                Привет
                            </button>
                            <button
                                className={`${styles.buttonTwoo1} ${activeButton?.textContent === "Здравствуйте" ? styles.active : ""
                                    }`}
                                onClick={(e) => handleButtonClick(e, true)}
                            >
                                Здравствуйте
                            </button>
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
