import React from 'react';
import { GraduationCapIcon, BriefcaseIcon, SearchIcon, FileTextIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

// Nhận role từ props
const JobFairBanner = ({ role = 'JOB_SEEKER' }) => {
    const isEmployer = role === 'EMPLOYER';

    const navigate = useNavigate();
    const navigateToHandler = () => {
        navigate(isEmployer ? config.routes.CandidateSearchEvent : config.routes.JobSearchEvent);
    };
    return (
        <div className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-500">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20"></div>
                <div className="absolute bottom-20 right-20 w-48 h-48 bg-orange-400 rounded-full opacity-20"></div>
                <div className="absolute top-40 right-40 w-24 h-24 bg-blue-300 rounded-full opacity-20"></div>
            </div>

            <div className="container mx-auto px-6 py-12 md:py-16 flex flex-col md:flex-row items-center relative z-10">
                {/* Text section */}
                <div className="md:w-1/2 text-white space-y-6 md:pr-8">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                        {isEmployer ? (
                            <>
                                Find Your Next <span className="text-yellow-300">Great Hire</span>
                            </>
                        ) : (
                            <>
                                Student Job Fair <span className="text-yellow-300">2025</span>
                            </>
                        )}
                    </h1>

                    <h2 className="text-xl md:text-2xl font-medium text-blue-100">
                        {isEmployer
                            ? 'Connect with motivated students and build your employer brand'
                            : 'Ignite Your Career – Shape Your Future'}
                    </h2>

                    <p className="text-blue-100 max-w-lg">
                        {isEmployer
                            ? 'Join 500+ companies in discovering top young talent, showcasing your organization, and recruiting future leaders.'
                            : 'Connect with top employers, discover internship opportunities, and kickstart your professional journey.'}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <button
                            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-all transform hover:scale-105"
                            onClick={navigateToHandler}
                        >
                            {isEmployer ? 'Register Your Company' : 'Explore Opportunities'}
                        </button>
                        <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white font-semibold py-3 px-8 rounded-full transition-all">
                            {isEmployer ? 'Become a Partner' : 'Join for Free'}
                        </button>
                    </div>
                </div>

                {/* Image and icons */}
                <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
                    <div className="relative w-full max-w-lg">
                        <div className="relative z-20 bg-white p-3 rounded-lg shadow-xl transform rotate-3">
                            <img
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                                alt={isEmployer ? 'Employer booth at fair' : 'Students at job fair'}
                                className="w-full h-auto rounded"
                            />
                        </div>
                        {/* Floating icons */}
                        <div className="absolute -top-6 -left-6 bg-yellow-400 p-4 rounded-full shadow-lg z-30">
                            <GraduationCapIcon className="w-8 h-8 text-blue-700" />
                        </div>
                        <div className="absolute -bottom-4 -right-4 bg-blue-700 p-4 rounded-full shadow-lg z-30">
                            <BriefcaseIcon className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute top-1/2 -right-8 bg-orange-500 p-3 rounded-full shadow-lg z-30">
                            <FileTextIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute bottom-20 -left-8 bg-white p-3 rounded-full shadow-lg z-30">
                            <SearchIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="absolute -bottom-12 left-1/4 bg-white px-4 py-2 rounded-lg shadow-md z-20">
                            <div className="flex items-center gap-1 text-sm font-medium text-gray-600">
                                <span className="text-blue-600 font-bold">500+</span>{' '}
                                {isEmployer ? 'Employers Joined' : 'Companies'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-0 left-0 w-full h-8 bg-blue-700 opacity-30"></div>
        </div>
    );
};

export default JobFairBanner;
