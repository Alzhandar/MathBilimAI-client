import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Link from "next/link";
import Img from "./images/Social-Math_2880x1700_Lede.jpg";

const Home = () => {
    const { user } = useAuth();
    const router = useRouter();

    const handleGetStarted = () => {
        if (user) {
            router.push('/dashboard');
        } else {
            router.push('/login');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                    <div className="container mx-auto px-4 md:px-6 space-y-8 lg:space-y-12">
                        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:gap-12">
                            <div className="flex flex-col justify-center">
                                <h1 className="text-3xl font-bold tracking-tighter text-blue-600 sm:text-4xl md:text-5xl lg:text-6xl">
                                    MathTeachAI-ға қош келдіңіз
                                </h1>
                                <p className="mt-4 max-w-[600px] text-gray-700 md:text-xl lg:text-lg">
                                    MathTeachAI сізге ЕНТ-ға дайындалуға көмектесетін онлайн платформа. Біз сіздің әлсіз тұстарыңызды анықтап, қажетті материалдарды ұсынатын ИИ-оқытушыны ұсынамыз.
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
                            <div>
                                <img
                                    src={Img.src}
                                    width="600"
                                    height="400"
                                    alt="Hero"
                                    className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover"
                                />
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
                                    MathTeachAI платформасы сізге тесттерді оңай жасауға, тапсырмаларды автоматты түрде бағалауға және білім алу үшін қажетті материалдарды ұсынуға көмектеседі.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
                            <FeatureCard 
                                icon={<FilePenIcon className="h-8 w-8 text-blue-600" />}
                                title="Тест жасау оңайлығы"
                                description="Интуитивті интерфейс бірнеше сұрақ түрлерімен тесттерді оңай жасауға мүмкіндік береді."
                            />
                            <FeatureCard 
                                icon={<LayoutTemplateIcon className="h-8 w-8 text-blue-600" />}
                                title="Баптауға болатын шаблондар"
                                description="Икемді шаблондарымызбен тесттеріңіздің көрінісін және сезімін дербестеңіз."
                            />
                            <FeatureCard 
                                icon={<CheckIcon className="h-8 w-8 text-blue-600" />}
                                title="Автоматты бағалау"
                                description="Тесттерді бірден бағалайтын автоматты бағалау функциясымен уақытыңызды үнемдеңіз."
                            />
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
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter text-blue-600 sm:text-4xl md:text-5xl">Қалай жұмыс істейді</h2>
                                <p className="max-w-[700px] text-gray-700 md:text-xl lg:text-lg">
                                    MathTeachAI сізге өзіңізді тексеруге және әлсіз жақтарыңызды жақсартуға көмектеседі. Біздің ИИ-оқытушы сізге дұрыс жолды көрсетеді.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <section className="bg-gray-100 w-full py-12 md:py-24">
                    <div className="container mx-auto px-4 md:px-6 space-y-8 lg:space-y-12">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter text-blue-600 sm:text-4xl md:text-5xl">Жол картасы</h2>
                                <p className="max-w-[700px] text-gray-700 md:text-xl lg:text-lg">
                                    MathTeachAI-дың болашақ жоспарларын қарап шығыңыз.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute h-full border border-blue-600 left-1/2 transform -translate-x-1/2"></div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col items-center text-center relative">
                                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                                        <span className="text-2xl font-bold">Q1</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-blue-600 mb-2">Бастау</h3>
                                    <p className="text-gray-700">Платформаны іске қосу және алғашқы пайдаланушыларды жинау.</p>
                                    <div className="absolute bg-blue-600 w-4 h-4 rounded-full left-1/2 transform -translate-x-1/2 -bottom-2"></div>
                                </div>
                                <div className="flex flex-col items-center text-center relative">
                                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                                        <span className="text-2xl font-bold">Q2</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-blue-600 mb-2">Кеңейту</h3>
                                    <p className="text-gray-700">Жаңа пәндер мен функцияларды қосу, қолданушылар санын көбейту.</p>
                                    <div className="absolute bg-blue-600 w-4 h-4 rounded-full left-1/2 transform -translate-x-1/2 -bottom-2"></div>
                                </div>
                                <div className="flex flex-col items-center text-center relative">
                                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                                        <span className="text-2xl font-bold">Q3</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-blue-600 mb-2">Серіктестік</h3>
                                    <p className="text-gray-700">Білім беру ұйымдарымен серіктестік орнату.</p>
                                    <div className="absolute bg-blue-600 w-4 h-4 rounded-full left-1/2 transform -translate-x-1/2 -bottom-2"></div>
                                </div>
                                <div className="flex flex-col items-center text-center relative">
                                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                                        <span className="text-2xl font-bold">Q4</span>
                                    </div>
                                    <h3 className="text-xl font-semibold text-blue-600 mb-2">Глобалды өсу</h3>
                                    <p className="text-gray-700">Платформаны халықаралық деңгейде кеңейту.</p>
                                    <div className="absolute bg-blue-600 w-4 h-4 rounded-full left-1/2 transform -translate-x-1/2 -bottom-2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-white w-full py-12 md:py-24">
                    <div className="container mx-auto px-4 md:px-6 space-y-8 lg:space-y-12">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter text-blue-600 sm:text-4xl md:text-5xl">Пайдаланушылардың пікірлері</h2>
                                <p className="max-w-[700px] text-gray-700 md:text-xl lg:text-lg">
                                    Біздің платформамызды қолданған пайдаланушылардың пікірлері.
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                <p className="text-gray-800">"MathTeachAI маған ЕНТ-ға дайындалуға көп көмектесті. Әсіресе ИИ оқытушының ұсыныстары пайдалы болды."</p>
                                <div className="flex items-center mt-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">A</div>
                                    <div className="ml-4">
                                        <p className="text-gray-800 font-semibold">Айдана</p>
                                        <p className="text-gray-600">Оқушы</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                <p className="text-gray-800">"Менің балама MathTeachAI платформасы өте ұнады. Ол енді математикаға деген қызығушылығын арттырды."</p>
                                <div className="flex items-center mt-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">B</div>
                                    <div className="ml-4">
                                        <p className="text-gray-800 font-semibold">Бауыржан</p>
                                        <p className="text-gray-600">Ата-ана</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                                <p className="text-gray-800">"Платформа өте ыңғайлы және пайдалы. Менің нәтижелерім бірден жақсарды."</p>
                                <div className="flex items-center mt-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">C</div>
                                    <div className="ml-4">
                                        <p className="text-gray-800 font-semibold">Саида</p>
                                        <p className="text-gray-600">Оқушы</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-gray-100 w-full py-12 md:py-24">
                    <div className="container mx-auto px-4 md:px-6 space-y-8 lg:space-y-12">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter text-blue-600 sm:text-4xl md:text-5xl">Бізбен байланысыңыз</h2>
                                <p className="max-w-[700px] text-gray-700 md:text-xl lg:text-lg">
                                    Әлеуметтік желілер арқылы бізбен байланысыңыз.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-center space-x-6">
                            <Link href="https://www.instagram.com" legacyBehavior>
                                <a target="_blank" className="text-blue-600 hover:text-blue-800">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 2.2.3 3 .7.8.4 1.5 1 2 2 .4.8.6 1.8.7 3 .1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 2.2-.7 3-.4.8-1 1.5-2 2-.8.4-1.8.6-3 .7-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-2.2-.3-3-.7-.8-.4-1.5-1-2-2-.4-.8-.6-1.8-.7-3-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.3-2.2.7-3 .4-.8 1-1.5 2-2 .8-.4 1.8-.6 3-.7 1.2-.1 1.6-.1 4.8-.1zm0-2.2c-3.2 0-3.7 0-4.9.1-1.3.1-2.3.3-3.2.7-.9.4-1.7.9-2.5 1.7-.7.7-1.3 1.6-1.7 2.5-.4.9-.6 1.9-.7 3.2-.1 1.2-.1 1.7-.1 4.9s0 3.7.1 4.9c.1 1.3.3 2.3.7 3.2.4.9.9 1.7 1.7 2.5.7.7 1.6 1.3 2.5 1.7.9.4 1.9.6 3.2.7 1.2.1 1.7.1 4.9.1s3.7 0 4.9-.1c1.3-.1 2.3-.3 3.2-.7.9-.4 1.7-.9 2.5-1.7.7-.7 1.3-1.6 1.7-2.5.4-.9.6-1.9.7-3.2.1-1.2.1-1.7.1-4.9s0-3.7-.1-4.9c-.1-1.3-.3-2.3-.7-3.2-.4-.9-.9-1.7-1.7-2.5-.7-.7-1.6-1.3-2.5-1.7-.9-.4-1.9-.6-3.2-.7-1.2-.1-1.7-.1-4.9-.1zm0 5.9a6.1 6.1 0 100 12.2 6.1 6.1 0 000-12.2zm0 10a3.9 3.9 0 110-7.8 3.9 3.9 0 010 7.8zm6.4-10.8c0 .8-.7 1.4-1.4 1.4-.8 0-1.4-.7-1.4-1.4 0-.8.7-1.4 1.4-1.4.8 0 1.4.7 1.4 1.4z"/>
                                    </svg>
                                </a>
                            </Link>
                            <Link href="https://www.whatsapp.com" legacyBehavior>
                                <a target="_blank" className="text-blue-600 hover:text-blue-800">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.2 2.2a10 10 0 100 19.7h.1c.7 0 1.5-.1 2.3-.3 1-.3 1.8-.8 2.7-1.4l1.5.4c.6.2 1.1.4 1.6.5s.9.1 1.2-.1c.3-.2.6-.5.7-1.1.1-.3.1-.5.1-.8v-.5c0-.1 0-.2-.1-.2s-.1-.1-.2-.1l-2.2-.7a5.7 5.7 0 01-1.8-1.2c-.5-.4-.9-.8-1.3-1.3-.2-.3-.4-.5-.6-.7-.2-.2-.5-.3-.8-.3s-.5.1-.7.3l-.9.9c-.1.1-.2.2-.4.3-.1.1-.3.1-.4.1a3 3 0 01-1.4-.6 11.6 11.6 0 01-2.8-3 7 7 0 01-.7-1.4c-.1-.3-.2-.6 0-.8.1-.2.3-.4.4-.5.3-.3.5-.7.8-1s.4-.6.6-.9.2-.6.1-.9c0-.3 0-.5-.2-.7-.2-.2-.5-.4-.7-.6l-.5-.4c-.2-.1-.5-.2-.7-.3-.3-.1-.6-.1-.9 0s-.7.3-1 .5l-.5.3c-.3.1-.5.3-.8.5a4 4 0 00-.8 1.4c-.3.9-.4 1.7-.3 2.5.1.9.4 1.8.7 2.6.3.9.8 1.8 1.4 2.6 1.6 2.2 3.6 4.1 6 5.4a11.4 11.4 0 002.9 1c.6.1 1.3.2 1.9.2.8 0 1.7-.1 2.6-.3.9-.2 1.7-.7 2.5-1.2.8-.5 1.5-1.2 2.1-1.9.6-.7 1.1-1.5 1.5-2.4.4-.9.7-1.8.9-2.8.2-.9.2-1.8.1-2.8-.1-1-.3-1.9-.7-2.8a10.3 10.3 0 00-3.7-4.5A10.2 10.2 0 0012.2 2.2zm.8 18.4h-.1a8.2 8.2 0 01-4.6-1.4 9.2 9.2 0 01-3.2-4.1 8.7 8.7 0 01-.6-2.9 8.3 8.3 0 011.2-4.4c.7-1 1.7-1.8 2.8-2.4a7.9 7.9 0 014.6-1c1.6.1 3.1.7 4.4 1.7a8.4 8.4 0 012.7 3.4c.3.8.5 1.6.6 2.4.1 1.4-.1 2.8-.7 4a7.7 7.7 0 01-2.5 3c-.7.5-1.4.8-2.2 1 .5.7 1.1 1.3 1.7 1.7.5.4 1.1.8 1.7 1.2l.1.1h-.1c-.5-.1-1-.2-1.6-.4l-2-.5c-.7.4-1.5.7-2.3 1z"/>
                                    </svg>
                                </a>
                            </Link>
                            <Link href="https://telegram.org" legacyBehavior>
                                <a target="_blank" className="text-blue-600 hover:text-blue-800">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm3.6 7.8l-1.4 6.8c-.1.4-.3.6-.7.6h-.1c-.3 0-.5-.1-.8-.3l-2.4-1.8-1.1 1.1c-.1.1-.3.2-.4.3-.2.1-.3.1-.5.1h-.3c-.2 0-.3-.1-.4-.3-.2-.2-.2-.4-.2-.6v-3.2c0-.5.3-.9.6-1l5.4-4.6c.2-.2.5-.2.8-.2.2.1.5.2.7.3.2.2.3.4.3.7zm-6.3 3.6v1.8l.9-.9.8-.7-1.7 1.4zm4.5 2.4l1.1-5.3-4 3.4 2.9 1.9z"/>
                                    </svg>
                                </a>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full items-center px-4 md:px-6 border-t bg-white">
                <p className="text-xs text-gray-500">&copy; 2024 MathTeachAI. Барлық құқықтар қорғалған.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link href="#" className="text-xs text-blue-600 hover:underline underline-offset-4" prefetch={false}>
                        Қызмет көрсету шарттары
                    </Link>
                    <Link href="#" className="text-xs text-blue-600 hover:underline underline-offset-4" prefetch={false}>
                        Құпиялылық
                    </Link>
                </nav>
            </footer>
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

const CheckIcon: React.FC<IconProps> = (props) => (
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
        <path d="M20 6 9 17l-5-5" />
    </svg>
);

const FilePenIcon: React.FC<IconProps> = (props) => (
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
        <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
);

const LayoutTemplateIcon: React.FC<IconProps> = (props) => (
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
        <rect width="18" height="7" x="3" y="3" rx="1" />
        <rect width="9" height="7" x="3" y="14" rx="1" />
        <rect width="5" height="7" x="16" y="14" rx="1" />
    </svg>
);

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
