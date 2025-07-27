import classNames from 'classnames/bind';
import styles from './JobItemApplied.module.scss';
import { IconMapPin, IconCurrencyDollar, IconCheck, IconX } from '@tabler/icons-react';
import { Badge } from '@mantine/core';
import { Images } from '~/assets';
import { Button } from '~/components';

const cx = classNames.bind(styles);

function JobItemApplied({
    image = Images.default_image,
    jobDescription = {},
    isLogin = false,
    isVIP = false,
    onViewDetails,
    status, // nhận thêm prop status
    appliedDate, // nhận thêm prop ngày nộp
}) {
    const classes = cx('wrapper', { isLogin, isVIP });

    const { companyName, companyAddress, jobTitle, workTime, salary, createdAt, isApplied } = jobDescription;

    // Hàm chọn màu badge theo status
    const getStatusBadgeProps = (status) => {
        switch ((status || '').toUpperCase()) {
            case 'PENDING':
                return { color: 'yellow', label: 'Pending' };
            case 'APPROVED':
            case 'ACCEPTED':
                return { color: 'green', label: 'Approved' };
            case 'REJECTED':
            case 'DENIED':
                return { color: 'red', label: 'Rejected' };
            default:
                return { color: 'gray', label: status || 'Unknown' };
        }
    };
    const statusBadge = getStatusBadgeProps(status);

    return (
        <div className={classes}>
            <div className={cx('content')}>
                <div className={cx('logo-company')}>
                    <img
                        src={image}
                        alt={`${companyName} logo`}
                        onError={(e) => (e.target.src = Images.default_image)}
                    />
                </div>
                <div className={cx('job-description')}>
                    <div className={cx('top')}>
                        <div className={cx('title')}>{jobTitle}</div>
                        {isVIP && (
                            <Badge
                                color="#ffeded"
                                size="lg"
                                classNames={{ label: cx('label-badge', 'featured'), root: cx('root-badge') }}
                            >
                                Featured
                            </Badge>
                        )}
                        <Badge
                            color="#E8F1FF"
                            size="lg"
                            classNames={{ label: cx('label-badge', 'work-time'), root: cx('root-badge') }}
                        >
                            {workTime}
                        </Badge>
                        {isApplied && (
                            <Badge
                                color="#d4edda"
                                size="lg"
                                classNames={{ label: cx('label-badge', 'applied'), root: cx('root-badge') }}
                            >
                                Applied
                            </Badge>
                        )}
                    </div>
                    <div className={cx('bottom')}>
                        <div className={cx('company-address')}>
                            <IconMapPin size={20} />
                            {companyAddress}
                        </div>
                        <div className={cx('salary')}>
                            <IconCurrencyDollar size={20} />
                            {salary}
                        </div>
                    </div>
                </div>
            </div>

            {/* Thông tin ngày nộp, trạng thái, action */}
            <div className={cx('info-row')} style={{ display: 'flex', alignItems: 'center', gap: 100, marginTop: 12 }}>
                <div className={cx('applied-date')} style={{ minWidth: 70 }}>
                    <b>Date Applied:</b> {appliedDate}
                </div>
                <div className={cx('status')}>
                    <Badge
                        color={statusBadge.color}
                        size="lg"
                        classNames={{ label: cx('label-badge', 'status'), root: cx('root-badge') }}
                    >
                        {statusBadge.label}
                    </Badge>
                </div>
                <div className={cx('action')}>
                    <Button onClick={onViewDetails}>View Details</Button>
                </div>
            </div>
        </div>
    );
}

export default JobItemApplied;
