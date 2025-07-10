import Button from "../../components/button/button";
import styles from "./home.module.css";
import { useGlobalContext } from "../../context/globalContext";

const Modal = ({ setOnPaid, setOpenModal }) => {
  const { isUz } = useGlobalContext();

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.title}>
          <p
            dangerouslySetInnerHTML={{
              __html: isUz
                ? "Darslarni ochish uchun<br />kursni sotib olish kerak"
                : "Для открытия<br />уроков необходимо<br />купить курс",
            }}
          />
        </div>
        <img src="https://i.ibb.co/8gp47xFd/support-Img.png" alt="" />
        <div className={styles.subtitle}>
          <h3
            dangerouslySetInnerHTML={{
              __html: isUz
                ? "Qo‘llab-quvvatlash<br />xizmati bilan bog‘lanish"
                : "Связаться со службой<br />поддержки",
            }}
          />
        </div>
        <div className={styles.button}>
          <Button
            value={isUz ? "QO‘NG‘IROQ QILISH" : "ПОЗВОНИТЬ"}
            className="blue"
            onClick={() => {
              setOnPaid(true);
              setOpenModal(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
