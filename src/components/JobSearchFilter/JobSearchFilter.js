import React, { useEffect, useState } from 'react';
import { SearchIcon, FilterIcon, ChevronDownIcon } from 'lucide-react';
import { jobService } from '~/services';

import { useSearchParams } from 'react-router-dom';

const locations = [
    { id: 1, name: 'Hà Nội' },
    { id: 2, name: 'Huế' },
    { id: 3, name: 'Quảng Ninh' },
    { id: 4, name: 'Cao Bằng' },
    { id: 5, name: 'Lạng Sơn' },
    { id: 6, name: 'Lai Châu' },
    { id: 7, name: 'Điện Biên' },
    { id: 8, name: 'Sơn La' },
    { id: 9, name: 'Thanh Hóa' },
    { id: 10, name: 'Nghệ An' },
    { id: 11, name: 'Hà Tĩnh' },
    { id: 12, name: 'Tuyên Quang' },
    { id: 13, name: 'Lào Cai' },
    { id: 14, name: 'Thái Nguyên' },
    { id: 15, name: 'Phú Thọ' },
    { id: 16, name: 'Bắc Ninh' },
    { id: 17, name: 'Hưng Yên' },
    { id: 18, name: 'Hải Phòng' },
    { id: 19, name: 'Ninh Bình' },
    { id: 20, name: 'Quảng Trị' },
    { id: 21, name: 'Đà Nẵng' },
    { id: 22, name: 'Quảng Ngãi' },
    { id: 23, name: 'Gia Lai' },
    { id: 24, name: 'Khánh Hòa' },
    { id: 25, name: 'Lâm Đồng' },
    { id: 26, name: 'Đắk Lắk' },
    { id: 27, name: 'TP Hồ Chí Minh' },
    { id: 28, name: 'Đồng Nai' },
    { id: 29, name: 'Tây Ninh' },
    { id: 30, name: 'TP Cần Thơ' },
    { id: 31, name: 'Vĩnh Long' },
    { id: 32, name: 'Đồng Tháp' },
    { id: 33, name: 'Cà Mau' },
    { id: 34, name: 'An Giang' },
];

const JobSearchFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [jobFilters, setJobFilters] = useState(null);
    const [form, setForm] = useState({
        keyword: searchParams.get('keyword') || '',
        location: searchParams.get('location') || '',
        categoryId: searchParams.get('categoryId') || '',
        salaryMin: searchParams.get('salaryMin') || '',
        salaryMax: searchParams.get('salaryMax') || '',
        page: searchParams.get('page') || '1',
        salary: searchParams.get('salary') || '',
        educationId: searchParams.get('educationId') || '',
        experienceId: searchParams.get('experienceId') || '',
        jobTypeId: searchParams.get('jobTypeId') || '',
        jobLevelId: searchParams.get('jobLevelId') || '',
        organizationId: searchParams.get('organizationId') || '',
        sort: searchParams.get('sort') || '',
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
                        { id: '', name: 'All', salaryMin: '', salaryMax: '' },
                        { id: 2, name: 'Under $80k', salaryMin: 0, salaryMax: 80000 },
                        { id: 3, name: '$80k - $120k', salaryMin: 80000, salaryMax: 120000 },
                        { id: 4, name: '$120k - $160k', salaryMin: 120000, salaryMax: 160000 },
                        { id: 5, name: '$160k - $200k', salaryMin: 160000, salaryMax: 200000 },
                        { id: 6, name: '$200k+', salaryMin: 200000, salaryMax: '' },
                        { id: 7, name: 'Negotiable', salaryMin: 0, salaryMax: 0, isNegotiable: true },
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

    useEffect(() => {
        setForm({
            keyword: searchParams.get('keyword') || '',
            location: searchParams.get('location') || '',
            categoryId: searchParams.get('categoryId') || '',
            salaryMin: searchParams.get('salaryMin') || '',
            salaryMax: searchParams.get('salaryMax') || '',
            page: searchParams.get('page') || '1',
            salary: searchParams.get('salary') || '',
            educationId: searchParams.get('educationId') || '',
            experienceId: searchParams.get('experienceId') || '',
            jobTypeId: searchParams.get('jobTypeId') || '',
            jobLevelId: searchParams.get('jobLevelId') || '',
            organizationId: searchParams.get('organizationId') || '',
            sort: searchParams.get('sort') || '',
        });
    }, [searchParams]);

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

        setSearchParams({});
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
                        <option value="">All Locations</option>
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
