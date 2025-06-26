import classNames from 'classnames/bind';
import styles from './JobItemApplied.module.scss';
import { IconMapPin, IconCurrencyDollar, IconCheck, IconX } from '@tabler/icons-react';
import { Badge } from '@mantine/core';

import { Images } from '~/assets';
import { Button } from '~/components';

const cx = classNames.bind(styles);

function JobItemApplied({ image = Images.default_image, jobDescription = {}, isLogin = false, isVIP = false }) {
    const classes = cx('wrapper', { isLogin, isVIP });
    const { companyName, companyAddress, jobTitle, workTime, salary, dueDate, isActive } = jobDescription;

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
                    {/* Top */}
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
                    </div>

                    {/* Bottom */}
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
                    {/*  */}
                </div>
            </div>
            {/* End content */}

            {/* END DATE */}
            <div className={cx('end-date')}>{dueDate}</div>

            {/* STATUS */}
            <div className={cx('status')}>
                {isActive ? (
                    <p className={cx('active')}>
                        <IconCheck size={16} />
                        Active
                    </p>
                ) : (
                    <p className={cx('inactive')}>
                        <IconX size={16} />
                        Expire
                    </p>
                )}
            </div>

            <div className={cx('action')}>
                <div className={cx('apply-job')}>
                    <Button to={'#'}>View Details</Button>
                </div>
            </div>
        </div>
    );
}

export default JobItemApplied;
