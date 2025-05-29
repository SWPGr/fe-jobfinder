import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './JobItem.module.scss';
import { IconMapPin, IconBookmark, IconBookmarkFilled } from '@tabler/icons-react';
import { Badge } from '@mantine/core';

import { Images } from '~/assets';
import { Button } from '~/components';

const cx = classNames.bind(styles);

function JobItem({ image = Images.default_image, jobDescription = {}, saved, isLogin = false, isVIP = false }) {
    // save job status
    const [save, setSave] = useState(saved || false);

    const classes = cx('wrapper', { isLogin, isVIP, saved });
    const { companyName, companyAddress, jobTitle, workTime, salary } = jobDescription;
    const IconComponent = save ? IconBookmarkFilled : IconBookmark;

    return (
        <div className={classes}>
            <div className={cx('header')}>
                <div className={cx('container')}>
                    <div className={cx('logo-company')}>
                        <img
                            src={image}
                            alt={`${companyName} logo`}
                            onError={(e) => (e.target.src = Images.default_image)}
                        />
                    </div>
                    <div className={cx('company-inf')}>
                        <span className={cx('company-name')}>
                            <Button text to={'#'} className={cx('name')}>
                                <p>{companyName}</p>
                            </Button>
                            {isVIP && (
                                <Badge
                                    color="#ffeded"
                                    size="lg"
                                    classNames={{ label: cx('label-badge'), root: cx('root-badge') }}
                                >
                                    Featured
                                </Badge>
                            )}
                        </span>
                        <p className={cx('company-address')}>
                            {/* <IconMapPin size={20} /> */}
                            {companyAddress}
                        </p>
                    </div>
                </div>
                {isLogin && (
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
                )}
            </div>
            <div className={cx('body')}>
                <Link to={`/find-job?search=${encodeURIComponent(jobTitle)}`} className={cx('job-title')}>
                    {jobTitle}
                </Link>
                <div className={cx('job-description')}>
                    <span className={cx('work-time')}>{workTime}</span>
                    <span className={cx('job-salary')}>{salary}</span>
                </div>
            </div>
        </div>
    );
}

export default JobItem;
