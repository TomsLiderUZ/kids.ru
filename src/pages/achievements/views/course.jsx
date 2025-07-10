import React, { lazy } from "react";
import styles from "../achievements.module.css";
import { useGlobalContext } from "../../../context/globalContext";
const ProgressBar = lazy(() => import("../../../components/progressBar/progressBar"));

const staticCategories = [
    { id: 1, titleUz: "1-modul", titleRu: "Модуль 1", currentProgress: 1, totalProgress: 6 },
    { id: 2, titleUz: "2-modul", titleRu: "Модуль 2", currentProgress: 0, totalProgress: 6 },
];

const dynamicModules = Array.from({ length: 5 }).map((_, index) => {
    const moduleNumber = index + 3;
    return {
        id: moduleNumber,
        titleUz: `${moduleNumber}-modul`,
        titleRu: `Модуль ${moduleNumber}`,
        currentProgress: 0,
        totalProgress: 6
    };
});

const categories = [...staticCategories, ...dynamicModules];

const Course = ({ setView, setSelectedCategory }) => {
    const { isUz } = useGlobalContext();

    const completedCount = categories.filter(cat => cat.currentProgress >= cat.totalProgress).length;

    return (
        <>
            <div className={styles.cardsWrapper} style={{ backgroundColor: "#CAE5FF" }}>
                <div className={styles.title} style={{ color: "#30688E" }}>
                    {isUz ? "Kurs" : "Курс"} <span>{completedCount}/{categories.length}</span>
                </div>

                <div className={`${styles.cards} ${styles.cards2}`}>
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className={styles.card}
                            onClick={() => {
                                setView("module");
                                setSelectedCategory(isUz ? cat.titleUz : cat.titleRu);
                            }}
                        >
                            <p className={styles.title}>{isUz ? cat.titleUz : cat.titleRu}</p>
                            <div style={{ width: "170px" }}>
                                <ProgressBar
                                    currentStep={cat.currentProgress}
                                    totalSteps={cat.totalProgress}
                                    progressText={true}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ textAlign: "center" }}>
                <button onClick={() => setView("main")} className={styles.button}>
                    {isUz ? "Barcha yutuqlar" : "Все достижения"}
                </button>
            </div>
        </>
    );
};

export default Course;
