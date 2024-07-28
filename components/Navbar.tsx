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

    return (
        <nav className="bg-white shadow-sm">
            <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
                <div className="flex items-center">
                    <span className="text-black font-bold text-2xl hover:text-blue-600 transition duration-300 cursor-pointer">MathTeachAI</span>
                </div>
                <div className="block md:hidden">
                    <button onClick={toggleMenu} className="text-black focus:outline-none">
                        ☰
                    </button>
                </div>
                <div className={`md:flex md:items-center md:space-x-6 ${isOpen ? 'block' : 'hidden'} transition-all duration-300`}>
                    <ul className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-4 md:mt-0">
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
                                    <button onClick={handleLogout} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300">Шығу</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/login" legacyBehavior>
                                        <a className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300">Кіру</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/register" legacyBehavior>
                                        <a className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition duration-300">Тіркелу</a>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;


