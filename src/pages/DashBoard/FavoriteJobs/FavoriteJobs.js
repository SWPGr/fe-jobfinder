import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './FavoriteJobs.module.scss';
import JobItemList from '~/components/JobItemList';
import { Images } from '~/assets';
import { Pagination, Select } from '@mantine/core';
import JobSeekerDashboardService from '~/services/JobSeekerDashboardService';

const cx = classNames.bind(styles);

function FavoriteJobs() {
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('accessToken');
    const pageSizeOptions = [
        { value: '5', label: '5 / page' },
        { value: '10', label: '10 / page' },
        { value: '20', label: '20 / page' },
    ];

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            const data = await JobSeekerDashboardService.getSavedJobs({ page, size, token });
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
    console.log(jobs);
    return (
        <div className={cx('favorite-jobs-wrapper')}>
            <h3 className={cx('title')}>Favorite Jobs</h3>
            <div className={cx('table-header')}>
                <span>JOBS</span>
                <span>STATUS</span>
                <span>ACTION</span>
            </div>
            <div className={cx('job-list')}>
                {loading ? (
                    <div>Loading...</div>
                ) : jobs.length === 0 ? (
                    <div style={{ padding: 32, textAlign: 'center', color: '#888' }}>No favorite jobs found.</div>
                ) : (
                    jobs.map((job, index) => (
                        <div key={job.id || index} className={cx('job-item')}>
                            <JobItemList
                                image={job.employer?.avatarUrl || Images.google_image}
                                jobDescription={{
                                    companyName: job.employer?.companyName || '',
                                    companyAddress: job.location || job.employer?.location || '',
                                    jobTitle: job.title || '',
                                    workTime: job.jobType?.name || '',
                                    salary:
                                        job.salaryMin && job.salaryMax
                                            ? `$${job.salaryMin} - $${job.salaryMax}`
                                            : 'Negotiable',
                                    remainDay: job.expiredDate
                                        ? Math.max(
                                              0,
                                              Math.ceil(
                                                  (new Date(job.expiredDate) - new Date()) / (1000 * 60 * 60 * 24),
                                              ),
                                          )
                                        : '',
                                }}
                                isLogin
                                isVIP={job.employer?.isPremium}
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

export default FavoriteJobs;
