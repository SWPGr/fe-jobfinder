// 📁 Sidebar.js
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { IconLogout } from '@tabler/icons-react';
import { useAuth } from '~/context/AuthContext';
import { items } from './Items';
import { NavLink } from '@mantine/core';
import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

function Sidebar({ setSelectedMenu, className }) {
    const [active, setActive] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { page } = useParams(); // Extracting page and item from the URL parameters

    const { user, logout } = useAuth();
    const role = user?.role;
    const itemList = role ? items[role] : null;

    useEffect(() => {
        if (itemList) {
            const found = itemList.items.find((item) => {
                // const lastSegment = item.link?.split('/').pop();
                // return lastSegment === page;
                return item.link?.includes(page);
            });

            if (found) {
                setActive(found.link);
                setSelectedMenu(typeof found.page === 'function' ? found.page() : found.page);
            } else {
                // fallback nếu không có route cụ thể
                const defaultItem = itemList.items[0];
                setActive(defaultItem.title);
                setSelectedMenu(typeof defaultItem.page === 'function' ? defaultItem.page() : defaultItem.page);
            }
        }
    }, [itemList, location.pathname, setSelectedMenu, page]);

    if (!itemList) {
        return <div>Error: No items available for the role: {role}</div>;
    }

    const classes = cx('wrapper', { [className]: className });

    return (
        <div className={classes}>
            <div className={cx('header')}>{itemList?.header}</div>
            <div className={cx('body')}>
                <div className={cx('top')}>
                    {itemList.items.map((item, index) =>
                        item?.children ? (
                            <NavLink
                                key={index}
                                label={item.title}
                                leftSection={item.icon}
                                classNames={{
                                    root: cx('nav-item', { active: active?.includes(item.link) }),
                                    label: cx('title-label'),
                                    children: cx('children'),
                                    section: cx('section'),
                                }}
                                childrenOffset={28}
                                // defaultOpened
                                onClick={() => {
                                    // setActive(item.link);
                                    setSelectedMenu(typeof item.page === 'function' ? item.page() : item.page);
                                    if (item.link) navigate(item.link);
                                }}
                            >
                                {item.children.map((child) => (
                                    <NavLink
                                        key={child.link}
                                        label={child.title}
                                        leftSection={child.icon}
                                        classNames={{
                                            root: cx('nav-item', { active: active?.includes(child.link) }),
                                            label: cx('title-label'),
                                        }}
                                        onClick={() => {
                                            // setActive(child.link);
                                            setSelectedMenu(
                                                typeof child.page === 'function' ? child.page() : child.page,
                                            );
                                            navigate(child.link); // ✅ không reload
                                        }}
                                    />
                                ))}
                            </NavLink>
                        ) : (
                            <div
                                key={index}
                                className={cx('nav-item', { active: active?.includes(item.link) })}
                                onClick={() => {
                                    // setActive(item.link);
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
                        ),
                    )}
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
