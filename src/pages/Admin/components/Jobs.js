import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './Jobs.module.scss';
import { Combobox, useCombobox } from '@mantine/core';
import statisticsService from '~/services/statisticsService';
import JobDetail from '~/pages/JobDetail/JobDetail'; // Modal cho View

const cx = classNames.bind(styles);

const JobRowDropdown = ({ onAction, jobId }) => {
    const combobox = useCombobox();
    return (
        <Combobox
            store={combobox}
            withinPortal
            offset={0}
            onOptionSubmit={(val) => {
                onAction(val, jobId);
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <button
                    type="button"
                    className={cx('iconBtn')}
                    style={{
                        minWidth: 0,
                        minHeight: 0,
                        padding: 0,
                        background: 'none',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={() => combobox.toggleDropdown()}
                >
                    <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="#7b809a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="9" cy="9" r="1" />
                        <circle cx="15" cy="9" r="1" />
                        <circle cx="3" cy="9" r="1" />
                    </svg>
                </button>
            </Combobox.Target>
            <Combobox.Dropdown className={cx('dropdownMenu')}>
                <Combobox.Options>
                    <Combobox.Option value="block" className={cx('dropdownItem', 'dropdownItem--block')}>
                        Block
                    </Combobox.Option>
                    <Combobox.Option value="view" className={cx('dropdownItem')}>
                        View
                    </Combobox.Option>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};

const Jobs = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [searchType, setSearchType] = useState('');
    const [searchSalaryRange, setSearchSalaryRange] = useState('');
    const [searchApplicationRange, setSearchApplicationRange] = useState('');
    const [pendingFilter, setPendingFilter] = useState({
        searchTerm: '',
        searchLocation: '',
        searchType: '',
        searchSalaryRange: '',
        searchApplicationRange: '',
    });
    const [visibleJobs, setVisibleJobs] = useState(10);
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [locationOptions, setLocationOptions] = useState([]);
    const [jobTypeOptions, setJobTypeOptions] = useState([]);

    // Salary range options
    const salaryRanges = [
        { value: '', label: 'All' },
        { value: '0-80000', label: 'Under $80k' },
        { value: '80000-120000', label: '$80k - $120k' },
        { value: '120000-160000', label: '$120k - $160k' },
        { value: '160000-200000', label: '$160k - $200k' },
        { value: '200000-', label: '$200k+' },
    ];
    // Application range options
    const applicationRanges = [
        { value: '', label: 'Applicants' },
        { value: '0-1', label: '0-1' },
        { value: '1-2', label: '1-2' },
        { value: '2-4', label: '2-4' },
        { value: '4-6', label: '4-6' },
        { value: '6-', label: '6+' },
    ];

    // Fetch filter options
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const data = await statisticsService.fetchAllJobs();
                const jobsArr = data?.content || [];
                const locations = Array.from(new Set(jobsArr.map((j) => j.location).filter(Boolean)));
                setLocationOptions(locations);
                const jobTypes = Array.from(new Set(jobsArr.map((j) => j.jobType?.name).filter(Boolean)));
                setJobTypeOptions(jobTypes);
            } catch (err) {
                setLocationOptions([]);
                setJobTypeOptions([]);
            }
        };
        fetchOptions();
    }, []);

    const handleAction = (action, jobId) => {
        const job = jobs.find((j) => j.id === jobId);
        if (action === 'view') {
            setSelectedJob(job);
            setIsModalOpen(true);
        } else if (action === 'block') {
            setJobs((prevJobs) => prevJobs.map((job) => (job.id === jobId ? { ...job, isBlocked: true } : job)));
        }
    };

    const loadMoreJobs = () => {
        setVisibleJobs((prev) => prev + 10);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    const handleSave = (updatedJob) => {
        setJobs((prevJobs) => prevJobs.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
        closeModal();
    };

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const data = await statisticsService.fetchAllJobs();
                const jobArray = data?.content || [];
                setJobs(jobArray);
            } catch (err) {
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    // Filtered jobs
    const filteredJobs = React.useMemo(() => {
        let result = jobs;
        if (searchLocation) {
            result = result.filter((j) => j.location === searchLocation);
        }
        if (searchType) {
            result = result.filter((j) => j.jobType?.name === searchType);
        }
        if (searchSalaryRange) {
            const [min, max] = searchSalaryRange.split('-');
            result = result.filter((j) => {
                const minSalary = Number(j.salaryMin);
                const maxSalary = Number(j.salaryMax);
                if (min && max) return minSalary >= Number(min) && maxSalary <= Number(max);
                if (min && !max) return minSalary >= Number(min);
                if (!min && max) return maxSalary <= Number(max);
                return true;
            });
        }
        if (searchApplicationRange) {
            const [min, max] = searchApplicationRange.split('-');
            result = result.filter((j) => {
                const count = Number(j.jobApplicationCounts || 0);
                if (min && max) return count >= Number(min) && count <= Number(max);
                if (min && !max) return count >= Number(min);
                if (!min && max) return count <= Number(max);
                return true;
            });
        }
        if (searchTerm) {
            const s = searchTerm.toLowerCase();
            result = result.filter(
                (job) =>
                    job.title?.toLowerCase().includes(s) ||
                    job.employer?.email?.toLowerCase().includes(s) ||
                    job.location?.toLowerCase().includes(s),
            );
        }
        return result;
    }, [jobs, searchLocation, searchType, searchSalaryRange, searchApplicationRange, searchTerm]);

    const jobsToDisplay = filteredJobs.slice(0, visibleJobs);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Handler khi nhấn Find Job
    const handleFindJob = () => {
        setSearchTerm(pendingFilter.searchTerm);
        setSearchLocation(pendingFilter.searchLocation);
        setSearchType(pendingFilter.searchType);
        setSearchSalaryRange(pendingFilter.searchSalaryRange);
        setSearchApplicationRange(pendingFilter.searchApplicationRange);
    };

    // Handler khi thay đổi input/select
    const handlePendingChange = (field, value) => {
        setPendingFilter((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className={cx('managementWrapper')}>
            <div className={cx('jobs-header')}>
                <h1 className={cx('title')}>Jobs Management</h1>
            </div>
            {/* Thanh tìm kiếm ngang với các filter mới */}
            <div className={cx('toolbar')} style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
                <div className={cx('search-box')} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Search className={cx('search-icon')} />
                    <input
                        type="text"
                        placeholder="Enter job title or keyword"
                        value={pendingFilter.searchTerm}
                        onChange={(e) => handlePendingChange('searchTerm', e.target.value)}
                        style={{ flex: 1, minWidth: 200 }}
                    />
                </div>
                <select
                    className={cx('filterSelect')}
                    value={pendingFilter.searchLocation}
                    onChange={(e) => handlePendingChange('searchLocation', e.target.value)}
                    style={{ minWidth: 150 }}
                >
                    <option value="">Select location</option>
                    {locationOptions.map((loc) => (
                        <option key={loc} value={loc}>
                            {loc}
                        </option>
                    ))}
                </select>
                <select
                    className={cx('filterSelect')}
                    value={pendingFilter.searchType}
                    onChange={(e) => handlePendingChange('searchType', e.target.value)}
                    style={{ minWidth: 130 }}
                >
                    <option value="">All Types</option>
                    {jobTypeOptions.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
                <select
                    className={cx('filterSelect')}
                    value={pendingFilter.searchSalaryRange}
                    onChange={(e) => handlePendingChange('searchSalaryRange', e.target.value)}
                    style={{ minWidth: 130 }}
                >
                    {salaryRanges.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <select
                    className={cx('filterSelect')}
                    value={pendingFilter.searchApplicationRange}
                    onChange={(e) => handlePendingChange('searchApplicationRange', e.target.value)}
                    style={{ minWidth: 110 }}
                >
                    {applicationRanges.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
                <button className={cx('primary', 'filterBtn')} style={{ minWidth: 120 }} onClick={handleFindJob}>
                    Find Job
                </button>
                <button
                    className={cx('clearBtn')}
                    style={{ minWidth: 100 }}
                    onClick={() => {
                        setPendingFilter({
                            searchTerm: '',
                            searchLocation: '',
                            searchType: '',
                            searchSalaryRange: '',
                            searchApplicationRange: '',
                        });
                        setSearchTerm('');
                        setSearchLocation('');
                        setSearchType('');
                        setSearchSalaryRange('');
                        setSearchApplicationRange('');
                    }}
                >
                    Clear
                </button>
            </div>
            {/* Bảng jobs và các phần còn lại giữ nguyên */}
            <div className={cx('tableWrapper')}>
                <table className={cx('jobs-table')}>
                    <thead>
                        <tr>
                            <th>Job Title & Company</th>
                            <th>Location</th>
                            <th>Type</th>
                            <th>Salary Range</th>
                            <th>Applicants</th>
                            <th>Posted</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobsToDisplay.length > 0 ? (
                            jobsToDisplay.map((job) => (
                                <tr key={job.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div className={cx('avatarCircle')}>
                                                {job.employer?.email?.charAt(0) || 'U'}
                                            </div>
                                            <div>
                                                <div className={cx('job-title')}>{job.title}</div>
                                                <div className={cx('job-company')}>{job.employer?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{job.location}</td>
                                    <td>
                                        <span className={cx('job-type')}>{job.jobType?.name || '--'}</span>
                                    </td>
                                    <td>
                                        ${job.salaryMin} - ${job.salaryMax}
                                    </td>
                                    <td>{job.jobApplicationCounts || 0}</td>
                                    <td>{job.createdAt?.split(' ')[0]}</td>
                                    <td>
                                        <JobRowDropdown
                                            onAction={(action) => handleAction(action, job.id)}
                                            jobId={job.id}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No jobs available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {filteredJobs.length > visibleJobs && (
                    <div className={cx('load-more')}>
                        <button onClick={loadMoreJobs}>Load More</button>
                    </div>
                )}
            </div>

            {/* Modal với JobDetail */}
            {isModalOpen && selectedJob && (
                <div className={cx('modalOverlay')}>
                    <div className={cx('modalBox')}>
                        <button className={cx('closeBtn')} onClick={closeModal}>
                            ×
                        </button>
                        <JobDetail
                            job={{
                                id: selectedJob.id,
                                jobTitle: selectedJob.title,
                                tags: `${selectedJob.title}, ${selectedJob.category?.name || ''}, ${
                                    selectedJob.jobLevel?.name || ''
                                }`,
                                jobRole: selectedJob.jobLevel?.name || 'N/A',
                                badges: { featured: false, fulltime: selectedJob.jobType?.name || 'N/A' },
                                minSalary: selectedJob.salaryMin,
                                maxSalary: selectedJob.salaryMax,
                                salaryType: 'monthly', // Giả định
                                education: 'N/A', // Chưa có trong API
                                experience: 'N/A', // Chưa có trong API
                                jobType: selectedJob.jobType?.name || 'N/A',
                                vacancies: 'N/A', // Chưa có trong API
                                expirationDate: '2025-07-31', // Giả định
                                jobLevel: selectedJob.jobLevel?.name || 'N/A',
                                contactUrl: selectedJob.employer?.website || 'N/A',
                                phone: selectedJob.employer?.phone || 'N/A',
                                email: selectedJob.employer?.email || 'N/A',
                                jobDescription: selectedJob.description || '<p>No description available</p>',
                                responsibilities: '<ul><li>Manage job responsibilities</li></ul>', // Giả định
                                overview: {
                                    posted: selectedJob.createdAt?.split(' ')[0] || 'N/A',
                                    expire: '2025-07-31', // Giả định
                                    education: 'N/A', // Chưa có trong API
                                    salary: `$${selectedJob.salaryMin} - $${selectedJob.salaryMax}/monthly`,
                                    location: selectedJob.location,
                                    jobType: selectedJob.jobType?.name || 'N/A',
                                    experience: 'N/A', // Chưa có trong API
                                    vacancies: 'N/A', // Chưa có trong API
                                    jobLevel: selectedJob.jobLevel?.name || 'N/A',
                                },
                                company: {
                                    name: selectedJob.employer?.email || 'N/A',
                                    description: 'N/A', // Chưa có trong API
                                    founded: 'N/A', // Chưa có trong API
                                    organization: 'N/A', // Chưa có trong API
                                    size: 'N/A', // Chưa có trong API
                                    phone: selectedJob.employer?.phone || 'N/A',
                                    email: selectedJob.employer?.email || 'N/A',
                                    website: selectedJob.employer?.website || 'N/A',
                                },
                            }}
                            editable={isModalOpen === 'edit'} // Chỉnh sửa khi nhấn Edit
                            onSave={handleSave}
                            onCancel={closeModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Jobs;
