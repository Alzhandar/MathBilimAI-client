import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import api from '../pages/api/api';
import MathJaxComponent from '../components/MathJaxComponent';
import axios from 'axios';

const TaskUploader = () => {
    const [image, setImage] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [analysis, setAnalysis] = useState<{ topics: string[], solution: string } | null>(null);
    const cropperRef = useRef<HTMLImageElement & { cropper?: Cropper }>(null);

    const handleImageUpload = (event: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        let file;
        if ('dataTransfer' in event) {
            file = event.dataTransfer.files[0];
        } else {
            file = event.target.files?.[0];
        }

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCrop = () => {
        const cropper = cropperRef.current?.cropper;
        if (cropper) {
            const croppedCanvas = cropper.getCroppedCanvas();
            if (croppedCanvas) {
                setCroppedImage(croppedCanvas.toDataURL());
            }
        }
    };

    const handleSubmit = async () => {
        if (!croppedImage) return;

        setLoading(true);
        setAnalysis(null);
        try {
            const formData = new FormData();
            const blob = await (await fetch(croppedImage)).blob();
            formData.append('image', blob, 'croppedImage.png');

            const { data: uploadData } = await axios.post('https://mathbilimai-server-production.up.railway.app/api/ai/upload-task', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { text } = uploadData;
            const { data: analysisData } = await axios.post('https://mathbilimai-server-production.up.railway.app/api/ai/analyze-task', { text });

            setAnalysis(analysisData.analysis);
        } catch (error) {
            console.error('Error uploading and analyzing task:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white p-4 md:p-6">
            <div className="flex flex-col md:flex-row flex-1">
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-4 border-dashed border-2 border-gray-300 mb-4 md:mb-0 md:mr-4">
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        id="fileInput" 
                        className="hidden"
                    />
                    {!image ? (
                        <div 
                            className="text-center cursor-pointer"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleImageUpload}
                            onClick={() => document.getElementById('fileInput')?.click()}
                        >
                            <p className="text-gray-500 mb-4">Суретті осында сүйреңіз немесе файлды таңдау үшін басыңыз</p>
                            <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                    ) : (
                        <>
                            <Cropper
                                src={image}
                                style={{ height: '300px', width: '100%' }}
                                initialAspectRatio={1}
                                guides={false}
                                ref={cropperRef}
                                viewMode={1}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                checkOrientation={false}
                            />
                            <div className="flex justify-between mt-4 w-full px-4">
                                <button 
                                    onClick={handleCrop} 
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                                >
                                    Қиып алу
                                </button>
                                <button 
                                    onClick={handleSubmit} 
                                    className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300"
                                >
                                    Жіберу
                                </button>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex-1 bg-gray-50 p-4 overflow-y-auto flex flex-col space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-md flex-1">
                        <h3 className="text-xl font-semibold mb-2">Тақырыптар:</h3>
                        <ul className="list-disc list-inside mb-4">
                            {analysis ? analysis.topics.map((topic, index) => (
                                <li key={index}>{topic}</li>
                            )) : <li>Тақырыптар табылмады.</li>}
                        </ul>
                    </div>
                    <div className="border-t border-gray-200"></div>
                    <div className="bg-white p-4 rounded-lg shadow-md flex-1">
                        <h3 className="text-xl font-semibold mb-2">Шешім:</h3>
                        {analysis && (
                            <MathJaxComponent>
                                {analysis.solution}
                            </MathJaxComponent>
                        )}
                    </div>
                </div>
            </div>
            {loading && (
                <div className="fixed inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-50">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-16 h-16">
                        <circle fill="#159BFF" stroke="#159BFF" strokeWidth="15" r="15" cx="35" cy="100">
                            <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0"></animate>
                        </circle>
                        <circle fill="#159BFF" stroke="#159BFF" strokeWidth="15" opacity=".8" r="15" cx="35" cy="100">
                            <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0.05"></animate>
                        </circle>
                        <circle fill="#159BFF" stroke="#159BFF" strokeWidth="15" opacity=".6" r="15" cx="35" cy="100">
                            <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".1"></animate>
                        </circle>
                        <circle fill="#159BFF" stroke="#159BFF" strokeWidth="15" opacity=".4" r="15" cx="35" cy="100">
                            <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".15"></animate>
                        </circle>
                        <circle fill="#159BFF" stroke="#159BFF" strokeWidth="15" opacity=".2" r="15" cx="35" cy="100">
                            <animate attributeName="cx" calcMode="spline" dur="2" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".2"></animate>
                        </circle>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default TaskUploader;
