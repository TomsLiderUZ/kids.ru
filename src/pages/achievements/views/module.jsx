import React, { lazy, useEffect } from "react";
import styles from "../achievements.module.css"
const ProgressBar = lazy(() => import("../../../components/progressBar/progressBar"));

const categories = [
    { id: 1, title: "Знакомство", currentProgress: 2, totalProgress: 6 },
    { id: 2, title: "Цвета", currentProgress: 0, totalProgress: 6 },
    { id: 3, title: "Числа", currentProgress: 0, totalProgress: 6 },
    { id: 4, title: "Семья", currentProgress: 0, totalProgress: 6 },
    { id: 5, title: "Одежда", currentProgress: 0, totalProgress: 6 },
    { id: 6, title: "Контрольная работа", currentProgress: 0, totalProgress: 6 },
];

const Module = ({ setView, moduleTitle }) => {

    return (
        <>
            <div className={styles.cardsWrapper} style={{ backgroundColor: "#7AC70C" }}>
                <div className={styles.title} style={{ color: "white" }}> {moduleTitle} <span>1/6</span></div>
                <div className={`${styles.cards} ${styles.cards2}`} >
                    {categories.map((cat) => (
                        <div key={cat.id}
                            className={`${styles.card} ${styles["card" + cat.id]}`} style={{ borderColor: cat.color }}
                        >
                            <p className={styles.title}>{cat.title}</p>
                            <div style={{ width: "170px" }}><ProgressBar currentStep={cat.currentProgress} totalSteps={cat.totalProgress} progressText={true} /></div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ textAlign: "center" }}>
                <button onClick={() => setView("main")} className={styles.button}>Все достижения</button>
            </div>
        </>
    );
};

export default Module;
