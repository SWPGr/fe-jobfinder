import classNames from 'classnames/bind';
import styles from './DashboardOverview.module.scss';
import React from 'react';
const cx = classNames.bind(styles);
export const StatCard = ({ title, value, icon, change, isPositive, desc }) => {
    return (
        <div className={cx('statCard')}>
            <div className={cx('statIcon')}>{icon}</div>
            <div className={cx('statTitle')}>{title}</div>
            <div className={cx('statValue')}>{value}</div>
            {change && (
                <div className={cx('statRow')}>
                    <span className={cx('statChange', isPositive ? 'positive' : 'negative')}>{change}</span>
                    <span className={cx('statDesc')}>{desc}</span>
                </div>
            )}
        </div>
    );
};
