import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

const Navbar = () => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogoClick = () => {
        if (user) {
            router.push('/dashboard');
        } else {
            router.push('/');
        }
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
                : 'bg-white/80 backdrop-blur-sm'
        }`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 lg:h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div 
                            className="flex items-center space-x-2 cursor-pointer group"
                            onClick={handleLogoClick}
                        >
                            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                                <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-700 transition-all duration-300">
                                MathBilimAI
                            </span>
                        </div>
                    </div>
                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {user ? (
                            <>
                                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                                    <span>Басты бет</span>
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                                <Link href="/chat" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                                    <span>AI Чат</span>
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                                <Link href="/tests" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                                    <span>Тесттер</span>
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                                <Link href="/materials" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                                    <span>Материалдар</span>
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                                <Link href="/upload-task" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group">
                                    <span>Тапсырма жүктеу</span>
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                                </Link>
                                
                                {/* User Menu */}
                                <div className="flex items-center space-x-4">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-semibold">
                                            {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                                        </span>
                                    </div>
                                    <button 
                                        onClick={handleLogout} 
                                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 transition-colors duration-200"
                                    >
                                        Шығу
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                                    Кіру
                                </Link>
                                <Link href="/register" className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                                    Тіркелу
                                </Link>
                            </div>
                        )}
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button 
                            onClick={toggleMenu} 
                            className="p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 ${
                isOpen 
                    ? 'max-h-screen opacity-100 bg-white/95 backdrop-blur-md border-t border-gray-100' 
                    : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
                <div className="px-4 py-6 space-y-4">
                    {user ? (
                        <>
                            {/* User Info */}
                            <div className="flex items-center space-x-3 pb-4 border-b border-gray-100">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center">
                                    <span className="text-white font-semibold">
                                        {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{user.username || 'Пользователь'}</p>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                </div>
                            </div>

                            {/* Navigation Links */}
                            <div className="space-y-3">
                                <Link href="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2v0" />
                                    </svg>
                                    <span className="font-medium">Басты бет</span>
                                </Link>
                                
                                <Link href="/chat" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    <span className="font-medium">AI Чат</span>
                                </Link>

                                <Link href="/tests" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                    <span className="font-medium">Тесттер</span>
                                </Link>

                                <Link href="/materials" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    <span className="font-medium">Материалдар</span>
                                </Link>

                                <Link href="/upload-task" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    <span className="font-medium">Тапсырма жүктеу</span>
                                </Link>
                            </div>

                            {/* Logout Button */}
                            <button 
                                onClick={handleLogout} 
                                className="w-full flex items-center justify-center space-x-2 p-3 mt-6 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200 font-medium"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Шығу</span>
                            </button>
                        </>
                    ) : (
                        <div className="space-y-4">
                            <Link href="/login" className="block w-full p-3 text-center text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium">
                                Кіру
                            </Link>
                            <Link href="/register" className="block w-full p-3 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 font-medium shadow-lg">
                                Тіркелу
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;