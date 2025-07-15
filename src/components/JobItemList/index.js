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
    IconCoin,
} from '@tabler/icons-react';
import { Badge } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { Images } from '~/assets';
import { Button } from '~/components';
import { jobService } from '~/services';
import { useNotification } from '~/hooks';
import { useAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function JobItemList({ image = Images.default_image, description = {}, saved, isLogin = false, isVIP = false }) {
    const { showSuccess, showError } = useNotification();
    const { user } = useAuth();
    const isJOB_SEEKER = user?.role === 'JOB_SEEKER';

    // save job status

    const { companyName, companyAddress, jobTitle, workTime, salary, remainDay, isSave } = description;
    const [save, setSave] = useState(isSave || false);
    const IconComponent = save ? IconBookmarkFilled : IconBookmark;
    const classes = cx('wrapper', { isLogin, isVIP, saved: save });
    const navigate = useNavigate();

    const handelSaveJob = async (e, id) => {
        try {
            e.stopPropagation();
            await jobService.saveJob(id);
            setSave(!save);
            showSuccess('Save job successfully');
        } catch (error) {
            showError('Save job failed');
            console.log(error);
        }
    };

    const handelUnsaveJob = async (e, id) => {
        try {
            e.stopPropagation();
            await jobService.unSaveJob(id);
            setSave(!save);
            showSuccess('Unsave job successfully');
        } catch (error) {
            console.log(error);
            showError('Unsave job failed');
        }
    };

    const handelDirectToJobDetails = () => {
        navigate(`/jobDetails/${description.id}`);
    };

    return (
        <div className={classes} onClick={handelDirectToJobDetails}>
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
                            <IconCoin size={20} />
                            {salary}
                        </div>
                        <div className={cx('remain-date')}>
                            <IconCalendarWeek size={20} />
                            {remainDay}
                        </div>
                    </div>
                    {/*  */}
                </div>
            </div>
            {isJOB_SEEKER && (
                <div className={cx('action')}>
                    <div
                        className={cx('save-job')}
                        onClick={(e) => {
                            save ? handelUnsaveJob(e, description.id) : handelSaveJob(e, description.id);
                        }}
                    >
                        <IconComponent size={22} color="#0a65cc" />
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
