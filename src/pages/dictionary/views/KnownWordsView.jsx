import React, { lazy } from "react";
import { knownWords } from "../../../data/data";
import styles from "../dictionary.module.css"
import StarIcon from "../../../components/starIcon";

import RandomIcon from "../../../components/randomIcon";
import ReturnIcon from "../../../components/returnIcon";
const Button = lazy(() => import("../../../components/button/button"));



const KnownWordsView = ({ onBack, setView, setRandomWords }) => {
  return (

    <div className={`${styles.lessonView} ${styles.iknow}  ${styles.height}`}>
      <div className={styles.titles}>
        <h2>СЛОВАРЬ</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <Button onClick={onBack} svgLeft={<ReturnIcon />
          } className="border" />
          <h4>Я знаю</h4>
          <Button svgLeft={
            <RandomIcon color="#B0D8FE" />
          } className="border" onClick={() => setView("random")} />
        </div>
        <div className={styles.center}>
          {knownWords.map((mod, index) => (
            <Button key={index} onClick={() => {
              setRandomWords(knownWords);
              setView("random");
            }} className="" value={<h4>{mod.ru} <span>{mod.uz}</span></h4>} svgRight={<StarIcon />
            } />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnownWordsView;
