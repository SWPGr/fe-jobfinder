import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './AppliedJobs.module.scss';
import JobItemApplied from '~/components/JobItemApplied';
import { Pagination, Select } from '@mantine/core';
import JobSeekerDashboardService from '~/services/JobSeekerDashboardService';

const cx = classNames.bind(styles);

// Dùng hàm lấy token chuẩn
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
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const token = getTokenFromLocalStorage(); // Sử dụng token đã có sẵn

    // Option cho pageSize
    const pageSizeOptions = [
        { value: '10', label: '10 / page' },
        { value: '20', label: '20 / page' },
        { value: '50', label: '50 / page' },
    ];

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            const data = await JobSeekerDashboardService.getAppliedJobs({ page, size, token });
            if (data && data.content) {
                setJobs(data.content);
                setTotalPages(data.totalPages || 1);
                setSize(data.size || size);
            } else {
                setJobs([]);
                setTotalPages(1);
            }
            setLoading(false);
        };
        fetchJobs();
    }, [page, size, token]);

    return (
        <div className={cx('applied-jobs-wrapper')}>
            <h3 className={cx('title')}>Applied Jobs</h3>
            <div className={cx('table-header')}>
                <span>JOBS</span>
                <span>DATE APPLIED</span>
                <span>STATUS</span>
                <span>ACTION</span>
            </div>
            <div className={cx('job-list')}>
                {loading ? (
                    <div>Loading...</div>
                ) : jobs.length === 0 ? (
                    <div style={{ padding: 32, textAlign: 'center', color: '#888' }}>No jobs found.</div>
                ) : (
                    jobs.map((job, index) => (
                        <div key={job.id || index} className={cx('job-item')}>
                            <JobItemApplied
                                image={job.employer?.avatarUrl || ''} // Company image
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
                                isVIP={job.employer?.isPremium || false} // Check if the employer is VIP
                            />
                        </div>
                    ))
                )}
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 32,
                    fontSize: '18px',
                }}
            >
                <Select
                    data={pageSizeOptions}
                    value={String(size)}
                    onChange={(val) => {
                        setSize(Number(val));
                        setPage(1);
                    }}
                    size="md"
                    style={{ width: 120 }}
                />
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

export default AppliedJobs;
