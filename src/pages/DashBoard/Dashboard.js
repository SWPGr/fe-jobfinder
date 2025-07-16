import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import JobItemApplied from '~/components/JobItemApplied';
import { Pagination } from '@mantine/core';
import { Link } from 'react-router-dom';
import Setting from './Setting/Setting';
import JobSeekerDashboardService from '~/services/JobSeekerDashboardService';
import JobSeekerProfileService from '~/services/JobSeekerProfileService'; // import service profile

const cx = classNames.bind(styles);

function Dashboard1() {
    const itemsPerPage = 5;

    // State userName
    const [userName, setUserName] = useState('');

    // State cho stats tổng quan
    const [summary, setSummary] = useState({
        totalAppliedJobs: 0,
        totalSavedJobs: 0,
        totalJobRecommendations: 0,
    });

    // State cho danh sách recently applied jobs
    const [recentlyAppliedJobs, setRecentlyAppliedJobs] = useState([]);
    const [recentlyTotalPages, setRecentlyTotalPages] = useState(1);
    const [recentlyPage, setRecentlyPage] = useState(1);
    const [recentlyLoading, setRecentlyLoading] = useState(false);

    // Lấy tên user và thống kê khi component mount
    useEffect(() => {
        const fetchUserNameAndSummary = async () => {
            try {
                const profileRes = await JobSeekerProfileService.getProfile();
                if (profileRes && profileRes.length > 0) {
                    setUserName(profileRes[0].fullName || '');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }

            const summaryRes = await JobSeekerDashboardService.getSummaryJobs();
            if (summaryRes?.result) setSummary(summaryRes.result);
        };
        fetchUserNameAndSummary();
    }, []);

    // Lấy danh sách recently applied jobs khi recentlyPage thay đổi
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

            <div className={cx('profile-warning')}>
                <div className={cx('warning-text')}>
                    <span className={cx('warning-title')}>Your profile editing is not completed.</span>
                    <span className={cx('warning-desc')}>Complete your profile editing & build your custom Resume</span>
                </div>

                <button className={cx('edit-profile-btn')}>
                    <Link to={Setting}>Edit Profile →</Link>
                </button>
            </div>

            <div className={cx('job-list-container')}>
                <div className={cx('job-list-header')}>
                    <div>
                        <b>Recently Applied</b>
                    </div>
                    <button className={cx('view-all-btn')}>View all →</button>
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
                                        companyName: job.employer?.companyName || '',
                                        companyAddress: job.location || job.employer?.location || '',
                                        jobTitle: job.title || '',
                                        workTime: job.jobType?.name || '',
                                        salary:
                                            job.salaryMin && job.salaryMax
                                                ? `$${job.salaryMin} - $${job.salaryMax}`
                                                : 'Negotiable',
                                        dueDate: job.appliedAt ? new Date(job.appliedAt).toLocaleDateString() : '',
                                    }}
                                    isVIP={job.employer?.isPremium || false}
                                />
                            </div>
                        ))
                    )}
                </div>
                {/* Phân trang Mantine */}
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
        </div>
    );
}

export default Dashboard1;
