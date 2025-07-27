import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './AppliedJobs.module.scss';
import JobItemApplied from '~/components/JobItemApplied';
import { Pagination } from '@mantine/core';
import JobSeekerDashboardService from '~/services/JobSeekerDashboardService';
import JobDetail from '~/pages/JobDetail/JobDetail';
import { useNotification } from '~/hooks';
import { Search } from 'lucide-react';
import { Badge } from '@mantine/core';

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
    const [applications, setApplications] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(undefined);
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
            const data = await JobSeekerDashboardService.getAppliedJobs({ page: page - 1, size, token });
            if (data && data.content) {
                setApplications(
                    data.content.map((app) => ({
                        ...app,
                        job: {
                            ...app.job,
                            salaryMin: app.job?.salaryMin || 0,
                            salaryMax: app.job?.salaryMax || 0,
                            location: app.job?.location || 'N/A',
                        },
                    })),
                );
                setTotalPages(data.totalPages || 1);
                setSize(data.size);
                console.log(
                    'Available application IDs:',
                    data.content.map((app) => app.id),
                );
            } else {
                setApplications([]);
                setTotalPages(1);
                showError('No applied jobs found');
            }
            setLoading(false);
        };
        fetchJobs();
    }, [page, size, token]);

    const filteredApplications = React.useMemo(() => {
        let result = applications;
        if (searchTerm) {
            const s = searchTerm.toLowerCase();
            result = result.filter(
                (app) =>
                    app.job?.title?.toLowerCase().includes(s) ||
                    app.job?.employer?.companyName?.toLowerCase().includes(s) ||
                    app.job?.employer?.email?.toLowerCase().includes(s) ||
                    app.job?.location?.toLowerCase().includes(s),
            );
        }
        if (dateFilter !== 'all') {
            const now = new Date();
            result = result.filter((app) => {
                const appliedDate = new Date(app.appliedAt);
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
    }, [applications, searchTerm, dateFilter]);

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
                    location: jobData.location || 'N/A',
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
                    isApplied: jobData.isApplied || true,
                    vacancy: jobData.vacancy || 1,
                };
                setSelectedJob(normalizedJob);
                setIsModalOpen(true);
            } else {
                const existingApp = applications.find((a) => a.job?.id === jobId);
                if (existingApp) {
                    setSelectedJob({
                        ...existingApp.job,
                        salaryMin: existingApp.job?.salaryMin || 0,
                        salaryMax: existingApp.job?.salaryMax || 0,
                        location: existingApp.job?.location || 'N/A',
                    });
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

    function StatusBadge({ status }) {
        let color = 'gray',
            label = status || 'Unknown';
        switch ((status || '').toUpperCase()) {
            case 'PENDING':
                color = 'yellow';
                label = 'Pending';
                break;
            case 'APPROVED':
            case 'ACCEPTED':
                color = 'green';
                label = 'Approved';
                break;
            case 'REJECTED':
            case 'DENIED':
                color = 'red';
                label = 'Rejected';
                break;
            default:
                break;
        }
        return (
            <Badge color={color} size="lg">
                {label}
            </Badge>
        );
    }

    return (
        <div className={cx('applied-jobs-wrapper')}>
            <h3 className={cx('title')}>Applied Jobs</h3>
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
                <div className={cx('filter-select-container')}>
                    <select
                        className={cx('filterSelect')}
                        value={pendingDateFilter}
                        onChange={(e) => setPendingDateFilter(e.target.value)}
                    >
                        <option value="all"> All Dates</option>
                        <option value="today">Today</option>
                        <option value="7days"> Last 7 days</option>
                        <option value="30days"> Last 30 days</option>
                    </select>
                </div>
                <button className={cx('primary', 'filterBtn')} onClick={handleFilter}>
                    Filter
                </button>
                <button className={cx('clearBtn')} onClick={handleClear}>
                    Clear
                </button>
            </div>
            <div className={cx('table-header')}>
                <span>JOBS</span>
                <span>APPLIED DATE</span>
                <span>STATUS</span>

                <span>ACTION</span>
            </div>
            <div className={cx('job-list')}>
                {loading ? (
                    <div>Loading...</div>
                ) : filteredApplications.length === 0 ? (
                    <div style={{ padding: 32, textAlign: 'center', color: '#888' }}>No jobs found.</div>
                ) : (

                    filteredApplications.map((application, index) => {
                        const appliedDate = application.appliedAt
                            ? new Date(application.appliedAt).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            })
                            : '';
                        return (
                            <div key={application.id || index} className={cx('job-item-row')}>
                                <JobItemApplied
                                    image={application.job?.employer?.avatarUrl || ''}
                                    jobDescription={{
                                        companyName: application.job?.employer?.companyName || '',
                                        companyAddress: application.job?.location || '',
                                        jobTitle: application.job?.title || '',
                                        workTime: application.job?.jobType?.name || '',
                                        salary:
                                            application.job?.salaryMin && application.job?.salaryMax
                                                ? `$${application.job.salaryMin} - $${application.job.salaryMax}`
                                                : 'Negotiable',
                                    }}
                                    isVIP={application.job?.employer?.isPremium || false}
                                    appliedDate={appliedDate}
                                    status={application.status}
                                    onViewDetails={() => handleViewDetails(application.job.id)}
                                />
                            </div>
                        );
                    })

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
