import React, { lazy, useState, useEffect } from "react";
import styles from "../../type2.module.css";
import { useGlobalContext } from "../../../../context/globalContext";
import Loading from "../../../../components/loading/loading";
import { useParams } from "react-router-dom";

const Button = lazy(() => import("../../../../components/button/button"));
const Alert = lazy(() => import("../../../../components/alert/alert"));
const Title = lazy(() => import("../../../../components/title/title"));
const GameVideo = lazy(() => import("../../../../components/gameVideo/gameVideo"));

const Type2 = React.memo(() => {
    const { id } = useParams();
    const [lessonId, gameId] = id.split(".");

    const {
        isCorrect,
        setIsCorrect,
        handleSpeak,
        setOpenResultCard,
        setCurrentLessonId,
        setCurrentGameId,
        isUz,
    } = useGlobalContext();

    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [activeButton, setActiveButton] = useState(null);
    const [alertHandler, setAlertHandler] = useState(false);
    const [videoPlayed, setVideoPlayed] = useState(false);

    useEffect(() => {
        fetch(`https://api.kidsru.uz/api/colorings`)
            .then((response) => response.json())
            .then((data) => {
                setTasks(data);
                setCurrentTask(data[0]);
            })
            .catch((error) => console.error("Xatolik:", error));
    }, []);

    const handleButtonClick = (color) => {
        setActiveButton(color);
        handleSpeak(color);
    };

    const checkAnswer = () => {
        if (!currentTask || !activeButton) return;

        fetch(`https://api.kidsru.uz/api/colorings/${currentTask._id}/check`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ answerColor: activeButton }),
        })
            .then((response) => response.json())
            .then((result) => {
                setIsCorrect(result.correct);
                setAlertHandler(true);
            })
            .catch((error) => console.error("Xatolik:", error));
    };

    const continueToNextTask = () => {
        const currentIndex = tasks.findIndex((task) => task._id === currentTask._id);
        const nextTask = tasks[currentIndex + 1];

        if (!nextTask) return;

        setCurrentTask(nextTask);
        setActiveButton(null);
        setIsCorrect(null);
        setAlertHandler(false);
        setOpenResultCard(true);
    };

    const repeatTask = () => {
        setActiveButton(null);
        setIsCorrect(null);
        setAlertHandler(false);
    };

    useEffect(() => {
        setCurrentLessonId(lessonId);
        setCurrentGameId(gameId);
    }, [lessonId, gameId]);

    return (
        <React.Suspense
            fallback={
                <div className="loading-item">
                    <Loading />
                </div>
            }
        >
            {!videoPlayed ? (
                <GameVideo
                    poster="/assets/images/poster.png"
                    video="/assets/video/tutorial.mp4"
                    onClick={() => setVideoPlayed(true)}
                />
            ) : (
                <>
                    {currentTask && (
                        <div className={`${styles.Type2} heightScroll`}>
                            <div className={styles.picture}>
                                {alertHandler && isCorrect ? (
                                    <img src={`${currentTask.correctImage}`} alt="Correct" />
                                ) : (
                                    <img src={`${currentTask.image}`} alt="Task" />
                                )}
                            </div>
                            <Title text={currentTask.phrase} />
                            <div className={styles.colors}>
                                {currentTask?.options?.map((color) => (
                                    <button
                                        key={color}
                                        className={`${styles[color.toLowerCase()]} ${
                                            activeButton === color ? styles.active : ""
                                        }`}
                                        onClick={() => handleButtonClick(color)}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="fixedButton">
                        <Button
                            value={isUz ? "TEKSHIRISH" : "ПРОВЕРИТЬ"}
                            className={activeButton ? "blue" : ""}
                            onClick={checkAnswer}
                        />
                    </div>
                    {alertHandler && (
                        <Alert
                            wrong={!isCorrect}
                            correctText={
                                !isCorrect &&
                                (isUz
                                    ? `To'g'ri javob: ${currentTask.correctColor}`
                                    : `Правильный ответ: ${currentTask.correctColor}`)
                            }
                            setActiveButton={setActiveButton}
                            setAlertHandler={setAlertHandler}
                            onClick={() => {
                                continueToNextTask();
                                if (isCorrect) setOpenResultCard(true);
                            }}
                            onRepeat={repeatTask}
                        />
                    )}
                </>
            )}
        </React.Suspense>
    );
});

export default Type2;
