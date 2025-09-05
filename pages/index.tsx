import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    Brain,
    BookOpen,
    Users,
    MessageSquare,
    Calculator,
    Target,
    TrendingUp,
    Star,
    ArrowRight,
    Play,
    Award,
    Clock,
    CheckCircle,
    Sparkles,
    Zap,
    GraduationCap,
    ChevronRight,
    ChevronLeft
} from 'lucide-react';
import EmilImage from "./images/photo_2024-08-02 19.36.29.jpeg";
import DauletImage from "./images/photo_2024-08-02 19.36.32.jpeg";
import NurbekImage from "./images/photo_2024-08-02 19.36.27.jpeg";
import ErkebulanImage from "./images/photo_2024-08-02 19.36.35.jpeg";

const Home = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
    const [isVisible, setIsVisible] = useState({});
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

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
            rating: 5,
            image: EmilImage
        },
        {
            text: "Менің балама MathBilimAI платформасы өте ұнады. Ол енді математикаға деген қызығушылығын арттырды.",
            author: "Даулет", 
            role: "Оқушы",
            rating: 5,
            image: DauletImage
        },
        {
            text: "Платформа өте ыңғайлы және пайдалы. Менің нәтижелерім бірден жақсарды.",
            author: "Нурбек",
            role: "Оқушы", 
            rating: 5,
            image: NurbekImage
        },
        {
            text: "MathBilimAI платформада оқудың көптеген жолдарын ұсынады. Бұл менің оқуымды жақсартты.",
            author: "Еркебулан",
            role: "Оқушы",
            rating: 5,
            image: ErkebulanImage
        }
    ];

    const stats = [
        { icon: BookOpen, value: "500+", label: "Есептер мен материалдар" },
        { icon: Brain, value: "AI", label: "Жасанды интеллект көмекшісі" },
        { icon: Target, value: "ҰБТ", label: "Дайындық материалдары" },
        { icon: Clock, value: "24/7", label: "Кез келген уақытта" }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [testimonials.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
        );

        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Head>
                <title>MathBilimAI - Сіздің математикалық ИИ мұғаліміңіз</title>
                <meta name="description" content="MathBilimAI - Математикалық білім беру үшін ең жақсы ИИ мұғаліміңіз." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
            </Head>

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                    {/* Modern Background */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50" />
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            opacity: 0.4
                        }} />
                    </div>
                    
                    <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Left Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-center lg:text-left space-y-8"
                            >
                                {/* Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                                >
                                    <Sparkles className="w-4 h-4" />
                                    Жасанды интеллект арқылы оқыту
                                </motion.div>

                                {/* Main Heading */}
                                <div className="space-y-4">
                                    <motion.h1
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                                    >
                                        Математиканы{' '}
                                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                            AI арқылы
                                        </span>{' '}
                                        үйреніңіз
                                    </motion.h1>

                                    <motion.p
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0"
                                    >
                                        ҰБТ-ға дайындалу үшін жасанды интеллект көмекшісі, интерактивті есептер және жеке дайындық жоспары
                                    </motion.p>
                                </div>

                                {/* Features List */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0"
                                >
                                    {[
                                        { icon: Brain, text: "AI математика мұғалімі" },
                                        { icon: Target, text: "ҰБТ дайындық материалдары" },
                                        { icon: Calculator, text: "Интерактивті есептер" },
                                        { icon: GraduationCap, text: "Жеке оқу жоспары" }
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <feature.icon className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <span className="text-gray-700 font-medium">{feature.text}</span>
                                        </div>
                                    ))}
                                </motion.div>

                                {/* CTA Buttons */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                                >
                                    <motion.button
                                        onClick={handleGetStarted}
                                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 overflow-hidden"
                                    >
                                        <span className="relative z-10 flex items-center justify-center">
                                            Оқуды бастау
                                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                    </motion.button>

                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="group px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-300 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
                                        onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                                    >
                                        <span className="flex items-center justify-center">
                                            <Play className="mr-2 w-5 h-5" />
                                            Демо көру
                                        </span>
                                    </motion.button>
                                </motion.div>

                                {/* Trust indicators */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="pt-8 border-t border-gray-200"
                                >
                                    <p className="text-sm text-gray-500 mb-4">Сенімді таңдау:</p>
                                    <div className="flex items-center justify-center lg:justify-start space-x-6">
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                            <span className="text-sm text-gray-600">Тегін басталады</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                            <span className="text-sm text-gray-600">Кредит картасы қажет емес</span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Updated Stats */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.9 }}
                                    className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
                                >
                                    {stats.map((stat, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                                            className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                        >
                                            <stat.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                                            <div className="text-lg font-bold text-gray-800">{stat.value}</div>
                                            <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>

                            {/* Right Content - Interactive Demo */}
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="relative lg:block hidden"
                            >
                                {/* Main Demo Container */}
                                <div className="relative">
                                    {/* Chat Interface Mockup */}
                                    <div className="bg-white rounded-3xl shadow-2xl p-6 border border-gray-100 max-w-md mx-auto">
                                        {/* Header */}
                                        <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                                <Brain className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900">AI Математика Мұғалімі</h3>
                                                <p className="text-sm text-green-500 flex items-center">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                                                    Қосылған
                                                </p>
                                            </div>
                                        </div>

                                        {/* Chat Messages */}
                                        <div className="space-y-4 py-4">
                                            <motion.div 
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 1.5 }}
                                                className="bg-gray-50 rounded-2xl p-4 max-w-xs"
                                            >
                                                <p className="text-gray-700 text-sm">Сәлем! Математика есебін шығаруға көмек керек пе?</p>
                                            </motion.div>
                                            
                                            <motion.div 
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 2 }}
                                                className="bg-blue-500 text-white rounded-2xl p-4 max-w-xs ml-auto"
                                            >
                                                <p className="text-sm">Квадрат теңдеуді қалай шешуге болады?</p>
                                            </motion.div>

                                            <motion.div 
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 2.5 }}
                                                className="bg-gray-50 rounded-2xl p-4 max-w-sm"
                                            >
                                                <p className="text-gray-700 text-sm mb-3">Квадрат теңдеу ax² + bx + c = 0 формуласымен шешіледі:</p>
                                                <div className="bg-white rounded-lg p-3 font-mono text-sm border border-gray-200">
                                                    x = (-b ± √(b²-4ac)) / 2a
                                                </div>
                                                <p className="text-gray-600 text-xs mt-2">Мысал арқылы көрсетейін ме?</p>
                                            </motion.div>
                                        </div>

                                        {/* Input Area */}
                                        <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
                                            <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3">
                                                <p className="text-gray-400 text-sm">Сұрағыңызды жазыңыз...</p>
                                            </div>
                                            <motion.button 
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors"
                                            >
                                                <ArrowRight className="w-4 h-4 text-white" />
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Floating Elements */}
                                    <motion.div
                                        animate={{ 
                                            y: [0, -10, 0],
                                            rotate: [0, 5, 0]
                                        }}
                                        transition={{ 
                                            duration: 4, 
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute -top-6 -right-6 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg"
                                    >
                                        <Calculator className="w-8 h-8 text-white" />
                                    </motion.div>

                                    <motion.div
                                        animate={{ 
                                            y: [0, 10, 0],
                                            rotate: [0, -3, 0]
                                        }}
                                        transition={{ 
                                            duration: 5, 
                                            repeat: Infinity, 
                                            delay: 1.5,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
                                    >
                                        <Target className="w-6 h-6 text-white" />
                                    </motion.div>

                                    {/* Mathematical symbols */}
                                    <motion.div
                                        animate={{ 
                                            y: [0, -8, 0],
                                            opacity: [0.3, 0.6, 0.3]
                                        }}
                                        transition={{ 
                                            duration: 3, 
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute top-1/3 -left-8 text-4xl text-blue-300 font-bold"
                                    >
                                        π
                                    </motion.div>

                                    <motion.div
                                        animate={{ 
                                            y: [0, 12, 0],
                                            opacity: [0.3, 0.6, 0.3]
                                        }}
                                        transition={{ 
                                            duration: 4, 
                                            repeat: Infinity, 
                                            delay: 1,
                                            ease: "easeInOut"
                                        }}
                                        className="absolute bottom-1/3 -right-8 text-3xl text-purple-300 font-bold"
                                    >
                                        ∫
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Enhanced Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="flex flex-col items-center"
                        >
                            <span className="text-sm text-gray-500 mb-2">Мүмкіндіктерді көру</span>
                            <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center p-1">
                                <motion.div 
                                    animate={{ y: [0, 12, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-1 h-3 bg-gray-400 rounded-full"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </section>
                {/* Features Section */}
                <section id="features" className="py-20 md:py-32 bg-white" data-animate>
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                                Мүмкіндіктер
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Неге <span className="text-blue-600">MathBilimAI</span> таңдау керек?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Биздің платформа заманауи технологиялар мен дәстүрлі білім беру әдістерін үйлестіреді
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FeatureCard
                                icon={<Brain className="w-12 h-12" />}
                                title="ИИ мұғалім"
                                description="Жасанды интеллект арқылы жекелеген оқыту жоспары мен нақты кеңестер алыңыз"
                                delay={0.2}
                            />
                            <FeatureCard
                                icon={<Target className="w-12 h-12" />}
                                title="Дәл талдау"
                                description="Әлсіз тұстарыңызды анықтап, мақсатты дайындық жоспарын құрастырамыз"
                                delay={0.4}
                            />
                            <FeatureCard
                                icon={<Zap className="w-12 h-12" />}
                                title="Жылдам нәтиже"
                                description="Қысқа мерзімде ЕНТ нәтижелеріңізді айтарлықтай жақсартыңыз"
                                delay={0.6}
                            />
                        </div>
                    </div>
                </section>

                {/* How it Works Section */}
                <section className="py-20 md:py-32 bg-gradient-to-br from-blue-50 to-indigo-100" data-animate>
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <span className="inline-block px-4 py-2 bg-white text-blue-700 rounded-full text-sm font-semibold mb-4">
                                Процесс
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Қалай жұмыс істейді?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Төрт қарапайым қадамда сіздің математикалық білімдеріңізді жақсартыңыз
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { step: "01", title: "Тіркелу", desc: "Жүйеге тіркеліп, жеке кабинетіңізді ашыңыз" },
                                { step: "02", title: "Тестілеу", desc: "Бастапқы деңгейіңізді анықтау үшін тест тапсырыңыз" },
                                { step: "03", title: "Дайындық", desc: "ИИ мұғалім жеке дайындық жоспарын құрастырады" },
                                { step: "04", title: "Нәтиже", desc: "Тұрақты дайындық арқылы жоғары нәтижеге жетіңіз" }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="text-center group"
                                >
                                    <div className="relative mb-6">
                                        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110">
                                            {item.step}
                                        </div>
                                        {index < 3 && (
                                            <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-purple-300" />
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-20 md:py-32 bg-white overflow-hidden" data-animate>
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold mb-4">
                                Пікірлер
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                                Студенттер не дейді?
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Біздің платформамызды қолданған студенттердің нақты пікірлері
                            </p>
                        </motion.div>

                        <div className="relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentTestimonialIndex}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ duration: 0.5 }}
                                    className="max-w-4xl mx-auto"
                                >
                                    <TestimonialCard testimonial={testimonials[currentTestimonialIndex]} />
                                </motion.div>
                            </AnimatePresence>

                            {/* Navigation dots */}
                            <div className="flex justify-center gap-3 mt-8">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentTestimonialIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            index === currentTestimonialIndex
                                                ? "bg-blue-600 w-8"
                                                : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="flex flex-wrap justify-center items-center w-full h-full">
                        <span className="text-6xl mx-4 my-2">∑</span>
                        <span className="text-4xl mx-4 my-2">∫</span>
                        <span className="text-5xl mx-4 my-2">π</span>
                        <span className="text-3xl mx-4 my-2">√</span>
                        <span className="text-4xl mx-4 my-2">∆</span>
                        <span className="text-5xl mx-4 my-2">α</span>
                    </div>
                </div>

                <div className="relative z-10 py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                            {/* Brand */}
                            <div className="md:col-span-2">
                                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    MathBilimAI
                                </h3>
                                <p className="text-gray-300 mb-6 leading-relaxed">
                                    Жасанды интеллект технологиясы арқылы математикалық білімді дамыту және ЕНТ-ға сапалы дайындық ұсынатын платформа.
                                </p>
                                <div className="flex gap-4">
                                    <motion.a
                                        href="#"
                                        whileHover={{ scale: 1.1 }}
                                        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                        </svg>
                                    </motion.a>
                                    <motion.a
                                        href="#"
                                        whileHover={{ scale: 1.1 }}
                                        className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                        </svg>
                                    </motion.a>
                                    <motion.a
                                        href="#"
                                        whileHover={{ scale: 1.1 }}
                                        className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001.012.001z.017 0z"/>
                                        </svg>
                                    </motion.a>
                                </div>
                            </div>

                            {/* Links */}
                            <div>
                                <h4 className="text-lg font-semibold mb-4">Платформа</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li><Link href="/dashboard" className="hover:text-white transition-colors">Басты бет</Link></li>
                                    <li><Link href="/tests" className="hover:text-white transition-colors">Тесттер</Link></li>
                                    <li><Link href="/materials" className="hover:text-white transition-colors">Материалдар</Link></li>
                                    <li><Link href="/chat" className="hover:text-white transition-colors">ИИ мұғалім</Link></li>
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-lg font-semibold mb-4">Қолдау</h4>
                                <ul className="space-y-2 text-gray-300">
                                    <li><Link href="#" className="hover:text-white transition-colors">Жиі қойылатын сұрақтар</Link></li>
                                    <li><Link href="#" className="hover:text-white transition-colors">Қолдау қызметі</Link></li>
                                    <li><Link href="#" className="hover:text-white transition-colors">Құпиялылық саясаты</Link></li>
                                    <li><Link href="#" className="hover:text-white transition-colors">Қызмет шарттары</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-gray-700 pt-8 text-center">
                            <p className="text-gray-300">
                                © 2024 MathBilimAI. Барлық құқықтар қорғалған. 
                                <span className="block mt-2 text-sm">
                                    Made with ❤️ for Kazakhstan students
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Decorative Wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" className="w-full h-auto">
                        <path
                            fill="url(#wave-gradient)"
                            d="M0,60 C240,120 480,120 720,60 C960,0 1200,0 1440,60 L1440,120 L0,120 Z"
                        />
                        <defs>
                            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3B82F6" />
                                <stop offset="50%" stopColor="#8B5CF6" />
                                <stop offset="100%" stopColor="#6366F1" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </footer>
        </div>
    );
};

// Updated Feature Card Component
type FeatureCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    delay?: number;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
    >
        <div className="text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
);

// Testimonial Card Component
type TestimonialCardProps = {
    testimonial: {
        text: string;
        author: string;
        role: string;
        rating: number;
        image: any;
    };
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => (
    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
        <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
                <img
                    src={testimonial.image.src}
                    alt={testimonial.author}
                    className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                />
            </div>
            <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>
                <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed italic">
                    "{testimonial.text}"
                </blockquote>
                <div>
                    <div className="font-semibold text-gray-900 text-lg">{testimonial.author}</div>
                    <div className="text-blue-600 font-medium">{testimonial.role}</div>
                </div>
            </div>
        </div>
    </div>
);

export default Home;
