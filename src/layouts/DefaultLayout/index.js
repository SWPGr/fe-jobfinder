import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import PropTypes from 'prop-types';

import Header from '../components/Header/Header';
import NavBar from '../components/NavBar/NavBar';
import Sidebar from '../components/Sidebar';
import Overview from '../../pages/Overview';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [selectedMenu, setSelectedMenu] = useState(<Overview />);

    return (
        <div className={cx('wrapper')}>
            <NavBar />
            <Header />
            <div className={cx('container')}>
                <div className={cx('side-bar')}>
                    <Sidebar setSelectedMenu={setSelectedMenu} />
                </div>
                <div className={cx('content')}>{selectedMenu}</div>
            </div>
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
