import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import EmilImage from "./images/photo_2024-08-02 19.36.29.jpeg";
import DauletImage from "./images/photo_2024-08-02 19.36.32.jpeg";
import NurbekImage from "./images/photo_2024-08-02 19.36.27.jpeg";
import ErkebulanImage from "./images/photo_2024-08-02 19.36.35.jpeg";

const Home = () => {
    const { user } = useAuth();
    const router = useRouter();
    const elementsRef = useRef<HTMLDivElement[]>([]);

    const handleGetStarted = () => {
        if (user) {
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    };

    const testimonials = [
        {
            text: "MathBilimAI маған ЕНТ-ға дайындалуға көп көмектесті. Әсіресе ИИ оқытушының ұсыныстары пайдалы болды.",
            author: "Эмиль",
            role: "Оқушы",
            image: EmilImage
        },
        {
            text: "Менің балама MathBilimAI платформасы өте ұнады. Ол енді математикаға деген қызығушылығын арттырды.",
            author: "Даулет",
            role: "Оқушы",
            image: DauletImage
        },
        {
            text: "Платформа өте ыңғайлы және пайдалы. Менің нәтижелерім бірден жақсарды.",
            author: "Нурбек",
            role: "Оқушы",
            image: NurbekImage
        },
        {
            text: "MathBilimAI платформада оқудың көптеген жолдарын ұсынады. Бұл менің оқуымды жақсартты.",
            author: "Еркебулан",
            role: "Оқушы",
            image: ErkebulanImage
        }
    ];

    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000); // смена отзывов каждые 5 секунд

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate__fadeInUp');
                    }
                });
            },
            { threshold: 0.1 }
        );

        elementsRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => {
            elementsRef.current.forEach((el) => {
                if (el) observer.unobserve(el);
            });
        };
    }, []);

    const handleSwipeStart = (e: React.TouchEvent<HTMLDivElement>) => {
        // Начало свайпа
    };

    const handleSwipeMove = (e: React.TouchEvent<HTMLDivElement>) => {
        // Движение свайпа
    };

    const handleSwipeEnd = (e: React.TouchEvent<HTMLDivElement>) => {
        // Завершение свайпа
    };

    const currentTestimonial = testimonials[currentTestimonialIndex];

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <main className="flex-1">
                <section className="relative w-full py-12 md:py-24 lg:py-32 bg-white">
                    <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        controls={false}
                        disablePictureInPicture
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                    >
                        <source src="/images/video.mp4" type="video/mp4" />
                    </video>
                    <div className="relative z-10 container mx-auto px-4 md:px-6 space-y-8 lg:space-y-12 text-center">
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-3xl font-bold tracking-tighter text-blue-600 sm:text-4xl md:text-5xl lg:text-6xl">
                                MathBilimAI-ға қош келдіңіз
                            </h1>
                            <p className="mt-4 max-w-[600px] text-white md:text-xl lg:text-lg">
                                MathBilimAI сізге ЕНТ-ға дайындалуға көмектесетін онлайн платформа. Біз сіздің әлсіз тұстарыңызды анықтап, қажетті материалдарды ұсынатын ИИ-оқытушыны ұсынамыз.
                            </p>
                            <div className="mt-6">
                                <button
                                    onClick={handleGetStarted}
                                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 mb-4"
                                >
                                    Қазір көріңіз
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-gray-200 w-full py-12 md:py-24">
                    <div className="container mx-auto px-4 md:px-6 space-y-8 lg:space-y-12">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter text-blue-600 sm:text-4xl md:text-5xl">Негізгі мүмкіндіктер</h2>
                                <p className="max-w-[700px] text-gray-700 md:text-xl lg:text-lg">
                                    MathBilimAI платформасы сізге тесттерді оңай жасауға, тапсырмаларды автоматты түрде бағалауға және білім алу үшін қажетті материалдарды ұсынуға көмектеседі.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-8" ref={(el) => { if (el) elementsRef.current[0] = el }}>
                            <FeatureCard
                                icon={<AiTeacherIcon className="h-8 w-8 text-blue-600" />}
                                title="ИИ оқытушы"
                                description="Искуственный интеллект көмегімен материалдарды оқып үйренуге арналған нұсқаулықтар алыңыз."
                            />
                            <FeatureCard
                                icon={<AnalysisIcon className="h-8 w-8 text-blue-600" />}
                                title="Тапсырмаларды талдау"
                                description="Ең қиын тапсырмаларды талдап, оларды шешу жолдарын үйреніңіз."
                            />
                            <FeatureCard
                                icon={<MaterialIcon className="h-8 w-8 text-blue-600" />}
                                title="Материалдар"
                                description="ЕНТ-ға дайындыққа арналған сапалы материалдарды алыңыз."
                            />
                        </div>
                    </div>
                </section>
                <section className="bg-white w-full py-12 md:py-24">
                    <div className="container mx-auto px-4 md:px-6 space-y-8 lg:space-y-12">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center" ref={(el) => { if (el) elementsRef.current[1] = el }}>
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter text-blue-600 sm:text-4xl md:text-5xl">Қалай жұмыс істейді</h2>
                                <p className="max-w-[700px] text-gray-700 md:text-xl lg:text-lg">
                                    MathBilimAI сізге өзіңізді тексеруге және әлсіз жақтарыңызды жақсартуға көмектеседі. Біздің ИИ-оқытушы сізге дұрыс жолды көрсетеді.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" ref={(el) => { if (el) elementsRef.current[2] = el }}>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl font-bold">1</span>
                                </div>
                                <h3 className="text-xl font-semibold text-blue-600 mb-2">Тіркелу</h3>
                                <p className="text-gray-700">Алдымен, тіркелу қажет. Бұл сізге жүйеге кіруге мүмкіндік береді.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl font-bold">2</span>
                                </div>
                                <h3 className="text-xl font-semibold text-blue-600 mb-2">Тестті таңдау</h3>
                                <p className="text-gray-700">Сізге керек пән мен қиындық деңгейін таңдаңыз, және тестті бастаңыз.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl font-bold">3</span>
                                </div>
                                <h3 className="text-xl font-semibold text-blue-600 mb-2">Тест тапсыру</h3>
                                <p className="text-gray-700">Сұрақтарға жауап беріп, тестті аяқтаңыз.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl font-bold">4</span>
                                </div>
                                <h3 className="text-xl font-semibold text-blue-600 mb-2">Нәтижелер мен ұсыныстар</h3>
                                <p className="text-gray-700">Нәтижелеріңізді көріп, ИИ-оқытушының ұсыныстарын алыңыз.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-white w-full py-12 md:py-24">
                    <div className="container mx-auto px-4 md:px-6 space-y-8 lg:space-y-12">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center" ref={(el) => { if (el) elementsRef.current[3] = el }}>
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter text-blue-600 sm:text-4xl md:text-5xl">Пайдаланушылардың пікірлері</h2>
                                <p className="max-w-[700px] text-gray-700 md:text-xl lg:text-lg">
                                    Біздің платформамызды қолданған пайдаланушылардың пікірлері.
                                </p>
                            </div>
                        </div>
                        <div className="relative overflow-hidden">
                            <div
                                className="flex transition-transform ease-in-out duration-500"
                                style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
                                onTouchStart={handleSwipeStart}
                                onTouchMove={handleSwipeMove}
                                onTouchEnd={handleSwipeEnd}
                            >
                                {testimonials.map((testimonial, index) => (
                                    <div key={index} className="min-w-full flex-shrink-0 p-6 text-center space-y-4">
                                        <div className="flex justify-center mb-4 flex-wrap">
                                            <img src={testimonial.image.src} alt={testimonial.author} className="w-24 h-24 rounded-full object-cover mb-2 md:mb-0 md:mr-2" />
                                            <p className="text-gray-800 md:w-auto md:flex-1">{testimonial.text}</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-gray-800 font-semibold">{testimonial.author}</p>
                                            <p className="text-gray-600">{testimonial.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="relative bg-blue-600 text-white py-3 mt-12 overflow-hidden rounded-t-2xl">
                <div className="absolute inset-0">
                    <div className="flex flex-wrap justify-center items-center w-full h-full opacity-10">
                        <span className="text-4xl mx-2">a² + b² = c²</span>
                        <span className="text-4xl mx-2">∫f(x)dx</span>
                        <span className="text-4xl mx-2">i² = -1</span>
                        <span className="text-4xl mx-2">π ≈ 3.14159</span>
                    </div>
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="flex flex-wrap justify-between items-center">
                        <div className="w-full sm:w-auto text-center sm:text-left">
                            <h3 className="text-2xl font-bold">MathBilimAI</h3>
                            <p className="text-sm mt-2">&copy; 2024 MathBilimAI. Барлық құқықтар қорғалған.</p>
                        </div>
                        <div className="w-full sm:w-auto mt-4 sm:mt-0 text-center sm:text-right">
                            <nav className="flex flex-wrap justify-center sm:justify-end gap-4">
                                <Link href="#" legacyBehavior>
                                    <a className="text-white hover:underline">Қызмет көрсету шарттары</a>
                                </Link>
                                <Link href="#" legacyBehavior>
                                    <a className="text-white hover:underline">Құпиялылық</a>
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

                .animate__fadeInUp {
                    opacity: 0;
                    transform: translateY(20px);
                    animation: fadeInUp 1s forwards;
                }

                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
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

                    .testimonial-image {
                        width: 100%;
                        height: auto;
                    }
                }
            `}</style>
        </div>
    );
};

type FeatureCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <div className="bg-white text-black p-6 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
        <div className="flex items-center gap-4 mb-4">
            {icon}
            <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-gray-700">{description}</p>
    </div>
);

type IconProps = React.SVGProps<SVGSVGElement>;

const AiTeacherIcon: React.FC<IconProps> = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 12h0M12 18h0M12 6h0M6 12h0M18 12h0" />
        <path d="M3 12a9 9 0 1 0 18 0A9 9 0 1 0 3 12z" />
    </svg>
);

const AnalysisIcon: React.FC<IconProps> = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <line x1="8" y1="12" x2="12" y2="16" />
        <line x1="12" y1="12" x2="16" y2="16" />
    </svg>
);

const MaterialIcon: React.FC<IconProps> = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M20 21H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4l2 3h4l2-3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" />
        <path d="M14 13l-2-2-2 2m0 6l2-2 2 2" />
    </svg>
);

export default Home;
