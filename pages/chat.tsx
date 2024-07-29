import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const Chat = () => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Array<{ role: string, content: string }>>([
        { role: 'assistant', content: 'Сәлем! Менің атым Ернар, мен математика бойынша кез келген сұрақтарыңызға жауап беруге дайынмын.' }
    ]);
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useAuth();
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const storedMessages = localStorage.getItem('messages');
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('messages', JSON.stringify(messages));
        }
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (message.trim() && !loading) {
            setLoading(true);
            const newMessages = [...messages, { role: 'user', content: message }];
            setMessages(newMessages);
            setMessage('');
            setIsTyping(true);
            try {
                const res = await axios.post('https://mathbilimai-server.onrender.com/api/ai/chat', { messages: newMessages }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setMessages([...newMessages, { role: 'assistant', content: res.data.answer }]);
            } catch (error) {
                console.error('Хабарды жіберу қатесі:', error);
            } finally {
                setLoading(false);
                setIsTyping(false);
            }
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="bg-white shadow-xl rounded-lg p-6 w-full max-w-6xl flex flex-col h-[85vh]">
                <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Ернармен сөйлесу</h1>
                <div className="flex-1 overflow-y-scroll p-4 border border-gray-200 rounded-lg mb-4 bg-gray-50 shadow-inner">
                    {messages.length > 0 ? (
                        messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                                <div className={`px-4 py-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100 text-black' : 'bg-gray-200 text-black'} max-w-xs break-words`}>
                                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-500">Әзірге хабарламалар жоқ.</p>
                    )}
                    {isTyping && (
                        <div className="flex items-center justify-start mb-2">
                            <p className="px-4 py-2 rounded-lg bg-gray-200 text-black max-w-xs break-words">
                                Ернар жазып жатыр
                                <span className="dot-1">.</span>
                                <span className="dot-2">.</span>
                                <span className="dot-3">.</span>
                            </p>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Хабарламаңызды жазыңыз"
                        className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                        disabled={loading}
                    >
                        Жіберу
                    </button>
                </div>
            </div>
            <style jsx>{`
                .dot-1,
                .dot-2,
                .dot-3 {
                    display: inline-block;
                    opacity: 0;
                    animation: blink 1s infinite;
                }

                .dot-2 {
                    animation-delay: 0.2s;
                }

                .dot-3 {
                    animation-delay: 0.4s;
                }

                @keyframes blink {
                    0%, 20% {
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
};

export default Chat;
