import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Navbar = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogoClick = () => {
        router.push('/dashboard');
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="bg-white shadow-sm">
            <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
                <div className="flex items-center">
                    <span 
                        className="text-black font-bold text-2xl hover:text-blue-600 transition duration-300 cursor-pointer"
                        onClick={handleLogoClick}
                    >
                        MathBilimAI
                    </span>
                </div>
                <div className="block md:hidden">
                    <button 
                        onClick={toggleMenu} 
                        className="text-black focus:outline-none hover:text-green-500 transition duration-300"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
                <div className="hidden md:flex md:items-center md:space-x-6">
                    <ul className="flex flex-row md:space-x-4 space-y-4 md:space-y-0 mt-4 md:mt-0">
                        {user ? (
                            <>
                                <li>
                                    <Link href="/dashboard" legacyBehavior>
                                        <a className="text-black hover:text-blue-600 transition duration-300 hover:border-b-2 hover:border-blue-600">Басты бет</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/chat" legacyBehavior>
                                        <a className="text-black hover:text-blue-600 transition duration-300 hover:border-b-2 hover:border-blue-600">Чат</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/tests" legacyBehavior>
                                        <a className="text-black hover:text-blue-600 transition duration-300 hover:border-b-2 hover:border-blue-600">Тесттер</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/materials" legacyBehavior>
                                        <a className="text-black hover:text-blue-600 transition duration-300 hover:border-b-2 hover:border-blue-600">Материалдар</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/upload-task" legacyBehavior>
                                        <a className="text-black hover:text-blue-600 transition duration-300 hover:border-b-2 hover:border-blue-600">Тапсырма жүктеу</a>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300 w-full md:w-auto">Шығу</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/login" legacyBehavior>
                                        <a className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300 w-full md:w-auto">Кіру</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/register" legacyBehavior>
                                        <a className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300 w-full md:w-auto">Тіркелу</a>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
            <div className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeMenu}></div>
            <div className={`fixed inset-y-0 right-0 w-64 bg-white shadow-md z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button onClick={closeMenu} className="absolute top-4 left-4 text-black focus:outline-none hover:text-red-500 transition duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <ul className="mt-16 space-y-4 px-4">
                    {user ? (
                        <>
                            <li>
                                <Link href="/dashboard" legacyBehavior>
                                    <a className="block text-black hover:text-blue-600 transition duration-300">Басты бет</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/chat" legacyBehavior>
                                    <a className="block text-black hover:text-blue-600 transition duration-300">Чат</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/tests" legacyBehavior>
                                    <a className="block text-black hover:text-blue-600 transition duration-300">Тесттер</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/materials" legacyBehavior>
                                    <a className="block text-black hover:text-blue-600 transition duration-300">Материалдар</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/upload-task" legacyBehavior>
                                    <a className="block text-black hover:text-blue-600 transition duration-300">Тапсырма жүктеу</a>
                                </Link>
                            </li>
                            <li>
                                <button onClick={handleLogout} className="block w-full text-left text-black hover:text-blue-600 transition duration-300">Шығу</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link href="/login" legacyBehavior>
                                    <a className="block text-black hover:text-blue-600 transition duration-300">Кіру</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" legacyBehavior>
                                    <a className="block text-black hover:text-blue-600 transition duration-300">Тіркелу</a>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
