import React from "react";
import { unknownWords } from "../../../data/data";
import Button from "../../../components/button/button";
import RandomIcon from "../../../components/randomIcon";
import styles from "../dictionary.module.css";
import ReturnIcon from "../../../components/returnIcon";
import StarIcon from "../../../components/starIcon";
import { useGlobalContext } from "../../../context/globalContext";

const UnknownWordsView = ({ onBack, setRandomWords, setView }) => {
  const { isUz } = useGlobalContext();

  return (
    <div className={`${styles.lessonView} ${styles.dontNow} ${styles.height}`}>
      <div className={styles.titles}>
        <h2>{isUz ? "LUG‘AT" : "СЛОВАРЬ"}</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <Button onClick={onBack} svgLeft={<ReturnIcon />} className="border" />
          <h4>{isUz ? "Men bilmayman" : "Я не знаю"}</h4>
          <Button
            svgLeft={<RandomIcon color="#B0D8FE" />}
            className="border"
            onClick={() => setView("random")}
          />
        </div>
        <div className={styles.center}>
          {unknownWords.map((mod, index) => (
            <Button
              key={index}
              onClick={() => {
                setRandomWords(unknownWords);
                setView("random");
              }}
              className=""
              value={
                <h4>
                  {isUz ? mod.uz : mod.ru} <span>{isUz ? mod.ru : mod.uz}</span>
                </h4>
              }
              svgRight={<StarIcon />}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnknownWordsView;
