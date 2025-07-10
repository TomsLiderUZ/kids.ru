import React, { lazy } from "react";
import styles from "../dictionary.module.css";
import RandomIcon from "../../../components/randomIcon";
import ReturnIcon from "../../../components/returnIcon";
import { vocabularyData } from "../../../data/data";
import { useGlobalContext } from "../../../context/globalContext";

const Button = lazy(() => import("../../../components/button/button"));

const CourseView = ({ onNext, onKnown, onUnknown, course, onBack, setView, setRandomWords }) => {
  const { isUz } = useGlobalContext();

  const handleRandomAll = () => {
    const allWords =
      vocabularyData[0]?.modules
        ?.flatMap((m) => m.blocks)
        ?.flatMap((b) => b.lessons)
        ?.flatMap((l) => l.words) || [];

    setRandomWords(allWords);
    setView("random");
  };

  return (
    <div className={`${styles.height}`}>
      <div className={styles.titles}>
        <h2>{isUz ? "LUG‘AT" : "СЛОВАРЬ"}</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <Button onClick={onBack} svgLeft={<ReturnIcon />} className="border" />
          <h4>{isUz ? "Ro‘yxat" : "Список"}</h4>
          <Button svgLeft={<RandomIcon color="#B0D8FE" />} className="border" onClick={handleRandomAll} />
        </div>
        <div className={styles.center}>
          <div className={styles.top}>
            <Button
              onClick={() => onNext(course)}
              className="border"
              value={isUz ? "Kurs" : "Курс"}
              svgRight={<RandomIcon />}
            />
          </div>

          <Button
            onClick={onKnown}
            className="green"
            value={isUz ? "Men bilaman" : "Я знаю"}
            svgRight={<RandomIcon />}
          />
          <Button
            onClick={onUnknown}
            className="red"
            value={isUz ? "Men bilmayman" : "Я не знаю"}
            svgRight={<RandomIcon />}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseView;
