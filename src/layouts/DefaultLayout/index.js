import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import PropTypes from 'prop-types';

import Header from '../components/Header/Header';
import NavBar from '../components/NavBar/NavBar';
import Sidebar from '../components/Sidebar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [selectedMenu, setSelectedMenu] = useState(null);
    //hiển thị nội dung theo actors

    return (
        <div className={cx('wrapper')}>
            <NavBar className={cx('nav-bar')} />
            <Header className={cx('header')} />
            <div className={cx('container')}>
                <div className={cx('side-bar')}>
                    <Sidebar setSelectedMenu={setSelectedMenu} />
                </div>
                {/* <div className={cx('side-bar__hidden')}>
                    <Sidebar setSelectedMenu={setSelectedMenu} />
                </div> */}
                <div className={cx('content')}>{selectedMenu}</div>
            </div>
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
