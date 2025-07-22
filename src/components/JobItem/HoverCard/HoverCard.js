import { HoverCard } from '@mantine/core';
import classNames from 'classnames/bind';
import styles from './HoverCard.module.scss';
import { IconClockRecord, IconMapPin, IconClockHour4 } from '@tabler/icons-react';
import { Images } from '~/assets';
import { Button } from '~/components';
import { useRef, useState } from 'react';

const cx = classNames.bind(styles);

function HoverCardJob({ description, children }) {
    const {
        id,
        companyName,
        companyAddress,
        jobTitle,
        salary,
        companyLogo,
        experience,
        remainDay,
        job_description,
        responsibility,
    } = description;

    const targetRef = useRef(null);
    const [position, setPosition] = useState('right');

    const handleMouseOver = () => {
        if (!targetRef.current) return;
        console.log('handleMouseOver');

        const rect = targetRef.current.getBoundingClientRect();

        const estimatedDropdownWidth = 500; // hoặc đo đúng bằng CSS thực tế

        const overflowRight = rect.right + estimatedDropdownWidth > window.innerWidth;

        setPosition(overflowRight ? 'left' : 'right');
    };

    return (
        <HoverCard position={position} classNames={{ dropdown: cx('dropdown') }}>
            <HoverCard.Target>
                <div ref={targetRef} onMouseOver={handleMouseOver}>
                    {children}
                </div>
            </HoverCard.Target>
            <HoverCard.Dropdown>
                <div className={cx('wrapper')}>
                    {/* HEADER */}
                    <div className={cx('header')}>
                        <div className={cx('logo-company')}>
                            <img
                                src={companyLogo || Images.default_image}
                                alt={`${companyName} logo`}
                                onError={(e) => (e.target.src = Images.default_image)}
                            />
                        </div>
                        <div className={cx('content')}>
                            <div className={cx('job-title')}>{jobTitle}</div>
                            <div className={cx('company-name')}>{companyName}</div>
                            <div className={cx('salary')}>{salary}</div>
                        </div>
                    </div>

                    {/* BODY */}
                    <div className={cx('body')}>
                        <div className={cx('company-address')}>
                            <IconMapPin className={cx('icon')} />
                            {companyAddress}
                        </div>
                        <div className={cx('experience')}>
                            <IconClockRecord className={cx('icon')} />
                            {experience}
                        </div>
                        <div className={cx('remain-date')}>
                            <IconClockHour4 className={cx('icon')} />
                            {remainDay}
                        </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className={cx('description')}>
                        <div className={cx('job-description')}>
                            <h4 className={cx('title')}>Job Description</h4>
                            <div className={cx('content')}>{job_description}</div>
                        </div>
                        <div className={cx('responsibility')}>
                            <h4 className={cx('title')}>Responsibility</h4>
                            <div className={cx('content')}>{responsibility}</div>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className={cx('footer')}>
                        <Button blue_white className={cx('btn')} to={`/jobDetails/${id}?isApply=true`}>
                            Apply Now
                        </Button>
                        <Button to={`/jobDetails/${id}`} className={cx('btn', 'view-detail')}>
                            View Detail
                        </Button>
                    </div>
                </div>
            </HoverCard.Dropdown>
        </HoverCard>
    );
}

export default HoverCardJob;
