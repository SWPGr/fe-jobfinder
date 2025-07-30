import React from 'react';
import classNames from 'classnames/bind';
import styles from './AdminHeader.module.scss';
import { ChevronRight, Home, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const cx = classNames.bind(styles);

const AdminHeader = ({ title, subtitle, breadcrumbs = [], stats = [] }) => {
    const formatChange = (change, status) => {
        if (status === 'nochange') return '0%';
        if (parseFloat(change) === 100) return '100%';
        return `${parseFloat(change).toFixed(2)}%`;
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'increase':
                return cx('stat-change', 'positive');
            case 'decrease':
                return cx('stat-change', 'negative');
            default:
                return cx('stat-change', 'neutral');
        }
    };

    const getTrendIcon = (status) => {
        switch (status) {
            case 'increase':
                return <TrendingUp size={12} className={cx('trend-icon', 'positive')} />;
            case 'decrease':
                return <TrendingDown size={12} className={cx('trend-icon', 'negative')} />;
            default:
                return <Minus size={12} className={cx('trend-icon', 'neutral')} />;
        }
    };

    return (
        <div className={cx('admin-header')}>
            {/* Breadcrumb Navigation */}
            <nav className={cx('breadcrumb')}>
                <a href="/admin" className={cx('breadcrumb-item')}>
                    <Home size={16} />
                    <span>Admin</span>
                </a>
                {breadcrumbs.map((item, index) => (
                    <React.Fragment key={index}>
                        <ChevronRight size={16} className={cx('breadcrumb-separator')} />
                        <span className={cx('breadcrumb-item', { active: index === breadcrumbs.length - 1 })}>
                            {item}
                        </span>
                    </React.Fragment>
                ))}
            </nav>

            {/* Main Header Content */}
            <div className={cx('header-content')}>
                <div className={cx('header-left')}>
                    <h1 className={cx('page-title')}>{title}</h1>
                    {subtitle && <p className={cx('page-subtitle')}>{subtitle}</p>}
                </div>

                {/* Enhanced Quick Stats */}
                {stats.length > 0 && (
                    <div className={cx('quick-stats')}>
                        {stats.map((stat, index) => (
                            <div key={index} className={cx('stat-item')}>
                                <div className={cx('stat-title')}>{stat.title || stat.label}</div>
                                <div className={cx('stat-value')}>{stat.value}</div>
                                {stat.change !== undefined && (
                                    <div className={cx('stat-change-container')}>
                                        {getTrendIcon(stat.status)}
                                        <span className={getStatusClass(stat.status)}>
                                            {formatChange(stat.change, stat.status)}
                                        </span>
                                    </div>
                                )}
                                {stat.description && (
                                    <div className={cx('stat-description')}>{stat.description}</div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminHeader; 