import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './JobAlerts.module.scss';
import JobItemList from '~/components/JobItemList';
import { Pagination } from '@mantine/core';
import Images from '~/assets/Images';

const cx = classNames.bind(styles);

const jobsData = [
    <JobItemList
        image={Images.google_image}
        description={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdsa asdas asdasdasdad asdas',
            workTime: 'Full-time',
            salary: '$100 - $200',
            remainDay: '3',
        }}
        isLogin
    />,
    <JobItemList
        image={Images.google_image}
        description={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdsa asdas asdasdasdad asdas',
            workTime: 'Full-time',
            salary: '$100 - $200',
            remainDay: '3',
        }}
        isLogin
    />,
    <JobItemList
        image={Images.google_image}
        description={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdsa asdas asdasdasdad asdas',
            workTime: 'Full-time',
            salary: '$100 - $200',
            remainDay: '3',
        }}
        isLogin
    />,
    <JobItemList
        image={Images.google_image}
        description={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdsa asdas asdasdasdad asdas',
            workTime: 'Full-time',
            salary: '$100 - $200',
            remainDay: '3',
        }}
        isLogin
    />,

    <JobItemList
        image={Images.google_image}
        description={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdsa asdas asdasdasdad asdas',
            workTime: 'Full-time',
            salary: '$100 - $200',
            remainDay: '3',
        }}
        isLogin
    />,
    <JobItemList
        image={Images.google_image}
        description={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdsa asdas asdasdasdad asdas',
            workTime: 'Full-time',
            salary: '$100 - $200',
            remainDay: '3',
        }}
        isLogin
    />,
    <JobItemList
        image={Images.google_image}
        description={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdsa asdas asdasdasdad asdas',
            workTime: 'Full-time',
            salary: '$100 - $200',
            remainDay: '3',
        }}
        isLogin
    />,
    <JobItemList
        image={Images.google_image}
        description={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdsa asdas asdasdasdad asdas',
            workTime: 'Full-time',
            salary: '$100 - $200',
            remainDay: '3',
        }}
        isLogin
    />,
];

function JobAlerts() {
    const [selectedId, setSelectedId] = useState(null);

    const handleSelect = (id) => setSelectedId(id);

    const itemsPerPage = 5;
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(jobsData.length / itemsPerPage);
    const startIdx = (page - 1) * itemsPerPage;
    const currentJobs = jobsData.slice(startIdx, startIdx + itemsPerPage);

    return (
        <div className={cx('job-alerts-wrapper')}>
            <div className={cx('header')}>
                <h3>
                    Job Alerts <span>({jobsData.length} new jobs)</span>
                </h3>
                <button className={cx('edit-btn')}>Edit Job Alerts</button>
            </div>

            <div className={cx('job-list')}>
                {currentJobs.map((jobComponent, index) => (
                    <div key={index} className={cx('job-item')}>
                        {jobComponent}
                    </div>
                ))}
            </div>
            {/* Phân trang Mantine */}
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

export default JobAlerts;
