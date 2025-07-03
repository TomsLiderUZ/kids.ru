import React, { useState } from 'react'
import styles from "./profile.module.css"

const Settings = () => {
  const [sound, setSound] = useState(true)
  const [vibration, setVibration] = useState(true)
  const [language, setLanguage] = useState("russian")

  const toggleSound = () => {
    setSound(prev => !prev)
  }

  const toggleVibration = () => {
    setVibration(prev => !prev)
  }

  const toggleLanguage = () => {
    setLanguage(prev => {
      if (prev === "russian") {
        return "english"
      } else {
        return "russian"
      }
    })
  }

  return (
    <div className={styles.Settings}>
      <div className={styles.picture}><div className={styles.name}>НАСТРОЙКИ</div></div>
      <div className={styles.settingsButtons}>
        <div className={styles.settingsItem}>
          <div className={styles.flex}>
            <img src="/assets/images/sound.svg" alt="" />
            <p>Звук</p>
          </div>
          <div className={`${styles.switchButton} ${!sound ? styles.switchOff : ""}`} onClick={toggleSound}>
            <div className={styles.switchIndicator}>{sound ? "ON" : "OFF"}</div>
          </div>
        </div>
        <div className={styles.settingsItem}>
          <div className={styles.flex}>
            <img src="/assets/images/sound.svg" alt="" />
            <p>Вибрация</p>
          </div>
          <div className={`${styles.switchButton} ${!vibration ? styles.switchOff : ""}`} onClick={toggleVibration}>
            <div className={styles.switchIndicator}>{vibration ? "ON" : "OFF"}</div>
          </div>
        </div>
        <div className={styles.settingsItem}>
          <div className={styles.flex}>
            <img src="/assets/images/sound.svg" alt="" />
            <p>Язык</p>
          </div>
          <div className={`${styles.switchButton} ${language === "english" ? styles.switchLang : ""}`} onClick={toggleLanguage}>
            <div className={styles.switchIndicator}>{language === "russian" ? "ENG" : "RU"}</div>
          </div>
        </div>
      </div>

      <div className={styles.support}>
        <div><p>Связаться со службой <br /> поддержки</p></div>
        <div className={styles.buttons}>
          <button className={styles.editButton}><img src="/assets/images/flag.png" alt="" /> +998 (99) 999-99-99 </button>
          <button style={{ backgroundColor: "var(--main_components_primary)" }} className={styles.settingsButton}><svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.69578 1.42367L2.48328 0.741172C3.39078 -0.166328 4.86078 -0.166328 5.76828 0.741172C5.79078 0.763672 7.17828 2.57117 7.17828 2.57117C8.03328 3.47117 8.03328 4.88867 7.17828 5.78117L6.30828 6.87617C7.40328 9.35867 9.10578 11.0687 11.5058 12.0887L12.6008 11.2112C13.4933 10.3487 14.9183 10.3487 15.8108 11.2112C15.8108 11.2112 17.6183 12.5987 17.6408 12.6212C18.5483 13.5287 18.5483 14.9987 17.6783 15.8687L16.9283 16.7312C16.0658 17.5937 14.9033 18.0662 13.6433 18.0662C7.91328 18.0662 0.323284 10.4687 0.323284 4.74617C0.323284 3.49367 0.795784 2.32367 1.69578 1.43117V1.42367ZM13.6433 16.5587C14.4983 16.5587 15.2858 16.2437 15.8258 15.6962L16.5758 14.8337C16.8833 14.5262 16.8983 14.0237 16.6058 13.7012C16.6058 13.7012 14.8133 12.3212 14.7908 12.2987C14.4833 11.9912 13.9433 11.9912 13.6283 12.2987C13.6058 12.3212 12.0983 13.5287 12.0983 13.5287C11.8883 13.6937 11.6108 13.7387 11.3633 13.6412C8.25828 12.4562 6.03078 10.2362 4.74828 7.03367C4.65078 6.78617 4.68828 6.50117 4.86078 6.28367C4.86078 6.28367 6.06828 4.76867 6.08328 4.75367C6.40578 4.43117 6.40578 3.91367 6.08328 3.59117C6.06078 3.56867 4.68078 1.77617 4.68078 1.77617C4.35828 1.48367 3.85578 1.49117 3.51078 1.83617L2.72328 2.51867C2.14578 3.09617 1.82328 3.88367 1.82328 4.73867C1.82328 9.95867 9.15078 16.5587 13.6433 16.5587Z" fill="white" />
          </svg>
          </button>
        </div>
      </div>

      <div className={`${styles.card} ${styles.streakCard} ${styles.aqua}`}>
        <div className={styles.label}>
          <span>Поделиться</span>
        </div>
        <div className={`${styles.cardContent}`}>
          <a href="https://t.me/telgram.com"><img src="/assets/images/telegramIcon.svg" alt="" /></a>
          <a href="https://instagram.com"><img src="/assets/images/instagramIcon.svg" alt="" /></a>
          <a href="https://facebook.com"><img src="/assets/images/facebookIcon.svg" alt="" /></a>
        </div>
      </div>
    </div>
  )
}

export default Settings