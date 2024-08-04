import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Course = () => {
    const router = useRouter();
    const { topic, courseMaterials } = router.query;
    const [materials, setMaterials] = useState<string[]>([]);

    useEffect(() => {
        if (courseMaterials) {
            setMaterials(JSON.parse(courseMaterials as string));
        }
    }, [courseMaterials]);

    const renderMaterials = (materials: string[]) => {
        return materials.map((material, index) => {
            if (material.startsWith('Модуль')) {
                return <h2 key={index} className="text-xl font-semibold text-blue-600 mt-4">{material}</h2>;
            } else if (material.startsWith('Теоретическая часть:')) {
                return <h3 key={index} className="text-lg font-semibold text-gray-700 mt-2">{material}</h3>;
            } else if (material.startsWith('Примеры задач:')) {
                return <h3 key={index} className="text-lg font-semibold text-gray-700 mt-2">{material}</h3>;
            } else {
                return <p key={index} className="text-gray-700">{material}</p>;
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 md:p-10">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Курс по теме: {topic}</h1>
                {materials.length > 0 ? (
                    <div className="list-disc list-inside text-gray-700 mt-2">
                        {renderMaterials(materials)}
                    </div>
                ) : (
                    <p className="text-center text-gray-700">Нет доступных материалов для данного курса.</p>
                )}
            </div>
        </div>
    );
};

export default Course;
