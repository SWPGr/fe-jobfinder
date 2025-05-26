import { Link } from 'react-router-dom';
import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './NavBar.module.scss';
import { IconPhoneCall, IconFlagExclamation } from '@tabler/icons-react';

const cx = classNames.bind(styles);

function NavBar() {
    const [active, setActive] = useState(0); // Default to the first tab
    const navList = [
        {
            name: 'Home',
            link: '/',
        },
        {
            name: 'Find Job',
            link: '/find-job',
        },
        {
            name: 'Find Employers',
            link: '/find-employers',
        },
        {
            name: 'Dashboard',
            link: '/dashboard',
        },
        {
            name: 'Job Alerts',
            link: '/job-alerts',
        },
        {
            name: 'Customer Supports',
            link: '/customer-supports',
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('tabs')}>
                    {navList.map((item, index) => {
                        return (
                            <div
                                className={cx('tab', {
                                    active: active === index,
                                })}
                                key={index}
                                onClick={() => setActive(index)}
                            >
                                <Link to={item.link}>{item.name}</Link>
                            </div>
                        );
                    })}
                </div>
                {/* END TABS */}

                <div className={cx('contact')}>
                    <div className={cx('phone')}>
                        <IconPhoneCall /> +1 (123) 456-7890
                    </div>
                    <div className={cx('language')}>
                        {' '}
                        <IconFlagExclamation /> English
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBar;
