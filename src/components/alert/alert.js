import React from "react";
import styles from "./alert.module.css";
import Button from "../button/button";

const Alert = React.memo(({ wrong, correctText, onClick, setAlertHandler, setActiveButton, onRepeat }) => {
    return (
        <>
            <div className={styles.backgroundAlert} onClick={() => {
                setAlertHandler(false)
                setActiveButton(null)
            }}></div>
            <div className={`${styles.alert} ${wrong ? styles.wrong : undefined}`}>
                <div className={styles.title}>
                    {wrong ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_691_8598)">
                            <path d="M9.51172 19.3789C4.26501 19.3789 0.0117188 15.1256 0.0117188 9.87891C0.0117188 4.6322 4.26501 0.378906 9.51172 0.378906C14.7584 0.378906 19.0117 4.6322 19.0117 9.87891C19.0117 15.1256 14.7584 19.3789 9.51172 19.3789Z" fill="#EC292C" />
                            <path d="M7.45256 5.95745L13.4346 11.9395C13.9491 12.454 13.9491 13.2882 13.4346 13.8027C12.9201 14.3172 12.0859 14.3172 11.5713 13.8027L5.58931 7.8207C5.07479 7.30618 5.07479 6.47197 5.58931 5.95745C6.10383 5.44292 6.93804 5.44292 7.45256 5.95745Z" fill="white" />
                            <path d="M5.58928 11.9371L11.5713 5.95506C12.0858 5.44054 12.92 5.44054 13.4346 5.95506C13.9491 6.46959 13.9491 7.30379 13.4346 7.81832L7.45253 13.8003C6.93801 14.3149 6.10381 14.3149 5.58928 13.8003C5.07476 13.2858 5.07476 12.4516 5.58928 11.9371Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_691_8598">
                                <rect width="19" height="19" fill="white" transform="matrix(-1 0 0 1 19.0117 0.378906)" />
                            </clipPath>
                        </defs>
                    </svg>
                        :
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_691_8566)">
                                <path d="M9.91504 19.8828C15.1617 19.8828 19.415 15.6295 19.415 10.3828C19.415 5.13611 15.1617 0.882812 9.91504 0.882812C4.66833 0.882812 0.415039 5.13611 0.415039 10.3828C0.415039 15.6295 4.66833 19.8828 9.91504 19.8828Z" fill="#58A700" />
                                <path d="M12.6161 7.1788L8.0742 11.7207C7.55968 12.2352 7.55968 13.0694 8.0742 13.584C8.58873 14.0985 9.42293 14.0985 9.93746 13.584L14.4794 9.04205C14.9939 8.52752 14.9939 7.69332 14.4794 7.1788C13.9649 6.66427 13.1306 6.66427 12.6161 7.1788Z" fill="white" />
                                <path d="M5.34995 10.8578L8.07619 13.584C8.59071 14.0985 9.42491 14.0985 9.93944 13.584C10.454 13.0695 10.454 12.2353 9.93944 11.7207L7.21321 8.99452C6.69868 8.47999 5.86448 8.47999 5.34995 8.99452C4.83543 9.50904 4.83543 10.3432 5.34995 10.8578Z" fill="white" />
                            </g>
                            <defs>
                                <clipPath id="clip0_691_8566">
                                    <rect width="19" height="19" fill="white" transform="translate(0.415039 0.882812)" />
                                </clipPath>
                            </defs>
                        </svg>}

                    <h3>{wrong ? "НЕВЕРНО" : "ПРАВИЛЬНО!"}</h3>
                </div>
                {correctText &&
                    <div className={styles.correctAnswer}>
                        <h4>Правильный ответ:</h4>
                        <p>Слово или фраза, из карточки 1</p>
                    </div>}
                <Button value={wrong ? "ПОВТОРИТЬ" : "ПРОДОЛЖИТЬ"} className={wrong ? "red" : "green"} onClick={wrong ? onRepeat : onClick} />
            </div >
        </>
    );
});

export default Alert;