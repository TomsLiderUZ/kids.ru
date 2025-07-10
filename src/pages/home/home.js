import React, { useEffect, lazy, useState } from "react";
import styles from "./home.module.css";
import Button from "../../components/button/button";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./modal";
import { useGlobalContext } from "../../context/globalContext";

const Menu = lazy(() => import("../../components/menu/menu")); 

const Home = () => {
  const [showExtraGames, setShowExtraGames] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { onPaid, setOnPaid, isUz } = useGlobalContext();

  useEffect(() => {
    const videoElement = document.querySelector("video");
    if (videoElement) {
      videoElement.setAttribute("playsinline", "true");
    }

    if (window.location.hash === "#block2") {
      setShowExtraGames(true);
    }
  }, []);

  const block1 = [
    {
      id: 1,
      name: isUz ? "1-BLOK. «TANISHUV»" : "БЛОК 1. «ЗНАКОМСТВО»",
      lessons: [
        {
          id: 1,
          title: isUz ? "1-dars. «Salomlashuvlar»" : "Урок 1. «Приветствия»",
          games: isUz ? ["1-o'yin", "2-o'yin", "3-o'yin", "4-o'yin"] : ["ИГРА 1", "ИГРА 2", "ИГРА 3", "ИГРА 4"],
        },
        {
          id: 2,
          title: isUz ? "2-dars. «Siz yoki sen? Qanday salomlashish kerak!»" : "Урок 2. «Ты или вы? Как здороваться правильно!»",
          games: isUz ? ["1-o'yin", "2-o'yin", "3-o'yin", "4-o'yin"] : ["ИГРА 1", "ИГРА 2", "ИГРА 3", "ИГРА 4"],
        },
        {
          id: 3,
          title: isUz ? "3-dars. «Isming nima?»" : "Урок 3. «Как тебя зовут?»",
          games: isUz ? ["1-o'yin", "2-o'yin", "3-o'yin", "4-o'yin"] : ["ИГРА 1", "ИГРА 2", "ИГРА 3", "ИГРА 4"],
        },
      ],
    },
  ];

  const block2 = [
    {
      id: 1,
      name: isUz ? "1-BLOK. «TANISHUV»" : "БЛОК 1. «ЗНАКОМСТВО»",
      lessons: [
        {
          id: 4,
          title: isUz ? "4-dars. «Keling, tanishamiz!»" : "Урок 4. «Познакомимся!»",
          games: isUz ? ["1-o'yin", "2-o'yin", "3-o'yin", "4-o'yin"] : ["ИГРА 1", "ИГРА 2", "ИГРА 3", "ИГРА 4"],
        },
        {
          id: 5,
          title: isUz ? "5-dars. «Birinchi suhbat»" : "Урок 5. «Первый диалог»",
          games: isUz ? ["1-o'yin", "2-o'yin", "3-o'yin", "4-o'yin"] : ["ИГРА 1", "ИГРА 2", "ИГРА 3", "ИГРА 4"],
        },
        {
          id: 6,
          title: isUz ? "6-dars. «Tanishuvni takrorlaymiz»" : "Урок 6. «Повторяем знакомство»",
          games: isUz ? ["1-o'yin", "2-o'yin", "3-o'yin", "4-o'yin"] : ["ИГРА 1", "ИГРА 2", "ИГРА 3", "ИГРА 4"],
        },
      ],
    },
  ];

  const toNavigate = (id, index) => {
    if (Number(id) !== 1) {
      if (onPaid) {
        navigate(`/games/${id}.${index}`);
        setOpenModal(false);
      } else {
        setOpenModal(true);
      }
    } else {
      navigate(`/games/${id}.${index}`);
    }
  };

  return (
    <div className={styles.home}>
      <div
        className={styles.container}
        style={{ height: showExtraGames ? "1700px" : "1900px" }}
      >
        <div className={styles.bg}>
          <img src="/assets/images/home-bg2.svg" alt="" draggable="false" />

          {!showExtraGames && (
            <div className={styles.animation}>
              <img
                className={styles.animationImg}
                src="/assets/video/home.gif"
                alt="Animated gif"
              />
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
                    {isUz
                      ? "Oldingi darslarga qaytish uchun\ndugmani bosing"
                      : "Чтобы вернуться к предыдущим\nурокам, нажмите на кнопку"}
                  </p>
                  <Button
                    onClick={() => {
                      setShowExtraGames(false);
                    }}
                    className="blue"
                    value={isUz ? "QAYTISH" : "ВЕРНУТЬСЯ"}
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
                          onClick={(e) => {
                            e.preventDefault();
                            toNavigate(lesson.id, index);
                          }}
                          className={styles.gameBtn}
                        >
                          {onPaid || lesson.id === 1 ? (
                            game
                          ) : (
                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none">
                              <path
                                d="M17.572 7.64947V6.52212C17.572 3.46156 14.438 0.980469 10.572 0.980469C6.706 0.980469 3.57203 3.46156 3.57203 6.52212V7.64947C1.75205 8.27829 0.574646 9.7001 0.572021 11.2721V16.0221C0.575303 18.2072 2.81195 19.9779 5.572 19.9805H15.572C18.332 19.9779 20.5687 18.2072 20.572 16.0221V11.2721C20.5694 9.7001 19.392 8.27829 17.572 7.64947ZM11.572 14.4388C11.572 14.876 11.1243 15.2305 10.572 15.2305C10.0197 15.2305 9.57203 14.876 9.57203 14.4388V12.8555C9.57203 12.4182 10.0197 12.0638 10.572 12.0638C11.1243 12.0638 11.572 12.4182 11.572 12.8555V14.4388ZM15.572 7.31381H5.572V6.52216C5.572 4.33605 7.81056 2.56381 10.572 2.56381C13.3335 2.56381 15.572 4.33601 15.572 6.52216V7.31381Z"
                                fill="#BABABA"
                              />
                            </svg>
                          )}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.footer} style={{ top: showExtraGames ? "1450px" : "1640px" }}>
          <p>
            {isUz
              ? "Keyingi darslarga o‘tish uchun\nyuqoridagi darslarni yakunlang"
              : "Пройдите уроки выше, чтобы перейти\nк следующим урокам"}
          </p>
          <Button
            onClick={() => {
              setShowExtraGames(true);
              window.location.hash = "#block2";
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            value={isUz ? "O‘TISH" : "ПЕРЕЙТИ"}
          />
        </div>

        {openModal && <Modal setOpenModal={setOpenModal} setOnPaid={setOnPaid} />}
      </div>
      <Menu />
    </div>
  );
};

export default Home;
