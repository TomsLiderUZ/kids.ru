import React, { lazy } from "react";
import styles from "../dictionary.module.css";
import StarIcon from "../../../components/starIcon";
import RandomIcon from "../../../components/randomIcon";
import ReturnIcon from "../../../components/returnIcon";
import { useGlobalContext } from "../../../context/globalContext";

const Button = lazy(() => import("../../../components/button/button"));

const ModuleView = ({ modules, onBack, onNext, setView }) => {
  const { isUz } = useGlobalContext();

  return (
    <div className={`${styles.moduleView} ${styles.height}`}>
      <div className={styles.titles}>
        <h2>{isUz ? "LUG‘AT" : "СЛОВАРЬ"}</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <Button onClick={onBack} svgLeft={<ReturnIcon />} className="border" />
          <h4>{isUz ? "Kurs" : "Курс"}</h4>
          <Button
            svgLeft={<RandomIcon color="#B0D8FE" />}
            className="border"
            onClick={() => setView("random")}
          />
        </div>
        <div className={styles.center}>
          {modules.map((mod) => (
            <Button
              key={mod.id}
              onClick={() => onNext(mod)}
              className=""
              value={mod.name}
              svgRight={<StarIcon />}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleView;
