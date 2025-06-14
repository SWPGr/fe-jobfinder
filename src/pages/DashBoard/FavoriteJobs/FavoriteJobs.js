import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FavoriteJobs.module.scss';
import JobItemList from '~/components/JobItemList';
import { Images } from '~/assets';
import { Pagination } from '@mantine/core';
const cx = classNames.bind(styles);
const allFavoriteJobs = React.Children.toArray([
    <JobItemList
        image={Images.google_image}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdsa asdas asdasdasdad asdas',
            workTime: 'Full-time',
            salary: '$100 - $200',
            remainDay: '3',
        }}
        isLogin
        isVIP
    />,
    <JobItemList
        image={Images.google_image}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdsa asdas asdasdasdad asdas',
            workTime: 'Full-time',
            salary: '$100 - $200',
            remainDay: '3',
        }}
        isLogin
        isVIP
    />,

    <JobItemList
        image={Images.google_image}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdsa asdas asdasdasdad asdas',
            workTime: 'Full-time',
            salary: '$100 - $200',
            remainDay: '3',
        }}
        isLogin
        isVIP
    />,

    <JobItemList
        image={Images.google_image}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdsa asdas asdasdasdad asdas',
            workTime: 'Full-time',
            salary: '$100 - $200',
            remainDay: '3',
        }}
        isLogin
        isVIP
    />,

    <JobItemList
        image={Images.google_image}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdsa asdas asdasdasdad asdas',
            workTime: 'Full-time',
            salary: '$100 - $200',
            remainDay: '3',
        }}
        isLogin
        isVIP
    />,

    <JobItemList
        image={Images.google_image}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdsa asdas asdasdasdad asdas',
            workTime: 'Full-time',
            salary: '$100 - $200',
            remainDay: '3',
        }}
        isLogin
        isVIP
    />,

    // ... thêm các công việc khác tương tự
]);

function FavoriteJobs() {
    const itemsPerPage = 5;
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(allFavoriteJobs.length / itemsPerPage);
    const startIdx = (page - 1) * itemsPerPage;
    const currentJobs = allFavoriteJobs.slice(startIdx, startIdx + itemsPerPage);

    // Mảng các công việc yêu thích giả lập (sau này sửa lại để kết nối với DB sau)

    return (
        <div className={cx('favorite-jobs-wrapper')}>
            <h3 className={cx('title')}>Favorite Jobs</h3>
            <div className={cx('table-header')}>
                <span>JOBS</span>
                <span>STATUS</span>
                <span>ACTION</span>
            </div>

            <div className={cx('job-list')}>
                {currentJobs.map((jobComponent, index) => (
                    <div key={index} className={cx('job-item')}>
                        {jobComponent}
                    </div>
                ))}
            </div>
            {/* Phân trang Mantine */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                <Pagination total={totalPages} value={page} onChange={setPage} />
            </div>
        </div>
    );
}

export default FavoriteJobs;
