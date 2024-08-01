import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const texts = [
    'ҰБТ-ға дайындалу үшін ',
    'Математика бойынша кеңестер',
    'ҰБТ-ға табысты өту үшін .'
];

const Dashboard = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        const typeWriterEffect = () => {
            let charIndex = 0;
            const intervalId = setInterval(() => {
                setDisplayedText(texts[currentTextIndex].slice(0, charIndex));
                charIndex++;
                if (charIndex > texts[currentTextIndex].length) {
                    clearInterval(intervalId);
                    setTimeout(() => {
                        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
                        setDisplayedText('');
                    }, 2000);
                }
            }, 100);
        };

        typeWriterEffect();
    }, [currentTextIndex]);

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <main className="flex-1 mt-4">
                <section className="w-full py-8">
                    <div className="container mx-auto px-4 md:px-6 space-y-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold mb-4 text-gray-800 font-mono">
                                <span className="typewriter">{displayedText}</span>
                            </h1>
                            <p className="text-lg mb-8 text-gray-700">
                                Сіздің бақылау тақтаңызға қош келдіңіз. Мұнда сіз тесттерге қол жеткізе аласыз, ИИ оқытушымен сөйлесе аласыз және материалдарды қарап шыға аласыз.
                            </p>
                        </div>

                        <div className="text-center bg-blue-100 p-6 rounded-lg shadow-md space-y-4">
                            <h2 className="text-2xl font-bold text-blue-800">Сіздің білім деңгейіңізді тексеріңіз!</h2>
                            <p className="text-lg text-blue-700">
                                Сізге тест тапсырып, нәтижелер бойынша қандай тақырыптарды білмейтініңізді анықтауға мүмкіндік береміз. AI сізге жеке курс жасайды.
                            </p>
                            <Link href="/tests" legacyBehavior>
                                <a className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-lg font-semibold">
                                    Тест тапсыру
                                </a>
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <Link href="/tests" legacyBehavior>
                                <a className="group block p-6 rounded-lg shadow-md bg-blue-600 text-white hover:bg-blue-700 transition duration-300 cursor-pointer">
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor" className="text-white mr-2">
                                            <path d="M20,1H2C.346,1-1,2.346-1,4v4H23V4c0-1.654-1.346-3-3-3ZM2.5,6c-.828,0-1.5-.672-1.5-1.5s.672-1.5,1.5-1.5,1.5,.672,1.5,1.5-.672,1.5-1.5,1.5Zm4,0c-.828,0-1.5-.672-1.5-1.5s.672-1.5,1.5-1.5,1.5,.672,1.5,1.5-.672,1.5-1.5,1.5ZM-1,23H23V10H-1v13ZM11.542,13h7.458v2H9.5l2.042-2Zm0,5h7.458v2H9.499l2.042-2Zm-7.367-5.296l1.281,1.213,2.548-2.548,1.414,1.414-2.692,2.692c-.352,.352-.809,.528-1.266,.528-.441,0-.883-.164-1.23-.493l-1.43-1.354,1.375-1.452Zm0,5l1.281,1.213,2.548-2.548,1.414,1.414-2.692,2.692c-.352,.352-.809,.528-1.266,.528-.441,0-.883-.164-1.23-.493l-1.43-1.355,1.375-1.451Z"/>
                                        </svg>
                                        <h2 className="text-2xl font-bold">Тесттер</h2>
                                    </div>
                                    <p>Әлсіз тұстарыңызды анықтау және дағдыларыңызды жақсарту үшін тесттер алыңыз.</p>
                                </a>
                            </Link>
                            <Link href="/chat" legacyBehavior>
                                <a className="group block p-6 rounded-lg shadow-md bg-blue-600 text-white hover:bg-blue-700 transition duration-300 cursor-pointer">
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor" className="text-white mr-2">
                                            <path d="m13-.004H5C2.243-.004,0,2.239,0,4.996v12.854c0,.793.435,1.519,1.134,1.894.318.171.667.255,1.015.255.416,0,.831-.121,1.191-.36l3.963-2.643h5.697c2.757,0,5-2.243,5-5v-7C18,2.239,15.757-.004,13-.004Zm11,9v12.854c0,.793-.435,1.519-1.134,1.894-.318.171-.667.255-1.015.256-.416,0-.831-.121-1.19-.36l-3.964-2.644h-5.697c-1.45,0-2.747-.631-3.661-1.62l.569-.38h5.092c3.859,0,7-3.141,7-7v-7c0-.308-.027-.608-.065-.906,2.311.44,4.065,2.469,4.065,4.906Z"/>
                                        </svg>
                                        <h2 className="text-2xl font-bold">Чат</h2>
                                    </div>
                                    <p>ИИ оқытушымен сөйлесіп, сұрақтарыңызды нақтылаңыз.</p>
                                </a>
                            </Link>
                            <Link href="/materials" legacyBehavior>
                                <a className="group block p-6 rounded-lg shadow-md bg-blue-600 text-white hover:bg-blue-700 transition duration-300 cursor-pointer">
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor" className="text-white mr-2">
                                            <path d="M20,0H5c-1.654,0-3,1.346-3,3V21c0,1.654,1.346,3,3,3H22V2c0-1.103-.897-2-2-2Zm0,18H8V2h4V11l2.5-2.5,2.5,2.5V2h3V18ZM5,2h1V18h-1c-.351,0-.687,.061-1,.172V3c0-.551,.449-1,1-1Zm0,20c-.551,0-1-.449-1-1s.449-1,1-1h15v2H5Z"/>
                                        </svg>
                                        <h2 className="text-2xl font-bold">Материалдар</h2>
                                    </div>
                                    <p>Тест нәтижелеріне байланысты материалдарды қарап шығып, біліміңізді жақсартыңыз.</p>
                                </a>
                            </Link>
                            <Link href="/solutions" legacyBehavior>
                                <a className="group block p-6 rounded-lg shadow-md bg-blue-600 text-white hover:bg-blue-700 transition duration-300 cursor-pointer">
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="currentColor" className="text-white mr-2">
                                            <path d="M19 0H5C3.346 0 2 1.346 2 3v18c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3V3c0-1.654-1.346-3-3-3zM5 2h14c.551 0 1 .449 1 1v18c0 .551-.449 1-1 1H5c-.551 0-1-.449-1-1V3c0-.551.449-1 1-1zM7 8h10v2H7zm0 4h10v2H7zm0 4h10v2H7zm0-8h6v2H7zm8 8h2v2h-2z"/>
                                        </svg>
                                        <h2 className="text-2xl font-bold">Мәселелерді шешу</h2>
                                    </div>
                                    <p>Мәселелерді суреттер арқылы шешіп, түсініктер алыңыз.</p>
                                </a>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="relative bg-blue-600 text-white py-8 mt-12 overflow-hidden">
                <div className="absolute inset-0">
                    <div className="flex flex-wrap justify-center items-center w-full h-full opacity-10">
                        <span className="text-9xl mx-4">+</span>
                        <span className="text-9xl mx-4">=</span>
                        <span className="text-9xl mx-4">π</span>
                        <span className="text-9xl mx-4">√</span>
                        <span className="text-9xl mx-4">Σ</span>
                        <span className="text-9xl mx-4">∞</span>
                    </div>
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="w-full sm:w-auto text-center sm:text-left">
                            <h3 className="text-2xl font-bold">MathTeachAI</h3>
                            <p className="text-sm mt-2">&copy; 2024 MathTeachAI. Барлық құқықтар қорғалған.</p>
                        </div>
                        <div className="w-full sm:w-auto mt-4 sm:mt-0 text-center sm:text-right">
                            <nav className="flex flex-wrap justify-center sm:justify-end gap-4">
                                <Link href="#" legacyBehavior>
                                    <a className="text-white hover:underline">Қызмет көрсету шарттары</a>
                                </Link>
                                <Link href="#" legacyBehavior>
                                    <a className="text-white hover:underline">Құпиялылық</a>
                                </Link>
                                <Link href="#" legacyBehavior>
                                    <a className="text-white hover:underline">Бізбен байланысыңыз</a>
                                </Link>
                            </nav>
                            <div className="flex justify-center sm:justify-end gap-4 mt-4">
                                <Link href="https://www.facebook.com" legacyBehavior>
                                    <a className="text-white hover:text-blue-400" aria-label="Facebook">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                            <path d="M22 0H2C.895 0 0 .895 0 2v20c0 1.105.895 2 2 2h10.68v-8.708H9.897v-3.394h2.783V9.57c0-2.754 1.665-4.25 4.095-4.25 1.164 0 2.165.087 2.457.126v2.85h-1.684c-1.322 0-1.577.629-1.577 1.551v2.035h3.154l-.411 3.394h-2.743V24H22c1.105 0 2-.895 2-2V2c0-1.105-.895-2-2-2z"/>
                                        </svg>
                                    </a>
                                </Link>
                                <Link href="https://www.twitter.com" legacyBehavior>
                                    <a className="text-white hover:text-blue-400" aria-label="Twitter">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                            <path d="M24 4.557a9.838 9.838 0 01-2.828.775 4.933 4.933 0 002.165-2.723 9.865 9.865 0 01-3.127 1.197A4.92 4.92 0 0016.616 3c-2.717 0-4.92 2.204-4.92 4.92 0 .386.044.762.127 1.122-4.088-.205-7.715-2.163-10.141-5.142a4.905 4.905 0 00-.666 2.473 4.92 4.92 0 002.19 4.096 4.904 4.904 0 01-2.228-.616v.062c0 2.39 1.701 4.384 3.955 4.833a4.942 4.942 0 01-2.224.084c.628 1.956 2.445 3.377 4.6 3.418a9.865 9.865 0 01-6.1 2.102c-.396 0-.787-.023-1.175-.069a13.9 13.9 0 007.548 2.212c9.057 0 14.01-7.502 14.01-14.009 0-.213-.004-.426-.014-.637A10.01 10.01 0 0024 4.557z"/>
                                        </svg>
                                    </a>
                                </Link>
                                <Link href="https://www.instagram.com" legacyBehavior>
                                    <a className="text-white hover:text-pink-600" aria-label="Instagram">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.333 3.608 1.309.976.975 1.247 2.242 1.309 3.608.058 1.265.07 1.645.07 4.849 0 3.204-.012 3.584-.07 4.849-.062 1.366-.333 2.633-1.309 3.608-.975.976-2.242 1.247-3.608 1.309-1.265.058-1.645.07-4.849.07-3.204 0-3.584-.012-4.849-.07-1.366-.062-2.633-.333-3.608-1.309-.976-.975-1.247-2.242-1.309-3.608-.058-1.265-.07-1.645-.07-4.849 0-3.204.012-3.584.07-4.849.062-1.366.333-2.633 1.309-3.608.975-.976 2.242-1.247 3.608-1.309 1.265-.058 1.645-.07 4.849-.07m0-2.163c-3.259 0-3.67.013-4.947.072-1.425.065-2.88.385-3.913 1.418-1.033 1.033-1.353 2.487-1.418 3.913-.059 1.277-.072 1.688-.072 4.947s.013 3.67.072 4.947c.065 1.425.385 2.88 1.418 3.913 1.033 1.033 2.487 1.353 3.913 1.418 1.277.059 1.688.072 4.947.072s3.67-.013 4.947-.072c1.425-.065 2.88-.385 3.913-1.418 1.033-1.033 1.353-2.487 1.418-3.913.059-1.277.072-1.688.072-4.947s-.013-3.67-.072-4.947c-.065-1.425-.385-2.88-1.418-3.913-1.033-1.033-2.487-1.353-3.913-1.418-1.277-.059-1.688-.072-4.947-.072zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                                        </svg>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <svg className="w-full" viewBox="0 0 1440 320">
                    <path fill="#1E3A8A" fillOpacity="1" d="M0,224L30,213.3C60,203,120,181,180,170.7C240,160,300,160,360,176C420,192,480,224,540,213.3C600,203,660,149,720,117.3C780,85,840,75,900,74.7C960,75,1020,85,1080,106.7C1140,128,1200,160,1260,149.3C1320,139,1380,85,1410,58.7L1440,32L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path>
                </svg>
            </footer>
            <style jsx>{`
                @keyframes typing {
                    from { width: 0; }
                    to { width: 100%; }
                }

                @keyframes blink {
                    50% { border-color: transparent; }
                }

                .typewriter {
                    font-family: 'Titillium Web', sans-serif;
                    font-size: 2rem;
                    color: #2663EB;
                    white-space: nowrap;
                    overflow: hidden;
                    border-right: 3px solid #2663EB;
                    animation: typing 4s steps(40, end), blink 0.75s step-end infinite;
                }

                @media (max-width: 768px) {
                    .typewriter {
                        font-size: 1.25rem;
                    }

                    .text-lg {
                        font-size: 1rem;
                    }

                    .text-2xl {
                        font-size: 1.25rem;
                    }

                    .text-3xl {
                        font-size: 1.75rem;
                    }

                    .text-4xl {
                        font-size: 2rem;
                    }

                    .container {
                        padding-left: 1rem;
                        padding-right: 1rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default Dashboard;
