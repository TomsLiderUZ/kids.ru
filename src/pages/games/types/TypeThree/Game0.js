import React, { lazy, useEffect, useState } from "react";
import styles from "../../type2.module.css";
import { useGlobalContext } from "../../../../context/globalContext";
import { useParams } from "react-router-dom";

// Lazy yuklanadigan komponentlar
const Alert = lazy(() => import("../../../../components/alert/alert"));
const Button = lazy(() => import("../../../../components/button/button"));
const Title = lazy(() => import("../../../../components/title/title"));
const GameVideo = lazy(() => import("../../../../components/gameVideo/gameVideo"));

const correctOrder = ["Зеленый", "Оранжевый", "Розовый"];

const colorMap = {
    "Розовый": "var(--component_pink_primary)",
    "Зеленый": "var(--component_green_primary",
    "Оранжевый": "var(--component_orange_primary)"
};


const Type3 = React.memo(() => {
    const { id } = useParams()
    const [lessonId, gameId] = id.split(".");

    const [droppedColors, setDroppedColors] = useState([null, null, null]);
    const [draggingColor, setDraggingColor] = useState(null);

    const {
        setActiveButton,
        isCorrect,
        setIsCorrect,
        alertHandler,
        setAlertHandler,
        videoPlayed,
        setVideoPlayed,
        handleSpeak, setOpenResultCard,
        setCurrentLessonId, setCurrentGameId
    } = useGlobalContext();

    const handleDragStart = (color) => {
        setDraggingColor(color);
        handleSpeak(color);
    };

    const handleDrop = (index) => {
        if (!draggingColor) return;
        const updated = [...droppedColors];
        updated[index] = draggingColor;
        setDroppedColors(updated);
        setDraggingColor(null);
    };

    const handleCheckResult = () => {
        const isCorrectAnswer = JSON.stringify(droppedColors) === JSON.stringify(correctOrder);
        setIsCorrect(isCorrectAnswer);
        setAlertHandler(true);
    };

    const handleReset = () => {
        setDroppedColors([null, null, null]);
        setIsCorrect(null);
        setAlertHandler(false);
        setOpenResultCard(true)
    };

    useEffect(() => {
        setCurrentLessonId(lessonId);
        setCurrentGameId(gameId);
    }, [lessonId, gameId]);

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            {!videoPlayed ? (
                <GameVideo
                    poster="/assets/images/poster.png"
                    video="/assets/video/tutorial.mp4"
                    onClick={() => setVideoPlayed(true)}
                />
            ) : (
                <>
                    <div className={`${styles.Type2} heightScroll`}>
                        <div className={styles.picture}>
                            <img src="https://i.ibb.co/HpRN06GT/85dbe2a26a87f295a04c4d5826277f64a7502829.png" alt="Task" />
                            <div className="styles.colors" style={{
                                width: "100%",
                                position: "absolute",
                                top: "45%",
                                left: "20px",
                                display: "flex",
                                gap: "8px",
                                paddingLeft: "17px"
                            }}>
                                {[0, 1, 2].map((index) => {
                                    return (<div
                                        key={index}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={() => handleDrop(index)}
                                        style={{
                                            width: "120px",
                                            height: "80px",
                                            borderRadius: "15px",
                                            backgroundColor: droppedColors[index] ? colorMap[droppedColors[index]] : "transparent",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: 700,
                                            color: "white",

                                        }}
                                    >
                                        {droppedColors[index] || ""}
                                    </div>)
                                })}
                            </div>
                        </div>

                        <Title text="Перетащите цвета на картинки" />

                        <div className={styles.colors}>
                            {["Розовый", "Зеленый", "Оранжевый"].map((text) => {
                                const isUsed = droppedColors.includes(text);
                                return (
                                    <button
                                        key={text}
                                        draggable={!isUsed}
                                        onDragStart={() => handleDragStart(text)}
                                        className={!isUsed ? styles[text.toLowerCase()] : ""}
                                        style={{
                                            opacity: isUsed ? 0.5 : 1,
                                            cursor: isUsed ? "not-allowed" : "grab",
                                        }}
                                    >
                                        {text}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className={"fixedButton"}>
                        <Button
                            value={"ПРОВЕРИТЬ"}
                            className={"blue"}
                            onClick={handleCheckResult}
                        />
                    </div>

                    {alertHandler && (
                        <Alert
                            wrong={!isCorrect}
                            correctText={!isCorrect && "Попробуйте еще раз"}
                            setActiveButton={setActiveButton}
                            setAlertHandler={setAlertHandler}
                            onClick={handleReset}
                        />
                    )}
                </>
            )}
        </React.Suspense>
    );
});

export default Type3;
