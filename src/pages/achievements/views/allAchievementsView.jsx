import React, { lazy } from "react";
import styles from "../achievements.module.css";
import { useGlobalContext } from "../../../context/globalContext";
const ProgressBar = lazy(() => import("../../../components/progressBar/progressBar"));

const allBadges = new Array(20).fill(null).map((_, i) => ({
    id: i + 100, // ID farqlanishi uchun
    titleUz: `Yutuq ${i + 1}`,
    titleRu: `Достижение ${i + 1}`,
    img: "/assets/images/people.png",
    currentProgress: i < 5 ? 5 : 0,
    totalProgress: 5,
    earned: i < 5,
}));

const categories = [
    { id: 1, img: "/assets/images/Handshake.png", titleUz: "Salomlashuv ustasi", titleRu: "Мастер приветствий", currentProgress: 4, totalProgress: 4 },
    { id: 2, img: "/assets/images/chat.png", titleUz: "Muloqot bilimdoni", titleRu: "Знаток общения ", currentProgress: 1, totalProgress: 4 },
];

const AllAchievementsView = ({ setView }) => {
    const { isUz } = useGlobalContext();

    const totalAchievements = categories.length + allBadges.length;
    const earnedAchievements = categories.filter(c => c.currentProgress >= c.totalProgress).length +
        allBadges.filter(b => b.earned).length;

    return (
        <>
            <div className={styles.cardsWrapper} style={{ backgroundColor: "var(--lights_buttons_active_primary)" }}>
                <div className={styles.title} style={{ color: "#30688E" }}>
                    {isUz ? "Barcha yutuqlar" : "Все достижения"} <span>{earnedAchievements}/{totalAchievements}</span>
                </div>
                <div className={styles.cards}>
                    {[...categories, ...allBadges].map((item) => (
                        <div key={item.id} className={`${styles.card} ${item.earned ? styles.earned : styles.locked}`}>
                            <div className={styles.imgWrapper}>
                                <img src={item.img} alt="" />
                            </div>
                            <div className={styles.cardItem}>
                                <p className={styles.title}>{isUz ? item.titleUz : item.titleRu}</p>
                                <div style={{ marginLeft: "-10px" }}>
                                    <ProgressBar currentStep={item.currentProgress} totalSteps={item.totalProgress} />
                                </div>
                                <p className={styles.subtitle}>
                                    {isUz
                                        ? "Birinchi darsdagi barcha o‘yinlarni tugatganingiz uchun beriladi"
                                        : "Присуждается за прохождение всех игр на первом уроке"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ textAlign: "center" }}>
                <button onClick={() => setView("list")} className={styles.button}>
                    {isUz ? "Bo‘limlarga qaytish" : "По блокам"}
                </button>
            </div>
        </>
    );
};

export default AllAchievementsView;
