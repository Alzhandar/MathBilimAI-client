import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../pages/api/api';

interface Question {
    question: string;
    options: string[];
    correctAnswer: string;
}

const SkeletonLoader = () => (
    <div className="animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
        </div>
    </div>
);

const Tests = () => {
    const [subject, setSubject] = useState<string>('');
    const [numQuestions, setNumQuestions] = useState<number>(5);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [score, setScore] = useState<number | null>(null);
    const [recommendations, setRecommendations] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { user } = useAuth();

    const handleGenerateTest = async () => {
        setLoading(true);
        try {
            const res = await api.post('api/ai/generate-test', {
                topic: subject,
                numQuestions
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setQuestions(res.data.testContent);
            setSelectedAnswers(new Array(res.data.testContent.length).fill(''));
            setScore(null);
            setRecommendations([]);
        } catch (error) {
            console.error('Error generating test:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectAnswer = (index: number, answer: string) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[index] = answer;
        setSelectedAnswers(newAnswers);
    };

    const handleSubmitTest = async () => {
        try {
            const res = await api.post('/ai/submit-test', {
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-4 text-center">Take a Test</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                        Select Subject
                    </label>
                    <select
                        id="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                        <option value="" disabled>Select subject</option>
                        <option value="School Math">School Math</option>
                        <option value="Linear Algebra">Linear Algebra</option>
                        <option value="Calculus">Calculus</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numQuestions">
                        Number of Questions
                    </label>
                    <input
                        id="numQuestions"
                        type="range"
                        min="1"
                        max="20"
                        value={numQuestions}
                        onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                        className="w-full"
                    />
                    <span>{numQuestions}</span>
                </div>
                <button
                    onClick={handleGenerateTest}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 mb-4"
                >
                    Generate Test
                </button>
                {loading ? (
                    <div>
                        {Array.from({ length: numQuestions }).map((_, index) => (
                            <SkeletonLoader key={index} />
                        ))}
                    </div>
                ) : (
                    questions.length > 0 && (
                        <div>
                            {questions.map((question, index) => (
                                <div key={index} className="mb-4">
                                    <p className="font-semibold">{question.question}</p>
                                    {question.options.map((option, idx) => (
                                        <div key={idx} className="flex items-center mb-2">
                                            <input
                                                type="radio"
                                                name={`question-${index}`}
                                                value={option}
                                                onChange={() => handleSelectAnswer(index, option)}
                                                className="mr-2"
                                            />
                                            <label>{option}</label>
                                        </div>
                                    ))}
                                </div>
                            ))}
                            <button
                                onClick={handleSubmitTest}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300"
                            >
                                Submit Test
                            </button>
                        </div>
                    )
                )}
                {score !== null && (
                    <div className="mt-4">
                        <h2 className="text-xl font-bold">Your Score: {score}</h2>
                        <h3 className="text-lg font-semibold">Recommendations:</h3>
                        <ul className="list-disc list-inside">
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

export default Tests;
