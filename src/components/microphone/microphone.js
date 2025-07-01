import React from "react";
import styles from "./microphone.module.css";


const Microphone = React.memo(({ className, onClick, disabled }) => {
    return (
        <button disabled={disabled} onClick={onClick} className={`${styles.buttonMicro} ${className} blue buttonMicro`}>
            <svg width="40" height="52" viewBox="0 0 40 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="13.0732" y="46.6113" width="13.8491" height="4.61177" rx="2.30588" fill="#30688E" />
                <path d="M37.1171 20.2329V22.3089C37.1165 26.7884 35.3127 31.0843 32.1025 34.2516C28.8923 37.4189 24.5386 39.1982 19.9989 39.1982C17.7508 39.2012 15.5241 38.7658 13.447 37.917C11.3698 37.0682 9.48316 35.8228 7.89534 34.2523C3.69208 30.1024 2.88306 24.5812 2.88306 22.3089C2.88306 20.0945 2.88306 20.0944 2.88306 19.8672" stroke="#30688E" strokeWidth="5" strokeMiterlimit="10" strokeLinecap="round" />
                <path d="M19.9991 2.77539H19.9968C13.9137 2.77539 8.98242 7.6414 8.98242 13.6439V21.9436C8.98242 27.9461 13.9137 32.8121 19.9968 32.8121H19.9991C26.0821 32.8121 31.0134 27.9461 31.0134 21.9436V13.6439C31.0134 7.6414 26.0821 2.77539 19.9991 2.77539Z" fill="#1CB0F6" stroke="#30688E" strokeWidth="4" strokeMiterlimit="10" />
                <path d="M19.9997 39.1992H20.0016C21.1026 39.1992 21.9951 39.9929 21.9951 40.9719V47.8766C21.9951 48.8556 21.1026 49.6493 20.0016 49.6493H19.9997C18.8987 49.6493 18.0061 48.8556 18.0061 47.8766V40.9719C18.0061 39.9929 18.8987 39.1992 19.9997 39.1992Z" fill="#30688E" />
            </svg>
        </button>
    );
});

export default Microphone;