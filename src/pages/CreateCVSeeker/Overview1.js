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
        status: 'all', // allow all, active, expired
        startDate: '',
        endDate: '',
    });

    // Hàm lọc job active và expired
    const filterJobs = (jobsData) => {
        const now = new Date();
        return jobsData.filter((job) => {
            // Kiểm tra trạng thái job và ngày hết hạn
            if (filters.status === 'active') {
                if (job.isActive && job.expiredDate) {
                    const expiredTime = Date.parse(job.expiredDate);
                    return !isNaN(expiredTime) && expiredTime >= now.getTime();
                }
                return job.isActive;
            } else if (filters.status === 'expired') {
                if (job.expiredDate) {
                    const expiredTime = Date.parse(job.expiredDate);
                    return !isNaN(expiredTime) && expiredTime < now.getTime();
                }
                return false;
            }
            return true; // Trạng thái "all"
        });
    };

    // Fetch danh sách job
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { jobs: apiJobs, pagination: apiPagination } = await EmployerService.fetchMyJobFake(
                    pageNumber, // Page number
                    pageSize,   // Page size
                    true,       // isActive
                    filters.name, // jobTitle filter
                    filters.startDate, // fromDate filter
                    filters.endDate    // toDate filter
                );
                console.log("Fetched Jobs:", apiJobs);

                // Lọc công việc theo bộ lọc
                const filteredJobs = filterJobs(apiJobs);
                console.log("Filtered Jobs:", filteredJobs);

                const totalApps = filteredJobs.reduce(
                    (sum, job) => sum + (job.numberApplications || 0),
                    0
                );

                setAllActiveJobs(filteredJobs);
                setTotalApplications(totalApps);
                setPagination(apiPagination);

                // Áp dụng filter và pagination
                applyFilterAndPagination(filteredJobs, filters, pageNumber);
            } catch (err) {
                console.error('Error fetching jobs:', err);
            }
        };

        fetchJobs();
    }, [filters, pageNumber]);

    // Hàm áp dụng filter và pagination
    const applyFilterAndPagination = (jobsData, filters, pageNum) => {
        let filtered = [...jobsData];

        // Lọc theo Name
        if (filters.name) {
            filtered = filtered.filter((job) =>
                job.jobTitle?.toLowerCase().includes(filters.name.toLowerCase())
            );
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
            <div className={cx('overview-header')}>
                <div className={cx('titleMain')}>Hello, Instagram</div>
                <p className={cx('desc')}>Here is your daily activities and applications</p>
            </div>

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

            <div className={cx('filter-panel')}>
                <input
                    type="text"
                    name="name"
                    placeholder="Search by name"
                    value={filters.name}
                    onChange={handleFilterChange}
                />

                {/* Filter trạng thái */}
                <select
                    name="status"
                    value={filters.status}
                    onChange={handleFilterChange}
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="expired">Expired</option>
                </select>

                <input
                    type="date"
                    name="startDate"
                    value={filters.startDate}
                    max={filters.endDate || new Date().toLocaleDateString('en-CA', {
                        timeZone: "Asia/Ho_Chi_Minh"
                    })}
                    onChange={handleFilterChange}
                />

                <input
                    type="date"
                    name="endDate"
                    value={filters.endDate}
                    min={filters.startDate}
                    max={new Date().toLocaleDateString('en-CA', {
                        timeZone: "Asia/Ho_Chi_Minh"
                    })}
                    onChange={handleFilterChange}
                />
            </div>

            <div className={cx('job-table-head')}>
                <span className={cx('jobs')}>JOBS</span>
                <span className={cx('status')}>STATUS</span>
                <span className={cx('applications')}>APPLICATIONS</span>
                <span className={cx('actions')}>ACTIONS</span>
            </div>

            <div className={cx('job-list')}>
                {jobs.map((job) => (
                    <JobItemOwner
                        key={job.id}
                        jobDescription={job}
                        isVIP={job.isVIP}
                        isActive={job.isActive}
                    />
                ))}
            </div>

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
