import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Jobs.module.scss';
import { Combobox, useCombobox } from '@mantine/core';
import JobDetail from '~/pages/JobDetail/JobDetail'; // Modal cho View
import { JobSearchFilters } from '~/components';
import { useSearchParams } from 'react-router-dom';
import { jobService } from '~/services';
import { Pagination } from '@mantine/core';

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
    const [searchParams, setSearchParams] = useSearchParams();

    const [visibleJobs, setVisibleJobs] = useState(10);
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [totalHits, setTotalHits] = useState(1);
    const totalPages = Math.ceil(totalHits / 10);

    const handleAction = (action, jobId) => {
        const job = jobs.find((j) => j.id === jobId);
        if (action === 'view') {
            setSelectedJob(job);
            setIsModalOpen(true);
        } else if (action === 'block') {
            setJobs((prevJobs) => prevJobs.map((job) => (job.id === jobId ? { ...job, isBlocked: true } : job)));
        }
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
                const entries = Object.fromEntries(searchParams);
                const data = await jobService.searchJob(entries);
                const jobArray = data?.data || [];
                setJobs(jobArray);
                setTotalHits(data.totalHits);
            } catch (err) {
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, [searchParams]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page);
        setSearchParams(params);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={cx('managementWrapper')}>
            <div className={cx('jobs-header')}>
                <h1 className={cx('title')}>Jobs Management</h1>
            </div>

            <JobSearchFilters />
            {/* Thanh tìm kiếm ngang với các filter mới */}

            {/* Bảng jobs và các phần còn lại giữ nguyên */}
            <div className={cx('tableWrapper')}>
                <table className={cx('jobs-table')}>
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Location</th>
                            <th>Type</th>
                            <th>Salary Range</th>
                            <th>Applicants</th>
                            <th>Status</th>
                            <th>Posted</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.length > 0 ? (
                            jobs.map((job) => (
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
                                        <span className={cx('job-status', job.active ? 'active' : 'inactive')}>
                                            {job.active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>{job.createdAt ? formatDate(job.createdAt).split(',')[0] : ''}</td>
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
            </div>

            <div className={cx('pagination')}>
                <Pagination
                    total={totalPages}
                    value={Number(searchParams.get('page')) || 1}
                    onChange={handlePageChange}
                    radius="xl"
                    classNames={{ root: cx('pagination-root'), control: cx('control') }}
                />
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
                                vacancy: selectedJob.vacancy,
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
                                    vacancy: selectedJob.vacancy, // Chưa có trong API
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
