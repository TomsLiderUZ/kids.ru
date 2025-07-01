import React, { lazy } from "react";
import styles from "../dictionary.module.css"
import StarIcon from "../../../components/starIcon";
import RandomIcon from "../../../components/randomIcon";
import ReturnIcon from "../../../components/returnIcon";
const Button = lazy(() => import("../../../components/button/button"));


const WordListView = ({ onBack, onNext, selectedLesson, setView }) => {

  return (

    <div className={`${styles.lessonView} ${styles.wordListView}  ${styles.height}`}>
      <div className={styles.titles}>
        <h2>СЛОВАРЬ</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <Button onClick={onBack} svgLeft={<ReturnIcon />
          } className="border" />
          <h4> {selectedLesson?.lesson} - {selectedLesson?.name}</h4>
          <Button svgLeft={
            <RandomIcon color="#B0D8FE" />
          } className="border"
            onClick={() => setView("random")} />
        </div>
        <div className={styles.center}>
          {selectedLesson?.words.map((mod, index) => (
            <Button key={index} onClick={() => onNext(mod)} className="" value={<h4>{mod.ru} <span>{mod.uz}</span></h4>} svgRight={<StarIcon />
            } />
          ))}
        </div>
      </div>
    </div>
  )
};

export default WordListView;
