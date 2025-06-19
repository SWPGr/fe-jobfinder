import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Admin.module.scss';

import Header from '~/layouts/components/Header/Header';
import Sidebar from '~/layouts/components/Sidebar/index';

const cx = classNames.bind(styles);

function Admin() {
    const [selectedMenu, setSelectedMenu] = useState(null);

    return (
        <div className={cx('wrapper')}>
            <Header className={cx('header')} />
            <div className={cx('container')}>
                <div className={cx('side-bar')}>
                    <Sidebar setSelectedMenu={setSelectedMenu} className={cx('side-bar')} />
                </div>
                {/* <div className={cx('side-bar__hidden')}>
                    <Sidebar setSelectedMenu={setSelectedMenu} />
                </div> */}
                <div className={cx('content')}>{selectedMenu}</div>
            </div>
        </div>
    );
}

export default Admin;
