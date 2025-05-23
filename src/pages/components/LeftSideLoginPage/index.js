import classNames from 'classnames/bind';
import styles from './LeftSideLoginPage.module.scss';
import { IconBriefcase } from '@tabler/icons-react';
import { memo } from 'react';

import { Images } from '~/assets';

const cx = classNames.bind(styles);

function LeftSideLogin({ props }) {
    return (
        <>
            <div className={cx('left-side')}>
                <div className={cx('top-left')}>
                    {/* Logo and app name */}
                    <div className={cx('logo')}>
                        <span className={cx('logo-icon')}>
                            <img src={Images.logo} alt="logo" />
                        </span>
                        <h3 className={cx('logo-text')}>JobFinder</h3>
                    </div>
                    {/* Welcome title and description */}
                    <h1 className={cx('title')}>Welcome to Our App</h1>
                    <p className={cx('description')}>
                        Sign in to access your account and continue your job search journey
                    </p>
                </div>
                {/* Features or highlights */}
                <div className={cx('bottom-left')}>
                    {props.map((item, index) => (
                        <div className={cx('content')} key={index}>
                            <span className={cx('icon')}>
                                <IconBriefcase />
                            </span>
                            <p className={cx('description')}>{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default memo(LeftSideLogin);
