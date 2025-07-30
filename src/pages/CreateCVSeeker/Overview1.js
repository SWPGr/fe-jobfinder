import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Overview1.module.scss';
import { JobItemOwner } from '~/components';
import EmployerService from '~/services/EmployerService';
import { format } from '~/utils';
import { Pagination } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';



const cx = classNames.bind(styles);

const Overview1 = () => {
    const [jobs, setJobs] = useState([]);
    const [pagination, setPagination] = useState({});
    const [scroll, scrollTo] = useWindowScroll();
    const [flag, setFlag] = useState(false);


    // --- Filter ---
    const [filters, setFilters] = useState({
        jobTitle: '',
        fromDate: '',
        endDate: '',
        page: 1,
        isActive: ''
    });



    // Fetch danh sách job
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const input = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== '' && v !== null));
                console.log('input', input);

                const response = await EmployerService.fetchMyJobFake(input);
                const data = response.result.content.map((job) => {
                    return format.transformJobData(job);
                })
                // console.log('data', data);

                setJobs(data);
                const { pageNumber, pageSize, totalElements, totalPages } = response.result;
                setPagination({ pageNumber, pageSize, totalElements, totalPages });
            } catch (err) {
                console.error('Error fetching jobs:', err);
            }
        };
        fetchJobs();
        scrollTo({ y: 0 });
    }, [filters, flag]);


    const handlePageChange = (newPage) => {
        setFilters((prev) => ({ ...prev, page: newPage - 1 }));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearchTitle = (e) => {
        if (e.key === 'Enter') {
            console.log('Enter');

            const { name, value } = e.target;
            setFilters((prev) => ({ ...prev, [name]: value }));
        }
    };

    const countApplications = (jobs) => {
        let count = 0;
        jobs.forEach((job) => {
            count += job.jobApplicationCounts;
        });
        return count;
    };

    return (
        <div className={cx('container')}>
            <div className={cx('overview-header')}>
                <div className={cx('titleMain')}>Manage your job applications</div>
                <p className={cx('desc')}>Here is your daily activities and applications</p>
            </div>

            <div className={cx('info-cards')}>
                <div className={cx('info-card', 'blue')}>
                    <div className={cx('info-number')}>{ }</div>
                    <div className={cx('info-label')}>Open Jobs</div>
                </div>
                <div className={cx('info-card', 'yellow')}>
                    <div className={cx('info-number')}>{countApplications(jobs) || 0}</div>
                    <div className={cx('info-label')}>Total Applications</div>
                </div>
            </div>

            <div className={cx('filter-panel')}>
                <input
                    type="text"
                    name="jobTitle"
                    placeholder="Search by name"
                    value={filters.name}
                    onKeyDown={(e) => handleSearchTitle(e)}
                />

                {/* Filter trạng thái */}
                <select
                    name="isActive"
                    value={filters.isActive}
                    onChange={handleFilterChange}
                >
                    <option value="">All Status</option>
                    <option value="true">Active</option>
                    <option value="false">Expired</option>
                </select>

                <input
                    type="date"
                    name="fromDate"
                    value={filters.fromDate}
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
                        setFlag={setFlag}
                    />
                ))}
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
                {pagination.totalPages > 1 && (
                    <Pagination
                        total={pagination.totalPages}
                        value={filters.page}
                        // defaultValue={1}
                        onChange={handlePageChange}
                        radius="xl"
                        classNames={{
                            root: cx('pagination-root'),
                            control: cx('control'),
                            item: cx('pagination-item'),
                            active: cx('pagination-active')
                        }}
                    />
                )}
            </div>

            {/*  */}
        </div>
    );
};

export default Overview1;
