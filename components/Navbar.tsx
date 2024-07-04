import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from '../pages/images/IMG_3235.jpg';

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
        <nav className="bg-black p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <Image src={logo} alt="MathTeachAI Logo" width={40} height={40} className="mr-2" />
                    <span className="text-white font-bold text-xl">MathTeachAI</span>
                </div>
                <div className="block md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        ☰
                    </button>
                </div>
                <ul className={`flex-col md:flex-row flex md:space-x-4 ${isOpen ? 'flex' : 'hidden'} md:flex`}>
                    {user && (
                        <div className='font-bold space-x-2 flex flex-col md:flex-row items-center'>
                            <Link href="/dashboard" legacyBehavior>
                                <a className="text-white hover:text-gray-300">Dashboard</a>
                            </Link>
                            <Link href="/chat" legacyBehavior>
                                <a className="text-white hover:text-gray-300">Chat</a>
                            </Link>
                            <Link href="/tests" legacyBehavior>
                                <a className="text-white hover:text-gray-300">Tests</a>
                            </Link>
                            <Link href="/materials" legacyBehavior>
                                <a className="text-white hover:text-gray-300">Materials</a>
                            </Link>
                            <Link href="/account" legacyBehavior>
                                <a className="text-white hover:text-gray-300">Account</a>
                            </Link>
                            <button onClick={handleLogout} className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300">Logout</button>
                        </div>
                    )}
                    {!user && (
                        <>
                            <li>
                                <Link href="/login" legacyBehavior>
                                    <a className="text-white hover:text-gray-300">Login</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" legacyBehavior>
                                    <a className="text-white hover:text-gray-300">Register</a>
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
