import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Materials = () => {
    const [materials, setMaterials] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/ai/materials', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setMaterials(res.data.materials);
            } catch (err) {
                setError('Failed to fetch materials');
                console.error('Error fetching materials:', err);
            }
        };
        fetchMaterials();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-4 text-center">Study Materials</h1>
                {error && (
                    <p className="text-red-500 mb-4">{error}</p>
                )}
                {materials.length > 0 ? (
                    <div className="space-y-4">
                        {materials.map((material, index) => (
                            <div key={index} className="p-4 border rounded-md bg-gray-50">
                                <p>{material}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    !error && <p className="text-center text-gray-500">No materials available</p>
                )}
            </div>
        </div>
    );
};

export default Materials;
