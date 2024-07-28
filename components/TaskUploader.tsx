import React, { useState, useRef } from 'react';
import axios from 'axios';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const TaskUploader = () => {
    const [image, setImage] = useState<string | null>(null);
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const cropperRef = useRef<Cropper>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCrop = () => {
        if (cropperRef.current) {
            const croppedCanvas = cropperRef.current.getCroppedCanvas();
            if (croppedCanvas) {
                setCroppedImage(croppedCanvas.toDataURL());
            }
        }
    };

    const handleSubmit = async () => {
        if (!croppedImage) return;

        setLoading(true);
        try {
            const formData = new FormData();
            const blob = await (await fetch(croppedImage)).blob();
            formData.append('image', blob, 'croppedImage.png');

            const { data } = await axios.post('/api/ai/upload-task', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { text } = data;
            const analysisRes = await axios.post('/api/ai/analyze-task', { text });

            console.log('Analysis:', analysisRes.data);
        } catch (error) {
            console.error('Error uploading and analyzing task:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-6">
            <h1 className="text-2xl font-bold mb-4">Upload and Analyze Task</h1>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />
            {image && (
                <div className="mb-4">
                    <Cropper
                        src={image}
                        style={{ height: 400, width: '100%' }}
                        initialAspectRatio={1}
                        guides={false}
                        //@ts-ignore
                        ref={cropperRef}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false}
                    />
                    <button onClick={handleCrop} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300">
                        Crop
                    </button>
                </div>
            )}
            {croppedImage && <img src={croppedImage} alt="Cropped" className="mb-4" />}
            <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300">
                Submit
            </button>
            {loading && <p>Loading...</p>}
        </div>
    );
};

export default TaskUploader;
