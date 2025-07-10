import React, { lazy } from "react";
import styles from "../achievements.module.css";
import { useGlobalContext } from "../../../context/globalContext";
const ProgressBar = lazy(() =>
  import("../../../components/progressBar/progressBar")
);

const categories = [
  {
    id: 1,
    titleUz: "Tanishuv",
    titleRu: "Знакомство",
    currentProgress: 2,
    totalProgress: 6,
  },
  {
    id: 2,
    titleUz: "Ranglar",
    titleRu: "Цвета",
    currentProgress: 0,
    totalProgress: 6,
  },
  {
    id: 3,
    titleUz: "Sonlar",
    titleRu: "Числа",
    currentProgress: 0,
    totalProgress: 6,
  },
  {
    id: 4,
    titleUz: "Oila",
    titleRu: "Семья",
    currentProgress: 0,
    totalProgress: 6,
  },
  {
    id: 5,
    titleUz: "Kiyimlar",
    titleRu: "Одежда",
    currentProgress: 0,
    totalProgress: 6,
  },
  {
    id: 6,
    titleUz: "Nazorat ishi",
    titleRu: "Контрольная работа",
    currentProgress: 0,
    totalProgress: 6,
  },
];

const Module = ({ setView, moduleTitle }) => {
  const { isUz } = useGlobalContext();

  const completedCount = categories.filter(
    (c) => c.currentProgress >= c.totalProgress
  ).length;

  return (
    <>
      <div
        className={styles.cardsWrapper}
        style={{ backgroundColor: "#7AC70C" }}
      >
        <div className={styles.title} style={{ color: "white" }}>
          {moduleTitle}{" "}
          <span>
            {completedCount}/{categories.length}
          </span>
        </div>

        <div className={`${styles.cards} ${styles.cards2}`}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`${styles.card} ${styles["card" + cat.id]}`}
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

export default Module;
