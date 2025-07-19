import React from 'react';
import { SearchIcon, MapPinIcon, FilterIcon, ChevronDownIcon } from 'lucide-react';
const JobSearchFilters = () => {
    return (
        <div className="bg-white shadow-sm border border-gray-100 rounded-lg p-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Keyword Search */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block  w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Job title, skills, or company"
                    />
                </div>
                {/* Location Filter */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPinIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="City, state, or remote"
                    />
                </div>
                {/* Job Type Dropdown */}
                <div className="relative">
                    <select className="block w-full pl-3 pr-10 py-2 text-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm appearance-none">
                        <option value="">All Job Types</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                        <option value="remote">Remote</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* COL2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                {/* Keyword Search */}
                <div className="relative">
                    <select className="block w-full pl-3 pr-10 py-2 text-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm appearance-none">
                        <option value="">Experiences</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                        <option value="remote">Remote</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                    </div>
                </div>
                {/* Location Filter */}
                <div className="relative">
                    <select className="block w-full pl-3 pr-10 py-2 text-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm appearance-none">
                        <option value="">Salaries</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                        <option value="remote">Remote</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                    </div>
                </div>
                {/* Job Type Dropdown */}
                <div className="relative">
                    <select className="block w-full pl-3 pr-10 py-2 text-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm appearance-none">
                        <option value="">Educations</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                        <option value="remote">Remote</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                    </div>
                </div>
            </div>
            {/* Advanced Filters */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-xl text-blue-600 font-medium">
                        <FilterIcon className="w-4 h-4" /> Advanced Filters
                    </button>
                    <div className="h-4 w-px bg-gray-300"></div>
                    <button className="text-xl text-blue-600 font-medium">Clear All</button>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                    Search Jobs
                </button>
            </div>
        </div>
    );
};

export default JobSearchFilters;
