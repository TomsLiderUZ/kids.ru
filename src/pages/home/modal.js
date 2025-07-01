import Button from "../../components/button/button"
import styles from "./home.module.css"

const Modal = () => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <div className={styles.title}>
                    <p>Для открытия <br /> уроков необходимо <br /> купить курс</p>
                </div>
                <img src="/assets/images/supportImg.png" alt="" />
                <div className={styles.subtitle}>
                    <h3>Связаться со службой <br /> поддержки</h3>
                </div>
                <div className={styles.button}>
                    <Button
                        value="ПОЗВОНИТЬ"
                        className="blue"
                    />
                </div>
            </div>
        </div>
    )
}

export default Modal