import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FavoriteJobs.module.scss';
import JobItemList from '~/components/JobItemList';
import { Images } from '~/assets';
import { JobItemApplied } from '~/components';
const cx = classNames.bind(styles);

function FavoriteJobs() {
    // Mảng các công việc yêu thích giả lập (sau này sửa lại để kết nối với DB sau)
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

    return (
        <div className={cx('favorite-jobs-wrapper')}>
            <h3 className={cx('title')}>Favorite Jobs</h3>
            <div className={cx('table-header')}>
                <span>JOBS</span>
                <span>STATUS</span>
                <span>ACTION</span>
            </div>

            {allFavoriteJobs}
        </div>
    );
}

export default FavoriteJobs;
