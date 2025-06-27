import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './JobItem.module.scss';
import { IconMapPin, IconBookmark, IconBookmarkFilled } from '@tabler/icons-react';
import { Badge } from '@mantine/core';

import { Images } from '~/assets';
import { Button } from '~/components';
import { jobService } from '~/services';
import { useNotification } from '~/hooks';
import { useAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function JobItem({ image = Images.default_image, jobDescription = {}, saved, isVIP = false }) {
    // save job status
    const { user } = useAuth();
    const isJOB_SEEKER = user?.role === 'JOB_SEEKER';
    const [save, setSave] = useState(saved || false);
    const { showSuccess, showError } = useNotification();

    const classes = cx('wrapper', { isVIP, saved });
    const { companyName, companyAddress, jobTitle, workTime, salary } = jobDescription;
    const IconComponent = save ? IconBookmarkFilled : IconBookmark;

    const handelSaveJob = async (id) => {
        try {
            const response = await jobService.saveJob(id);
            setSave(!save);
            showSuccess('Save job successfully');
        } catch (error) {
            showError('Save job failed');
            console.log(error);
        }
    };

    const handelUnsaveJob = async (id) => {
        try {
            await jobService.unSaveJob(id);
            setSave(!save);
            showSuccess('Unsave job successfully');
        } catch (error) {
            console.log(error);
            showError('Unsave job failed');
        }
    };

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
                                {companyName}
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
                            <span className={cx('icon-wrapper')}>
                                <IconMapPin />
                            </span>
                            <span className={cx('text')}>{companyAddress}</span>
                        </p>
                    </div>
                </div>
                {isJOB_SEEKER && (
                    <div
                        className={cx('save-job')}
                        onClick={() => {
                            save ? handelUnsaveJob(jobDescription.id) : handelSaveJob(jobDescription.id);
                        }}
                    >
                        {isJOB_SEEKER && <IconComponent size={22} color="#0a65cc" />}
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
