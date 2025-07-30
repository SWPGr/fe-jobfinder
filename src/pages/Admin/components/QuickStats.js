import React from 'react';
import classNames from 'classnames/bind';
import styles from './QuickStats.module.scss';

const cx = classNames.bind(styles);

const QuickStats = ({ stats = [] }) => {
    const formatValue = (value, format = 'number') => {
        if (format === 'currency') {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(value);
        }
        if (format === 'percentage') {
            return `${value}%`;
        }
        return new Intl.NumberFormat('en-US').format(value);
    };

    return (
        <div className={cx('quick-stats-grid')}>
            {stats.map((stat, index) => (
                <div key={index} className={cx('stat-card')}>
                    <div className={cx('stat-header')}>
                        <div className={cx('stat-trend')}>
                            <span className={cx('trend-value', stat.trend > 0 ? 'up' : stat.trend < 0 ? 'down' : 'neutral')}>
                                {Math.abs(stat.trend)}%
                            </span>
                        </div>
                    </div>

                    <div className={cx('stat-content')}>
                        <div className={cx('stat-value')}>
                            {formatValue(stat.value, stat.format)}
                        </div>
                        <div className={cx('stat-label')}>
                            {stat.label}
                        </div>
                    </div>

                    {stat.description && (
                        <div className={cx('stat-description')}>
                            {stat.description}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default QuickStats; 