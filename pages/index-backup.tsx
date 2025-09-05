import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronRight, Star, Users, BookOpen, Zap, Target, Award, ArrowRight, Play, CheckCircle, TrendingUp } from 'lucide-react';
import EmilImage from "./images/photo_2024-08-02 19.36.29.jpeg";
import DauletImage from "./images/photo_2024-08-02 19.36.32.jpeg";
import NurbekImage from "./images/photo_2024-08-02 19.36.27.jpeg";
import ErkebulanImage from "./images/photo_2024-08-02 19.36.35.jpeg";

const Home = () => {
    const { user } = useAuth();
    const router = useRouter();
    const elementsRef = useRef<HTMLDivElement[]>([]);
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
    const [scrollY, setScrollY] = useState(0);

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
            image: EmilImage,
            rating: 5
        },
        {
            text: "Менің балама MathBilimAI платформасы өте ұнады. Ол енді математикаға деген қызығушылығын арттырды.",
            author: "Даулет", 
            role: "Оқушы",
            image: DauletImage,
            rating: 5
        },
        {
            text: "Платформа өте ыңғайлы және пайдалы. Менің нәтижелерім бірден жақсарды.",
            author: "Нурбек",
            role: "Оқушы", 
            image: NurbekImage,
            rating: 5
        },
        {
            text: "MathBilimAI платформада оқудың көптеген жолдарын ұсынады. Бұл менің оқуымды жақсартты.",
            author: "Еркебулан",
            role: "Оқушы",
            image: ErkebulanImage,
            rating: 5
        }
    ];

    const features = [
        {
            icon: <Zap className="h-8 w-8 text-blue-600" />,
            title: "ИИ оқытушы",
            description: "Искуственный интеллект көмегімен персоналданған оқыту нұсқаулықтары алыңыз.",
            gradient: "from-blue-500 to-purple-600"
        },
        {
            icon: <Target className="h-8 w-8 text-emerald-600" />,
            title: "Тапсырмаларды талдау", 
            description: "Ең қиын тапсырмаларды талдап, оларды шешу жолдарын үйреніңіз.",
            gradient: "from-emerald-500 to-teal-600"
        },
        {
            icon: <BookOpen className="h-8 w-8 text-orange-600" />,
            title: "Сапалы материалдар",
            description: "ЕНТ-ға дайындыққа арналған заманауи және тиімді материалдарды алыңыз.",
            gradient: "from-orange-500 to-red-600"
        }
    ];

    const stats = [
        { number: "10,000+", label: "Оқушылар", icon: <Users className="h-6 w-6" /> },
        { number: "95%", label: "Сәттілік пайызы", icon: <TrendingUp className="h-6 w-6" /> },
        { number: "50+", label: "Мамандар", icon: <Award className="h-6 w-6" /> },
        { number: "24/7", label: "Қолдау", icon: <CheckCircle className="h-6 w-6" /> }
    ];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTestimonialIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 6000);

        return () => clearInterval(intervalId);
    }, [testimonials.length]);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                    }
                });
            },
            { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
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

    const currentTestimonial = testimonials[currentTestimonialIndex];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Head>
                <title>MathBilimAI - Сіздің математикалық ИИ мұғаліміңіз</title>
                <meta name="description" content="MathBilimAI - Математикалық білім беру үшін ең жақсы ИИ мұғаліміңіз. ЕНТ-ға дайындалыңыз!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div 
                        className="absolute inset-0 opacity-30"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            transform: `translateY(${scrollY * 0.5}px)`
                        }}
                    ></div>
                </div>

                {/* Floating mathematical symbols */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="floating-symbol absolute top-20 left-10 text-white/20 text-6xl">∫</div>
                    <div className="floating-symbol absolute top-40 right-20 text-white/20 text-4xl">π</div>
                    <div className="floating-symbol absolute bottom-32 left-20 text-white/20 text-5xl">∑</div>
                    <div className="floating-symbol absolute bottom-20 right-10 text-white/20 text-4xl">∂</div>
                    <div className="floating-symbol absolute top-60 left-1/3 text-white/20 text-3xl">√</div>
                    <div className="floating-symbol absolute bottom-60 right-1/3 text-white/20 text-5xl">∞</div>
                </div>

                <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                    <div className="max-w-4xl mx-auto space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                                <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                                    MathBilimAI
                                </span>
                                <br />
                                <span className="text-3xl md:text-4xl lg:text-5xl">
                                    сіздің ИИ мұғаліміңіз
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                                ЕНТ-ға дайындалу үшін жасанды интеллект арқылы персоналданған математикалық білім алыңыз
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={handleGetStarted}
                                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2"
                            >
                                <Play className="h-5 w-5" />
                                Қазір бастау
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <Link href="/materials" legacyBehavior>
                                <a className="group border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-white/10 flex items-center gap-2">
                                    <BookOpen className="h-5 w-5" />
                                    Материалдар
                                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center text-white">
                                    <div className="flex justify-center mb-2 text-blue-300">
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl md:text-3xl font-bold">{stat.number}</div>
                                    <div className="text-blue-200 text-sm">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
                    <ChevronRight className="h-6 w-6 transform rotate-90" />
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50"></div>
                <div className="relative z-10 container mx-auto px-4 md:px-6">
                    <div 
                        className="text-center mb-16 opacity-0 transform translate-y-10"
                        ref={(el) => { if (el) elementsRef.current[0] = el }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Негізгі мүмкіндіктер
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            MathBilimAI платформасы заманауи технологиялар арқылы математикаға деген сіздің көзқарасыңызды өзгертеді
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                                ref={(el) => { if (el) elementsRef.current[index + 1] = el }}
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                                <div className="relative z-10">
                                    <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                                            {feature.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        {feature.description}
                                    </p>
                                    <div className="flex items-center text-blue-600 font-semibold group-hover:text-purple-600 transition-colors">
                                        Толығырақ
                                        <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 container mx-auto px-4 md:px-6">
                    <div 
                        className="text-center mb-16 opacity-0 transform translate-y-10"
                        ref={(el) => { if (el) elementsRef.current[4] = el }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Қалай жұмыс істейді
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            4 қарапайым қадаммен математикалық білім алу сапарыңызды бастаңыз
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Тіркелу",
                                description: "Жылдам және қарапайым тіркелу процесі арқылы платформаға қосылыңыз",
                                icon: <Users className="h-8 w-8" />,
                                color: "from-blue-500 to-cyan-500"
                            },
                            {
                                step: "02", 
                                title: "Тестті таңдау",
                                description: "Сіздің деңгейіңізге сай пән мен қиындықты таңдап, тестті бастаңыз",
                                icon: <Target className="h-8 w-8" />,
                                color: "from-green-500 to-emerald-500"
                            },
                            {
                                step: "03",
                                title: "Тест тапсыру", 
                                description: "Интерактивті интерфейс арқылы сұрақтарға жауап беріп, тестті аяқтаңыз",
                                icon: <CheckCircle className="h-8 w-8" />,
                                color: "from-orange-500 to-red-500"
                            },
                            {
                                step: "04",
                                title: "Нәтижелер мен ұсыныстар",
                                description: "ИИ талдауы негізінде нәтижелеріңізді көріп, дамыту жоспарын алыңыз",
                                icon: <TrendingUp className="h-8 w-8" />,
                                color: "from-purple-500 to-pink-500"
                            }
                        ].map((step, index) => (
                            <div
                                key={index}
                                className="group relative"
                                ref={(el) => { if (el) elementsRef.current[index + 5] = el }}
                            >
                                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden">
                                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${step.color}`}></div>
                                    
                                    <div className="text-center">
                                        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${step.color} text-white text-2xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            {step.step}
                                        </div>
                                        
                                        <div className="mb-4 flex justify-center text-gray-400 group-hover:text-gray-600 transition-colors">
                                            {step.icon}
                                        </div>
                                        
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                            {step.title}
                                        </h3>
                                        
                                        <p className="text-gray-600 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Connector line */}
                                {index < 3 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-200"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30"></div>
                <div className="relative z-10 container mx-auto px-4 md:px-6">
                    <div 
                        className="text-center mb-16 opacity-0 transform translate-y-10"
                        ref={(el) => { if (el) elementsRef.current[9] = el }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Пайдаланушылардың пікірлері
                            </span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Біздің платформаны қолданған оқушылардың нақты тәжірибелері
                        </p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-3xl"></div>
                            
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="flex-shrink-0">
                                    <img 
                                        src={currentTestimonial.image.src} 
                                        alt={currentTestimonial.author}
                                        className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gradient-to-r from-blue-500 to-purple-500"
                                    />
                                </div>
                                
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex justify-center md:justify-start mb-4">
                                        {[...Array(currentTestimonial.rating)].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    
                                    <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed italic">
                                        "{currentTestimonial.text}"
                                    </blockquote>
                                    
                                    <div>
                                        <div className="font-bold text-gray-900 text-lg">{currentTestimonial.author}</div>
                                        <div className="text-blue-600 font-medium">{currentTestimonial.role}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial indicators */}
                        <div className="flex justify-center mt-8 space-x-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        index === currentTestimonialIndex 
                                            ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-8' 
                                            : 'bg-gray-300 hover:bg-gray-400'
                                    }`}
                                    onClick={() => setCurrentTestimonialIndex(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    <div className="floating-symbol absolute top-20 left-10 text-white/10 text-6xl">∫</div>
                    <div className="floating-symbol absolute bottom-20 right-10 text-white/10 text-4xl">π</div>
                </div>
                
                <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Математикадағы сапарыңызды бастаңыз
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                            MathBilimAI арқылы ЕНТ-ға дайындалып, математикалық мақсаттарыңызға жетіңіз
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={handleGetStarted}
                                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2"
                            >
                                <Play className="h-5 w-5" />
                                Дәл қазір бастау
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <Link href="/tests" legacyBehavior>
                                <a className="group border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-white/10 flex items-center gap-2">
                                    <Target className="h-5 w-5" />
                                    Тест тапсыру
                                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative bg-gradient-to-r from-gray-900 to-black text-white py-16 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="flex flex-wrap justify-center items-center w-full h-full">
                        <span className="text-4xl mx-4 my-2 floating-symbol">a² + b² = c²</span>
                        <span className="text-4xl mx-4 my-2 floating-symbol">∫f(x)dx</span>
                        <span className="text-4xl mx-4 my-2 floating-symbol">i² = -1</span>
                        <span className="text-4xl mx-4 my-2 floating-symbol">π ≈ 3.14159</span>
                    </div>
                </div>
                
                <div className="relative z-10 container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                        <div className="md:col-span-2">
                            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                MathBilimAI
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                Жасанды интеллект арқылы математикаға деген көзқарасыңызды өзгертетін заманауи білім беру платформасы
                            </p>
                            <div className="flex space-x-4">
                                <Link href="https://www.facebook.com" legacyBehavior>
                                    <a className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-110">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </a>
                                </Link>
                                <Link href="https://www.instagram.com" legacyBehavior>
                                    <a className="w-10 h-10 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.988 11.988 11.988s11.987-5.367 11.987-11.988C24.014 5.367 18.648.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.68 13.645 3.68 12.348c0-1.297.518-2.547 1.446-3.443.876-.807 2.027-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.896 1.446 2.146 1.446 3.443 0 1.297-.518 2.547-1.446 3.443-.875.807-2.026 1.297-3.323 1.297z"/>
                                        </svg>
                                    </a>
                                </Link>
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="text-xl font-semibold mb-4 text-blue-400">Платформа</h4>
                            <ul className="space-y-2">
                                <li><Link href="/tests" legacyBehavior><a className="text-gray-300 hover:text-white transition-colors">Тесттер</a></Link></li>
                                <li><Link href="/materials" legacyBehavior><a className="text-gray-300 hover:text-white transition-colors">Материалдар</a></Link></li>
                                <li><Link href="/dashboard" legacyBehavior><a className="text-gray-300 hover:text-white transition-colors">Дашборд</a></Link></li>
                                <li><Link href="/upload-task" legacyBehavior><a className="text-gray-300 hover:text-white transition-colors">Тапсырма жүктеу</a></Link></li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="text-xl font-semibold mb-4 text-blue-400">Қолдау</h4>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Анықтама</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Байланыс</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="border-t border-gray-700 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <p className="text-gray-400 text-sm mb-4 md:mb-0">
                                &copy; 2024 MathBilimAI. Барлық құқықтар қорғалған.
                            </p>
                            <div className="flex space-x-6 text-sm">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Құпиялылық саясаты</a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">Қызмет шарттары</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Custom Styles */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                
                .floating-symbol {
                    animation: float 6s ease-in-out infinite;
                }
                
                .floating-symbol:nth-child(odd) {
                    animation-delay: -3s;
                }
                
                @keyframes fade-in-up {
                    from { 
                        opacity: 0; 
                        transform: translateY(30px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
                
                .opacity-0 {
                    opacity: 0;
                }
                
                /* Responsive improvements */
                @media (max-width: 768px) {
                    .container {
                        padding-left: 1rem;
                        padding-right: 1rem;
                    }
                    
                    .floating-symbol {
                        font-size: 2rem !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Home;
