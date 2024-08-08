import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import MathJaxComponent from '../components/MathJaxComponent';
import { useRouter } from 'next/router';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Select from 'react-select';
import 'animate.css';

interface Question {
    _id: string;
    question: string;
    options: string[];
    correctAnswer: string;
}

interface DetailedResult {
    questionIndex: number;
    isCorrect: boolean;
    correctAnswer: string;
    givenAnswer: string;
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
    const [topics, setTopics] = useState<string[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [score, setScore] = useState<number | null>(null);
    const [recommendations, setRecommendations] = useState<string[]>([]);
    const [detailedResults, setDetailedResults] = useState<DetailedResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [courseMaterials, setCourseMaterials] = useState<string[]>([]);
    const [courseCreated, setCourseCreated] = useState<boolean>(false);
    const [createdTopic, setCreatedTopic] = useState<string | null>(null);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const res = await axios.get('https://mathbilimai-server-production.up.railway.app/api/questions/topics');
                setTopics(res.data);
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        };
        fetchTopics();
    }, []);

    const handleGenerateTest = async () => {
        setLoading(true);
        try {
            const res = await axios.get('https://mathbilimai-server-production.up.railway.app/api/questions/random', {
                params: {
                    difficulty,
                    count: 20
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setQuestions(res.data);
            setSelectedAnswers(new Array(res.data.length).fill(''));
            setScore(null);
            setRecommendations([]);
            setDetailedResults([]);
            setCurrentQuestionIndex(0);
        } catch (error) {
            console.error('Error generating test:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateTestByTopic = async (topic: string) => {
        setLoading(true);
        try {
            const res = await axios.get('https://mathbilimai-server-production.up.railway.app/api/questions/topic', {
                params: {
                    topic,
                    count: 20
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setQuestions(res.data);
            setSelectedAnswers(new Array(res.data.length).fill(''));
            setScore(null);
            setRecommendations([]);
            setDetailedResults([]);
            setCurrentQuestionIndex(0);
        } catch (error) {
            console.error('Error generating test by topic:', error);
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

    const handleQuestionSelect = (selectedOption: any) => {
        setCurrentQuestionIndex(selectedOption.value);
    };

    const handleSubmitTest = async () => {
        try {
            const res = await axios.post('https://mathbilimai-server-production.up.railway.app/api/submit-test', {
                answers: selectedAnswers,
                correctAnswers: questions.map(q => q.correctAnswer),
                questionIds: questions.map(q => q._id)
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setScore(res.data.score);
            setRecommendations(res.data.recommendations);
            setDetailedResults(res.data.detailedResults);

            const missedTopics = res.data.missedTopics;

            setTopics(missedTopics);
        } catch (error) {
            console.error('Error submitting test:', error);
        }
    };

    const handleCreateCourse = async (topic: string) => {
        setLoading(true);
        try {
            const res = await axios.post('https://mathbilimai-server-production.up.railway.app/api/create-course', {
                topics: [topic]
            });
            setCourseMaterials(res.data.course_materials);
            setCourseCreated(true);
            setCreatedTopic(topic);
        } catch (error) {
            console.error('Error creating course:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleViewCourse = () => {
        router.push({
            pathname: '/course',
            query: { topic: createdTopic, courseMaterials: JSON.stringify(courseMaterials) }
        });
    };

    const questionOptions = questions.map((q, index) => ({
        value: index,
        label: `Сұрақ ${index + 1}`
    }));

    const renderScoreCircle = () => {
        return (
            <div className="flex justify-center items-center h-64 w-64 mx-auto">
                <CircularProgressbar
                    value={score || 0}
                    maxValue={20}
                    text={`${score !== null ? score : 0}/20`}
                    styles={buildStyles({
                        pathColor: `rgba(38, 99, 235, ${(score || 0) / 20})`,
                        textColor: '#2663EB',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                    })}
                    className="animate__animated animate__fadeIn"
                />
            </div>
        );
    };

    const renderDetailedResult = (result: DetailedResult, index: number) => {
        const question = questions[result.questionIndex];
        return (
            <div key={index} className="mt-2 p-4 bg-white shadow-md rounded-lg animate__animated animate__fadeIn">
                <p className="text-[#FF0000] font-bold">
                    Қате - Сұрақ {result.questionIndex + 1}
                </p>
                <button
                    className="text-sm text-[#2663EB] underline mt-2 hover:text-blue-800 transition-colors"
                    onClick={() => setCurrentQuestionIndex(result.questionIndex)}
                >
                    Сұраққа өту
                </button>
                {currentQuestionIndex === result.questionIndex && question && (
                    <div className="mt-2 animate__animated animate__fadeIn">
                        <p className="text-black">
                            <MathJaxComponent>{question.question}</MathJaxComponent>
                        </p>
                        {question.options.map((option, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center mb-2 p-2 rounded-lg ${result.givenAnswer === option ? 'bg-red-100' : result.correctAnswer === option ? 'bg-green-100' : ''
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name={`question-${result.questionIndex}`}
                                    value={option}
                                    checked={selectedAnswers[result.questionIndex] === option}
                                    readOnly
                                    className="mr-2"
                                />
                                <label className="text-black">
                                    <MathJaxComponent>{option}</MathJaxComponent>
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 md:p-10">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-[#2663EB]">Тест тапсыру</h1>
                {!questions.length && !score ? (
                    <div className="w-full">
                        <h2 className="text-3xl font-bold mb-6 text-center text-[#2663EB]">Әр түрлі сұрақтармен тест тапсырғыңыз келе ме?</h2>
                        <h3 className='font-semibold mb-4 text-xl text-center text-[#2663EB]'>Пән мен қиындық деңгейін таңдаңыз</h3>
                        <div className="mb-6">
                            <select
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="block appearance-none w-full bg-white border border-gray-300 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-[#2663EB]"
                            >
                                <option value="" disabled hidden>Пәнді таңдаңыз</option>
                                <option value="Мектеп математикасы">Мектеп математикасы</option>
                            </select>
                        </div>
                        <div className="mb-6">
                            <select
                                id="difficulty"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="block appearance-none w-full bg-white border border-gray-300 text-black py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-[#2663EB]"
                            >
                                <option value="" disabled hidden>Қиындық деңгейін таңдаңыз</option>
                                <option value="оңай">Оңай</option>
                                <option value="орташа">Орташа</option>
                                <option value="қиын">Қиын</option>
                            </select>
                        </div>
                        <button
                            onClick={handleGenerateTest}
                            className="bg-[#2663EB] text-white px-5 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 mb-8 w-full"
                        >
                            Тест жасау
                        </button>
                        <h3 className='font-semibold mb-6 text-2xl text-center text-[#2663EB]'>Тақырыптар бойынша тест</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {topics.map((topic, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleGenerateTestByTopic(topic)}
                                    className="bg-gray-200 text-black px-6 py-4 rounded-lg hover:bg-gray-300 transition-colors duration-300 text-xl"
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        {questions.length > 0 && (
                            <div className="mb-4">
                                <p className="font-semibold text-lg text-[#2663EB] mb-2 animate__animated animate__fadeIn">
                                    <MathJaxComponent>
                                        {questions[currentQuestionIndex]?.question}
                                    </MathJaxComponent>
                                </p>
                                {questions[currentQuestionIndex]?.options.map((option, idx) => (
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
                                        <label className="text-black">
                                            <MathJaxComponent>
                                                {option}
                                            </MathJaxComponent>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
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
                                    <div className="bg-[#2663EB] h-4 rounded-full" style={{ width: `${(currentQuestionIndex + 1) / questions.length * 100}%` }}></div>
                                </div>
                                <span className="ml-4 text-[#2663EB] font-semibold">{currentQuestionIndex + 1}/{questions.length}</span>
                            </div>
                            <button
                                onClick={handleNextQuestion}
                                className={`bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300 ${currentQuestionIndex === questions.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={currentQuestionIndex === questions.length - 1}
                            >
                                Келесі
                            </button>
                        </div>
                        <div className="mt-4">
                            <Select 
                                options={questionOptions} 
                                onChange={handleQuestionSelect} 
                                className="w-full"
                                placeholder="Сұрақты таңдау үшін басыңыз"
                            />
                        </div>
                        {currentQuestionIndex === questions.length - 1 && (
                            <div className="flex justify-center mt-6">
                                <button
                                    onClick={handleSubmitTest}
                                    className="bg-[#2663EB] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
                                >
                                    Тестті тапсыру
                                </button>
                            </div>
                        )}
                    </div>
                )}
                {score !== null && (
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-[#2663EB] animate__animated animate__fadeIn">Сіздің нәтижеңіз: {score}</h2>
                        {renderScoreCircle()}
                        <h3 className="text-xl font-semibold text-[#2663EB] mt-4">Ұсыныстар:</h3>
                        <ul className="list-disc list-inside text-gray-700 mt-2">
                            {recommendations.map((rec, index) => (
                                <li key={index} className="text-lg leading-relaxed">{rec}</li>
                            ))}
                        </ul>
                        <h3 className="text-xl font-semibold text-[#2663EB] mt-4">Толығырақ нәтижелер:</h3>
                        <ul className="list-disc list-inside text-gray-700 mt-2">
                            {detailedResults.filter(result => !result.isCorrect).map((result, index) => (
                                renderDetailedResult(result, index)
                            ))}
                        </ul>
                        {topics.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold text-[#2663EB] mt-4">Қайталануды қажет ететін тақырыптар:</h3>
                                <ul className="list-disc list-inside text-gray-700 mt-2">
                                    {topics.map((topic, index) => (
                                        <li key={index} className="flex items-center justify-between">
                                            {topic}
                                            <button
                                                onClick={() => handleCreateCourse(topic)}
                                                className="ml-4 bg-[#2663EB] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                                            >
                                                Курс құру
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                {loading ? (
                                    <button
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-300 mt-4"
                                        disabled
                                    >
                                        Курс құруда...
                                    </button>
                                ) : courseCreated && createdTopic ? (
                                    <div className="flex flex-col items-center mt-4">
                                        <p className="text-[#2663EB] font-semibold">"{createdTopic}" тақырыбы бойынша курс сәтті құрылды!</p>
                                        <button
                                            onClick={handleViewCourse}
                                            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300 mt-2"
                                        >
                                            Курсты көру
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        )}
                        {courseMaterials && courseMaterials.length > 0 && (
                            <div className="mt-4">
                                <h3 className="text-xl font-semibold text-[#2663EB] mt-4">Курс:</h3>
                                <ul className="list-disc list-inside text-gray-700 mt-2">
                                    {courseMaterials.map((material, index) => (
                                        <li key={index}>{material}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tests;
