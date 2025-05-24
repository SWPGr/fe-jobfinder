import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Button } from '@mantine/core';
import '@mantine/core/styles.css';

import { IconPhoto, IconDownload, IconArrowRight } from '@tabler/icons-react';

import images from '~/assets/Images/index';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('logo')}>
                <img src={images.logo} alt="logo" />
                <h1>JobFinder</h1>
            </div>

            <div className={cx('actions')}>
                <Button variant="outline" classNames={cx('login')} leftSection={<IconPhoto size={14} />}>
                    Login
                </Button>
                <Button classNames={cx('register')}>Register</Button>
            </div>
        </header>
    );
}

export default Header;
