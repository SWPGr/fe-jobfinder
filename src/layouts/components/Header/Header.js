import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { TextInput, Avatar } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { IconBellRinging } from '@tabler/icons-react';

import images from '~/assets/Images/index';
import { useAuth } from '~/context/AuthContext';
import { Button, AvatarButton } from '~/components';

const cx = classNames.bind(styles);

function Header({ className }) {
    let { user, logout } = useAuth();
    const navigate = useNavigate();
    // console.log('user in header', user.role);

    const classes = cx('wrapper', {
        [className]: className,
    });

    return (
        <header className={classes}>
            <div className={cx('container')}>
                <div className={cx('left-side')}>
                    <div className={cx('logo')} onClick={() => navigate('/')}>
                        <img src={images.logo} alt="logo" />
                        <h1>JobFinder</h1>
                    </div>

                    <div className={cx('search')}>
                        <TextInput
                            placeholder="Job title, keyword, company"
                            leftSection={<IconSearch size={20} />}
                            classNames={{ input: cx('input'), section: cx('search-icon') }}
                        />
                    </div>
                </div>

                <div className={cx('right-side')}>
                    {user ? (
                        <div className={cx('user')}>
                            <div className={cx('notification')}>
                                <IconBellRinging size={24} />
                                <span className={cx('badge')}></span>
                            </div>
                            <AvatarButton avatar={user.avatar} />
                        </div>
                    ) : (
                        <div className={cx('actions')}>
                            <Button blue_white to={'/login'}>
                                Sign in
                            </Button>
                            <Button classNames={cx('post-job')}>Post A Job</Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
