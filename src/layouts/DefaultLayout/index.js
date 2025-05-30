import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import PropTypes from 'prop-types';

import Header from '../components/Header/Header';
import NavBar from '../components/NavBar/NavBar';
import Sidebar from '../components/Sidebar';
import Overview1 from '~/pages/CreateCVSeeker/Overview1';
import Footer from '../components/Footer/Footer';
import { useAuth } from '~/context/AuthContext';


const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { user } = useAuth();
    const role = user.role;
    const isEmployer = role === 'EMPLOYER';
    const [selectedMenu, setSelectedMenu] = useState(isEmployer ? <Overview1 /> : <Overview1 />);
    //hiển thị nội dung theo actors

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
            <Footer />
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
