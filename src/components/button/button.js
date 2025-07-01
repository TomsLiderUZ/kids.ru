import React from "react";
import styles from "./button.module.css";
import { useGlobalContext } from "../../context/globalContext";


const Button = React.memo(({ value, className, onClick,
    disabled,
    svgLeft,
    svgRight,
    style
}) => {
    const {
        isCorrect,
        setOpenResultCard
    } = useGlobalContext();


    const handleBUttonClick = () => {
        if (onClick) onClick();

        if (isCorrect) {
            // setOpenResultCard(true);
        }
    };

    return (
        <button
            disabled={disabled}
            onClick={handleBUttonClick}
            className={`${styles.button} ${className}`}
            style={style}
        >
            {svgLeft}
            {value}
            {svgRight}
        </button>
    );
});


export default Button;