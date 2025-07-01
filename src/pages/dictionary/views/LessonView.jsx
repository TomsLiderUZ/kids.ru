import React, { lazy } from "react";
import styles from "../dictionary.module.css"
import StarIcon from "../../../components/starIcon";

import RandomIcon from "../../../components/randomIcon";
import ReturnIcon from "../../../components/returnIcon";
const Button = lazy(() => import("../../../components/button/button"));




const COLORS = ["#EA4C89", "#186CBA", "#EE5900", "#9069CD", "#B23232", "#DB9509", "#619F09"];



const getRandomColor = (excludedColors = []) => {
  const availableColors = COLORS.filter((color) => !excludedColors.includes(color));
  const randomIndex = Math.floor(Math.random() * availableColors.length);
  return availableColors[randomIndex];
};


const LessonView = ({ onBack, onNext, selectedBlock, setView }) => {

  const topColor = getRandomColor();
  const bottomColor = getRandomColor([topColor]);

  return (
    <div className={`${styles.lessonView}  ${styles.height}`} >
      <div className={styles.titles}>
        <h2>СЛОВАРЬ</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <Button onClick={onBack} svgLeft={
            <ReturnIcon />
          } className="border" />
          <h4>{selectedBlock && selectedBlock.name}</h4>
          <Button svgLeft={
            <RandomIcon color="#B0D8FE" />
          } className="border" 
          
           onClick={() => setView("random")}/>
        </div>

        <div className={styles.center}>
          {selectedBlock?.lessons.map((mod) => {
            const btnColor = getRandomColor([topColor, bottomColor]);

            return (
              <Button
                key={mod.id}
                onClick={() => onNext(mod)}
                className=""
                value={<h4>{mod.lesson} <span>{mod.name}</span></h4>}
                style={{ borderColor: btnColor, color: "var(--text_color_dark_primary)" }}
                svgRight={
                  <StarIcon />
                }
              />
            );
          })}
        </div>
      </div>
    </div >
  )
}

export default LessonView;
