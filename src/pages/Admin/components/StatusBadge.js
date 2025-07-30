import React from 'react';
import classNames from 'classnames/bind';
import styles from './StatusBadge.module.scss';

const cx = classNames.bind(styles);

const StatusBadge = ({ status, variant = 'default', size = 'medium' }) => {
    const getStatusConfig = (status) => {
        const statusLower = status?.toLowerCase();

        switch (statusLower) {
            case 'active':
            case 'success':
            case 'completed':
                return {
                    label: status,
                    variant: 'success'
                };
            case 'inactive':
            case 'blocked':
            case 'failed':
                return {
                    label: status,
                    variant: 'danger'
                };
            case 'pending':
            case 'processing':
                return {
                    label: status,
                    variant: 'warning'
                };
            case 'premium':
                return {
                    label: status,
                    variant: 'premium'
                };
            case 'normal':
                return {
                    label: status,
                    variant: 'default'
                };
            default:
                return {
                    label: status,
                    variant: 'default'
                };
        }
    };

    const config = getStatusConfig(status);

    return (
        <span className={cx('status-badge', config.variant, size)}>
            <span className={cx('status-label')}>{config.label}</span>
        </span>
    );
};

export default StatusBadge; 