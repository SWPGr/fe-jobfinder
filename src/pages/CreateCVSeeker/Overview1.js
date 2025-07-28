import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Overview1.module.scss';
import { JobItemOwner } from '~/components';
import EmployerService from '~/services/EmployerService';

const cx = classNames.bind(styles);

const Overview1 = () => {
    const [allActiveJobs, setAllActiveJobs] = useState([]); // Lưu tất cả job active
    const [jobs, setJobs] = useState([]); // Job hiển thị trang hiện tại
    const [totalApplications, setTotalApplications] = useState(0);

    const [pageNumber, setPageNumber] = useState(0);
    const pageSize = 5; // Cố định 5 job/trang

    const [pagination, setPagination] = useState({
        totalElements: 0,
        totalPages: 1,
        isFirst: true,
        isLast: true,
    });

    // Hàm lọc job active
    const filterActiveJobs = (jobsData) => {
        const now = new Date();
        return jobsData.filter((job) => {
            if (!job.expiredDate) return true; // Không có expiredDate coi là active
            const expiredTime = Date.parse(job.expiredDate);
            if (isNaN(expiredTime)) return true; // Nếu parse lỗi, coi là active
            return expiredTime >= now.getTime();
        });
    };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { jobs: apiJobs } = await EmployerService.fetchMyJobFake();

                // Lọc active jobs
                const activeJobs = filterActiveJobs(apiJobs);

                // Tính tổng số ứng tuyển
                const totalApps = activeJobs.reduce(
                    (sum, job) => sum + (job.numberApplications || 0),
                    0
                );

                // Cập nhật danh sách và pagination
                const totalElements = activeJobs.length;
                const totalPages = Math.max(1, Math.ceil(totalElements / pageSize));

                // Nếu pageNumber vượt quá totalPages thì reset về 0
                const safePage = pageNumber >= totalPages ? 0 : pageNumber;
                const startIndex = safePage * pageSize;
                const displayedJobs = activeJobs.slice(startIndex, startIndex + pageSize);

                setAllActiveJobs(activeJobs);
                setJobs(displayedJobs);
                setTotalApplications(totalApps);

                setPagination({
                    totalElements,
                    totalPages,
                    isFirst: safePage === 0,
                    isLast: safePage === totalPages - 1,
                });

                if (safePage !== pageNumber) setPageNumber(safePage);
            } catch (err) {
                console.error('Error fetching jobs:', err);
            }
        };

        fetchJobs();
    }, [pageNumber]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < pagination.totalPages) {
            setPageNumber(newPage);
        }
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

            {/* Job list title */}
            <div className={cx('job-list-header')}>
                <div className={cx('sectionTitle')}>Recently Posted Jobs</div>
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
