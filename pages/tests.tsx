import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../pages/api/api';
import jsPDF from 'jspdf';
import axios from 'axios';

interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
}

const SkeletonLoader = () => (
    <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
    </div>
);

const Tests = () => {
    const [subject, setSubject] = useState<string>('');
    const [difficulty, setDifficulty] = useState<string>('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [score, setScore] = useState<number | null>(null);
    const [recommendations, setRecommendations] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useAuth();

    const handleGenerateTest = async () => {
        setLoading(true);
        try {
            const res = await axios.post('https://mathbilimai-server.onrender.com/api/ai/generate-test', {
                topic: subject,
                difficulty
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setQuestions(res.data.testContent);
            setSelectedAnswers(new Array(res.data.testContent.length).fill(''));
            setScore(null);
            setRecommendations([]);
            setCurrentQuestionIndex(0);
        } catch (error) {
            console.error('Error generating test:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectAnswer = (answer: string) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestionIndex] = answer;
        setSelectedAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    const handlePreviousQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
    };

    const handleSubmitTest = async () => {
        try {
            const res = await axios.post('https://mathbilimai-server.onrender.com/api/ai/submit-test', {
                answers: selectedAnswers,
                correctAnswers: questions.map(q => q.correctAnswer),
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setScore(res.data.score);
            setRecommendations(res.data.recommendations);
        } catch (error) {
            console.error('Error submitting test:', error);
        }
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.text(`Тақырыбы: ${subject}`, 10, 10);
        doc.text(`Қиындық деңгейі: ${difficulty}`, 10, 20);
        questions.forEach((question, index) => {
            doc.text(`${index + 1}. ${question.question}`, 10, 30 + index * 10);
            question.options.forEach((option, idx) => {
                doc.text(`${String.fromCharCode(65 + idx)}. ${option}`, 20, 35 + index * 10 + idx * 5);
            });
        });
        doc.save('test.pdf');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 md:p-10">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Тест тапсыру</h1>
                {!questions.length ? (
                    <div className="w-full">
                        <h3 className='font-semibold mb-4 text-lg text-blue-600'>Пән мен қиындық деңгейін таңдаңыз</h3>
                        <div className="mb-6">
                            <select
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="block appearance-none w-full bg-white border border-gray-300 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            >
                                <option value="" disabled hidden>Пәнді таңдаңыз</option>
                                <option value="Мектеп математикасы">Мектеп математикасы</option>
                                <option value="Сызықтық алгебра">Сызықтық алгебра</option>
                                <option value="Математикалық талдау">Математикалық талдау</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <select
                                id="difficulty"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="block appearance-none w-full bg-white border border-gray-300 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            >
                                <option value="" disabled hidden>Қиындық деңгейін таңдаңыз</option>
                                <option value="оңай">Оңай</option>
                                <option value="орташа">Орташа</option>
                                <option value="қиын">Қиын</option>
                            </select>
                        </div>
                        <button
                            onClick={handleGenerateTest}
                            className="bg-blue-600 text-white px-5 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 mb-4 w-full"
                        >
                            Тест жасау
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="mb-4">
                            <p className="font-semibold text-lg text-blue-600 mb-2">{questions[currentQuestionIndex].question}</p>
                            {questions[currentQuestionIndex].options.map((option, idx) => (
                                <div 
                                    key={idx} 
                                    className={`flex items-center mb-2 p-2 rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-300 ${selectedAnswers[currentQuestionIndex] === option ? 'bg-blue-100' : ''}`}
                                    onClick={() => handleSelectAnswer(option)}
                                >
                                    <input
                                        type="radio"
                                        name={`question-${currentQuestionIndex}`}
                                        value={option}
                                        checked={selectedAnswers[currentQuestionIndex] === option}
                                        readOnly
                                        className="mr-2"
                                    />
                                    <label className="text-black">{option}</label>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <button
                                onClick={handlePreviousQuestion}
                                className={`bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300 ${currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={currentQuestionIndex === 0}
                            >
                                Алдыңғы
                            </button>
                            <div className="flex items-center w-full px-4">
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div className="bg-blue-600 h-4 rounded-full" style={{ width: `${(currentQuestionIndex + 1) / questions.length * 100}%` }}></div>
                                </div>
                                <span className="ml-4 text-blue-600 font-semibold">{currentQuestionIndex + 1}/{questions.length}</span>
                            </div>
                            <button
                                onClick={handleNextQuestion}
                                className={`bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300 ${currentQuestionIndex === questions.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={currentQuestionIndex === questions.length - 1}
                            >
                                Келесі
                            </button>
                        </div>
                        {currentQuestionIndex === questions.length - 1 && (
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={handleSubmitTest}
                                    className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition-colors duration-300"
                                >
                                    Тестті тапсыру
                                </button>
                            </div>
                        )}
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={handleDownloadPDF}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                            >
                                Тестті жүктеу
                            </button>
                        </div>
                    </div>
                )}
                {score !== null && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-blue-600">Сіздің нәтижеңіз: {score}</h2>
                        <h3 className="text-xl font-semibold text-blue-600 mt-4">Ұсыныстар:</h3>
                        <ul className="list-disc list-inside text-gray-700 mt-2">
                            {recommendations.map((rec, index) => (
                                <li key={index}>{rec}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

// @ts-ignore
function ChevronLeftIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m15 18-6-6 6-6" />
        </svg>
    );
}

// @ts-ignore
function ChevronRightIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}

export default Tests;
