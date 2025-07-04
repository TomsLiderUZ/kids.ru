import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [activeButton, setActiveButton] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [alertHandler, setAlertHandler] = useState(false);
    const [videoPlayed, setVideoPlayed] = useState(false);
    const [micActive, setMicActive] = useState(false);
    const [voices, setVoices] = useState([]);
    const [currentPhrase, setCurrentPhrase] = useState("здравствуйте");
    const [openResultCard, setOpenResultCard] = useState(false);
    const [userSpeech, setUserSpeech] = useState("");
    const [finish, setFinish] = useState(false);
    const [currentLessonId, setCurrentLessonId] = useState(null);
    const [currentGameId, setCurrentGameId] = useState(null);
    const [onPaid, setOnPaid] = useState(false)
    const [lessonBadge, setLessonBadge] = useState(false);
    const [finishedLessonId, setFinishedLessonId] = useState(null);

    console.log(openResultCard, "resultcard", isCorrect);
    

    const moduleGameMap = {
        1: ["1.0", "1.1", "1.2", "1.3", "1.4", "1.5"],
        2: ["2.0", "2.1", "2.2", "2.3", "2.4"],
        3: ["3.0", "3.1", "3.2"],
        4: ["4.0"],
        5: ["5.0"],
    };



    const audioCorrectRef = useRef(null);
    const audioIncorrectRef = useRef(null);

    // Audio fayllarni yuklash va ovoz balandligini sozlash
    useEffect(() => {
        audioCorrectRef.current = new Audio("/assets/audio/correctSound.mp3");
        audioCorrectRef.current.volume = 1; // Ovoz balandligi to'liq
        audioIncorrectRef.current = new Audio("/assets/audio/incorrectSound.mp3");
        audioIncorrectRef.current.volume = 1;
    }, []);

    // Audio ijrosini foydalanuvchi bilan o'zaro aloqada faollashtirish
    const playCorrectSound = () => {
        audioCorrectRef.current?.play().catch((error) => {
            console.error("Correct sound playback error:", error);
        });
    };

    const playIncorrectSound = () => {
        audioIncorrectRef.current?.play().catch((error) => {
            console.error("Incorrect sound playback error:", error);
        });
    };

    useEffect(() => {
        if (isCorrect === null) return;
        if (isCorrect) {
            playCorrectSound();
        } else {
            playIncorrectSound();
        }
    }, [isCorrect]);

    // Ovoz tanib olish funksiyasi
    const handleSpeechRecognition = () => {
        if (!("webkitSpeechRecognition" in window)) {
            alert("Sizning brauzeringiz ovozni aniqlashni qo'llab-quvvatlamaydi.");
            return;
        }

        if (micActive) return;

        navigator.permissions.query({ name: "microphone" }).then((permissionStatus) => {
            if (permissionStatus.state === "denied") {
                alert("Iltimos, mikrofon uchun ruxsat bering.");
                return;
            }

            const recognition = new window.webkitSpeechRecognition();
            recognition.lang = "ru-RU";
            recognition.interimResults = false;

            recognition.onstart = () => setMicActive(true);

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript.toLowerCase();

                if (transcript === currentPhrase.toLowerCase()) {
                    setIsCorrect(true);
                    setAlertHandler(true);
                    setUserSpeech(transcript);
                } else {
                    setIsCorrect(false);
                    setAlertHandler(true);
                }
            };

            recognition.onerror = () => {
                setMicActive(false);
            };

            recognition.onend = () => setMicActive(false);

            recognition.start();
        }).catch(() => {
            alert("Mikrofonga ruxsat olishda muammo yuz berdi.");
        });
    };

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices.filter((voice) => voice.lang === "ru-RU"));
        };

        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
        loadVoices();
    }, []);

    const handleSpeak = (text) => {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ru-RU";

        const selectedVoice = voices.find((voice) => voice.lang === "ru-RU") || voices[0];
        if (selectedVoice) {
            utterance.voice = selectedVoice;
        }

        window.speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        if (isCorrect === true && currentLessonId && currentGameId) {
            const moduleKey = `module-${currentLessonId}`;
            const gameId = `${currentLessonId}.${currentGameId}`;

            const storedData = JSON.parse(localStorage.getItem(moduleKey)) || [];

            const isAlreadyStored = storedData.includes(gameId);

            let updated = storedData;
            if (!isAlreadyStored) {
                updated = [...storedData, gameId];
                localStorage.setItem(moduleKey, JSON.stringify(updated));
            }

            const expectedGames = moduleGameMap[currentLessonId];
            const isModuleComplete = expectedGames && expectedGames.every((id) => updated.includes(id));

            if (isModuleComplete) {
                setLessonBadge(true);
                setFinishedLessonId(currentLessonId);
                localStorage.removeItem(moduleKey);
            }

        }
    }, [isCorrect]);



    return (
        <GlobalContext.Provider value={{
            activeButton, setActiveButton,
            isCorrect, setIsCorrect,
            alertHandler, setAlertHandler,
            videoPlayed, setVideoPlayed,
            micActive, setMicActive,
            voices, handleSpeak,
            handleSpeechRecognition,
            setCurrentPhrase,
            openResultCard,
            setOpenResultCard,
            userSpeech,
            finish, setFinish,
            currentLessonId, setCurrentLessonId,
            currentGameId, setCurrentGameId,
            onPaid, setOnPaid,
            lessonBadge, setLessonBadge,
            finishedLessonId
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);
