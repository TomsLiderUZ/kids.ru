import React, { lazy, useRef, useState } from "react";
import styles from "./gamevideo.module.css";

const Button = lazy(() => import("../button/button"));

const GameVideo = React.memo(({ onClick, url }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoEnd, setVideoEnd] = useState(false);
    const videoRef = useRef(null);

    const handlePlayClick = () => {
        if (videoRef.current) {
            // Agar video tugagan bo'lsa, qayta boshlashni faollashtiramiz
            if (videoEnd) {
                videoRef.current.currentTime = 0; // Video boshidan o'ynatish
                videoRef.current.play();
                setIsPlaying(true);
                setVideoEnd(false); // Video qayta boshlandi
            } else {
                // Agar video o'ynayotgan bo'lsa, uni to'xtatamiz
                if (isPlaying) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                } else {
                    videoRef.current.play();
                    setIsPlaying(true);
                }
            }
        }
    };

    return (
        <div className={`${styles.gameVideo} gameVideo`}>
            <div className={styles.gameVideoComponent}>
                <div className={styles.video}>
                    <video
                        ref={videoRef}
                        src={url ? url : "/assets/video/talking.mp4"}
                        // poster="/assets/images/poster.png"
                        playsInline
                        // controls
                        onEnded={() => {
                            setVideoEnd(true); // Video tugadi
                            setIsPlaying(false); // Video to'xtadi
                        }}
                        onClick={handlePlayClick} // Video ustiga bosish
                    ></video>

                    {!isPlaying && (
                        <div
                            className={`${styles.play} ${videoEnd ? styles.playEnd : ""}`}
                            onClick={handlePlayClick} // Play ikonkasini bosish
                        >
                            {videoEnd ? (
                                <svg
                                    width="65"
                                    height="65"
                                    viewBox="0 0 65 65"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M27.7422 23.3408C28.2124 23.0746 28.7896 23.0824 29.2529 23.3604L35.9502 27.3789L42.6484 31.3975C43.0999 31.6686 43.376 32.1569 43.376 32.6836C43.3759 33.2103 43.1 33.6986 42.6484 33.9697L35.9502 37.9883L29.2529 42.0068C28.7896 42.2847 28.2123 42.2916 27.7422 42.0254C27.2722 41.7592 26.9816 41.2608 26.9814 40.7207V24.6465L26.9951 24.4463C27.0572 23.9851 27.3307 23.5738 27.7422 23.3408Z"
                                        fill="#4492D3"
                                        stroke="#4492D3"
                                        strokeWidth="3"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M15.4511 49.7316C19.8142 54.0948 25.8419 56.7935 32.4999 56.7935C45.8158 56.7935 56.6105 45.9987 56.6105 32.6829C56.6105 19.367 45.8158 8.57227 32.4999 8.57227C25.8419 8.57227 19.8142 11.2709 15.4511 15.6341C13.2303 17.855 8.38928 23.3065 8.38928 23.3065"
                                        stroke="#4492D3"
                                        strokeWidth="5.35791"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M8.38928 12.5898V23.3057H19.1051"
                                        stroke="#4492D3"
                                        strokeWidth="5.35791"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    width="24"
                                    height="27"
                                    viewBox="0 0 24 27"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M21.3701 9.07174C24.7035 10.9962 24.7034 15.8075 21.3701 17.732L7.56028 25.7051C4.22695 27.6296 0.0602842 25.224 0.0602844 21.375L0.0602851 5.42875C0.0602852 1.57975 4.22695 -0.825872 7.56029 1.09863L21.3701 9.07174Z"
                                        fill="#4492D3"
                                        fillOpacity="0.8"
                                    />
                                </svg>
                            )}
                        </div>
                    )}
                </div>
            </div>



            <div className={"fixedButton"}>
                <Button
                    value={"ПЕРЕЙТИ К ИГРЕ"}
                    className={videoEnd && "blue"}
                    // onClick={videoEnd && onClick}
                    onClick={onClick}
                />
            </div>

        </div>
    );
});

export default GameVideo;
