import { useRef, useState } from "react";
import styles from "./auth.module.css";
import Button from "../../components/button/button";
import { useEncryptor } from "../../hooks/useEncryptor";
import { useGlobalContext } from "../../context/globalContext";

const SmsCodeVerification = ({ button }) => {
    const [allInputsFilled, setAllInputsFilled] = useState(false);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [data, setData] = useState(JSON.parse(localStorage.getItem("phone")));
    const [inputCode, setInputCode] = useState(null);

    const { isUz } = useGlobalContext();
    const inputs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        const code = inputs.current.map(input => input.value).join('').split("");
        setInputCode(code);

        if (code.length === 4) setAllInputsFilled(true);

        if (/^\d$/.test(value)) {
            if (inputs.current[index + 1]) {
                inputs.current[index + 1].focus();
            }
        } else {
            e.target.value = '';
        }
        setUpdateTrigger(prev => !prev);
    };

    return (
        <div className={styles.sms}>
            <div className={styles.title}>
                <p>{isUz ? "SMS kodini kiriting" : "Введите код из СМС"}</p>
            </div>
            <div className={styles.subtitle}>
                <p>
                    {isUz
                        ? `4 xonali kod ushbu raqamga yuborildi:`
                        : `4-значный код был отправлен`} <br /> {isUz ? "" : "на номер"} {data[0].number}
                </p>
            </div>
            <div className={styles.inputs}>
                {[0, 1, 2, 3].map((i) => (
                    <input
                        key={i}
                        type="number"
                        placeholder="_"
                        ref={(el) => (inputs.current[i] = el)}
                        onChange={(e) => handleChange(e, i)}
                        className={inputs.current[i]?.value ? styles.active : ""}
                    />
                ))}
            </div>
            <Button
                value={button}
                disabled={!allInputsFilled}
                className={allInputsFilled && "blue"}
            />
            <div className={styles.link}>
                <p>{isUz ? "Kod qayta yuborilsin" : "Отправить код заново"}</p>
            </div>
        </div>
    );
};

export default SmsCodeVerification;