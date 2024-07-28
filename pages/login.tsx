import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(email, password);
            router.push('/');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">MathTeachAI-ға кіру</h1>
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
                                        <path d="M10 2a8 8 0 00-7.446 4.032A8.003 8.003 0 0110 4a8.003 8.003 0 017.446 2.032A8 8 0 0010 2zM4.93 6.032a6 6 0 1110.14 0A8.003 8.003 0 0010 6a8.003 8.003 0 00-5.07 2.032zM10 12a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 4a8 8 0 00-7.446 4.032A8.003 8.003 0 0110 6a8.003 8.003 0 017.446 2.032A8 8 0 0010 4zM4.93 8.032A6 6 0 1015.07 8.032A8.003 8.003 0 0010 6a8.003 8.003 0 00-5.07 2.032zM10 16a6 6 0 016 6v1H4v-1a6 6 0 016-6z" />
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
                    <Link href="/register" className="text-blue-500 hover:underline">Аккаунтыңыз жоқ па? Тіркелу</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
