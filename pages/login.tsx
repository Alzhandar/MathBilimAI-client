import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        try {
            await login(email, password);
            setMessage('Вы успешно зашли!');
            setTimeout(() => {
                router.push('/dashboard');
            }, 2000);
        } catch (error) {
            setMessage('Ошибка: пользователя не существует.');
            setTimeout(() => {
                setMessage('');
            }, 2000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Кіру</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Пароль</label>
                        <div className="relative">
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-4 py-2 focus:outline-none"
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                                {isPasswordVisible ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 2C5.589 2 1.582 4.48 0 8c1.582 3.52 5.589 6 10 6s8.418-2.48 10-6c-1.582-3.52-5.589-6-10-6zm0 10a4 4 0 110-8 4 4 0 010 8zm0-6a2 2 0 100 4 2 2 0 000-4z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 2C5.589 2 1.582 4.48 0 8c1.582 3.52 5.589 6 10 6s8.418-2.48 10-6c-1.582-3.52-5.589-6-10-6zM2.213 6.213C4.266 4.16 7.037 3 10 3s5.734 1.16 7.787 3.213L16.174 9H3.826L2.213 6.213zM10 11a4 4 0 100-8 4 4 0 000 8z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center items-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291A7.964 7.964 0 014 12H2c0 2.042.78 3.894 2.05 5.291l1.95-1.95z"></path>
                            </svg>
                        ) : (
                            'Кіру'
                        )}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <Link href="/register" legacyBehavior>
                        <a className="text-blue-500 hover:underline">Аккаунтыңыз жоқ па? Тіркелу</a>
                    </Link>
                </div>
                {message && (
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
