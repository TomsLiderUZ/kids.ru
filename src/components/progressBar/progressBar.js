import React from 'react';
import styles from "./menuBar.module.css"

const ProgressBar = ({ currentStep, totalSteps, progressText }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className={styles.progress_wrapper}>
      <div className={styles.progress_bar_bg}>
        <div
          className={styles.progress_bar_fill}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      {
        progressText && <div className={styles.progress_text}>
          {currentStep}/{totalSteps}
        </div>
      }
    </div>
  );
};

export default ProgressBar;
