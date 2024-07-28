// components/TypingEffect.tsx
import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
    text: string;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setDisplayedText((prev) => prev + text[index]);
            index++;
            if (index >= text.length) {
                clearInterval(intervalId);
            }
        }, 50); 

        return () => clearInterval(intervalId);
    }, [text]);

    return <span>{displayedText}</span>;
};

export default TypingEffect;
