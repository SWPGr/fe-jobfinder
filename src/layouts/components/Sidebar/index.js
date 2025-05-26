import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import { useAuth } from '~/context/AuthContext';
import { use } from 'react';

const cx = classNames.bind(styles);

function Sidebar() {
    let { user } = useAuth();
    const role = user?.role;

    return <div className={cx('wrapper')}>Sidebar</div>;
}

export default Sidebar;
