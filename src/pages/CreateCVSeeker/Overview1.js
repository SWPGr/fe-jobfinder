import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Overview1.module.scss';
import { JobItemOwner } from '~/components';
import EmployerService from '~/services/EmployerService';

const cx = classNames.bind(styles);

const Overview1 = () => {
    const [jobs, setJobs] = useState([]);
    const [totalApplications, setTotalApplications] = useState(0);

    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pagination, setPagination] = useState({
        totalElements: 0,
        totalPages: 1,
        isFirst: true,
        isLast: true,
    });

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const { jobs, pagination } = await EmployerService.fetchMyJobFake(pageNumber, pageSize);

                // Tính tổng số ứng tuyển trên trang hiện tại
                const totalApps = jobs.reduce((sum, job) => sum + (job.numberApplications || 0), 0);

                setJobs(jobs);
                setTotalApplications(totalApps);
                setPagination(pagination);
            } catch (err) {
                console.error('Error fetching jobs:', err);
            }
        };

        fetchJobs();
    }, [pageNumber, pageSize]);

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
                    <div className={cx('info-icon')}>{/* SVG icon nếu có */}</div>
                </div>
                <div className={cx('info-card', 'yellow')}>
                    <div className={cx('info-number')}>{totalApplications}</div>
                    <div className={cx('info-label')}>Total Applications</div>
                    <div className={cx('info-icon')}>{/* SVG icon nếu có */}</div>
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
                        jobDescription={{
                            id: job.id,
                            jobTitle: job.jobTitle,
                            workTime: job.workTime,
                            remainDay: job.remainDay,
                            isActive: job.isActive,
                            numberApplications: job.numberApplications,
                        }}
                        isVIP={job.isVIP}
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
