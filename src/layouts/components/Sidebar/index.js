import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { IconLogout } from '@tabler/icons-react';

import { useAuth } from '~/context/AuthContext';
import { items } from './Items';
const cx = classNames.bind(styles);

function Sidebar({ setSelectedMenu }) {
    let { user } = useAuth();
    const [active, setActive] = useState('Overview');

    const role = user?.role || 'JOB_SEEKER'; // Default to JOB_SEEKER if user or role is not defined
    const itemList = items[role];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>{itemList.header}</div>
            <div className={cx('body')}>
                <div className={cx('top')}>
                    {itemList.map((item, index) => (
                        <div
                            key={index}
                            className={cx('nav-item', {
                                active: active === item.title,
                            })}
                            onClick={() => {
                                setActive(item.title);
                                setSelectedMenu(item.page);
                            }}
                        >
                            <span>
                                {item.icon}
                                {item.title}
                            </span>
                            {item.rightSection && item.rightSection}
                        </div>
                    ))}
                </div>
                {/* TOP */}

                <div className={cx('bottom')}>
                    <div className={cx('nav-item', 'logout')}>
                        <span>
                            <IconLogout />
                            Logout
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
