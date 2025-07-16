import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './CompanyItem.module.scss';
import {
    IconMapPin,
    IconBookmark,
    IconBookmarkFilled,
    IconStar,
    IconStarFilled,
    IconArrowRight,
    IconBriefcase,
} from '@tabler/icons-react';

import { Images } from '~/assets';
import { Button } from '~/components';

const cx = classNames.bind(styles);

function CompanyItem({ image = Images.default_image, description = {}, isFeatured, saved, long, className }) {
    const [save, setSave] = useState(saved || false);

    const { companyName, location, openJobs = 3 } = description;

    const classes = cx('wrapper', {
        [className]: className,
        long,
        saved,
    });

    return (
        <div className={classes}>
            <div className={cx('header')}>
                <div className={cx('logo-company')}>
                    <img
                        src={description.avatarUrl || image}
                        alt={`${companyName} logo`}
                        onError={(e) => (e.target.src = Images.default_image)}
                    />
                </div>{' '}
                <div className={cx('content')}>
                    {isFeatured && (
                        <span className={cx('badge')}>
                            <p>Featured</p>
                        </span>
                    )}
                    <Link to={`/company/${companyName}`} className={cx('company-name')}>
                        {companyName}
                    </Link>
                    <div className={cx('description')}>
                        <p className={cx('location')}>
                            <IconMapPin size={14} />
                            {location}
                        </p>
                        {long && (
                            <p className={cx('open-jobs')}>
                                <IconBriefcase size={14} />
                                {openJobs} - Open Jobs
                            </p>
                        )}
                    </div>
                </div>
                {/*  */}
            </div>
            {/* HEADER */}
            <div className={cx('action')}>
                <div className={cx('save')} onClick={() => setSave(!save)}>
                    {long ? save ? <IconStarFilled /> : <IconStar /> : save ? <IconBookmarkFilled /> : <IconBookmark />}
                </div>
                <Button
                    to={`/company/${description.id}`}
                    blue_lighter
                    className={cx('button')}
                    rightIcon={long ? <IconArrowRight /> : null}
                >
                    Open Position
                </Button>
            </div>
        </div>
    );
}

export default CompanyItem;
