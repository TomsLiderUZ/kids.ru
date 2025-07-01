import React, { lazy, useState } from 'react'
import styles from "./onboarding.module.css"
import Button from '../../components/button/button'

const ProgressBar = lazy(() => import("../../components/progressBar/progressBar"));


const Onboarding = () => {
    const [step, setStep] = useState(0)
    const [age, setAge] = useState("");
    const [reasons, setReasons] = useState([]);
    const [progressStep, setProgressStep] = useState(0)

    const getMaxSelectable = () => {
        if (step === 2) return 3
        if (step === 4) return 3
        return 1
    }

    const nextStep = () => {
        setStep(prev => prev + 1)
        setProgressStep(prev => prev + 1)
        setReasons([])

        // ma'lumotlarni qayergadir uzatish kerak bo'lsa 
        // if (step === 1) {
        //     fetch("")
        // }
    }

    const selectReason = (reason) => {
        const max = getMaxSelectable()

        if (reasons.includes(reason)) {
            setReasons(reasons.filter(r => r !== reason))
        } else {
            if (max === 1) {
                setReasons([reason])
            } else {
                if (reasons.length < 3) {
                    setReasons([...reasons, reason])
                }
            }
        }
    }


    return (
        <>
            <div className={styles.onboarding}>
                {
                    step === 0 && (
                        <>
                            <div className={styles.title} style={{ textAlign: "center" }}>Давайте познакомимся! <br /> Ответьте на несколько <br /> вопросов</div>
                            <div className={styles.animation}>
                                <video autoPlay muted loop playsInline>
                                    <source src="/assets/video/home.mp4" type="video/mp4" />
                                    <source src="/assets/video/home.webm" type="video/webm" />
                                </video>
                            </div>

                        </>
                    )
                }

                {
                    step === 1 && (
                        <>
                            <div className={styles.head}>
                                <ProgressBar currentStep={progressStep} totalSteps={5} progressText />
                            </div>
                            <div className={styles.title}>Зачем вашему ребенку <br /> изучать русский язык?</div>
                            <div className={styles.subtitle}>Напишите возраст в поле для ввода</div>
                            <input onChange={(e) => setAge(e.target.value)} type="number" placeholder='Поле для ввода' />
                        </>
                    )
                }
                {
                    step === 2 && (
                        <>
                            <div className={styles.head}>
                                <ProgressBar currentStep={progressStep} totalSteps={5} progressText />
                            </div>
                            <div className={styles.title}>Сколько лет вашему <br /> ребенку?</div>
                            <div className={styles.subtitle}>Максимум три варианта</div>
                            <div className={styles.checkboxList}>
                                {[
                                    "Свободная коммуникация",
                                    "Читать книги",
                                    "Писать и понимать",
                                    "Слушать музыку",
                                    "Изучить новые слова",
                                    "Смотреть видео",
                                    "Другое"
                                ].map(reason => (
                                    <div
                                        key={reason}
                                        className={`${styles.checkboxItem} ${reasons.includes(reason) ? styles.selected : ""}`
                                        }
                                        onClick={() => selectReason(reason)}
                                    >
                                        <div className={styles.checkboxItem_left}>{reason}</div>
                                        <div className={styles.checkboxItem_right}></div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )
                }

                {
                    step === 3 && (
                        <>
                            <div className={styles.head}>
                                <ProgressBar currentStep={progressStep} totalSteps={5} progressText />
                            </div>
                            <div className={styles.title}>Насколько хорошо ваш <br /> ребенок знает русский <br /> язык?</div>
                            <div className={styles.subtitle}>Выберите один вариант</div>
                            <div className={styles.checkboxList}>
                                {[
                                    "Не знает",
                                    "Понимает немного",
                                    "Знает хорошо",
                                    "Отлично владеет"
                                ].map(reason => (
                                    <div
                                        key={reason}
                                        className={`${styles.checkboxItem} ${reasons.includes(reason) ? styles.selected : ""}`
                                        }
                                        onClick={() => selectReason(reason)}
                                    >
                                        <div className={styles.checkboxItem_left}>{reason}</div>
                                        <div className={styles.checkboxItem_right}></div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )
                }

                {
                    step === 4 && (
                        <>
                            <div className={styles.head}>
                                <ProgressBar currentStep={progressStep} totalSteps={5} progressText />
                            </div>
                            <div className={styles.title}>Какой навык вы бы <br /> хотели, чтобы ваш <br /> ребенок развил?</div>
                            <div className={styles.subtitle}>Максимум три варианта</div>
                            <div className={styles.checkboxList}>
                                {[
                                    "Писать",
                                    "Читать",
                                    "Говорить",
                                    "Слушать",
                                    "Грамматика",
                                    "Я не уверен (а)"
                                ].map(reason => (
                                    <div
                                        key={reason}
                                        className={`${styles.checkboxItem} ${reasons.includes(reason) ? styles.selected : ""}`
                                        }
                                        onClick={() => selectReason(reason)}
                                    >
                                        <div className={styles.checkboxItem_left}>{reason}</div>
                                        <div className={styles.checkboxItem_right}></div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )
                }

                {
                    step === 5 && (
                        <>
                            <div className={styles.head}>
                                <ProgressBar currentStep={progressStep} totalSteps={5} progressText />
                            </div>
                            <div className={styles.title}>Сколько времени ваш <br /> ребенок готов уделять на <br /> обучение?</div>
                            <div className={styles.subtitle}>Выберите один вариант</div>
                            <div className={styles.checkboxList}>
                                {[
                                    "5 минут в день",
                                    "10 минут в день",
                                    "15 минут в день",
                                    "30 минут в день",
                                    "Я не уверен (а)"
                                ].map(reason => (
                                    <div
                                        key={reason}
                                        className={`${styles.checkboxItem} ${reasons.includes(reason) ? styles.selected : ""}`
                                        }
                                        onClick={() => selectReason(reason)}
                                    >
                                        <div className={styles.checkboxItem_left}>{reason}</div>
                                        <div className={styles.checkboxItem_right}></div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )
                }
            </div>
            <div className={"fixedButton"}>
                <Button
                    value={step === 0 ? "НАЧАТЬ" : "ПРОДОЛЖИТЬ"}
                    className={"blue"} 
                    onClick={nextStep}
                />
            </div>
        </>
    )
}

export default Onboarding