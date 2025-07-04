import { useRef, useState } from "react";
import styles from "./auth.module.css"
import Button from "../../components/button/button";
import { useEncryptor } from "../../hooks/useEncryptor";


const SmsCodeVerification = () => {
    const [allInputsFilled, setAllInputsFilled] = useState(false)
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [data, setData] = useState(JSON.parse(localStorage.getItem("phone")))
    const [inputCode, setInputCode] = useState(null)

    const inputs = useRef([]);

    const handleChange = (e, index) => {
        const value = e.target.value;
        const code = inputs.current.map(input => input.value).join('').split("")
        setInputCode(code)

        if (code.length === 4) setAllInputsFilled(true)

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
                <p>Введите код из СМС</p>
            </div>
            <div className={styles.subtitle}>
                <p>4-значный код был отправлен <br /> на номер {data[0].number}</p>
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
            <Button value={"РЕГИСТРАЦИЯ"} disabled={!allInputsFilled}
                className={allInputsFilled && "blue"} />
            <div className={styles.link}>
                <p>Отправить код заново</p>
            </div>
        </div>
    )
}

export default SmsCodeVerification