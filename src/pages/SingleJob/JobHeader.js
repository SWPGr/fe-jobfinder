import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobDetailsPage.module.scss';

const cx = classNames.bind(styles);

function JobHeader() {
    return (
        <div className={cx('job-header')}>
            <h2 className={cx('job-title')}>
                Senior UX Designer <span className={cx('badge-featured')}>Featured</span>{' '}
                <span className={cx('badge-part-time')}>Part Time</span>
            </h2>
            <p className={cx('job-contact')}>https://instagram.com | +8495 555-0120 | career@instagram.com</p>
        </div>
    );
}

export default JobHeader;
