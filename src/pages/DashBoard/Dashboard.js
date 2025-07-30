import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import JobSeekerDashboardService from '~/services/JobSeekerDashboardService';
import JobSeekerProfileService from '~/services/JobSeekerProfileService';
import { useNotification } from '~/hooks';
import SeekerDetail from '~/pages/SeekerDetail/SeekerDetail';
import { TiTick } from "react-icons/ti";

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
        <div className={cx('dashboard-container-main')}>
            <div className={cx('dashboard-header')}>
                <div>
                    <h2>Hello, {userName || 'User'}</h2>
                    <span className={cx('desc')}>Here is your profile information</span>
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
            <div className={cx('dashboard-container')}>

                <div className={cx('dashboard-content-1')}>


                    {/* Card thông tin cá nhân - dùng SeekerDetail */}

                    {profileData && (
                        <SeekerDetail
                            applicant={{
                                ...profileData,
                                seekerDetail: profileData, // sửa lại key này để SeekerDetail lấy đúng avatar và tên
                                id: profileData.id || profileData._id || 1,
                                title: '',
                            }}
                        />
                    )}

                </div>
                <div className={cx('dashboard-content-2')}>
                    <div className={cx('ad-banner-landing')}>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            alt="JobFinder Banner"
                            className={cx('ad-banner-img')}
                        />
                        <h2 className={cx('ad-banner-title')}>Find Your Perfect Job with JobFinder!</h2>
                        <p className={cx('ad-banner-desc')}>
                            Instantly search thousands of jobs tailored to your skills and interests.<br />
                            <b>Use our smart filters</b> to discover the best opportunities for you!
                        </p>
                        <ul className={cx('ad-banner-benefits')}>
                            <li><TiTick className={cx('tick-icon')} /> Advanced job search with real-time results</li>
                            <li><TiTick className={cx('tick-icon')} /> Filter by location, salary, industry, and more</li>
                            <li><TiTick className={cx('tick-icon')} /> Save your favorite jobs for later</li>
                            <li><TiTick className={cx('tick-icon')} /> Get instant notifications for new matching jobs</li>
                        </ul>
                        <a
                            href="/find-job"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cx('ad-banner-cta')}
                        >
                            Find Jobs Now!
                        </a>
                        <div className={cx('ad-banner-contact')}>
                            <span>Hotline: <a href="tel:0123456789">0123 456 789</a></span> |
                            <span>Email: <a href="mailto:support@jobfinder.com">support@jobfinder.com</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Dashboard1;
