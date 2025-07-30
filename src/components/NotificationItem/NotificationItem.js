import classNames from 'classnames/bind';
import styles from './NotificationItem.module.scss';
import { FaTrashCan } from "react-icons/fa6";

import { Images } from '~/assets';
import ReactMarkdown from 'react-markdown';

const cx = classNames.bind(styles);

function NotificationItem({ data, onClick, onDelete, onRead }) {
    // Format time function
    const formatTime = (timestamp) => {
        if (!timestamp) return '';

        const now = new Date();
        const notificationTime = new Date(timestamp);
        const diffInHours = Math.floor((now - notificationTime) / (1000 * 60 * 60));

        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours} hours ago`;

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays} days ago`;

        return notificationTime.toLocaleDateString();
    };

    const handleDelete = (e) => {
        e.stopPropagation(); // Prevent triggering the main onClick
        if (onDelete) {
            onDelete(data.id);
        }
    };

    const handleNotificationClick = () => {
        // Mark as read if not already read 
        if (data && !data.isRead && onRead) {
            onRead(data.id);
        }
        // Call the original onClick handler with the notification data
        if (onClick) {
            onClick(data);
        }
    };

    return (
        <div className={cx('wrapper', {
            'unread': !data?.isRead,
            'read': data?.isRead
        })}>
            <div className={cx('notification-item')} onClick={handleNotificationClick}>
                <div className={cx('notification-content')}>
                    <p className={cx('notification-message')}>
                        <ReactMarkdown>{data?.message}</ReactMarkdown>
                    </p>
                    <p className={cx('notification-time')}>
                        {formatTime(data?.createdAt)}
                    </p>
                </div>
                <button
                    className={cx('delete-button')}
                    onClick={handleDelete}
                    title="Delete notification"
                >
                    <FaTrashCan size={14} />
                </button>
            </div>
        </div>
    );
}

export default NotificationItem;
