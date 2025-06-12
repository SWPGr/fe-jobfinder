import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './JobItemList.module.scss';
import {
    IconMapPin,
    IconBookmark,
    IconCurrencyDollar,
    IconCalendarWeek,
    IconArrowRight,
    IconBookmarkFilled,
} from '@tabler/icons-react';
import { Badge } from '@mantine/core';

import { Images } from '~/assets';
import { Button } from '~/components';

const cx = classNames.bind(styles);

function JobItemList({ image = Images.default_image, jobDescription = {}, saved, isLogin = false, isVIP = false }) {
    const classes = cx('wrapper', { isLogin, isVIP, saved });

    // save job status
    const [save, setSave] = useState(saved || false);

    const { companyName, companyAddress, jobTitle, workTime, salary, remainDay } = jobDescription;
    const IconComponent = save ? IconBookmarkFilled : IconBookmark;

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
                        <p className={cx('title')}>{jobTitle}</p>
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
                        <div className={cx('remain-date')}>
                            <IconCalendarWeek size={20} />
                            {remainDay} Days Remaining
                        </div>
                    </div>
                    {/*  */}
                </div>
            </div>
            {isLogin && (
                <div className={cx('action')}>
                    <div className={cx('save-job')}>
                        {isLogin && (
                            <IconComponent
                                size={22}
                                color="#0a65cc"
                                onClick={() => {
                                    setSave(!save);
                                    console.log('save job');
                                }}
                            />
                        )}
                    </div>

                    <div className={cx('apply-job')}>
                        <Button to={'#'} rightIcon={<IconArrowRight />} className={cx('apply-job-btn')}>
                            Apply Now
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default JobItemList;
