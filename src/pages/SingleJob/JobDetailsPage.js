import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobDetailsPage.module.scss';

import JobHeader from './JobHeader';
import JobDescription from './JobDescription';
import JobOverview from './JobOverview';
import RelatedJobs from './RelatedJobs';

const cx = classNames.bind(styles);

function JobDetailsPage() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('left')}>
                    <JobHeader />
                    <JobDescription />
                </div>
                <div className={cx('right')}>
                    <JobOverview />
                </div>
            </div>
            <RelatedJobs />
        </div>
    );
}

export default JobDetailsPage;
