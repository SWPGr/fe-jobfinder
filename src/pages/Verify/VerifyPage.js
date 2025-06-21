import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from 'lucide-react';

export const EmailVerificationSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-xl">
                <div className="bg-white py-10 px-8 shadow-lg sm:rounded-2xl sm:px-12">
                    <div className="flex flex-col items-center justify-center text-center">
                        <CheckCircleIcon className="w-20 h-20 text-green-500 mb-6" />
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Verify email successfully!</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            You have successfully verified your email. You can now log in to your account.
                        </p>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full sm:w-auto px-8 py-3 text-white bg-blue-600 text-lg rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                        >
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailVerificationSuccess;
