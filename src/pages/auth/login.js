import React, { lazy, useState } from "react";
import styles from "./auth.module.css";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SmsCodeVerification from "./smsCodeVerification";
import { useEncryptor } from "../../hooks/useEncryptor";
import { useGlobalContext } from "../../context/globalContext";

const Input = lazy(() => import("../../components/input/input"));
const Button = lazy(() => import("../../components/button/button"));

const Login = React.memo(() => {
    const { encryptId, decryptId } = useEncryptor();
    const { isUz } = useGlobalContext();

    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [decryptedId, setDecryptedId] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const verif = queryParams.get("verif");

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleButtonClick = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://api.kidsru.uz/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: phone,
                    password: password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || (isUz ? "Kirishda xatolik" : "Ошибка при входе"));
                return;
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", data.user.name);
            localStorage.setItem("phone-number", phone);

            const encryptedId = encryptId(phone);
            setDecryptedId(decryptId(encryptedId));

            const verifId = [
                {
                    number: phone,
                    code: 123,
                },
            ];
            localStorage.setItem("phone", JSON.stringify(verifId));
            navigate(`?verif=${encryptedId}`);
        } catch (err) {
            setError(isUz ? "Server bilan ulanishda xatolik." : "Ошибка соединения с сервером.");
        }
    };

    const allInputsFilled = phone?.length > 10 && password && !error;

    return (
        <div className={styles.register}>
            <div className={styles.title}>
                <h1>{isUz ? "KIRISH" : "ВОЙТИ"}</h1>
            </div>

            {verif && decryptedId === localStorage.getItem("phone-number") ? (
                <SmsCodeVerification button={isUz ? "KIRISH" : "ВОЙТИ"} />
            ) : (<form onSubmit={handleButtonClick}>
                <div className={styles.inputs}>

                    <div className={`${styles.inputHandler} ${styles.inputPhoneNumber}`}>
                        <div className={styles.icon}>
                            {/* SVG */}
                        </div>
                        <PhoneInput
                            name="phone"
                            value={phone}
                            defaultCountry="uz"
                            onChange={(value) => setPhone(value)}
                            inputClass={styles.input}
                            placeholder={isUz ? "Telefon raqami" : "Номер телефона"}
                        />
                    </div>
                    <div className={styles.inputHandler}>
                        <div className={styles.icon}>
                            {/* SVG */}
                        </div>
                        <Input
                            placeholder={isUz ? "Parol" : "Пароль"}
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={handlePasswordChange}
                            className={error ? styles.errorInput : ""}
                        />

                        <div className={styles.svgIcon} onClick={togglePasswordVisibility}>
                            {/* SVG for show/hide password */}
                        </div>
                    </div>

                </div>
                {error && <p className={styles.error}>{error}</p>}

                <Button value={isUz ? "KIRISH" : "ВОЙТИ"} disabled={!allInputsFilled}
                    className={allInputsFilled && "blue"} />

                <p className={styles.bottom}>
                    {isUz ? "Hali akkauntingiz yo‘qmi?" : "Еще нет аккаунта?"}{" "}
                    <Link to={"/register"}>{isUz ? "Ro‘yxatdan o‘tish" : "Регистрация"}</Link>
                </p>
            </form >)}
        </div >
    );
});

export default Login;