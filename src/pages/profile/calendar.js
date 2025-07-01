import React, { useState } from "react";
import styles from "./profile.module.css";

const CalendarCard = ({ day, active }) => {
  const [date, setDate] = useState(new Date());

  const monthNames = [
    "январь", "февраль", "март", "апрель", "май", "июнь",
    "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"
  ];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const handleMonthChange = (direction) => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + direction);
    setDate(newDate);
  };

  const renderDays = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = getDaysInMonth(year, month);

    const days = [];

    for (let i = 0; i < offset; i++) {
      days.push(<span key={`empty-${i}`} className={styles.empty}></span>);
    }

    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      const isWeekend = (offset + dayNum - 1) % 7 >= 5;
      const isToday =
        dayNum === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();

      const paddedMonth = `${month + 1}`.padStart(2, "0");
      const paddedDay = `${dayNum}`.padStart(2, "0");
      const formattedDate = `${year}-${paddedMonth}-${paddedDay}`;

      const isActive = active?.includes(formattedDate);

      days.push(
        <span
          key={dayNum}
          className={`
          ${styles.day}
          ${isWeekend ? styles.weekend : ""}
          ${isToday ? styles.today : ""}
          ${isActive ? styles.active : ""}
        `}
        >
          {paddedDay}
        </span>
      );
    }

    return days;
  };


  day(`${monthNames[date.getMonth()]} ${date.getFullYear()}`)

  return (
    <div className={styles.Calendar}>
      <div className={styles.controls}>
        <button onClick={() => handleMonthChange(-1)}>←</button>
        <button onClick={() => handleMonthChange(1)}>→</button>
      </div>
      <div className={styles.grid}>
        {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((day, i) => (
          <span key={i} className={`${styles.weekday} ${i >= 5 ? styles.dayOff : ""}`}>{day}</span>
        ))}
      </div>

      <hr className={styles.divider} />

      <div className={styles.grid}>
        {renderDays()}
      </div>

    </div>
  );
};

export default CalendarCard;
