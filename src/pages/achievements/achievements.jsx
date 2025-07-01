import React, { useState, lazy } from "react";
import styles from "./achievements.module.css";

import AchievementsListView from "./views/achievementsListView";
import AllAchievementsView from "./views/allAchievementsView";
import Course from "./views/course";
import Module from "./views/module";

const Menu = lazy(() => import("../../components/menu/menu"));

const Achievements = () => {
    const [view, setView] = useState("main");
    const [selectedCategory, setSelectedCategory] = useState(null);

    return (
        <div className={styles.achievements}>

            {
                view === "main" && <AllAchievementsView setView={setView} />
            }


            {
                view === "list" && <AchievementsListView setView={setView} />
            }

            {
                view === "course" && <Course setView={setView} setSelectedCategory={setSelectedCategory} />
            }

            {
                view === "module" && <Module setView={setView} moduleTitle={selectedCategory} />
            }

            <Menu />
        </div>
    );
};

export default Achievements;
