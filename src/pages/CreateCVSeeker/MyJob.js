import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './MyJob.module.scss';
import JobItemOwner from '~/components/JobItemOwner';
import { get } from '~/utils/httpRequest';

const cx = classNames.bind(styles);

// API mới
const fetchMyJobFake = async (page = 0, size = 10) => {
    try {
        const response = await get(`/job/my-employer-jobs?page=${page}&size=${size}`);

        if (!response || !response.result || !Array.isArray(response.result.content)) {
            console.warn('Invalid API response structure:', response);
            return {
                jobs: [],
                pagination: {
                    pageNumber: 0,
                    pageSize: size,
                    totalElements: 0,
                    totalPages: 1,
                    isFirst: true,
                    isLast: true,
                },
            };
        }

        const data = response.result;

        const jobsFormatted = data.content.map((job) => {
            const createdDate = new Date(job.createdAt);
            const defaultExpireDate = new Date(createdDate);
            defaultExpireDate.setDate(createdDate.getDate() + 30);

            const expireDate = job.expiredDate ? new Date(job.expiredDate) : defaultExpireDate;
            const today = new Date();
            const remainingDays = Math.max(0, Math.ceil((expireDate - today) / (1000 * 60 * 60 * 24)));
            const remainingText = remainingDays > 0 ? `${remainingDays} days remaining` : 'Expired';

            return {
                id: job.id, // quan trọng: truyền id chuẩn vào jobDescription
                jobTitle: job.title || 'Unknown Title',
                workTime: job.jobType?.name || 'Unknown Type',
                remainDay: remainingText,
                isActive: remainingDays > 0,
                numberApplications: job.jobApplicationCounts || 0,
                isVIP: job.employer?.isPremium || false,
            };
        });

        return {
            jobs: jobsFormatted,
            pagination: {
                pageNumber: data.pageNumber ?? 0,
                pageSize: data.pageSize ?? size,
                totalElements: data.totalElements ?? 0,
                totalPages: data.totalPages ?? 1,
                isFirst: data.first ?? true,
                isLast: data.last ?? true,
            },
        };
    } catch (error) {
        console.error('Error fetching my jobs:', error.message);
        return {
            jobs: [],
            pagination: {
                pageNumber: 0,
                pageSize: size,
                totalElements: 0,
                totalPages: 1,
                isFirst: true,
                isLast: true,
            },
        };
    }
};

const MyJob = () => {
    const [jobs, setJobs] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize] = useState(10);
    const [paginationMeta, setPaginationMeta] = useState({
        totalElements: 0,
        totalPages: 1,
        isFirst: true,
        isLast: true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch jobs
    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const { jobs, pagination } = await fetchMyJobFake(pageNumber, pageSize);
                setJobs(jobs);
                setPaginationMeta({
                    totalElements: pagination.totalElements,
                    totalPages: pagination.totalPages,
                    isFirst: pagination.isFirst,
                    isLast: pagination.isLast,
                });
            } catch (err) {
                setError('Failed to fetch jobs');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [pageNumber, pageSize]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < paginationMeta.totalPages) {
            setPageNumber(newPage);
        }
    };

    if (loading) {
        return <div>Loading jobs...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={cx('job-list-container')}>
            <div className={cx('header')}>
                <div className={cx('headingMain')}>
                    My Jobs <span>({paginationMeta.totalElements})</span>
                </div>
            </div>

            <div className={cx('job-table-head')}>
                <span className={cx('jobs')}>JOBS</span>
                <span className={cx('status')}>STATUS</span>
                <span className={cx('applications')}>APPLICATIONS</span>
                <span className={cx('actions')}>ACTIONS</span>
            </div>

            <div className={cx('job-items-list')}>
                {jobs.map((job) => (
                    <JobItemOwner
                        key={job.id}
                        jobDescription={{
                            id: job.id, // truyền ID đầy đủ
                            title: job.jobTitle,
                            workTime: job.workTime,
                            remainDay: job.remainDay,
                            isActive: job.isActive,
                            numberApplications: job.numberApplications,
                        }}
                        isVIP={job.isVIP}
                        onDeleteSuccess={() => {
                            // xóa job khỏi danh sách sau khi delete
                            setJobs((prev) => prev.filter((j) => j.id !== job.id));
                            setPaginationMeta((prev) => ({
                                ...prev,
                                totalElements: prev.totalElements - 1,
                            }));
                        }}
                    />
                ))}
            </div>

            <div className={cx('pagination')}>
                <button
                    disabled={paginationMeta.isFirst}
                    onClick={() => handlePageChange(pageNumber - 1)}
                >
                    {'<'}
                </button>
                {Array.from({ length: paginationMeta.totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={cx({ active: i === pageNumber })}
                        onClick={() => handlePageChange(i)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    disabled={paginationMeta.isLast}
                    onClick={() => handlePageChange(pageNumber + 1)}
                >
                    {'>'}
                </button>
            </div>
        </div>
    );
};

export default MyJob;
