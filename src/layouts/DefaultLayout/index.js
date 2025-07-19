// 🎯 Mục tiêu: Đảm bảo khi truy cập /dashboard hoặc /dashboard/jobs thì trang hiển thị đúng component tương ứng theo role

// ✅ Giải pháp chính: sửa DefaultLayout để đọc URL param `page`, đối chiếu với `items[role]` và hiển thị đúng page tương ứng

// ⚠️ Giả sử bạn đã có AuthContext cung cấp role, và route có dạng: /dashboard/:page

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import PropTypes from 'prop-types';

import Header from '../components/Header/Header';
import NavBar from '../components/NavBar/NavBar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '~/context/AuthContext';
import { items } from '../components/Sidebar/Items';
import { ChatbotButton } from '~/components';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { page } = useParams();
    const [selectedMenu, setSelectedMenu] = useState(null);
    const { user } = useAuth();
    const role = user?.role;

    const itemList = role ? items[role] : null;

    // Memo để tránh re-render không cần thiết
    const matchedItem = useMemo(() => {
        if (!itemList) return null;
        return itemList.items.find((item) => {
            const link = item.link || item.title?.toLowerCase().replace(/\s+/g, '');
            return page === link?.split('/').pop();
        });
    }, [itemList, page]);

    useEffect(() => {
        if (matchedItem) {
            if (typeof matchedItem.page === 'function') {
                setSelectedMenu(matchedItem.page());
            } else {
                setSelectedMenu(matchedItem.page);
            }
        } else if (itemList) {
            // Nếu không có page khớp thì mặc định chọn item đầu tiên
            const defaultItem = itemList.items[0];
            if (typeof defaultItem.page === 'function') {
                setSelectedMenu(defaultItem.page());
            } else {
                setSelectedMenu(defaultItem.page);
            }
        }
    }, [matchedItem, itemList]);

    return (
        <div className={cx('wrapper')}>
            <NavBar className={cx('nav-bar')} />
            <Header className={cx('header')} />
            <div className={cx('container')}>
                <div className={cx('side-bar')}>
                    <Sidebar setSelectedMenu={setSelectedMenu} defaultActive={page} />
                </div>
                <div className={cx('content')}>{selectedMenu}</div>
            </div>
            <ChatbotButton />
        </div>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node,
};

export default DefaultLayout;
