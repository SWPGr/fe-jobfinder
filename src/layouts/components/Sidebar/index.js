// 📁 Sidebar.js
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { IconLogout } from '@tabler/icons-react';
import { useAuth } from '~/context/AuthContext';
import { items } from './Items';

const cx = classNames.bind(styles);

function Sidebar({ setSelectedMenu, className }) {
    const [active, setActive] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { user, logout } = useAuth();
    const role = user?.role;
    const itemList = role ? items[role] : null;

    useEffect(() => {
        if (itemList) {
            const currentPath = location.pathname.split('/').pop();

            const found = itemList.items.find((item) => {
                const lastSegment = item.link?.split('/').pop();
                return lastSegment === currentPath;
            });

            if (found) {
                setActive(found.title);
                setSelectedMenu(typeof found.page === 'function' ? found.page() : found.page);
            } else {
                // fallback nếu không có route cụ thể
                const defaultItem = itemList.items[0];
                setActive(defaultItem.title);
                setSelectedMenu(typeof defaultItem.page === 'function' ? defaultItem.page() : defaultItem.page);
            }
        }
    }, [itemList, location.pathname, setSelectedMenu]);

    if (!itemList) {
        return <div>Error: No items available for the role: {role}</div>;
    }

    const classes = cx('wrapper', { [className]: className });

    return (
        <div className={classes}>
            <div className={cx('header')}>{itemList?.header}</div>
            <div className={cx('body')}>
                <div className={cx('top')}>
                    {itemList.items.map((item, index) => (
                        <div
                            key={index}
                            className={cx('nav-item', { active: active === item.title })}
                            onClick={() => {
                                setActive(item.title);
                                setSelectedMenu(typeof item.page === 'function' ? item.page() : item.page);
                                if (item.link) navigate(item.link);
                            }}
                        >
                            <span>
                                {item.icon}
                                <div className={cx('title')}>{item.title}</div>
                            </span>
                            {item.rightSection && item.rightSection}
                        </div>
                    ))}
                </div>
                <div className={cx('bottom')}>
                    <div
                        className={cx('nav-item', 'logout')}
                        onClick={() => {
                            logout();
                            navigate('/');
                        }}
                    >
                        <span>
                            <IconLogout />
                            <div className={cx('title')}>Logout</div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Sidebar;
