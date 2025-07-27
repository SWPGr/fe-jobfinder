import React, { useState, useEffect } from 'react';
import { SearchIcon, FilterIcon, ChevronDownIcon } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { jobService } from '~/services';

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

const UserSearchFilter = ({ type = "JOB_SEEKERS" }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [jobFilters, setJobFilters] = useState(null);



    const [form, setForm] = useState({
        keyword: searchParams.get('keyword') || '',
        location: searchParams.get('location') || '',
        page: searchParams.get('page') || '1',
        educationId: searchParams.get('educationId') || '',
        experienceId: searchParams.get('experienceId') || '',
        organizationId: searchParams.get('organizationId') || '',
        sort: searchParams.get('sort') || '',
        userTypeId: searchParams.get('userTypeId') || '',
    });


    useEffect(() => {
        const fetchOptions = async () => {
            const data = await jobService.getAllOptions();

            const filters = {
                organizationId: {
                    name: 'Organization Type',
                    type: 'Radio',
                    options: [{ name: 'All', id: '' }, ...data?.organizations],
                },
                experienceId: {
                    name: 'Experience',
                    options: [...data.experiences],
                },
                educationId: {
                    name: 'Education',
                    options: [...data.educations],
                },
                userTypeId: {
                    name: 'User Type',
                    options: [{ id: 1, name: "Normal" }, { id: 2, name: "Premium" }],
                },
            };

            setJobFilters(filters);
        };

        fetchOptions();
    }, []);

    const handleChange = (key, value) => {
        setForm({
            ...form,
            [key]: value,
        });
    };

    const handleClear = () => {
        setForm({
            keyword: '',
            location: '',
            experienceId: '',
            jobTypeId: '',
            educationId: '',
            organizationId: '',
            userTypeId: '',
        });

        setSearchParams({});
    };

    const handleSubmit = () => {
        const params = new URLSearchParams();
        for (const [key, value] of Object.entries(form)) {
            if (value !== '' && value !== null && value !== undefined) {
                params.set(key, value);
            }
        }
        params.set('page', '1');
        setSearchParams(params);
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
                        className="block  w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                        <option disabled selected hidden value="">All Locations</option>
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
                {/* Experience Level */}
                {type === "JOB_SEEKERS" ? (
                    <>
                        {/* Experience Level */}
                        <div className="relative">
                            <select
                                value={form.experienceId}
                                onChange={(e) => handleChange('experienceId', e.target.value)}
                                className="block w-full pl-3 pr-10 py-2 text-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm appearance-none"
                            >
                                <option disabled hidden value="">Any Experience Level</option>
                                {jobFilters.experienceId.options.map((exp) => (
                                    <option key={exp.id} value={exp.id}>
                                        {exp.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>

                        {/* Education Level */}
                        <div className="relative">
                            <select
                                value={form.educationId}
                                onChange={(e) => handleChange('educationId', e.target.value)}
                                className="block w-full pl-3 pr-10 py-2 text-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm appearance-none"
                            >
                                <option disabled hidden value="">Any Education Level</option>
                                {jobFilters.educationId.options.map((edu) => (
                                    <option key={edu.id} value={edu.id}>
                                        {edu.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Organization */}
                        <div className="relative">
                            <select
                                value={form.organizationId}
                                onChange={(e) => handleChange('organizationId', e.target.value)}
                                className="block w-full pl-3 pr-10 py-2 text-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm appearance-none"
                            >
                                <option disabled hidden value="">Organization type</option>
                                {jobFilters.organizationId.options.map((exp) => (
                                    <option key={exp.id} value={exp.id}>
                                        {exp.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                            </div>
                        </div>
                    </>
                )}

                {/* User type (VIP) */}
                <div className="relative">
                    <select
                        value={form.userTypeId}
                        onChange={(e) => handleChange('userTypeId', e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md text-sm appearance-none">
                        <option disabled selected hidden value="">User type</option>
                        {jobFilters.userTypeId.options.map((exp) => (
                            <option key={exp.id} value={exp.id}>
                                {exp.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronDownIcon className="h-4 w-4 text-gray-400" />
                    </div>
                </div>
                {/*  */}
            </div>
            {/* Advanced Filters */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-xl text-blue-600 font-medium">
                        <FilterIcon className="w-4 h-4" /> Advanced Filters
                    </button>
                    <div className="h-4 w-px bg-gray-300"></div>
                    <button onClick={handleClear} className="text-xl text-blue-600 font-medium">Clear All</button>
                </div>
                <button onClick={handleSubmit}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                    Search Users
                </button>
            </div>
        </div>
    );
};

export default UserSearchFilter;
