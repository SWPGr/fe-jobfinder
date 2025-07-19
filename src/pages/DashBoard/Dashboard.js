import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import JobItemApplied from '~/components/JobItemApplied';
import { Pagination } from '@mantine/core';
import { Link } from 'react-router-dom';
import JobSeekerDashboardService from '~/services/JobSeekerDashboardService';
import JobSeekerProfileService from '~/services/JobSeekerProfileService';
import JobDetail from '~/pages/JobDetail/JobDetail';
import { useNotification } from '~/hooks';

const cx = classNames.bind(styles);

function Dashboard1() {
    const itemsPerPage = 5;

    // State userName
    const [userName, setUserName] = useState('');

    // State for summary stats
    const [summary, setSummary] = useState({
        totalAppliedJobs: 0,
        totalSavedJobs: 0,
        totalJobRecommendations: 0,
    });

    // State for recently applied jobs
    const [recentlyAppliedJobs, setRecentlyAppliedJobs] = useState([]);
    const [recentlyTotalPages, setRecentlyTotalPages] = useState(1);
    const [recentlyPage, setRecentlyPage] = useState(1);
    const [recentlyLoading, setRecentlyLoading] = useState(false);

    // State to check if the profile is complete
    const [isProfileComplete, setIsProfileComplete] = useState(true);
    const [profileData, setProfileData] = useState(null);

    // State for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [loadingJobDetail, setLoadingJobDetail] = useState(false);

    const { showError } = useNotification();
    const token = getTokenFromLocalStorage();

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

    // Fetch user profile and statistics when component mounts
    useEffect(() => {
        const fetchUserNameAndSummary = async () => {
            try {
                const profileRes = await JobSeekerProfileService.getProfile();
                if (profileRes && profileRes.length > 0) {
                    const pData = profileRes[0];
                    setProfileData(pData);
                    setUserName(pData.fullName || '');

                    // Check if profile is complete
                    const isProfileComplete =
                        pData.fullName &&
                        pData.location &&
                        pData.phone &&
                        pData.experienceId &&
                        pData.educationId &&
                        pData.resumeUrl;
                    setIsProfileComplete(isProfileComplete); // Set profile completeness status
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }

            const summaryRes = await JobSeekerDashboardService.getSummaryJobs();
            if (summaryRes?.result) setSummary(summaryRes.result);
        };
        fetchUserNameAndSummary();
    }, []);

    // Fetch recently applied jobs when recentlyPage changes
    useEffect(() => {
        const fetchRecentlyApplied = async () => {
            setRecentlyLoading(true);
            const res = await JobSeekerDashboardService.getAppliedJobs({
                page: recentlyPage,
                size: itemsPerPage,
                sort: 'appliedAt,desc',
            });
            if (res?.content) {
                setRecentlyAppliedJobs(res.content);
                setRecentlyTotalPages(res.totalPages || 1);
            } else {
                setRecentlyAppliedJobs([]);
                setRecentlyTotalPages(1);
            }
            setRecentlyLoading(false);
        };
        fetchRecentlyApplied();
    }, [recentlyPage]);

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
                const existingJob = recentlyAppliedJobs.find((j) => j.id === jobId);
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
        <div className={cx('dashboard-content')}>
            <div className={cx('dashboard-header')}>
                <div>
                    <h2>Hello, {userName || 'User'}</h2>
                    <span className={cx('desc')}>Here is your daily activities and job alerts</span>
                </div>
            </div>

            <div className={cx('stats-cards')}>
                <div className={cx('stat-card', 'blue')}>
                    <div className={cx('stat-number')}>{summary.totalAppliedJobs}</div>
                    <div className={cx('stat-label')}>Applied jobs</div>
                </div>
                <div className={cx('stat-card', 'yellow')}>
                    <div className={cx('stat-number')}>{summary.totalSavedJobs}</div>
                    <div className={cx('stat-label')}>Favorite jobs</div>
                </div>
                <div className={cx('stat-card', 'green')}>
                    <div className={cx('stat-number')}>{summary.totalJobRecommendations}</div>
                    <div className={cx('stat-label')}>Job Alerts</div>
                </div>
            </div>

            {/* Show warning if profile is incomplete */}
            {!isProfileComplete && (
                <div className={cx('profile-warning')}>
                    <div className={cx('warning-text')}>
                        <span className={cx('warning-title')}>Your profile editing is not completed.</span>
                        <span className={cx('warning-desc')}>
                            Complete your profile editing & build your custom Resume
                        </span>
                    </div>

                    <button className={cx('edit-profile-btn')}>
                        <Link to="/settings">Edit Profile →</Link>
                    </button>
                </div>
            )}

            <div className={cx('job-list-container')}>
                <div className={cx('job-list-header')}>
                    <div>
                        <b>Recently Applied</b>
                    </div>
                </div>
                <div className={cx('job-table-head')}>
                    <span>Job</span>
                    <span>Date Applied</span>
                    <span>Status</span>
                    <span>Action</span>
                </div>
                <div className={cx('job-list')}>
                    {recentlyLoading ? (
                        <div style={{ padding: 32, textAlign: 'center' }}>Loading...</div>
                    ) : recentlyAppliedJobs.length === 0 ? (
                        <div style={{ padding: 32, textAlign: 'center', color: '#888' }}>No applied jobs found.</div>
                    ) : (
                        recentlyAppliedJobs.map((job, index) => (
                            <div key={job.id || index} className={cx('job-item')}>
                                <JobItemApplied
                                    image={job.employer?.avatarUrl || ''}
                                    jobDescription={{
                                        companyName: job.employer?.companyName || '', // Company name
                                        companyAddress: job.employer?.location || '', // Company address
                                        jobTitle: job.title || '', // Job title
                                        workTime: job.jobType?.name || '', // Work time (Full-time/Part-time)
                                        salary:
                                            job.salaryMin && job.salaryMax
                                                ? `$${job.salaryMin} - $${job.salaryMax}`
                                                : 'Negotiable', // Salary
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
                                        isActive: job.active, // Job status (active or expired)
                                    }}
                                    isVIP={job.employer?.isPremium || false}
                                    onViewDetails={() => handleViewDetails(job.id)} // Add view details handler
                                />
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32, fontSize: '18px' }}>
                    <Pagination
                        total={recentlyTotalPages}
                        value={recentlyPage}
                        onChange={setRecentlyPage}
                        size="xl"
                        radius="xl"
                        classNames={{
                            root: cx('pagination-root'),
                            control: cx('control'),
                        }}
                    />
                </div>
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
                            <JobDetail
                                job={selectedJob}
                                editable={false}
                                onCancel={closeModal}
                                isApplied={true} // Hide Apply and Save buttons
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard1;
