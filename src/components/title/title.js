import React, { lazy, useEffect, useState } from "react";
import { useGlobalContext } from "../../context/globalContext";

const SpeakerIcon = lazy(() => import("../speaker"));

const Title = React.memo(({ text, className, voice }) => {
    const { handleSpeak } = useGlobalContext();
    const [hasSpoken, setHasSpoken] = useState(false);

    // Faqat ilk marta, o'yin boshlaganda gapir
    useEffect(() => {
        if (text && !hasSpoken) {
            handleSpeak(text);
            setHasSpoken(true);
        }
    }, [handleSpeak, text, hasSpoken]);

    return (
        <h3>
            {!voice && (
                <SpeakerIcon
                    onClick={() => handleSpeak(text)}
                    className={className}
                />
            )}

            <span>{text}</span>
        </h3>
    );
});

export default Title;
