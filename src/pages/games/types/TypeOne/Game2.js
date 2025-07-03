import React, { useState, useEffect, lazy } from "react";
// import { Wheel } from "react-custom-roulette";
import { useGlobalContext } from "../../../../context/globalContext";
import styles from "../../type2.module.css";
import Loading from "../../../../components/loading/loading";
import { useParams } from "react-router-dom";

const Microphone = lazy(() => import("../../../../components/microphone/microphone"));
const Title = lazy(() => import("../../../../components/title/title"));
const Button = lazy(() => import("../../../../components/button/button"));
const Alert = lazy(() => import("../../../../components/alert/alert"));
const GameVideo = lazy(() => import("../../../../components/gameVideo/gameVideo"));

const TypeOne = React.memo(() => {
  const { id } = useParams()
  const [lessonId, gameId] = id.split(".");

  const {
    activeButton,
    setActiveButton,
    isCorrect,
    setIsCorrect,
    alertHandler,
    setAlertHandler,
    videoPlayed,
    micActive,
    handleSpeechRecognition,
    setCurrentPhrase,
    setVideoPlayed,
    setOpenResultCard,
    setCurrentLessonId, setCurrentGameId

  } = useGlobalContext();

  const [data, setData] = useState([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [spinDisabled, setSpinDisabled] = useState(false);
  const [micDisabled, setMicDisabled] = useState(true);
  const [buttonText, setButtonText] = useState("КРУТИТЬ КОЛЕСО");
  const [currentOrder, setCurrentOrder] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getGameData = async (order) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.kidsru.uz/api/wheel-phrases/next/${order}`);
      const data = await res.json();
      setData(data?.words);
    } catch (err) {
      setError("So'zni yuklashda xatolik.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGameData(currentOrder);
  }, [currentOrder]);


  const handleSpinClick = () => {
    if (spinDisabled) return;
    setSpinDisabled(true);
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setMicDisabled(true);

    // Tanlangan elementning uslubini tozalash
    setData((prevData) =>
      prevData.map((item) => ({ ...item, style: {} }))
    );
  };
  const handleSpinEnd = () => {
    setMustSpin(false);
    setMicDisabled(false);
    setCurrentPhrase(data[prizeNumber].option);
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[prizeNumber].style = { backgroundColor: "#1CB0F6", color: "#000" };
      return updatedData;
    });

    // Tugma matnini o'zgartirish
    setButtonText("ПРОВЕРИТЬ");
  };

  useEffect(() => {
    setCurrentLessonId(lessonId);
    setCurrentGameId(gameId);
  }, [lessonId, gameId]);


  return (
    <div className={styles.gameO}>
      {loading ? (
        <div className="loading-item">
          <Loading />
        </div>
      ) : !data ? (
        <GameVideo url={"/assets/video/ending-1.1.mp4"} poster="" video="" onClick={() => {
          setVideoPlayed(true)
          setOpenResultCard(true)
        }} />
      ) : !videoPlayed ? (
        <GameVideo url={"/assets/lessons/start-1-2.mp4"} poster="" video="" onClick={() => setVideoPlayed(true)} />
      ) : (
        <>
          <div
            style={{ padding: 20, textAlign: "center" }}
            className={`${styles.Type2} ${styles.fortuna}`}
          >
            <div
              style={{
                margin: "auto",
                width: "100%",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={handleSpinClick}
              className={`${styles.carouselBlock} ${spinDisabled ? styles.disabled : ""}`}
            >
              <div style={{ transform: "rotate(134deg)" }}>
                {/* {data &&
                  <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={data}
                    spinDuration={0.5}
                    onStopSpinning={handleSpinEnd}
                    backgroundColors={["#fff"]}
                    textColors={["#000"]}
                    radiusLineWidth={1}
                    radiusLineColor={"#30688E"}
                    outerBorderColor="#30688E"
                    outerBorderWidth={3}
                    pointerProps={{
                      style: {
                        clipPath: "polygon(50% 0%, 0% 100%, 102% 56%)",
                        cursor: "pointer",
                        zIndex: "5",
                      },
                    }}
                  />} */}
              </div>
              <div className={styles.circle}></div>
            </div>

            <div className={styles.colors}>
              <Title text={"Повторите слово или фразу в микрофон"} />
              <div
                className={`${styles.microphoneHandler} ${styles.microphoneHandlerGame2}`}
              >
                <Microphone
                  onClick={handleSpeechRecognition}
                  className={`${styles.microphoneBase} ${micActive ? "activeMic" : ""
                    }`}
                  disabled={micDisabled}
                />
              </div>
            </div>
          </div>

          <div className={"fixedButton"}>
            <Button
              value={buttonText}
              className={"blue"}
              onClick={
                buttonText === "КРУТИТЬ КОЛЕСО"
                  ? handleSpinClick
                  : handleSpeechRecognition
              }
              disabled={spinDisabled && buttonText === "КРУТИТЬ КОЛЕСО"}
            />
          </div>
          {alertHandler && (
            <Alert
              wrong={!isCorrect}
              correctText={!isCorrect && "Попробуйте еще раз"}
              setActiveButton={setActiveButton}
              setAlertHandler={setAlertHandler}
              onRepeat={() => {
                setAlertHandler(false);
                setActiveButton(null);
              }}
              onClick={() => {
                setActiveButton(null);
                setIsCorrect(null);
                setAlertHandler(false);
                setCurrentOrder((prev) => prev + 1);
              }}
            />
          )}
        </>
      )}
    </div>
  );
});

export default TypeOne;
