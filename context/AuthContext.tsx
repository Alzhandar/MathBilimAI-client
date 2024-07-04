import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode'; 
import api from '../pages/api/api';

interface User {
    id: string;
    username: string;
    email: string;
}

interface Chat {
    title: string;
    messages: string[];
}

interface AuthContextProps {
    user: User | null;
    chats: { [key: string]: Chat };
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    addMessageToChat: (chatId: string, message: string) => void;
    createNewChat: () => string;
    updateChatTitle: (chatId: string, title: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [chats, setChats] = useState<{ [key: string]: Chat }>(() => {
        if (typeof window !== 'undefined') {
            const storedChats = localStorage.getItem('chats');
            return storedChats ? JSON.parse(storedChats) : {};
        }
        return {};
    });
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // @ts-ignore
                    const decodedToken: any = jwt_decode(token);
                    if (decodedToken.exp * 1000 < Date.now()) {
                        logout();
                    } else {
                        setUser(decodedToken);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    }
                } catch (error) {
                    console.error('Invalid token', error);
                    logout();
                }
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('chats', JSON.stringify(chats));
        }
    }, [chats]);

    const login = async (email: string, password: string) => {
        try {
            const res = await api.post('/api/auth/login', { email, password });
            setUser(res.data.user);
            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            router.push('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    const register = async (username: string, email: string, password: string) => {
        try {
            await api.post('/api/auth/register', { username, email, password });
            router.push('/login');
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        router.push('/login');
    };

    const addMessageToChat = (chatId: string, message: string) => {
        setChats((prevChats) => {
            const updatedChat = {
                ...prevChats[chatId],
                messages: [...prevChats[chatId].messages, message],
            };
            return { ...prevChats, [chatId]: updatedChat };
        });
    };

    const createNewChat = (): string => {
        const newChatId = `chat-${Date.now()}`;
        setChats((prevChats) => ({
            ...prevChats,
            [newChatId]: { title: `Chat ${Object.keys(prevChats).length + 1}`, messages: [] },
        }));
        return newChatId;
    };

    const updateChatTitle = (chatId: string, title: string) => {
        setChats((prevChats) => ({
            ...prevChats,
            [chatId]: { ...prevChats[chatId], title },
        }));
    };

    return (
        <AuthContext.Provider value={{ user, chats, login, register, logout, addMessageToChat, createNewChat, updateChatTitle }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
