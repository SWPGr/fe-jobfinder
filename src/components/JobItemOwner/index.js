import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './JobItemOwner.module.scss';
import {
    IconDotsVertical,
    IconCircleX,
    IconCircleCheck,
    IconUsers,
    IconPencil,
    IconX,
} from '@tabler/icons-react';
import { Menu } from '@mantine/core';

import { Images } from '~/assets';
import { Button } from '~/components';
import { EyeIcon } from 'lucide-react';
import { JobDetail } from '~/pages';

const cx = classNames.bind(styles);

function JobItemOwner({ image = Images.default_image, jobDescription = {}, isVIP = false }) {
    const [modalType, setModalType] = useState(null); // quản lý modal mở

    const classes = cx('wrapper', { isVIP });
    const { jobTitle, workTime, remainDay, isActive, numberApplications } = jobDescription;

    const closeModal = () => setModalType(null);

    return (
        <>
            <div className={classes}>
                <div className={cx('content')}>
                    <div className={cx('logo-company')}>
                        <img src={image} alt="Company logo" />
                    </div>
                    <div className={cx('job-description')}>
                        <div className={cx('top')}>
                            <div className={cx('title')}>{jobTitle}</div>
                        </div>
                        <div className={cx('bottom')}>
                            <div className={cx('work-time')}>{workTime}</div>
                            <div className={cx('remain-date')}>{remainDay} days remaining</div>
                        </div>
                    </div>
                </div>

                <div className={cx('status')}>
                    {isActive ? (
                        <p className={cx('active')}>
                            <IconCircleCheck size={20} /> Active
                        </p>
                    ) : (
                        <p className={cx('inactive')}>
                            <IconCircleX size={20} /> Expire
                        </p>
                    )}
                </div>

                <div className={cx('applications')}>
                    <IconUsers size={20} />
                    {numberApplications} applications
                </div>

                <div className={cx('action')}>
                    <Button className={cx('view-applications')}>View Applications</Button>
                    <Menu
                        shadow="md"
                        position="bottom-end"
                        classNames={{ item: cx('item-main'), itemLabel: cx('item-label'), dropdown: cx('dropdown') }}
                    >
                        <Menu.Target>
                            <div className={cx('options')}>
                                <IconDotsVertical size={24} />
                            </div>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item leftSection={<IconPencil size={20} />} onClick={() => setModalType('edit')}>
                                Edit Job
                            </Menu.Item>
                            <Menu.Item leftSection={<EyeIcon size={20} />} onClick={() => setModalType('view')}>
                                View Job
                            </Menu.Item>
                            <Menu.Item leftSection={<IconX size={20} />} onClick={() => null}>
                                Delete Job
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>
            </div>

            {modalType && (
                <div className={cx('modalOverlay')}>
                    <div className={cx('modalBox')}>
                        <button className={cx('closeBtn')} onClick={closeModal}>
                            ×
                        </button>

                        {modalType === 'view' && (
                            <JobDetail job={jobDescription} />
                            
                        )}

                        {modalType === 'edit' && (
                            <div>
                                <h2>Edit Job</h2>
                                <p>Editing job: {jobTitle}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default JobItemOwner;
