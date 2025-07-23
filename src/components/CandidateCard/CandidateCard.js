import React from 'react';
import { GraduationCapIcon, BriefcaseIcon } from 'lucide-react';

const CandidateCard = ({ name, photo, headline, skills, education, experience, activelyLooking = false }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex-shrink-0 relative">
                    <img
                        src={photo}
                        alt={name}
                        className="w-20 h-20 object-cover rounded-full border-2 border-gray-100"
                    />
                    {activelyLooking && (
                        <div className="absolute -bottom-2 -right-2">
                            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                Open to Work
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex-1">
                    <div className="flex flex-wrap justify-between items-start">
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900">{name}</h3>
                            <p className="text-blue-600 font-medium">{headline}</p>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                            View Profile
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm text-gray-600">
                        <div className="flex items-center">
                            <GraduationCapIcon className="w-4 h-4 mr-1" />
                            {education}
                        </div>
                        <div className="flex items-center">
                            <BriefcaseIcon className="w-4 h-4 mr-1" />
                            {experience}
                        </div>
                    </div>
                    {/* <div className="mt-4">
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default CandidateCard;
