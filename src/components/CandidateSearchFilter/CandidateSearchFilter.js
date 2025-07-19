import React from 'react';
import { SearchIcon, FilterIcon, ChevronDownIcon } from 'lucide-react';
const CandidateSearchFilters = () => {
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
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Skills, education, or job titles"
                    />
                </div>
                {/* Experience Level */}
                <div className="relative">
                    <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm appearance-none">
                        <option value="">Any Experience Level</option>
                        <option value="entry">Entry Level (0-2 years)</option>
                        <option value="mid">Mid Level (3-5 years)</option>
                        <option value="senior">Senior Level (5+ years)</option>
                        <option value="executive">Executive (10+ years)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                    </div>
                </div>
                {/* Education Level */}
                <div className="relative">
                    <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm appearance-none">
                        <option value="">Any Education Level</option>
                        <option value="high-school">High School</option>
                        <option value="associate">Associate Degree</option>
                        <option value="bachelor">Bachelor's Degree</option>
                        <option value="master">Master's Degree</option>
                        <option value="doctorate">Doctorate</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                    </div>
                </div>
            </div>
            {/* Advanced Filters */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-sm text-blue-600 font-medium">
                        <FilterIcon className="w-4 h-4" /> Advanced Filters
                    </button>
                    <div className="h-4 w-px bg-gray-300"></div>
                    <button className="text-sm text-blue-600 font-medium">Clear All</button>
                </div>
                <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span>Actively Looking Only</span>
                    </label>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                        Search Candidates
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CandidateSearchFilters;
