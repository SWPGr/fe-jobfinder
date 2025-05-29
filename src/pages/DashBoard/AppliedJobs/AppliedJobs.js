import { useWindowScroll } from '@mantine/hooks';
import { Button, Text, Group } from '@mantine/core';
import { Images } from '~/assets';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AppliedJobs.module.scss';
import JobItemApplied from '~/components/JobItemApplied';
const cx = classNames.bind(styles);

function AppliedJobs() {
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;
    const [scroll, scrollTo] = useWindowScroll();
    // Lấy tất cả children JobItemApplied dưới dạng mảng
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
    ]);

    // Tính index để phân trang
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;

    // Lấy phần JobItemApplied thuộc trang hiện tại
    //const currentJobs = allJobs.slice(indexOfFirstJob, indexOfLastJob);

    // Tính tổng số trang
    //const totalPages = Math.ceil(allJobs.length / jobsPerPage);

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
            {allJobs}
            {/* Nút phân trang đơn giản
            <div className={cx('pagination')}>
                <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
                    Prev
                </button>
                <span>
                    {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div> */}
        </div>
    );
}

export default AppliedJobs;
