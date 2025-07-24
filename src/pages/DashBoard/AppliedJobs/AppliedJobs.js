import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './AppliedJobs.module.scss';
import JobItemApplied from '~/components/JobItemApplied';
import { Pagination } from '@mantine/core';
import JobSeekerDashboardService from '~/services/JobSeekerDashboardService';
import JobDetail from '~/pages/JobDetail/JobDetail';
import { useNotification } from '~/hooks';
import { Search } from 'lucide-react';

const cx = classNames.bind(styles);

function getTokenFromLocalStorage() {
    let token = '';
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        try {
            const user = JSON.parse(storedUser);
            if (user?.token) token = user.token;
        } catch (e) {
            token = '';
        }
    }
    return token;
}

function AppliedJobs() {
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [loadingJobDetail, setLoadingJobDetail] = useState(false);
    const { showError } = useNotification();
    const token = getTokenFromLocalStorage();

    // Filter state
    const [searchTerm, setSearchTerm] = useState('');
    const [pendingSearchTerm, setPendingSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('all');
    const [pendingDateFilter, setPendingDateFilter] = useState('all');

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            const data = await JobSeekerDashboardService.getAppliedJobs({ page, size, token });
            if (data && data.content) {
                setJobs(data.content);
                setTotalPages(data.totalPages || 1);
                setSize(data.size || size);
                console.log(
                    'Available job IDs:',
                    data.content.map((job) => job.id),
                );
            } else {
                setJobs([]);
                setTotalPages(1);
                showError('No applied jobs found');
            }
            setLoading(false);
        };
        fetchJobs();
    }, [page, size, token]);

    // Filtered jobs by search and date
    const filteredJobs = React.useMemo(() => {
        let result = jobs;
        if (searchTerm) {
            const s = searchTerm.toLowerCase();
            result = result.filter(
                (job) =>
                    job.title?.toLowerCase().includes(s) ||
                    job.employer?.companyName?.toLowerCase().includes(s) ||
                    job.employer?.email?.toLowerCase().includes(s),
            );
        }
        if (dateFilter !== 'all') {
            const now = new Date();
            result = result.filter((job) => {
                const appliedDate = new Date(job.createdAt);
                if (dateFilter === 'today') {
                    return appliedDate.toDateString() === now.toDateString();
                } else if (dateFilter === '7days') {
                    const diff = (now - appliedDate) / (1000 * 60 * 60 * 24);
                    return diff <= 7;
                } else if (dateFilter === '30days') {
                    const diff = (now - appliedDate) / (1000 * 60 * 60 * 24);
                    return diff <= 30;
                }
                return true;
            });
        }
        return result;
    }, [jobs, searchTerm, dateFilter]);

    // Handler filter
    const handleFilter = () => {
        setSearchTerm(pendingSearchTerm);
        setDateFilter(pendingDateFilter);
    };
    const handleClear = () => {
        setPendingSearchTerm('');
        setPendingDateFilter('all');
        setSearchTerm('');
        setDateFilter('all');
    };

    // ✅ ESC key close handler
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleEsc);
        }

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isModalOpen]);

    const handleViewDetails = async (jobId) => {
        if (!token) {
            showError('Please log in to view job details');
            return;
        }
        setLoadingJobDetail(true);
        try {
            const jobData = await JobSeekerDashboardService.getJobDetail(jobId, token);
            if (jobData) {
                const normalizedJob = {
                    id: jobData.id,
                    title: jobData.title || 'N/A',
                    salaryMin: jobData.salaryMin || 0,
                    salaryMax: jobData.salaryMax || 0,
                    employer: {
                        companyName: jobData.employer?.companyName || 'N/A',
                        email: jobData.employer?.email || 'N/A',
                        phone: jobData.employer?.phone || 'N/A',
                        website: jobData.employer?.website || 'N/A',
                        avatarUrl: jobData.employer?.avatarUrl || '',
                        description: jobData.employer?.description || 'N/A',
                        yearOfEstablishment: jobData.employer?.yearOfEstablishment || 'N/A',
                        organizationType: jobData.employer?.organizationType || 'N/A',
                        teamSize: jobData.employer?.teamSize || 'N/A',
                    },
                    jobType: jobData.jobType || { name: 'N/A' },
                    category: jobData.category || { name: 'N/A' },
                    jobLevel: jobData.jobLevel || { name: 'N/A' },
                    createdAt: jobData.createdAt || 'N/A',
                    expiredDate: jobData.expiredDate || 'N/A',
                    description: jobData.description || '<p>No description available</p>',
                    location: jobData.location || 'N/A',
                    isApplied: jobData.isApplied || true,
                };
                setSelectedJob(normalizedJob);
                setIsModalOpen(true);
            } else {
                const existingJob = jobs.find((j) => j.id === jobId);
                if (existingJob) {
                    setSelectedJob(existingJob);
                    setIsModalOpen(true);
                } else {
                    showError('Job details not found');
                }
            }
        } catch (error) {
            showError('Failed to load job details');
            console.error('Error fetching job details:', error);
        } finally {
            setLoadingJobDetail(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    return (
        <div className={cx('applied-jobs-wrapper')}>
            <h3 className={cx('title')}>Applied Jobs</h3>
            {/* Thanh filter ngang hiện đại */}
            <div className={cx('toolbar')}>
                <div className={cx('search-box')}>
                    <Search className={cx('search-icon')} />
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        value={pendingSearchTerm}
                        onChange={(e) => setPendingSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className={cx('filterSelect')}
                    value={pendingDateFilter}
                    onChange={(e) => setPendingDateFilter(e.target.value)}
                >
                    <option value="all">All Dates</option>
                    <option value="today">Today</option>
                    <option value="7days">Last 7 days</option>
                    <option value="30days">Last 30 days</option>
                </select>
                <button className={cx('primary', 'filterBtn')} onClick={handleFilter}>
                    Filter
                </button>
                <button className={cx('clearBtn')} onClick={handleClear}>
                    Clear
                </button>
            </div>
            {/* Table header và danh sách jobs giữ nguyên, thay jobs -> filteredJobs */}
            <div className={cx('table-header')}>
                <span>JOBS</span>
                <span>DATE APPLIED</span>
                <span>STATUS</span>
                <span>ACTION</span>
            </div>
            <div className={cx('job-list')}>
                {loading ? (
                    <div>Loading...</div>
                ) : filteredJobs.length === 0 ? (
                    <div style={{ padding: 32, textAlign: 'center', color: '#888' }}>No jobs found.</div>
                ) : (
                    filteredJobs.map((job, index) => (
                        <div key={job.id || index} className={cx('job-item')}>
                            <JobItemApplied
                                image={job.employer?.avatarUrl || ''}
                                jobDescription={{
                                    companyName: job.employer?.companyName || '',
                                    companyAddress: job.employer?.location || '',
                                    jobTitle: job.title || '',
                                    workTime: job.jobType?.name || '',
                                    salary:
                                        job.salaryMin && job.salaryMax
                                            ? `$${job.salaryMin} - $${job.salaryMax}`
                                            : 'Negotiable',
                                    dateApplied: new Date(job.createdAt).toLocaleDateString('en-GB', {
                                        day: 'numeric',
                                        month: 'numeric',
                                    }),
                                    dueDate: job.expiredDate
                                        ? new Date(job.expiredDate).toLocaleDateString('en-GB', {
                                              day: 'numeric',
                                              month: 'numeric',
                                          })
                                        : '',
                                    isActive: job.active,
                                }}
                                isVIP={job.employer?.isPremium || false}
                                onViewDetails={() => handleViewDetails(job.id)}
                            />
                        </div>
                    ))
                )}
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 32,
                    fontSize: '18px',
                }}
            >
                <Pagination
                    total={totalPages}
                    value={page}
                    onChange={setPage}
                    size="xl"
                    radius="xl"
                    classNames={{
                        root: cx('pagination-root'),
                        control: cx('control'),
                    }}
                />
            </div>

            {isModalOpen && selectedJob && (
                <div
                    className={cx('modalOverlay')}
                    role="dialog"
                    aria-labelledby="job-detail-modal"
                    onClick={closeModal}
                >
                    <div className={cx('modalBox')} onClick={(e) => e.stopPropagation()}>
                        <button className={cx('closeBtn')} onClick={closeModal} aria-label="Close job details modal">
                            ×
                        </button>
                        {loadingJobDetail ? (
                            <div>Loading job details...</div>
                        ) : (
                            <JobDetail job={selectedJob} editable={false} onCancel={closeModal} isApplied={true} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AppliedJobs;
