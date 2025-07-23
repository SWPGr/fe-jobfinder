import React from 'react';
import { MapPinIcon, ClockIcon, TagIcon } from 'lucide-react';

const JobCard = ({ title, company, location, employmentType, skills, logo, postedDate, featured = false }) => {
    return (
        <div
            className={`bg-white rounded-lg shadow-md p-6 border ${
                featured ? 'border-blue-400' : 'border-gray-100'
            } hover:shadow-lg transition-shadow duration-300`}
        >
            {featured && (
                <div className="absolute -top-3 -right-3">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">Featured</span>
                </div>
            )}
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <img src={logo} alt={`${company} logo`} className="w-16 h-16 object-contain rounded-md" />
                </div>
                <div className="flex-1">
                    <h3 className="text-3xl font-semibold text-gray-900">{title}</h3>
                    <p className="text-xl text-blue-600 font-medium">{company}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                        <div className="flex items-center text-sm text-gray-600 text-lg">
                            <MapPinIcon className="w-4 h-4 mr-1" />
                            <p className="text-xl  font-medium">{location}</p>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 text-lxl">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            <p className="text-xl  font-medium">{employmentType}</p>
                        </div>
                    </div>
                    {/* <div className="mt-4">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {skills.map((skill, index) => (
                                <span key={index} className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div> */}
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-base text-gray-500">{postedDate}</span>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
