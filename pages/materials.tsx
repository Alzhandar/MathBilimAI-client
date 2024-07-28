import React from 'react';
import Link from 'next/link';

const materials = [
    { title: "Мектеп математикасы", description: "Мектеп математикасының негізгі тақырыптарын зерттеңіз.", path: "/materials/Мектеп%20математикасы" },
    { title: "Сызықтық алгебра", description: "Сызықтық алгебраның маңызды аспектілерін үйреніңіз.", path: "/materials/Сызықтық%20алгебра" },
    { title: "Дифференциалдық есептеулер", description: "Дифференциалдық есептеулердің негіздерін меңгеріңіз.", path: "/materials/Дифференциалдық%20есептеулер" },
    { title: "Статистика", description: "Статистиканың негізгі принциптері мен қолдануларын үйреніңіз.", path: "/materials/Статистика" },
    { title: "Геометрия", description: "Геометрияның негізгі теоремалары мен есептерін зерттеңіз.", path: "/materials/Геометрия" },
    { title: "Алгебра", description: "Алгебраның маңызды формулалары мен есептерін меңгеріңіз.", path: "/materials/Алгебра" },
];

const Materials = () => {
    return (
        <div className="bg-white min-h-screen pt-20 pb-10">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Материалдар</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {materials.map((material, index) => (
                        <Link href={material.path} key={index} legacyBehavior>
                            <a className="block p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition duration-300">
                                <h2 className="text-2xl font-bold text-blue-600 mb-2">{material.title}</h2>
                                <p className="text-gray-700">{material.description}</p>
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Materials;
