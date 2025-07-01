import React, { lazy, useState, useRef, useEffect } from "react";
import styles from "../../type2.module.css";
import { useGlobalContext } from "../../../../context/globalContext";

const Button = lazy(() => import("../../../../components/button/button"));
const Alert = lazy(() => import("../../../../components/alert/alert"));
const Title = lazy(() => import("../../../../components/title/title"));
const GameVideo = lazy(() => import("../../../../components/gameVideo/gameVideo"));

const Type5 = React.memo(() => {
    const [selectedPairs, setSelectedPairs] = useState([]);
    const [currentLeft, setCurrentLeft] = useState(null);

    const {
        activeButton,
        setActiveButton,
        isCorrect,
        setIsCorrect,
        alertHandler,
        setAlertHandler,
        videoPlayed,
        setVideoPlayed,
        handleSpeak,
        setOpenResultCard
    } = useGlobalContext();

    const leftCards = [
        { id: 1, text: "Дядя" },
        { id: 2, text: "Тетя" },
        { id: 3, text: "Бабушка" },
        { id: 4, text: "Дедушка" },
    ];

    const rightCards = [
        { id: 1, text: "Племянник" },
        { id: 2, text: "Внучка" },
        { id: 3, text: "Внук" },
        { id: 4, text: "Племянница" },
    ];

    const leftRefs = useRef([]);
    const rightRefs = useRef([]);
    const containerRef = useRef(null);

    const correctPairs = {
        "Дядя": "Племянник",
        "Тетя": "Племянница",
        "Бабушка": "Внучка",
        "Дедушка": "Внук",
    };

    const handleLeftClick = (text) => {
        setCurrentLeft(text);
    };

    const handleRightClick = (rightText) => {
        if (!currentLeft) return;

        setSelectedPairs(prev => {
            const filtered = prev.filter(pair => pair.left !== currentLeft);
            return [...filtered, { left: currentLeft, right: rightText }];
        });

        setCurrentLeft(null);
    };

    const getLineCoords = (leftText, rightText) => {
        const leftIndex = leftCards.findIndex(c => c.text === leftText);
        const rightIndex = rightCards.findIndex(c => c.text === rightText);

        const leftEl = leftRefs.current[leftIndex];
        const rightEl = rightRefs.current[rightIndex];

        if (!leftEl || !rightEl || !containerRef.current) return null;

        const leftRect = leftEl.getBoundingClientRect();
        const rightRect = rightEl.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        return {
            x1: leftRect.right - containerRect.left,
            y1: leftRect.top + leftRect.height / 2 - containerRect.top,
            x2: rightRect.left - containerRect.left,
            y2: rightRect.top + rightRect.height / 2 - containerRect.top
        };
    };

    const handleCheckResult = () => {
        const allCorrect = Object.entries(correctPairs).every(([left, right]) =>
            selectedPairs.find(pair => pair.left === left && pair.right === right)
        );

        setIsCorrect(allCorrect);
        setAlertHandler(true);
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
                    <div className={`${styles.Type2} ${styles.type5} heightScroll`} ref={containerRef} style={{ position: "relative" }}>
                        <Title text="Соедините правильные пары" />
                        <svg className={styles.svgLines}>
                            {selectedPairs.map((pair, i) => {
                                const coords = getLineCoords(pair.left, pair.right);
                                if (!coords) return null;
                                return (
                                    <line
                                        key={i}
                                        x1={coords.x1}
                                        y1={coords.y1}
                                        x2={coords.x2}
                                        y2={coords.y2}
                                        stroke="blue"
                                        strokeWidth="2"
                                    />
                                );
                            })}
                        </svg>
                        <div className={styles.cardsWrapperFive}>
                            <div>
                                {leftCards.map(({ text }, index) => (
                                    <button
                                        ref={(el) => (leftRefs.current[index] = el)}
                                        className={`${styles.card} ${currentLeft === text ? styles.selected : ""}`}
                                        key={index}
                                        onClick={() => handleLeftClick(text)}
                                    >
                                        {text}
                                        <div className={styles.connector}><div className={styles.dot}></div></div>
                                    </button>
                                ))}
                            </div>
                            <div>
                                {rightCards.map(({ text }, index) => (
                                    <button
                                        ref={(el) => (rightRefs.current[index] = el)}
                                        className={`${styles.card} ${styles.rightCard}`}
                                        key={index}
                                        onClick={() => handleRightClick(text)}
                                    >
                                        {text}
                                        <div className={styles.connector}><div className={styles.dot}></div></div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="fixedButton">
                        <Button
                            value={"ПРОВЕРИТЬ"}
                            className={selectedPairs.length === 4 ? "blue" : ""}
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
                                setOpenResultCard(true)
                                setSelectedPairs([]);
                                setCurrentLeft(null);
                                setActiveButton(null);
                                setIsCorrect(null);
                                setAlertHandler(false);
                            }}
                        />
                    )}
                </>
            )}
        </>
    );
});

export default Type5;
