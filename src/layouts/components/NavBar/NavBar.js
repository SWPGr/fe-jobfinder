import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './NavBar.module.scss';
import { IconPhoneCall, IconFlagExclamation, IconMenu2 } from '@tabler/icons-react';
import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { useAuth } from '~/context/AuthContext';
import getNavItems from './ItemsNav';

const cx = classNames.bind(styles);

function NavBar({ className }) {
    const location = useLocation();
    const [opened, { open, close }] = useDisclosure(false);

    const { user } = useAuth();
    const classes = cx('wrapper', {
        [className]: className,
    });

    // // Đặt mặc định role nếu không có
    const role = user?.role;
    const isAuthenticated = Boolean(user);

    // Lấy danh sách menu theo trạng thái đăng nhập và role
    const navList = getNavItems(isAuthenticated, role);

    // Tính index tab phù hợp với URL hiện tại
    const currentIndex = navList.findIndex((item) => item.link === location.pathname);

    // State active tab, khởi tạo theo currentIndex
    const [active, setActive] = useState(currentIndex !== -1 ? currentIndex : 0);

    // Đồng bộ active với URL khi URL thay đổi
    useEffect(() => {
        if (currentIndex !== -1 && currentIndex !== active) {
            setActive(currentIndex);
        }
    }, [currentIndex, active]);

    return (
        <div className={classes}>
            <div className={cx('container')}>
                <div className={cx('tabs')}>
                    {Array.isArray(navList) &&
                        navList.map((item, index) => (
                            <Link
                                key={index}
                                to={item.link}
                                className={cx('tab', { active: active === index })}
                                onClick={() => setActive(index)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    <>
                        <Drawer
                            opened={opened}
                            onClose={close}
                            title="Menu"
                            classNames={{ body: cx('drawer-body'), title: cx('drawer-title') }}
                        >
                            {Array.isArray(navList) &&
                                navList.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={item.link}
                                        className={cx('tab-hidden', { active: active === index })}
                                        onClick={() => setActive(index)}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                        </Drawer>

                        <button variant="default" onClick={open} className={cx('open-drawer')}>
                            <IconMenu2 />
                        </button>
                    </>
                </div>
                {/* END TABS */}

                <div className={cx('contact')}>
                    <div className={cx('phone')}>
                        <IconPhoneCall /> +1 (123) 456-7890
                    </div>
                    <div className={cx('language')}>
                        <IconFlagExclamation /> English
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
