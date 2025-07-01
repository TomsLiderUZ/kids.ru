import React, { lazy, useEffect } from "react";
import styles from "../achievements.module.css"
const ProgressBar = lazy(() => import("../../../components/progressBar/progressBar"));

const categories = [
    { id: 1, title: "Модуль 1", currentProgress: 1, totalProgress: 6 },
    { id: 2, title: "Модуль 2 ", currentProgress: 0, totalProgress: 6 },
];

const Course = ({ setView, setSelectedCategory }) => {

    return (
        <>
            <div className={styles.cardsWrapper} style={{ backgroundColor: "#CAE5FF" }}>
                <div className={styles.title} style={{ color: "#30688E" }}>Курс <span>1/7</span></div>
                <div className={`${styles.cards} ${styles.cards2}`} >
                    {categories.map((cat) => (
                        <div key={cat.id}
                            className={styles.card} onClick={() => {
                                setView("module")
                                setSelectedCategory(cat.title)
                            }}
                        >
                            <p className={styles.title}>{cat.title}</p>
                            <div style={{ width: "170px" }}><ProgressBar currentStep={cat.currentProgress} totalSteps={cat.totalProgress} progressText={true} /></div>
                        </div>
                    ))}
                    {
                        Array.from({ length: 5 }).map((_, index) => {
                            const moduleNumber = index + 3;
                            return (
                                <div key={index} className={styles.card} onClick={() => {
                                    setView("module")
                                    setSelectedCategory("Модуль" + moduleNumber)
                                    }}>
                                    <div className={styles.title}>Модуль {moduleNumber}</div>
                                    <div style={{ width: "170px" }}>
                                        <ProgressBar currentStep={0} totalSteps={6} progressText={true} />
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div style={{ textAlign: "center" }}>
                <button onClick={() => setView("main")} className={styles.button}>Все достижения</button>
            </div>
        </>
    );
};

export default Course;
