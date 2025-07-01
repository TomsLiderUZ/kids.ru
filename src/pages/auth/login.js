import React, { lazy, useState } from "react";
import styles from "./auth.module.css";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Link, useNavigate } from "react-router-dom";

const Input = lazy(() => import("../../components/input/input"));
const Button = lazy(() => import("../../components/button/button"));

const Login = React.memo(() => {


    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()


    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: phone,
                    password: password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || "Ошибка при входе");
                return;
            }

            const data = await response.json();

            console.log(data);

            setPhone("");
            setPassword("");
            setError(false);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", data.user.name);
            navigate("/");

        } catch (err) {
            setError("Ошибка соединения с сервером.");
        }
    };


    const allInputsFilled = phone?.length > 10 && password && !error;



    return (
        <div className={styles.register}>
            <div className={styles.title}>
                <h1>ВОЙТИ</h1>
            </div>
            <form onSubmit={handleButtonClick}>
                <div className={styles.inputs}>

                    <div className={`${styles.inputHandler} ${styles.inputPhoneNumber}`}>
                        <div className={styles.icon}>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.77098 1.49008L2.55848 0.807578C3.46598 -0.0999219 4.93598 -0.0999219 5.84348 0.807578C5.86598 0.830078 7.25348 2.63758 7.25348 2.63758C8.10848 3.53758 8.10848 4.95508 7.25348 5.84758L6.38348 6.94258C7.47848 9.42508 9.18098 11.1351 11.581 12.1551L12.676 11.2776C13.5685 10.4151 14.9935 10.4151 15.886 11.2776C15.886 11.2776 17.6935 12.6651 17.716 12.6876C18.6235 13.5951 18.6235 15.0651 17.7535 15.9351L17.0035 16.7976C16.141 17.6601 14.9785 18.1326 13.7185 18.1326C7.98848 18.1326 0.398479 10.5351 0.398479 4.81258C0.398479 3.56008 0.870979 2.39008 1.77098 1.49758V1.49008ZM13.7185 16.6251C14.5735 16.6251 15.361 16.3101 15.901 15.7626L16.651 14.9001C16.9585 14.5926 16.9735 14.0901 16.681 13.7676C16.681 13.7676 14.8885 12.3876 14.866 12.3651C14.5585 12.0576 14.0185 12.0576 13.7035 12.3651C13.681 12.3876 12.1735 13.5951 12.1735 13.5951C11.9635 13.7601 11.686 13.8051 11.4385 13.7076C8.33348 12.5226 6.10598 10.3026 4.82348 7.10008C4.72598 6.85258 4.76348 6.56758 4.93598 6.35008C4.93598 6.35008 6.14348 4.83508 6.15848 4.82008C6.48098 4.49758 6.48098 3.98008 6.15848 3.65758C6.13598 3.63508 4.75598 1.84258 4.75598 1.84258C4.43348 1.55008 3.93098 1.55758 3.58598 1.90258L2.79848 2.58508C2.22098 3.16258 1.89848 3.95008 1.89848 4.80508C1.89848 10.0251 9.22598 16.6251 13.7185 16.6251Z" fill="#30688E" />
                            </svg>
                        </div>
                        <PhoneInput
                            name="phone"
                            value={phone}
                            defaultCountry="uz"
                            onChange={(value) => setPhone(value)}
                            inputClass={styles.input}
                            placeholder="Номер телефона"
                        />
                    </div>
                    <div className={styles.inputHandler}>
                        <div className={styles.icon}>
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_612_12331)">
                                    <path d="M15.1836 6.443V5.375C15.1836 3.98261 14.6305 2.64726 13.6459 1.66269C12.6613 0.678124 11.326 0.125 9.93359 0.125C8.54121 0.125 7.20585 0.678124 6.22128 1.66269C5.23672 2.64726 4.68359 3.98261 4.68359 5.375V6.443C4.01561 6.73453 3.44706 7.21439 3.04747 7.82391C2.64787 8.43342 2.43455 9.14618 2.43359 9.875V14.375C2.43478 15.3692 2.83026 16.3223 3.53326 17.0253C4.23626 17.7283 5.1894 18.1238 6.18359 18.125H13.6836C14.6778 18.1238 15.6309 17.7283 16.3339 17.0253C17.0369 16.3223 17.4324 15.3692 17.4336 14.375V9.875C17.4326 9.14618 17.2193 8.43342 16.8197 7.82391C16.4201 7.21439 15.8516 6.73453 15.1836 6.443ZM6.18359 5.375C6.18359 4.38044 6.57868 3.42661 7.28194 2.72335C7.98521 2.02009 8.93903 1.625 9.93359 1.625C10.9282 1.625 11.882 2.02009 12.5852 2.72335C13.2885 3.42661 13.6836 4.38044 13.6836 5.375V6.125H6.18359V5.375ZM15.9336 14.375C15.9336 14.9717 15.6965 15.544 15.2746 15.966C14.8526 16.3879 14.2803 16.625 13.6836 16.625H6.18359C5.58686 16.625 5.01456 16.3879 4.5926 15.966C4.17065 15.544 3.93359 14.9717 3.93359 14.375V9.875C3.93359 9.27826 4.17065 8.70597 4.5926 8.28401C5.01456 7.86205 5.58686 7.625 6.18359 7.625H13.6836C14.2803 7.625 14.8526 7.86205 15.2746 8.28401C15.6965 8.70597 15.9336 9.27826 15.9336 9.875V14.375Z" fill="#30688E" />
                                    <path d="M9.93359 10.625C9.73468 10.625 9.54392 10.704 9.40326 10.8447C9.26261 10.9853 9.18359 11.1761 9.18359 11.375V12.875C9.18359 13.0739 9.26261 13.2647 9.40326 13.4053C9.54392 13.546 9.73468 13.625 9.93359 13.625C10.1325 13.625 10.3233 13.546 10.4639 13.4053C10.6046 13.2647 10.6836 13.0739 10.6836 12.875V11.375C10.6836 11.1761 10.6046 10.9853 10.4639 10.8447C10.3233 10.704 10.1325 10.625 9.93359 10.625Z" fill="#30688E" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_612_12331">
                                        <rect width="18" height="18" fill="white" transform="translate(0.933594 0.125)" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </div>
                        <Input
                            placeholder={"Повторите пароль"}
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={handlePasswordChange}
                            className={error ? styles.errorInput : ""}
                        />

                        <div className={styles.svgIcon} onClick={togglePasswordVisibility}>

                            {error ? <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.13086 18.125C14.1014 18.125 18.1309 14.0956 18.1309 9.125C18.1309 4.15443 14.1014 0.125 9.13086 0.125C4.16029 0.125 0.130859 4.15443 0.130859 9.125C0.136238 14.0934 4.16251 18.1196 9.13086 18.125ZM8.38087 4.625C8.38087 4.21079 8.71665 3.87501 9.13086 3.87501C9.54507 3.87501 9.88085 4.21079 9.88085 4.625V10.625C9.88085 11.0392 9.54507 11.375 9.13086 11.375C8.71665 11.375 8.38087 11.0392 8.38087 10.625V4.625ZM9.13086 13.625C9.54507 13.625 9.88085 13.9608 9.88085 14.375C9.88085 14.7892 9.54507 15.125 9.13086 15.125C8.71665 15.125 8.38087 14.7892 8.38087 14.375C8.38087 13.9608 8.71665 13.625 9.13086 13.625Z" fill="#EC292C" />
                            </svg>
                                :
                                showPassword
                                    ?
                                    <svg width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        < path d="M21.048 7.11471C19.6551 10.1476 16.6243 12.561 11.1552 12.561C8.31029 12.561 6.13852 11.927 4.52286 10.9129C3.00129 9.95788 1.93505 8.64223 1.25926 7.11783C2.45978 4.33102 5.69118 1.6875 11.1552 1.6875C16.6089 1.6875 19.8406 4.35768 21.048 7.11471Z" stroke="#30688E" strokeWidth="1.5" />
                                        <circle cx="11.1548" cy="7.12256" r="3.39209" stroke="#30688E" strokeWidth="1.5" />
                                    </svg> : <svg
                                        width="22"
                                        height="14"
                                        viewBox="0 0 22 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M21.1183 7.11471C19.7254 10.1476 16.6946 12.561 11.2255 12.561C8.3806 12.561 6.20883 11.927 4.59318 10.9129C3.0716 9.95788 2.00536 8.64223 1.32957 7.11783C2.53009 4.33102 5.76149 1.6875 11.2255 1.6875C16.6792 1.6875 19.9109 4.35768 21.1183 7.11471Z"
                                            stroke="#30688E"
                                            strokeWidth="1.5"
                                        />
                                        <circle
                                            cx="11.2251"
                                            cy="7.12256"
                                            r="3.39209"
                                            stroke="#30688E"
                                            strokeWidth="1.5"
                                        />
                                        <path
                                            d="M1.91016 12.8828L20.7246 1.48242"
                                            stroke="#30688E"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                            }
                        </div>
                    </div>

                </div>
                {error && <p className={styles.error}>{error}</p>}

                <Button value={"ВОЙТИ"} disabled={!allInputsFilled}

                    className={allInputsFilled && "blue"} />

                <p className={styles.bottom}>Еще нет аккаунта? <Link to={"/register"}>Регистрация</Link></p>
            </form >
        </div >
    );
});

export default Login;