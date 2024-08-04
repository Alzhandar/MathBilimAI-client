import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import api from '../api/api';
import axios from 'axios';

interface Material {
    _id: string;
    title: string;
}

const CategoryMaterials = () => {
    const router = useRouter();
    const { category } = router.query;
    const [materials, setMaterials] = useState<Material[]>([]);

    useEffect(() => {
        if (category) {
            const fetchMaterials = async () => {
                try {
                    const decodedCategory = decodeURIComponent(category as string);
                    const response = await axios.get(`https://mathbilimai-server.onrender.com/api/materials/category/${decodedCategory}`);
                    setMaterials(response.data);
                } catch (error) {
                    console.error('Error fetching materials:', error);
                }
            };

            fetchMaterials();
        }
    }, [category]);

    return (
        <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen p-4 md:p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
                <h1 className="text-4xl font-bold text-center mb-10 text-blue-600">{category}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {materials.map((material) => (
                        <Link key={material._id} href={`/materials/${encodeURIComponent(category as string)}/${material._id}`} legacyBehavior>
                            <a className="block p-8 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 duration-300">
                                <h2 className="text-2xl font-semibold mb-4">{material.title}</h2>
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryMaterials;
