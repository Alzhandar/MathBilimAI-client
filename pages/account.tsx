import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../pages/api/api';

const Account = () => {
    const { user } = useAuth();
    const [telegramNick, setTelegramNick] = useState('');
    const [message, setMessage] = useState('');

    const handleTelegramNickSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/telegram/send-message', { telegramNick });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Failed to send message.');
            console.error('Error sending message:', (error as any).response?.data || (error as any).message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Account Information</h1>
                {user ? (
                    <div className="space-y-4">
                        <p className="text-lg font-semibold">
                            Username: <span className="text-gray-700">{user.username}</span>
                        </p>
                        <p className="text-lg font-semibold">
                            Email: <span className="text-gray-700">{user.email}</span>
                        </p>
                        <form onSubmit={handleTelegramNickSubmit} className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telegramNick">
                                Telegram Nickname
                            </label>
                            <input
                                id="telegramNick"
                                type="text"
                                value={telegramNick}
                                onChange={(e) => setTelegramNick(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 mt-4"
                            >
                                Send Telegram Nick
                            </button>
                        </form>
                        {message && <p className="text-green-600 mt-4">{message}</p>}
                    </div>
                ) : (
                    <p className="text-lg text-center text-gray-500">No user information available.</p>
                )}
            </div>
        </div>
    );
};

export default Account;
