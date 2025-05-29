import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { ThemeIcon } from '@mantine/core';
import { IconUserPlus, IconCloudUp, IconReportSearch, IconCircleDashedCheck } from '@tabler/icons-react';

import { Icons } from '~/assets';

const cx = classNames.bind(styles);

function Instruction() {
    return (
        <div className={cx('instruction__wrapper')}>
            <div className={cx('instruction__container')}>
                <h1 className={cx('instruction__title')}>How JobFinder Work</h1>
                <div className={cx('instruction__content')}>
                    <div className={cx('instruction__item')}>
                        <ThemeIcon className={cx('root_instruction__item')}>
                            <IconUserPlus className={cx('icon_instruction')} />
                        </ThemeIcon>
                        <h2 className={cx('instruction-item__title')}>Create an account</h2>
                        <p className={cx('instruction-item__description')}>
                            Sign up to create your profile and start exploring job opportunities.
                        </p>
                    </div>
                    {/*  */}
                    <div className={cx('instruction__item')}>
                        <ThemeIcon className={cx('root_instruction__item')}>
                            <IconCloudUp className={cx('icon_instruction')} />
                        </ThemeIcon>
                        <h2 className={cx('instruction-item__title')}>Upload your resume</h2>
                        <p className={cx('instruction-item__description')}>
                            Upload your resume to showcase your skills and experience.
                        </p>
                    </div>
                    {/*  */}
                    <div className={cx('instruction__item')}>
                        <ThemeIcon className={cx('root_instruction__item')}>
                            <IconReportSearch className={cx('icon_instruction')} />
                        </ThemeIcon>
                        <h2 className={cx('instruction-item__title')}>Find your dream job</h2>
                        <p className={cx('instruction-item__description')}>
                            Browse through a wide range of job opportunities and apply for your dream role.
                        </p>
                    </div>
                    {/*  */}
                    <div className={cx('instruction__item')}>
                        <ThemeIcon className={cx('root_instruction__item')}>
                            <IconCircleDashedCheck className={cx('icon_instruction')} />
                        </ThemeIcon>
                        <h2 className={cx('instruction-item__title')}>Get your dream job</h2>
                        <p className={cx('instruction-item__description')}>
                            Once you find the perfect job, apply and get your dream job.
                        </p>
                    </div>
                    {/*  */}
                    <span className={cx('arrow-icon-1')}>
                        <Icons.CurvedArrowDown />
                    </span>
                    <span className={cx('arrow-icon-2')}>
                        <Icons.CurvedArrowUp />
                    </span>
                    <span className={cx('arrow-icon-3')}>
                        <Icons.CurvedArrowDown />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Instruction;
