import classNames from 'classnames/bind';
import styles from './DashboardOverview.module.scss';
import React from 'react';
const cx = classNames.bind(styles);

export const StatCard = ({ title, value, icon, change, isPositive }) => {
    return (
        <div className={cx('statCard', 'bg-white', 'rounded-lg', 'shadow', 'p-6')}>
            <div className="flex items-center justify-between">
                <div className={cx('statIcon')}>{icon}</div>
                <div>
                    <p className={cx('statTitle')}>{title}</p>
                    <p className={cx('statValue')}>{value}</p>
                </div>
            </div>
            {change && (
                <div className="mt-4">
                    <span className={cx('statChange', isPositive ? 'textGreen' : 'textRed')}>
                        {isPositive ? '+' : ''}
                        {change}
                    </span>
                    <span className={cx('statDesc')}>from last month</span>
                </div>
            )}
        </div>
    );
};
