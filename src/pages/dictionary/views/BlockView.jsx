import React, { lazy } from "react";
import styles from "../dictionary.module.css"
import StarIcon from "../../../components/starIcon";
import ReturnIcon from "../../../components/returnIcon";

import RandomIcon from "../../../components/randomIcon";
const Button = lazy(() => import("../../../components/button/button"));

const COLORS = ["#EA4C89", "#186CBA", "#EE5900", "#9069CD", "#B23232", "#DB9509", "#619F09"];



const getRandomColor = (excludedColors = []) => {
  const availableColors = COLORS.filter((color) => !excludedColors.includes(color));
  const randomIndex = Math.floor(Math.random() * availableColors.length);
  return availableColors[randomIndex];
};


const BlockView = ({ onBack, onNext, selectedModule, setView }) => {

  const topColor = getRandomColor();
  const bottomColor = getRandomColor([topColor]);

  return (
    <div className={`${styles.blockView} ${styles.height}`} >
      <div className={styles.titles}>
        <h2>СЛОВАРЬ</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <Button onClick={onBack} svgLeft={
            <ReturnIcon />
          } className="border" />
          <h4>{selectedModule && selectedModule.name}</h4>
          <Button svgLeft={<RandomIcon color="#B0D8FE" />} className="border"  onClick={() => setView("random")}/>
        </div>

        <div className={styles.center}>
          {selectedModule?.blocks.map((mod) => {
            const btnColor = getRandomColor([topColor, bottomColor]);

            return (
              <Button
                key={mod.id}
                onClick={() => onNext(mod)}
                className=""
                value={mod.name}
                style={{ borderColor: btnColor, color: "var(--text_color_dark_primary)" }}
                svgRight={<StarIcon />}
              />
            );
          })}
        </div>
      </div>
    </div >
  )
}


export default BlockView;
