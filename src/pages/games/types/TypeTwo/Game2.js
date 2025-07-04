import React, { lazy, useState, useEffect } from "react";
import styles from "../../type2.module.css";
import { useGlobalContext } from "../../../../context/globalContext";
import Loading from "../../../../components/loading/loading";
import { useParams } from "react-router-dom";

const Button = lazy(() => import("../../../../components/button/button"));
const Alert = lazy(() => import("../../../../components/alert/alert"));
const Title = lazy(() => import("../../../../components/title/title"));

const Type2 = React.memo(() => {
    const { id } = useParams()
    const [lessonId, gameId] = id.split(".");

    const { isCorrect, setIsCorrect, handleSpeak, setOpenResultCard, setCurrentLessonId, setCurrentGameId } = useGlobalContext();
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [activeButton, setActiveButton] = useState(null);
    const [alertHandler, setAlertHandler] = useState(false);
    const [videoPlayed, setVideoPlayed] = useState(false);
    const GameVideo = lazy(() => import("../../../../components/gameVideo/gameVideo"));


    useEffect(() => {
        // 📌 Backenddan barcha topshiriqlarni olish
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

    // "Продолжить" tugmasi bosilganda keyingi topshiriqqa o'tish
    const continueToNextTask = () => {
        const currentIndex = tasks.findIndex(task => task._id === currentTask._id);
        const nextTask = tasks[currentIndex + 1];

        if (!nextTask) {
            return;
        }

        setCurrentTask(nextTask);
        setActiveButton(null);  // Avvalgi tanlovni tozalash
        setIsCorrect(null);  // Javobni tozalash
        setAlertHandler(false);  // Alertni yashirish
        setOpenResultCard(true)
    };


    // "Повторить" tugmasi bosilganda alertni yopish
    const repeatTask = () => {
        setActiveButton(null);  // Tanlangan rangni tozalash
        setIsCorrect(null);  // Javobni tozalash
        setAlertHandler(false);  // Alertni yopish
    };

    useEffect(() => {
        setCurrentLessonId(lessonId);
        setCurrentGameId(gameId);
    }, [lessonId, gameId]);

    return (
        <React.Suspense fallback={<div className="loading-item">
            <Loading />
        </div>}>
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
                                        className={`${styles[color.toLowerCase()]} ${activeButton === color ? styles.active : ""}`}
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
                            value={"ПРОВЕРИТЬ"}
                            className={activeButton ? "blue" : ""}
                            onClick={checkAnswer}
                        />
                    </div>
                    {alertHandler && (
                        <Alert
                            wrong={!isCorrect}
                            correctText={!isCorrect && `To'g'ri javob: ${currentTask.correctColor}`}
                            setActiveButton={setActiveButton}
                            setAlertHandler={setAlertHandler}
                            onClick={ () => {
                                continueToNextTask()
                                if(isCorrect) setOpenResultCard(true)}
                            }
                            // onRepeat={repeatTask}
                    onRepeat={() => {
                        setAlertHandler(false);
                        setActiveButton(null);
                    }}
                        />
                    )}
                </>
            )}
        </React.Suspense>

    );
});

export default Type2;
