import classNames from 'classnames/bind';
import styles from './JobItemOwner.module.scss';
import { IconMapPin, IconCurrencyDollar, IconPencil, IconUsers, IconEye, IconTrash } from '@tabler/icons-react';
import { Badge } from '@mantine/core';

import { Images } from '~/assets';
import { Button } from '~/components';

const cx = classNames.bind(styles);

function JobItemOwner({ image = Images.default_image, jobDescription = {}, isVIP = false }) {
    const classes = cx('wrapper', { isVIP });
    const { companyAddress, jobTitle, workTime, salary, isActive, dueDate, numberApplications } = jobDescription;

    return (
        <div className={classes}>
            <div className={cx('content')}>
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
            {/* END CONTENT */}

            {/* STATUS */}
            <div className={cx('status')}>
                {isActive ? <p className={cx('active')}>Active</p> : <p className={cx('inactive')}>Expire</p>}
            </div>

            {/* END DATE */}
            <div className={cx('end-date')}>{dueDate}</div>

            {/* NUMBER OF APPLICATIONS */}
            <div className={cx('applications')}>{numberApplications} applications</div>

            {/* ACTION */}
            <div className={cx('action')}>
                <span className={cx('edit')}>
                    <IconPencil
                        size={22}
                        color="var(--blue-500)"
                        onClick={() => {
                            console.log('edit');
                        }}
                    />
                </span>
                <span className={cx('applicant')}>
                    <IconUsers
                        size={22}
                        color="var(--green-500)"
                        onClick={() => {
                            console.log('applicant');
                        }}
                    />
                </span>
                <span className={cx('show')}>
                    <IconEye
                        size={22}
                        color="var(--orange-500)"
                        onClick={() => {
                            console.log('show');
                        }}
                    />
                </span>
                <span className={cx('delete')}>
                    <IconTrash
                        size={22}
                        color="var(--red-500)"
                        onClick={() => {
                            console.log('delete');
                        }}
                    />
                </span>
            </div>
        </div>
    );
}

export default JobItemOwner;
