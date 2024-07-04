import React from 'react';
import { useAuth } from '../context/AuthContext';

const Account = () => {
    const { user } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Account Information</h1>
                {user ? (
                    <div>
                        <p className="text-lg font-semibold mb-4">Username: <span className="text-gray-700">{user.username}</span></p>
                        <p className="text-lg font-semibold mb-4">Email: <span className="text-gray-700">{user.email}</span></p>
                    </div>
                ) : (
                    <p className="text-lg text-center">No user information available.</p>
                )}
            </div>
        </div>
    );
};

export default Account;

