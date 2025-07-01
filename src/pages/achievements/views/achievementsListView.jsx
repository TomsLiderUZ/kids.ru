import React, { lazy, useEffect } from "react";
import styles from "../achievements.module.css"
const ProgressBar = lazy(() => import("../../../components/progressBar/progressBar"));

const categories = [
    { id: 1, img:"/assets/images/Handshake.png", title: "Мастер приветствий", currentProgress: 4, totalProgress: 4 },
    { id: 2, img:"/assets/images/chat.png",  title: "Знаток общения ", currentProgress: 1, totalProgress: 4 },
];

const AchievementsListView = ({ setView }) => {

  return (
    <>
      <div className={styles.cardsWrapper} style={{ backgroundColor: "#F283C7" }}>
        <div className={styles.title} style={{ color: "white" }}>Знакомство <span>1/6</span></div>
        <div className={styles.cards} >
          {categories.map((cat) => (
            <div key={cat.id}
              className={styles.card} onClick={() => setView("course")}
            >
              <div className={styles.imgWrapper}><img src={cat.img} alt="" /></div>
              <div className={styles.cardItem}>
                <p className={styles.title}>{cat.title}</p>
                <div style={{ marginLeft: "-10px" }}><ProgressBar currentStep={cat.currentProgress} totalSteps={cat.totalProgress} /></div>
                <p className={styles.subtitle}>Присуждается за прохождение всех игр на первом уроке</p>
              </div>
            </div>
          ))}
          {
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index}
                className={styles.card} onClick={() => setView("course")}
              >
                <div className={styles.imgWrapper}><img src="/assets/images/people.png" alt="" /></div>
                <div className={styles.cardItem}>
                  <div className={styles.title}>Маэстро знакомств</div>
                  <div style={{ marginLeft: "-10px" }}><ProgressBar currentStep={1} totalSteps={5} /></div>
                  <div className={styles.subtitle}>Присуждается за прохождение всех игр на первом уроке</div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <button onClick={() => setView("main")} className={styles.button}>Все достижения</button>
      </div>
    </>
  );
};

export default AchievementsListView;
