import React, { lazy, useState } from "react";
import styles from "../dictionary.module.css";
import ReturnIcon from "../../../components/returnIcon";
import Rating from "../../../components/rating/rating"; 
import Title from "../../../components/title/title";

const Button = lazy(() => import("../../../components/button/button"));

const Random = ({ onBack, setView, words = [] }) => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [animationDirection, setAnimationDirection] = useState("");

    const handleFlip = () => setFlipped(!flipped);

    const handleNext = (direction) => {
        setAnimationDirection(direction);
        setTimeout(() => {
            setFlipped(false);
            setCurrentIndex((prev) => (prev + 1) % words.length);
            setAnimationDirection("");
        }, 300);
    };

    const currentWord = words[currentIndex];

    return (
        <div className={`${styles.moduleView} ${styles.height} ${styles.random}`}>
            <Rating notStar={true} />

            <div className={styles.container}>
                <div className={styles.header}>
                    <Button onClick={onBack} svgLeft={<ReturnIcon />} className="border" />
                    <Button onClick={() => (setView("course"))} svgLeft={<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.6377 6.79297H21.5617C22.3897 6.79297 23.0617 6.12197 23.0617 5.29297C23.0617 4.46397 22.3897 3.79297 21.5617 3.79297H8.6377C7.8097 3.79297 7.1377 4.46397 7.1377 5.29297C7.1377 6.12197 7.8097 6.79297 8.6377 6.79297Z" fill="#B0D8FE" />
                        <path d="M21.5617 10.5H8.6377C7.8097 10.5 7.1377 11.171 7.1377 12C7.1377 12.829 7.8097 13.5 8.6377 13.5H21.5617C22.3897 13.5 23.0617 12.829 23.0617 12C23.0617 11.171 22.3897 10.5 21.5617 10.5Z" fill="#B0D8FE" />
                        <path d="M3.19852 3.14062C1.84152 3.14062 1.06152 3.92462 1.06152 5.29162C1.06152 6.65862 1.84052 7.44362 3.19852 7.44362C4.55652 7.44362 5.33552 6.65962 5.33552 5.29162C5.33552 3.92362 4.55652 3.14062 3.19852 3.14062Z" fill="#B0D8FE" />
                        <path d="M3.19852 14.1517C4.37876 14.1517 5.33552 13.1882 5.33552 11.9997C5.33552 10.8111 4.37876 9.84766 3.19852 9.84766C2.01829 9.84766 1.06152 10.8111 1.06152 11.9997C1.06152 13.1882 2.01829 14.1517 3.19852 14.1517Z" fill="#B0D8FE" />
                        <path d="M3.19852 16.5566C1.84152 16.5566 1.06152 17.3406 1.06152 18.7086C1.06152 20.0766 1.84052 20.8596 3.19852 20.8596C4.55652 20.8596 5.33552 20.0756 5.33552 18.7086C5.33552 17.3416 4.55652 16.5566 3.19852 16.5566Z" fill="#B0D8FE" />
                        <path d="M21.5617 17.207H8.6377C7.8097 17.207 7.1377 17.878 7.1377 18.707C7.1377 19.536 7.8097 20.207 8.6377 20.207H21.5617C22.3897 20.207 23.0617 19.536 23.0617 18.707C23.0617 17.878 22.3897 17.207 21.5617 17.207Z" fill="#B0D8FE" />
                    </svg>
                    } className="border" />
                </div>

                <div className={styles.centerRandom}>

                    <div
                        className={`${styles.cardWrapper} ${flipped ? styles.flipped : ""} ${animationDirection === "left" ? styles.slideLeft : ""} ${animationDirection === "right" ? styles.slideRight : ""}`}
                        onClick={(e) => {
                            if (e.target.closest(".title")) return;
                            handleFlip();
                        }}
                    >
                        <div className={styles.card}>
                            <div className={styles.cardFront}>
                                <p>Tarjimani ko‘rish uchun bosing</p>
                                <Title className="title" text={currentWord?.ru} />
                            </div>
                            <div className={styles.cardBack}>
                                <p>Нажмите, чтобы увидеть перевод</p>
                                <Title voice={true} className="title" text={currentWord?.uz} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <Button
                        svgLeft={<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.663987 7.29289C0.273463 7.68342 0.273463 8.31658 0.663987 8.70711L7.02795 15.0711C7.41847 15.4616 8.05164 15.4616 8.44216 15.0711C8.83269 14.6805 8.83269 14.0474 8.44216 13.6569L2.78531 8L8.44216 2.34315C8.83269 1.95262 8.83269 1.31946 8.44216 0.928933C8.05164 0.538409 7.41847 0.538408 7.02795 0.928933L0.663987 7.29289ZM16.752 9C17.3043 9 17.752 8.55229 17.752 8C17.752 7.44772 17.3043 7 16.752 7L16.752 9ZM1.37109 9L16.752 9L16.752 7L1.37109 7L1.37109 9Z" fill="#EE5900" />
                        </svg>
                        }
                        value="Я не знаю" className="red" onClick={() => handleNext("left")} />
                    <Button value="Я знаю" className="green" onClick={() => handleNext("right")}

                        svgRight={<svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.37109 7C0.818809 7 0.371094 7.44772 0.371094 8C0.371094 8.55228 0.818809 9 1.37109 9L1.37109 7ZM17.4592 8.70711C17.8497 8.31658 17.8497 7.68342 17.4592 7.29289L11.0952 0.928933C10.7047 0.538409 10.0715 0.538409 9.68098 0.928933C9.29045 1.31946 9.29045 1.95262 9.68098 2.34315L15.3378 8L9.68098 13.6569C9.29045 14.0474 9.29045 14.6805 9.68098 15.0711C10.0715 15.4616 10.7047 15.4616 11.0952 15.0711L17.4592 8.70711ZM1.37109 9L16.752 9L16.752 7L1.37109 7L1.37109 9Z" fill="#619F09" />
                        </svg>
                        } />
                </div>
            </div>
        </div>
    );
};

export default Random;
