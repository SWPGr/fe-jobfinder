import classNames from 'classnames/bind';
import styles from './NotificationItem.module.scss';

import { Images } from '~/assets';

const cx = classNames.bind(styles);

function NotificationItem({ data, onClick }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('notification-icon')}>
                <img src={Images.google_image} alt="Notification Icon" />
            </div>
            <div className={cx('notification-item')} onClick={onClick}>
                <div className={cx('notification-content')}>
                    <p className={cx('notification-message')}>
                        <strong>System</strong> updated your job posting asdkadjas lajsldkajsdl aksjd kajsdlka
                        jsdlaskjdldjsa
                    </p>
                    <p className={cx('notification-time')}>3 hours ago</p>
                </div>
            </div>
        </div>
    );
}

export default NotificationItem;
