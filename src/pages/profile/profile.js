import React, { lazy, useState } from "react";
import styles from "./profile.module.css";
import Menu from "../../components/menu/menu";
import CalendarCard from "./calendar";
import Button from "../../components/button/button";
import { useGlobalContext } from "../../context/globalContext";

const Settings = lazy(() => import("./settings"));

const Profile = React.memo(() => {
  const [openSettings, setOpenSettings] = useState(false);
  const [openEditing, setOpenEditing] = useState(false);
  const [date, setDay] = useState("");
  const { onPaid, setOnPaid, isUz } = useGlobalContext();

  const uzDays = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];
  const ruDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  const [data, setData] = useState({
    name: localStorage.getItem("user"),
    age: 8,
    day: 2,
    lessons: 2,
    word: 10,
    streakData: Array.from({ length: 7 }, (_, i) => ({
      id: i + 1,
      day: isUz ? uzDays[i] : ruDays[i],
      done: i < 2, // faqat birinchi 2 kun true, qolganlari false
    })),
    activeDays: ["2025-06-01", "2025-06-02"],
  });

  const handleButtonClick = () => {
    setOpenSettings(true);
  };

  const handleSaveName = () => {
    const nameInput = document.querySelector('input[type="text"]');
    const ageInput = document.querySelector('input[type="number"]');
    const newName = nameInput.value;
    const newAge = ageInput.value;
    setData((prevData) => ({
      ...prevData,
      name: newName,
      age: newAge,
    }));
    localStorage.setItem("user", newName);
    setOpenEditing(false);
  };

  return (
    <>
      <div className={styles.Profile}>
        {!openSettings && !openEditing && (
          <>
            <div className={styles.picture}>
              <div className={styles.imgWrapper}>
                <img src="/assets/images/boy.jpg" alt="" />
              </div>
              <p className={styles.name}>{data.name}</p>
              <p className={styles.age}>
                {data.age} {isUz ? "yosh" : "лет"}
              </p>
            </div>
            <div className={styles.buttons}>
              <button
                className={styles.editButton}
                onClick={() => setOpenEditing(true)}
              >
                {isUz ? "Tahrirlash" : "Редактировать"}{" "}
                <img src="/assets/images/editIcon.svg" alt="" />
              </button>
              <button
                className={styles.settingsButton}
                onClick={handleButtonClick}
              >
                <img src="/assets/images/settingsIcon.svg" alt="" />
              </button>
            </div>

            <div className={styles.statsCards}>
              <div className={styles.flex}>
                <div className={`${styles.card} ${styles.green}`}>
                  <p className={styles.label}>{isUz ? "Kunlar" : "Дней"}</p>
                  <div className={styles.cardContent}>
                    <p>{data.day}</p>
                  </div>
                </div>
                <div className={`${styles.card} ${styles.purple}`}>
                  <p className={styles.label}>{isUz ? "Darslar" : "Уроков"}</p>
                  <div className={styles.cardContent}>
                    <p>{data.lessons}</p>
                  </div>
                </div>
                <div className={`${styles.card} ${styles.blue}`}>
                  <p className={styles.label}>{isUz ? "So'zlar" : "Слов"}</p>
                  <div className={styles.cardContent}>
                    <p>{data.lessons}</p>
                  </div>
                </div>
              </div>

              <div
                className={`${styles.card} ${styles.streakCard} ${styles.orange}`}
              >
                <div className={`${styles.label} ${styles.flex}`}>
                  <p>{isUz ? "Ketma-ketlik rejimi" : "Ударный режим"}</p>
                  <img src="/assets/images/Fire.png" alt="" />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.title}>
                    {isUz
                      ? `${data.day} kun ketma-ket`
                      : `${data.day} дня подряд`}
                  </div>
                  <ul className={styles.flex}>
                    {data.streakData.map((item) => (
                      <li key={item.id}>
                        <span>{item.day}</span>
                        <br />
                        <label className={styles.checkboxWrapper}>
                          <input type="checkbox" checked={item.done} readOnly />
                          <span className={styles.customCheckbox}></span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div
                className={`${styles.card} ${styles.streakCard} ${styles.aqua}`}
              >
                <div className={`${styles.label} ${styles.flex}`}>
                  <span>{isUz ? "Kalendar" : "Календарь"}</span>
                  <span>{date}</span>
                </div>
                <div className={styles.cardContent}>
                  <CalendarCard day={setDay} active={data.activeDays} />
                </div>
              </div>

              <div
                className={`${styles.card} ${styles.streakCard} ${styles.aqua}`}
              >
                <div className={`${styles.label} ${styles.flex}`}>
                  <span>{isUz ? "Yutuqlar" : "Достижения"}</span>
                </div>
                <div className={`${styles.cardContent} ${styles.flex}`}>
                  <div className={styles.flex}>
                    <div className={`${styles.card} ${styles.aqua}`}>
                      <div className={styles.label}>1/4</div>
                      <div className={`${styles.cardContent} ${styles.pink}`}>
                        <img src="/assets/images/Handshake.png" alt="" />
                      </div>
                    </div>
                    <div className={`${styles.card} ${styles.aqua}`}>
                      <div className={styles.label}>1/4</div>
                      <div className={`${styles.cardContent} ${styles.pink}`}>
                        <img src="/assets/images/Chat.png" alt="" />
                      </div>
                    </div>
                    <div
                      className={`${styles.card} ${styles.aqua} ${styles.disable}`}
                    >
                      <div className={styles.label}>1/4</div>
                      <div className={`${styles.cardContent} ${styles.pink}`}>
                        <img src="/assets/images/people.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {openEditing && (
          <form>
            <div className={styles.picture}>
              <div className={styles.name}>
                {isUz ? "Tahrirlash" : "РЕДАКТИРОВАТЬ"}
              </div>
            </div>
            <div style={{ marginTop: "27px" }} className={styles.imgWrapper}>
              <img src="/assets/images/boy.jpg" alt="" />
            </div>
            <div className={styles.inputs}>
              <div className={styles.inputWrapper}>
                <p>{isUz ? "Ismingizni kiriting:" : "Укажите имя:"}</p>
                <input type="text" defaultValue={data.name} />
              </div>
              <div className={styles.inputWrapper}>
                <p>{isUz ? "Yoshingizni kiriting:" : "Укажите возраст:"}</p>
                <input
                  type="number"
                  min={1}
                  max={100000000000}
                  defaultValue={data.age}
                />
              </div>
            </div>
            <div className={styles.button}>
              <Button
                value={isUz ? "SAQLASH" : "СОХРАНИТЬ"}
                className="blue"
                onClick={handleSaveName}
              />
            </div>
          </form>
        )}

        {openSettings && <Settings />}
      </div>
      <Menu />
    </>
  );
});

export default Profile;
