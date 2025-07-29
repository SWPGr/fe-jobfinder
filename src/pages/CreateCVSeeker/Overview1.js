import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Overview1.module.scss';
import { JobItemOwner } from '~/components';
import EmployerService from '~/services/EmployerService';

const cx = classNames.bind(styles);

const Overview1 = () => {
    const [allActiveJobs, setAllActiveJobs] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [totalApplications, setTotalApplications] = useState(0);

    const [pageNumber, setPageNumber] = useState(0);
    const pageSize = 5;

    const [pagination, setPagination] = useState({
        totalElements: 0,
        totalPages: 1,
        isFirst: true,
        isLast: true,
    });

    // --- Filter ---
    const [filters, setFilters] = useState({
        name: '',
        status: 'Active',
        startDate: '',
        endDate: '',
    });

    // Hàm lọc job active
    const filterActiveJobs = (jobsData) => {
        const now = new Date();
        return jobsData.filter((job) => {
            if (!job.expiredDate) return true;
            const expiredTime = Date.parse(job.expiredDate);
            if (isNaN(expiredTime)) return true;
            return expiredTime >= now.getTime();
        });
    };

    // Fetch danh sách job
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { jobs: apiJobs } = await EmployerService.fetchMyJobFake(pageNumber, pageSize, true, filters.name, filters.startDate, filters.endDate);
                const activeJobs = filterActiveJobs(apiJobs);

                const totalApps = activeJobs.reduce(
                    (sum, job) => sum + (job.numberApplications || 0),
                    0
                );

                setAllActiveJobs(activeJobs);
                setTotalApplications(totalApps);

                // Áp dụng filter lần đầu
                applyFilterAndPagination(activeJobs, filters, pageNumber);
            } catch (err) {
                console.error('Error fetching jobs:', err);
            }
        };

        fetchJobs();
    }, [filters, pageNumber]);

    // Khi filters hoặc pageNumber thay đổi → lọc lại
    useEffect(() => {
        applyFilterAndPagination(allActiveJobs, filters, pageNumber);
    }, [filters, pageNumber, allActiveJobs]);

    // Hàm áp dụng filter + pagination
    const applyFilterAndPagination = (jobsData, filters, pageNum) => {
        let filtered = [...jobsData];

        // Lọc theo Name
        if (filters.name) {
            filtered = filtered.filter((job) =>
                job.title?.toLowerCase().includes(filters.name.toLowerCase())
            );
        }

        // Lọc theo Status
        if (filters.status === 'active') {
            filtered = filterActiveJobs(filtered);
        } else if (filters.status === 'expired') {
            const now = new Date();
            filtered = filtered.filter((job) => {
                const expiredTime = Date.parse(job.expiredDate);
                return !isNaN(expiredTime) && expiredTime < now.getTime();
            });
        }

        // Lọc theo khoảng ngày
        if (filters.startDate || filters.endDate) {
            const start = filters.startDate ? new Date(filters.startDate).getTime() : null;
            const end = filters.endDate ? new Date(filters.endDate).getTime() : null;

            filtered = filtered.filter((job) => {
                const jobDate = Date.parse(job.expiredDate) || 0;

                if (start && jobDate < start) return false;
                if (end && jobDate > end) return false;
                return true;
            });
        }

        // Pagination
        const totalElements = filtered.length;
        const totalPages = Math.max(1, Math.ceil(totalElements / pageSize));

        const safePage = pageNum >= totalPages ? 0 : pageNum;
        const startIndex = safePage * pageSize;
        const displayedJobs = filtered.slice(startIndex, startIndex + pageSize);

        setJobs(displayedJobs);
        setPagination({
            totalElements,
            totalPages,
            isFirst: safePage === 0,
            isLast: safePage === totalPages - 1,
        });

        if (safePage !== pageNum) setPageNumber(safePage);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < pagination.totalPages) {
            setPageNumber(newPage);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className={cx('container')}>
            {/* Header */}
            <div className={cx('overview-header')}>
                <div className={cx('titleMain')}>Hello, Instagram</div>
                <p className={cx('desc')}>Here is your daily activities and applications</p>
            </div>

            {/* Info cards */}
            <div className={cx('info-cards')}>
                <div className={cx('info-card', 'blue')}>
                    <div className={cx('info-number')}>{pagination.totalElements}</div>
                    <div className={cx('info-label')}>Open Jobs</div>
                </div>
                <div className={cx('info-card', 'yellow')}>
                    <div className={cx('info-number')}>{totalApplications}</div>
                    <div className={cx('info-label')}>Total Applications</div>
                </div>
            </div>

            {/* Filter panel */}
            <div className={cx('filter-panel')}>
                {/* Name */}
                <input
                    type="text"
                    name="name"
                    placeholder="Search by name"
                    value={filters.name}
                    onChange={handleFilterChange}
                />

                {/* Status */}
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                </select>

                {/* Start date */}
                <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    max={filters.endDate || ""}
                    onChange={handleFilterChange}
                />



                {/* End date */}
                <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    min={filters.startDate || ""}
                    onChange={handleFilterChange}
                />
            </div>

            {/* Table Head */}
            <div className={cx('job-table-head')}>
                <span className={cx('jobs')}>JOBS</span>
                <span className={cx('status')}>STATUS</span>
                <span className={cx('applications')}>APPLICATIONS</span>
                <span className={cx('actions')}>ACTIONS</span>
            </div>

            {/* Job items */}
            <div className={cx('job-list')}>
                {jobs.map((job) => (
                    <JobItemOwner
                        key={job.id}
                        jobDescription={job}
                        isVIP={job.isVIP}
                        isActive={true}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div className={cx('pagination')}>
                <button
                    disabled={pagination.isFirst}
                    onClick={() => handlePageChange(pageNumber - 1)}
                >
                    {'<'}
                </button>
                {Array.from({ length: pagination.totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={cx({ active: i === pageNumber })}
                        onClick={() => handlePageChange(i)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    disabled={pagination.isLast}
                    onClick={() => handlePageChange(pageNumber + 1)}
                >
                    {'>'}
                </button>
            </div>
        </div>
    );
};

export default Overview1;
