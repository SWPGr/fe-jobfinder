import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './FavoriteJobs.module.scss';
import JobItemList from '~/components/JobItemList';
import { Images } from '~/assets';
import { Pagination } from '@mantine/core';
import JobSeekerDashboardService from '~/services/JobSeekerDashboardService';
import { Search } from 'lucide-react';

const cx = classNames.bind(styles);

function FavoriteJobs() {
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Filter state
    const [searchTerm, setSearchTerm] = useState('');
    const [pendingSearchTerm, setPendingSearchTerm] = useState('');
    const [expiredRange, setExpiredRange] = useState('all');
    const [pendingExpiredRange, setPendingExpiredRange] = useState('all');

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            setError('');

            try {
                const data = await JobSeekerDashboardService.getSavedJobs({ page, size });
                if (data && Array.isArray(data.content)) {
                    setJobs(data.content);
                    setTotalPages(data.totalPages || 1);
                    setSize(data.size || size);
                } else if (data === null) {
                    setJobs([]);
                    setTotalPages(1);
                    setError('Network error or not logged in.');
                } else {
                    setJobs([]);
                    setTotalPages(1);
                    setError('No favorite jobs found.');
                }
            } catch (err) {
                setError('Failed to fetch jobs.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [page, size]);

    // Filtered jobs by search and expired date range
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
        // Filter by expired date range (number of days left)
        if (expiredRange !== 'all') {
            result = result.filter((job) => {
                if (!job.expiredDate) return false;
                const now = new Date();
                const expiredDate = new Date(job.expiredDate);
                const daysLeft = Math.ceil((expiredDate - now) / (1000 * 60 * 60 * 24));
                switch (expiredRange) {
                    case '0-50':
                        return daysLeft >= 0 && daysLeft <= 50;
                    case '51-100':
                        return daysLeft >= 51 && daysLeft <= 100;
                    case '101-150':
                        return daysLeft >= 101 && daysLeft <= 150;
                    case '151-200':
                        return daysLeft >= 151 && daysLeft <= 200;
                    case '200+':
                        return daysLeft >= 201;
                    default:
                        return true;
                }
            });
        }
        return result;
    }, [jobs, searchTerm, expiredRange]);

    // Handler filter
    const handleFilter = () => {
        setSearchTerm(pendingSearchTerm);
        setExpiredRange(pendingExpiredRange);
    };
    const handleClear = () => {
        setPendingSearchTerm('');
        setSearchTerm('');
        setPendingExpiredRange('all');
        setExpiredRange('all');
    };

    return (
        <div className={cx('favorite-jobs-wrapper')}>
            <h3 className={cx('title')}>Favorite Jobs</h3>

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
                {/* Expired date range select */}
                <select
                    className={cx('filterSelect')}
                    value={pendingExpiredRange}
                    onChange={(e) => setPendingExpiredRange(e.target.value)}
                >
                    <option value="all">All Expired Dates</option>
                    <option value="0-50">0 - 50 days left</option>
                    <option value="51-100">51 - 100 days left</option>
                    <option value="101-150">101 - 150 days left</option>
                    <option value="151-200">151 - 200 days left</option>
                    <option value="200+">200+ days left</option>
                </select>
                <button className={cx('primary', 'filterBtn')} onClick={handleFilter}>
                    Filter
                </button>
                <button className={cx('clearBtn')} onClick={handleClear}>
                    Clear
                </button>
            </div>

            <div className={cx('job-list')}>
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div style={{ padding: 32, textAlign: 'center', color: 'red' }}>{error}</div>
                ) : filteredJobs.length === 0 ? (
                    <div style={{ padding: 32, textAlign: 'center', color: '#888' }}>No favorite jobs found.</div>
                ) : (
                    filteredJobs.map((job, index) => (
                        <div key={job.id || index} className={cx('job-item')}>
                            <JobItemList
                                image={job.employer?.avatarUrl || Images.google_image}
                                description={{
                                    id: job.id,
                                    companyName: job.employer?.companyName || '',
                                    companyAddress: job.location || job.employer?.location || '',
                                    jobTitle: job.title || '',
                                    workTime: job.jobType?.name || '',
                                    salary:
                                        job.salaryMin && job.salaryMax
                                            ? `$${job.salaryMin} - $${job.salaryMax}`
                                            : job.salaryMin
                                                ? `$${job.salaryMin}`
                                                : 'Negotiable',
                                    remainDay: job.expiredDate
                                        ? Math.max(
                                            0,
                                            Math.ceil(
                                                (new Date(job.expiredDate) - new Date()) / (1000 * 60 * 60 * 24),
                                            ),
                                        )
                                        : '',
                                    isSave: job.isSave,
                                    dateApplied: new Date(job.createdAt).toLocaleDateString(),
                                    isActive: job.active, // Display active status
                                }}
                                isLogin
                                isVIP={job.employer?.isPremium}
                            />
                        </div>
                    ))
                )}
            </div>
            <div className={cx('pagination-root')}>
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
        </div>
    );
}

export default FavoriteJobs;
