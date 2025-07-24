import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './Jobs.module.scss';
import { Combobox, useCombobox } from '@mantine/core';
import statisticsService from '~/services/statisticsService';
import JobDetail from '~/pages/JobDetail/JobDetail'; // Modal cho View
import { IconAdjustments, IconAdjustmentsOff } from '@tabler/icons-react';

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
    const [visibleJobs, setVisibleJobs] = useState(10);
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    // Filter state
    const [filter, setFilter] = useState({
        salaryMin: '',
        salaryMax: '',
        jobType: '',
        jobLevel: '',
        location: '',
    });
    const [pendingFilter, setPendingFilter] = useState({
        salaryMin: '',
        salaryMax: '',
        jobType: '',
        jobLevel: '',
        location: '',
    });
    const [jobTypeOptions, setJobTypeOptions] = useState([]);
    const [jobLevelOptions, setJobLevelOptions] = useState([]);
    const [locationOptions, setLocationOptions] = useState([]);
    // const [experienceOptions, setExperienceOptions] = useState([]); // Remove

    // Fetch filter options
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const data = await statisticsService.fetchAllJobs();
                const jobsArr = data?.content || [];
                // Lấy unique các trường
                const jobTypes = Array.from(new Set(jobsArr.map((j) => j.jobType?.name).filter(Boolean)));
                const jobLevels = Array.from(new Set(jobsArr.map((j) => j.jobLevel?.name).filter(Boolean)));
                const locations = Array.from(new Set(jobsArr.map((j) => j.location).filter(Boolean)));
                // const experiences = Array.from(new Set(jobsArr.map(j => j.experience).filter(Boolean)));
                setJobTypeOptions(jobTypes);
                setJobLevelOptions(jobLevels);
                setLocationOptions(locations);
                // setExperienceOptions(experiences);
            } catch (err) {
                setJobTypeOptions([]);
                setJobLevelOptions([]);
                setLocationOptions([]);
                // setExperienceOptions([]);
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
            console.log(`Blocking job ${jobId}`);
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
        if (filter.jobType) {
            result = result.filter((j) => j.jobType?.name === filter.jobType);
        }
        if (filter.jobLevel) {
            result = result.filter((j) => j.jobLevel?.name === filter.jobLevel);
        }
        if (filter.location) {
            result = result.filter((j) => j.location === filter.location);
        }
        // Remove experience filter
        if (filter.salaryMin) {
            result = result.filter((j) => Number(j.salaryMin) >= Number(filter.salaryMin));
        }
        if (filter.salaryMax) {
            result = result.filter((j) => Number(j.salaryMax) <= Number(filter.salaryMax));
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
    }, [jobs, filter, searchTerm]);

    const jobsToDisplay = filteredJobs.slice(0, visibleJobs);

    if (loading) {
        return <div>Loading...</div>; // Show loading state while fetching
    }

    return (
        <div className={cx('managementWrapper')}>
            <div className={cx('jobs-header')}>
                <h1 className={cx('title')}>Jobs Management</h1>
            </div>
            <div className={cx('toolbar')}>
                <div className={cx('search-box')}>
                    <Search className={cx('search-icon')} />
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            {/* Filter Bar giống FindJob */}
            <div className={cx('horizontalFilterBar')}>
                <div className={cx('filterGroup')}>
                    <div className={cx('filterLabel')}>Job Type</div>
                    <select
                        className={cx('filterSelect')}
                        value={pendingFilter.jobType}
                        onChange={(e) => setPendingFilter((f) => ({ ...f, jobType: e.target.value }))}
                    >
                        <option value="">All</option>
                        {jobTypeOptions.map((type) => (
                            <option key={type.id || type} value={type.id || type}>
                                {type.name || type}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={cx('filterGroup')}>
                    <div className={cx('filterLabel')}>Location</div>
                    <select
                        className={cx('filterSelect')}
                        value={pendingFilter.location}
                        onChange={(e) => setPendingFilter((f) => ({ ...f, location: e.target.value }))}
                    >
                        <option value="">All</option>
                        {locationOptions.map((loc) => (
                            <option key={loc.id || loc} value={loc.id || loc}>
                                {loc.name || loc}
                            </option>
                        ))}
                    </select>
                </div>
                {/* Salary filter group moved to the bottom */}
                <div className={cx('filterGroup')}>
                    <div className={cx('filterLabel')}>Salary</div>
                    <div className={cx('filterOptions')} style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="number"
                            placeholder="Min"
                            value={pendingFilter.salaryMin}
                            onChange={(e) => setPendingFilter((f) => ({ ...f, salaryMin: e.target.value }))}
                            className={cx('filterInput')}
                            min={0}
                        />
                        <input
                            type="number"
                            placeholder="Max"
                            value={pendingFilter.salaryMax}
                            onChange={(e) => setPendingFilter((f) => ({ ...f, salaryMax: e.target.value }))}
                            className={cx('filterInput')}
                            min={0}
                        />
                    </div>
                </div>
                <div
                    style={{ display: 'flex', flexDirection: 'row', gap: 12, alignItems: 'flex-end', marginRight: 24 }}
                >
                    <button className={cx('primary', 'filterBtn')} onClick={() => setFilter(pendingFilter)}>
                        <IconAdjustments size={20} /> Filter
                    </button>
                    <button
                        className={cx('clearBtn')}
                        onClick={() => {
                            setPendingFilter({ salaryMin: '', salaryMax: '', jobType: '', jobLevel: '', location: '' });
                            setFilter({ salaryMin: '', salaryMax: '', jobType: '', jobLevel: '', location: '' });
                        }}
                    >
                        <IconAdjustmentsOff size={20} /> Clear
                    </button>
                </div>
            </div>
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
