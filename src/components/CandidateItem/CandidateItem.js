import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CandidateItem.module.scss';
import { Images } from '~/assets';
import {
    IconMapPin,
    IconCurrencyDollar,
    IconBookmark,
    IconBookmarkFilled,
    IconDownload,
    IconArrowRight,
} from '@tabler/icons-react';

import { Button } from '~/components';

const cx = classNames.bind(styles);

function CandidateItem({ image = Images.default_image, description = {}, saved, isLogin = false, long, className }) {
    const [save, setSave] = useState(saved || false);

    const classes = cx('wrapper', {
        [className]: className,
        long,
        saved,
    });

    const IconComponent = save ? IconBookmarkFilled : IconBookmark;

    console.log(description);

    const { fullName, job_role = 'BA', location, experience, avatarUrl } = description;

    return (
        <div className={classes}>
            <div className={cx('main')}>
                <div className={cx('avatar')}>
                    <img
                        src={avatarUrl || image}
                        alt={`${fullName} logo`}
                        onError={(e) => (e.target.src = Images.default_image)}
                    />
                </div>
                {/*  */}
                <div className={cx('inf')}>
                    <div className={cx('top')}>
                        <div className={cx('name')}>{fullName}</div>
                        <div className={cx('job_role')}>{job_role}</div>
                    </div>
                    <div className={cx('bottom')}>
                        {long ? (
                            <>
                                <div className={cx('location')}>
                                    <IconMapPin />
                                    {location}
                                </div>
                                <div className={cx('experience')}>
                                    <IconCurrencyDollar />
                                    {experience?.name} experience
                                </div>
                            </>
                        ) : (
                            <Button
                                to={`/seekerDetailPage/1`}
                                rightIcon={<IconArrowRight />}
                                className={cx('view-resume')}
                            >
                                View Profile
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            {/* END MAIN */}

            <div className={cx('action')}>
                {long && (
                    <div className={cx('download', 'action_btn')}>
                        <IconDownload />
                    </div>
                )}
                <div
                    className={cx('save', 'action_btn')}
                    onClick={() => {
                        setSave(!save);
                    }}
                >
                    <IconComponent />
                </div>
                {long && (
                    <Button
                        to={`/seekerDetailPage/1`}
                        blue_lighter
                        rightIcon={<IconArrowRight />}
                        className={cx('view-profile-btn')}
                    >
                        View Profile
                    </Button>
                )}
            </div>
        </div>
    );
}

export default CandidateItem;
