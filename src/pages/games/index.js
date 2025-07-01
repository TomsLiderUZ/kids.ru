import React, { useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import { gamesData } from "./gamesData";
import styles from "./outline.module.css";
import Rating from "../../components/rating/rating";
import Loading from "../../components/loading/loading";
import GameResultCard from "../../components/gameResultCard/gameResultCard";

const OutlineDrawing = React.memo(() => {
    const { id } = useParams();
    const [currentGameId, setCurrentGameId] = useState(id || "1.0");

    const renderGame = () => {
        for (let type in gamesData) {
            const game = gamesData[type].find((g) => g.id === currentGameId);
            if (game) {
                const GameComponent = game.component;
                return <GameComponent setGameId={setCurrentGameId} />;
            }
        }
        return <p>O'yin topilmadi.</p>;
    };

    return (
        <div className={styles.OutlineDrawing}>
            <GameResultCard />
            <Rating />
            <Suspense fallback={<div className="loading-item">
                <Loading />
            </div>}>
                {renderGame()}
            </Suspense>
        </div>
    );
});

export default OutlineDrawing;
