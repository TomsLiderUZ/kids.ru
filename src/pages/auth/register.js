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

const Register = React.memo(() => {
  const { encryptId, decryptId } = useEncryptor();
  const { isUz } = useGlobalContext();

  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [originalId, setOriginalId] = useState(null);
  const [decryptedId, setDecryptedId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const verif = queryParams.get("verif");

  const validatePassword = (newPassword, confirmPwd) => {
    if (newPassword.length < 6)
      return isUz
        ? "Parol kamida 6 ta belgidan iborat bo‘lishi kerak."
        : "Пароль должен быть длиной не менее 6 символов.";
    if (newPassword !== confirmPwd)
      return isUz
        ? "Parollar mos emas, qayta urinib ko‘ring"
        : "Пароли не совпадают, повторите попытку";
    return false;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setError(validatePassword(newPassword, confirmPassword));
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setError(validatePassword(password, newConfirmPassword));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2((prev) => !prev);
  };

  const allInputsFilled =
    phone?.length > 10 && password && username && confirmPassword && !error;

  const handleButtonClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://api.kidsru.uz/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          email: phone,
          password,
          confirmPassword,
          phone: phone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || (isUz ? "Ro‘yxatdan o‘tishda xatolik" : "Ошибка при регистрации"));
        return;
      }

      const data = await response.json();

      setUsername("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setError(false);

      const encryptedId = encryptId(phone);
      setDecryptedId(decryptId(encryptedId));

      localStorage.setItem("token", data.token);
      localStorage.setItem("phone-number", phone);
      navigate(`?verif=${encryptedId}`);
      const verifId = [
        {
          number: phone,
          code: 123,
        },
      ];
      localStorage.setItem("phone", JSON.stringify(verifId));
    } catch (err) {
      setError(isUz ? "Server bilan ulanishda xatolik." : "Ошибка соединения с сервером.");
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.title}>
        <h1>{isUz ? "RO‘YXATDAN O‘TISH" : "РЕГИСТРАЦИЯ"}</h1>
      </div>
      {verif && decryptedId === localStorage.getItem("phone-number") ? (
        <SmsCodeVerification button={isUz ? "RO‘YXATDAN O‘TISH" : "РЕГИСТРАЦИЯ"} />
      ) : (
        <form onSubmit={handleButtonClick}>
          <div className={styles.inputs}>
            <div className={styles.inputHandler}>
              <div className={styles.icon}>
                {/* ...svg... */}
              </div>
              <Input
                placeholder={isUz ? "Ism va familiyangizni kiriting" : "Введите имя и фамилию"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className={`${styles.inputHandler} ${styles.inputPhoneNumber}`}>
              <div className={styles.icon}>
                {/* ...svg... */}
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
                {/* ...svg... */}
              </div>
              <Input
                placeholder={isUz ? "Parolni kiriting" : "Введите пароль"}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                className={error ? styles.errorInput : styles.trueInput}
              />
              <div
                className={styles.svgIcon}
                onClick={togglePasswordVisibility}
              >
                {/* ...svg... */}
              </div>
            </div>
            <div className={styles.inputHandler}>
              <div className={styles.icon}>
                {/* ...svg... */}
              </div>
              <Input
                placeholder={isUz ? "Parolni takrorlang" : "Повторите пароль"}
                type={showPassword2 ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={error ? styles.errorInput : styles.trueInput}
              />
              <div
                className={styles.svgIcon}
                onClick={togglePasswordVisibility2}
              >
                {/* ...svg... */}
              </div>
            </div>
          </div>
          {error && <p className={styles.error}>{error}</p>}

          <Button
            value={isUz ? "RO‘YXATDAN O‘TISH" : "РЕГИСТРАЦИЯ"}
            disabled={!allInputsFilled}
            className={allInputsFilled && "blue"}
          />
          <p className={styles.bottom}>
            {isUz ? "Allaqachon akkauntingiz bormi?" : "Уже есть аккаунт?"}{" "}
            <Link to={"/login"}>{isUz ? "Kirish" : "Войти"}</Link>
          </p>
        </form>
      )}
    </div>
  );
});

export default Register;