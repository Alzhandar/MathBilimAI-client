import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import api from '../pages/api/api';

const Chat = () => {
    const [currentChatId, setCurrentChatId] = useState<string>('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [editingTitle, setEditingTitle] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>('');
    const { user, chats, addMessageToChat, createNewChat, updateChatTitle } = useAuth();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedChatId = localStorage.getItem('currentChatId');
            if (storedChatId) {
                setCurrentChatId(storedChatId);
            } else {
                const newChatId = createNewChat();
                setCurrentChatId(newChatId);
                localStorage.setItem('currentChatId', newChatId);
            }
        }
    }, []);

    useEffect(() => {
        if (currentChatId) {
            localStorage.setItem('currentChatId', currentChatId);
        }
    }, [currentChatId]);

    const handleSendMessage = async () => {
        if (message.trim() && !loading) {
            setLoading(true);
            try {
                addMessageToChat(currentChatId, `You: ${message}`);
                const res = await api.post('api/ai/chat', { question: message }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                addMessageToChat(currentChatId, `Ernar: ${res.data.answer}`);
                setMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleNewChat = () => {
        const newChatId = createNewChat();
        setCurrentChatId(newChatId);
    };

    const handleChatSwitch = (chatId: string) => {
        setCurrentChatId(chatId);
    };

    const handleTitleChange = () => {
        if (newTitle.trim()) {
            updateChatTitle(currentChatId, newTitle);
            setNewTitle('');
            setEditingTitle(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={handleNewChat} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                        New Chat
                    </button>
                    <select
                        value={currentChatId}
                        onChange={(e) => handleChatSwitch(e.target.value)}
                        className="border px-4 py-2 rounded-md"
                    >
                        {Object.keys(chats).map((chatId) => (
                            <option key={chatId} value={chatId}>
                                {chats[chatId].title}
                            </option>
                        ))}
                    </select>
                    <div className="flex items-center">
                        {editingTitle ? (
                            <div className="flex items-center">
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    className="border px-2 py-1 rounded-md"
                                />
                                <button onClick={handleTitleChange} className="bg-green-500 text-white px-2 py-1 rounded-md ml-2">
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center">
                                <span className="text-xl font-bold">{chats[currentChatId]?.title}</span>
                                <button onClick={() => setEditingTitle(true)} className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md ml-2">
                                    Edit
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="h-96 overflow-y-scroll p-4 border border-gray-200 rounded-lg mb-4 bg-gray-50">
                    {currentChatId && chats[currentChatId]?.messages ? (
                        chats[currentChatId].messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.startsWith('You:') ? 'justify-end' : 'justify-start'} mb-2`}>
                                <p className={`px-4 py-2 rounded-lg ${msg.startsWith('You:') ? 'bg-blue-100 text-black' : 'bg-gray-200 text-black'} max-w-xs break-words`}>
                                    {msg}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No messages yet.</p>
                    )}
                    {loading && (
                        <div className="flex items-center justify-center mb-4">
                            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-10 w-10"></div>
                        </div>
                    )}
                </div>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your message"
                        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                        disabled={loading}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
