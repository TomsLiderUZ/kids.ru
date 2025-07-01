import React, { useEffect, lazy, useState, useRef } from "react";
import styles from "./home.module.css";
import Button from "../../components/button/button";
import { Link } from "react-router-dom";
import GameResultCard from "../../components/gameResultCard/gameResultCard";
import Modal from "./modal";

const Menu = lazy(() => import("../../components/menu/menu"));

const Home = () => {
  const [showExtraGames, setShowExtraGames] = useState(false);
  const homeRef = useRef(null);

  const block1 = [
    {
      id: 1,
      name: "БЛОК 1. «ЗНАКОМСТВО»",
      lessons: [
        {
          id: 1,
          title: "Урок 1. «Приветствия»",
          games: ["ИГРА 1", "ИГРА 2", "ИГРА 3", "ИГРА 4"],
        },
        {
          id: 2,
          title: "Урок 2. «Ты или вы? Как здороваться правильно!»",
          games: ["ИГРА 1", "ИГРА 2", "ИГРА 3", "ИГРА 4"],
        },
        {
          id: 3,
          title: "Урок 3. «Как тебя зовут?»",
          games: ["ИГРА 1", "ИГРА 2", "ИГРА 3", "ИГРА 4"],
        },
      ],
    },
  ];

  const block2 = [
    {
      id: 1,
      name: "БЛОК 1. «ЗНАКОМСТВО»",
      lessons: [
        {
          id: 4,
          title: "Урок 4. «Познакомимся!»",
          games: ["ИГРА 1", "ИГРА 2", "ИГРА 3", "ИГРА 4"],
        },
        {
          id: 5,
          title: "Урок 5. «Первый диалог»",
          games: ["ИГРА 1", "ИГРА 2", "ИГРА 3", "ИГРА 4"],
        },
        {
          id: 6,
          title: "Урок 6. «Повторяем знакомство»",
          games: ["ИГРА 1", "ИГРА 2", "ИГРА 3", "ИГРА 4"],
        },
      ],
    },
  ];

  useEffect(() => {
    const videoElement = document.querySelector("video");
    if (videoElement) {
      videoElement.setAttribute("playsinline", "true");
    }
  }, []);

  return (
    <div className={styles.home}>
      <div
        className={styles.container}
        ref={homeRef}
        style={{ height: showExtraGames ? "1700px" : "1900px" }}
      >
        <div className={styles.bg}>
          <img src="/assets/images/home-bg2.svg" alt="" draggable="false" />

          {!showExtraGames && (
            <div className={styles.animation}>
              <video autoPlay muted loop playsInline>
                <source src="/assets/video/home.mp4" type="video/mp4" />
                <source src="/assets/video/home.webm" type="video/webm" />
              </video>
            </div>
          )}

          {(showExtraGames ? block2 : block1).map((block, index) => (
            <div key={index} className={styles.full}>
              {!showExtraGames ? (
                <div className={styles.titleCard}>
                  <h1 className={styles.blockTitle}>{block.name}</h1>
                </div>
              ) : (
                <div className={styles.previousButton}>
                  <p>
                    Чтобы вернуться к предыдущим <br /> урокам, нажмите на
                    кнопку
                  </p>
                  <Button
                    onClick={() => setShowExtraGames(false)}
                    className="blue"
                    value="ВЕРНУТЬСЯ"
                    svgLeft={
                      <svg
                        width="28"
                        height="15"
                        viewBox="0 0 28 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M26.1082 6.39062C26.6604 6.39062 27.1082 6.83834 27.1082 7.39062C27.1082 7.94291 26.6604 8.39062 26.1082 8.39062V6.39062ZM0.401047 8.09773C0.0105228 7.70721 0.0105228 7.07404 0.401047 6.68352L6.76501 0.319557C7.15553 -0.0709672 7.7887 -0.0709672 8.17922 0.319557C8.56975 0.710082 8.56975 1.34325 8.17922 1.73377L2.52237 7.39062L8.17922 13.0475C8.56975 13.438 8.56975 14.0712 8.17922 14.4617C7.7887 14.8522 7.15553 14.8522 6.76501 14.4617L0.401047 8.09773ZM26.1082 8.39062H1.10815V6.39062H26.1082V8.39062Z"
                          fill="white"
                        />
                      </svg>
                    }
                  />
                </div>
              )}
              {block.lessons.map((lesson) => (
                <div key={lesson.id} className={styles.lessons}>
                  <div className={styles.lessonsTitle}>
                    <h2>{lesson.title}</h2>
                  </div>
                  <div className={styles.games}>
                    {lesson.games.map((game, index) => (
                      <div className={styles.buttonShadow} key={index}>
                        <Link
                          key={index}
                          to={`/games/${lesson.id}.${index}`}
                          className={styles.gameBtn}
                        >
                          {game}
                        </Link>
                        <svg
                          width="69"
                          height="37"
                          viewBox="0 0 69 37"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M34.07 36.1908C52.8863 36.1908 68.14 28.1006 68.14 18.1208C68.14 8.141 52.8863 0.0507812 34.07 0.0507812C15.2537 0.0507812 0 8.141 0 18.1208C0 28.1006 15.2537 36.1908 34.07 36.1908Z"
                            fill="#C1D353"
                          />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div
          className={styles.river}
          style={{ right: showExtraGames ? "-40px" : "0" }}
        >
          <img src="/assets/images/river1-right.svg" alt="" />
        </div>
        <div className={`${styles.river} ${styles.river2}`}>
          <img src="/assets/images/river1-left.svg" alt="" />
        </div>
        <div className={styles.bush}>
          <img src="/assets/images/bush1-left.svg" alt="" />
        </div>
        <div
          className={styles.footer}
          style={{ top: showExtraGames ? "1450px" : "1640px" }}
        >
          <p>
            Пройдите уроки выше, чтобы перейти <br />к следующим урокам{" "}
          </p>
          <Button
            onClick={() => {
              setShowExtraGames(true);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            value="ПЕРЕЙТИ"
            svgRight={
              <svg
                width="27"
                height="16"
                viewBox="0 0 27 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 7C0.447715 7 0 7.44772 0 8C0 8.55228 0.447715 9 1 9V7ZM26.7071 8.70711C27.0976 8.31658 27.0976 7.68342 26.7071 7.29289L20.3431 0.928932C19.9526 0.538408 19.3195 0.538408 18.9289 0.928932C18.5384 1.31946 18.5384 1.95262 18.9289 2.34315L24.5858 8L18.9289 13.6569C18.5384 14.0474 18.5384 14.6805 18.9289 15.0711C19.3195 15.4616 19.9526 15.4616 20.3431 15.0711L26.7071 8.70711ZM1 9H26V7H1V9Z"
                  fill="#D4DEEB"
                />
              </svg>
            }
          />
        </div>
        {/* <Modal /> */}
      </div>
      <Menu />
    </div>
  );
};

export default Home;
