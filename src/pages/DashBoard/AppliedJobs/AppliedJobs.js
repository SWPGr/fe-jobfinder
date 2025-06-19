import { useWindowScroll } from '@mantine/hooks';
import { Button, Text, Group } from '@mantine/core';
import { Images } from '~/assets';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AppliedJobs.module.scss';
import JobItemApplied from '~/components/JobItemApplied';
import { Pagination } from '@mantine/core';

const cx = classNames.bind(styles);
const allJobs = React.Children.toArray([
    <JobItemApplied
        image={Images.google_image}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
    />,
    // ... gọi tiếp các JobItemApplied khác tương tự
    <JobItemApplied
        image={Images.google_image}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
    />,
    // tiếp tục ...
    <JobItemApplied
        image={Images.google_image}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
    />,
    <JobItemApplied
        image={Images.google_image}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
    />,
    <JobItemApplied
        image={Images.google_image}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
    />,
    <JobItemApplied
        image={Images.google_image}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
    />,
    <JobItemApplied
        image={Images.google_image}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
    />,
    <JobItemApplied
        image={Images.google_image}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
    />,
    <JobItemApplied
        image={Images.google_image}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
    />,
    <JobItemApplied
        image={Images.google_image}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
    />,
    <JobItemApplied
        image={Images.google_image}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={Images.google_image}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
]);
function AppliedJobs() {
    const itemsPerPage = 5;
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(allJobs.length / itemsPerPage);
    const startIdx = (page - 1) * itemsPerPage;
    const currentJobs = allJobs.slice(startIdx, startIdx + itemsPerPage);

    // Lấy tất cả children JobItemApplied dưới dạng mảng

    return (
        <div className={cx('applied-jobs-wrapper')}>
            <h3 className={cx('title')}>Applied Jobs</h3>
            <div className={cx('table-header')}>
                <span>JOBS</span>
                <span>DATE APPLIED</span>
                <span>STATUS</span>
                <span>ACTION</span>
            </div>
            {/* {currentJobs} */}
            <div className={cx('job-list')}>
                {currentJobs.map((jobComponent, index) => (
                    <div key={index} className={cx('job-item')}>
                        {jobComponent}
                    </div>
                ))}
            </div>
            {/* Phân trang Mantine */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32, fontSize: '18px' }}>
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
