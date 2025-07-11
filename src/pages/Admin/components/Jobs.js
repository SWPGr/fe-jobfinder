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
                    <Combobox.Option value="delete" className={cx('dropdownItem', 'dropdownItem--delete')}>
                        Delete
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

    const handleAction = (action, jobId) => {
        const job = jobs.find((j) => j.id === jobId);
        if (action === 'view') {
            setSelectedJob(job);
            setIsModalOpen(true);
        } else if (action === 'delete') {
            console.log(`Deleting job ${jobId}`);
            setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
        }
    };

    const loadMoreJobs = () => {
        setVisibleJobs(visibleJobs + 10);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    const handleSave = (updatedJob) => {
        setJobs(jobs.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
        closeModal();
    };

    useEffect(() => {
        const fetchJobs = async () => {
            const data = await statisticsService.fetchAllJobs();
            console.log('Jobs from API:', data);
            setJobs(data || []);
        };
        fetchJobs();
    }, []);

    const filteredJobs = React.useMemo(() => {
        if (!searchTerm) return jobs;
        const s = searchTerm.toLowerCase();
        return jobs.filter(
            (job) =>
                job.title?.toLowerCase().includes(s) ||
                job.employer?.email?.toLowerCase().includes(s) ||
                job.location?.toLowerCase().includes(s),
        );
    }, [searchTerm, jobs]);

    const jobsToDisplay = filteredJobs.slice(0, visibleJobs);

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
                <div className={cx('toolbar-actions')}>
                    <button className={cx('primary')}> Add New Job</button>
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
                            <th>Premium</th>
                            <th>Posted</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobsToDisplay.map((job) => (
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
                                <td>
                                    <span
                                        className={cx('statusText', {
                                            active: job.employer.isPremium,
                                        })}
                                    >
                                        {job.employer.isPremium ? 'Premium' : 'Standard'}
                                    </span>
                                </td>
                                <td>{job.createdAt?.split(' ')[0]}</td>
                                <td>
                                    <JobRowDropdown
                                        onAction={(action) => handleAction(action, job.id)}
                                        jobId={job.id}
                                    />
                                </td>
                            </tr>
                        ))}
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
