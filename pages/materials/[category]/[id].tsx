import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '../../api/api';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import axios from 'axios';

interface Exercise {
    level: string;
    question: string;
    answer: string;
}

interface Material {
    title: string;
    theory: string;
    imageUrl: string;
    exercises: Exercise[];
}

interface Feedback {
    correct: boolean;
    explanation: string;
}

const MaterialDetail = () => {
    const router = useRouter();
    const { category, id } = router.query;
    const [material, setMaterial] = useState<Material | null>(null);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);

    useEffect(() => {
        if (category && id) {
            const fetchMaterial = async () => {
                try {
                    const response = await axios.get(`https://mathbilimai-server.onrender.com/api/materials/${id}`);
                    setMaterial(response.data);
                } catch (error) {
                    console.error('Error fetching material:', error);
                }
            };

            fetchMaterial();
        }
    }, [category, id]);

    const handleSubmit = async () => {
        if (selectedExercise) {
            try {
                const response = await axios.post('https://mathbilimai-server.onrender.com/api/ai/check-answer', {
                    question: selectedExercise.question,
                    userAnswer
                });

                setFeedback(response.data.feedback);
            } catch (error) {
                console.error('Error checking answer:', error);
            }
        }
    };

    const renderTheory = () => {
        if (material) {
            const theoryLines = material.theory.split('\n').map((line, index) => (
                <p key={index} className="text-gray-700 mb-4 leading-relaxed">{line}</p>
            ));
            return theoryLines;
        }
        return null;
    };

    return (
        <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen p-4 md:p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                {material ? (
                    <>
                        <h1 className="text-4xl font-extrabold mb-6 text-gray-900 text-center">{material.title}</h1>
                        <div className="mb-6">
                            {renderTheory()}
                        </div>
                        {material.imageUrl && (
                            <div className="mb-6 flex justify-center">
                                <img src={material.imageUrl} alt="Theory" className="max-w-full h-auto rounded-lg shadow-lg" />
                            </div>
                        )}
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">Жаттығулар</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {material.exercises.map((exercise, index) => (
                                <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Деңгей {exercise.level}</h3>
                                    <div className="mb-4">
                                        <BlockMath>{exercise.question}</BlockMath>
                                    </div>
                                    <button
                                        onClick={() => setSelectedExercise(exercise)}
                                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                                    >
                                        Шешу
                                    </button>
                                </div>
                            ))}
                        </div>
                        {selectedExercise && (
                            <div className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-4 text-gray-800">Жаттығуды шешу:</h3>
                                <div className="mb-4">
                                    <BlockMath>{selectedExercise.question}</BlockMath>
                                </div>
                                <input
                                    type="text"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    className="w-full p-3 mb-4 border border-gray-300 rounded-md"
                                    placeholder="Сіздің жауабыңыз"
                                />
                                <button
                                    onClick={handleSubmit}
                                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
                                >
                                    Жіберу
                                </button>
                                {feedback && (
                                    <div className="mt-6 p-4 bg-gray-100 border border-gray-200 rounded-md">
                                        <h3 className="text-lg font-semibold mb-2 text-gray-800">Кері байланыс:</h3>
                                        <p className={`mb-2 ${feedback.correct ? 'text-green-600' : 'text-red-600'}`}>
                                            {feedback.correct ? "Дұрыс!" : "Қате."}
                                        </p>
                                        <p className="text-gray-700">{feedback.explanation}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-center text-gray-700 text-xl">Жүктелуде...</p>
                )}
            </div>
        </div>
    );
};

export default MaterialDetail;
