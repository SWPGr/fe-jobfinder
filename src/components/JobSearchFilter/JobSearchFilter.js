import React, { useEffect, useState } from 'react';
import { SearchIcon, FilterIcon, ChevronDownIcon } from 'lucide-react';
import { jobService } from '~/services';

import { useSearchParams } from 'react-router-dom';

const locations = [
    { id: '', name: 'All Locations' },
    { id: 1, name: 'Hà Nội' },
    { id: 2, name: 'Huế' },
    { id: 3, name: 'Quảng Ninh' },
    { id: 4, name: 'Cao Bằng' },
    { id: 27, name: 'TP Hồ Chí Minh' },
];

const JobSearchFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [jobFilters, setJobFilters] = useState(null);
    const [form, setForm] = useState({
        keyword: '',
        location: '',
        experienceId: '',
        salaryId: '',
        jobTypeId: '',
        educationId: '',
    });

    useEffect(() => {
        const fetchOptions = async () => {
            const data = await jobService.getAllOptions();

            const filters = {
                experienceId: {
                    name: 'Experience',
                    options: [...data.experiences],
                },
                salaryId: {
                    name: 'Salary',
                    options: [
                        { id: 2, name: 'Under $80k' },
                        { id: 3, name: '$80k - $120k' },
                        { id: 4, name: '$120k - $160k' },
                        { id: 5, name: '$160k - $200k' },
                        { id: 6, name: '$200k+' },
                        { id: 7, name: 'Negotiable' },
                    ],
                },
                jobTypeId: {
                    name: 'Job Type',
                    options: [...data.jobTypes],
                },
                educationId: {
                    name: 'Education',
                    options: [...data.educations],
                },
            };

            setJobFilters(filters);
        };

        fetchOptions();
    }, []);

    const handleChange = (key, value) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleClear = () => {
        setForm({
            keyword: '',
            location: '',
            experienceId: '',
            salaryId: '',
            jobTypeId: '',
            educationId: '',
        });
    };

    const handleSubmit = () => {
        const entries = Object.entries(form).filter(([_, v]) => v !== '' && v !== null && v !== undefined);
        entries.push(['page', 1]);
        setSearchParams(entries);
        // call search API here with form
    };

    if (!jobFilters) return null;

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
                        value={form.keyword}
                        onChange={(e) => handleChange('keyword', e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Job title, skills, or company"
                    />
                </div>

                {/* Location */}
                <div className="relative">
                    <select
                        value={form.location}
                        onChange={(e) => handleChange('location', e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm appearance-none"
                    >
                        {locations.map((loc) => (
                            <option key={loc.id} value={loc.id}>
                                {loc.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                    </div>
                </div>

                {/* Job Type */}
                <div className="relative">
                    <select
                        value={form.jobTypeId}
                        onChange={(e) => handleChange('jobTypeId', e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm appearance-none"
                    >
                        <option value="">All Job Types</option>
                        {jobFilters.jobTypeId.options.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                                {opt.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                {/* Experience */}
                <div className="relative">
                    <select
                        value={form.experienceId}
                        onChange={(e) => handleChange('experienceId', e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm appearance-none"
                    >
                        <option value="">Experiences</option>
                        {jobFilters.experienceId.options.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                                {opt.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                    </div>
                </div>

                {/* Salary */}
                <div className="relative">
                    <select
                        value={form.salaryId}
                        onChange={(e) => handleChange('salaryId', e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm appearance-none"
                    >
                        <option value="">Salaries</option>
                        {jobFilters.salaryId.options.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                                {opt.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                    </div>
                </div>

                {/* Education */}
                <div className="relative">
                    <select
                        value={form.educationId}
                        onChange={(e) => handleChange('educationId', e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm appearance-none"
                    >
                        <option value="">Educations</option>
                        {jobFilters.educationId.options.map((opt) => (
                            <option key={opt.id} value={opt.id}>
                                {opt.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                    >
                        Search Jobs
                    </button>
                    <button onClick={handleClear} className="text-xl text-blue-600 font-medium">
                        Clear All
                    </button>
                </div>

                <button className="flex items-center gap-1 text-xl text-blue-600 font-medium">
                    <FilterIcon className="w-4 h-4" />
                    Advanced Filters
                </button>
            </div>
        </div>
    );
};

export default JobSearchFilters;
