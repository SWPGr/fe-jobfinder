import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless'; // different import path!
import classNames from 'classnames/bind';
import styles from './NotificationButton.module.scss';
import { IconBellRinging, IconRefresh } from '@tabler/icons-react';

import PopperWrapper from '../Popper/Wrapper';
import NotificationItem from '../NotificationItem/NotificationItem.js';
import notificationService from '~/services/NotificationService';
import { useAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function NotificationButton() {
    let [visible, setVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await notificationService.getSavedJobNotifications();
            setNotifications(response.data || response || []);
        } catch (error) {
            console.error('Error fetching notifications:', error);
            setError('Failed to load notifications');
            setNotifications([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();

        // Auto refresh every 30 seconds
        const interval = setInterval(fetchNotifications, 30000);

        return () => clearInterval(interval);
    }, []);

    const handleNotificationClick = (notification) => {
        // Handle notification click - mark as read and navigate based on user role
        console.log('Notification clicked:', notification);

        // Close the notification popup
        setVisible(false);

        // Navigate based on user role
        if (user?.role === 'EMPLOYER') {
            // For employers, navigate to my-jobs page
            navigate('/dashboard/overview');
        } else {
            // For job seekers, navigate to job detail page if jobId exists and is valid
            if (notification.jobId && notification.jobId > 0) {
                navigate(`/jobDetails/${notification.jobId}`);
            } else {
                console.warn('No valid jobId found in notification:', notification);
                // Optionally show a message to user that job is not available
            }
        }
    };

    const handleRefresh = () => {
        fetchNotifications();
    };

    const handleDeleteNotification = async (notificationId) => {
        try {
            await notificationService.deleteNotification(notificationId);
            // Remove from local state
            setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
        } catch (error) {
            console.error('Error deleting notification:', error);
            // Optionally show error message to user
        }
    };

    const handleClearAll = async () => {
        try {
            await notificationService.clearAllNotifications();
            setNotifications([]);
        } catch (error) {
            console.error('Error clearing all notifications:', error);
            // Optionally show error message to user
        }
    };

    const handleMarkAsRead = async (notificationId) => {
        try {
            await notificationService.markNotificationAsRead(notificationId);
            // Update local state to mark as read
            setNotifications(prev =>
                prev.map(notification =>
                    notification.id === notificationId
                        ? { ...notification, isRead: true }
                        : notification
                )
            );
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    // Calculate unread count
    const unreadCount = notifications.filter(notification => !notification.isRead).length;

    return (
        <Tippy
            delay={[0, 700]}
            visible={visible}
            interactive
            offset={[200, 8]}
            placement="bottom-end"
            onClickOutside={() => setVisible(false)}
            render={(attrs) => {
                return (
                    <div className={cx('notification-list')} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('notification-popper')}>
                            <div className={cx('notification-header')}>
                                <h4 className={cx('notification-title')}>Notifications</h4>
                                <div className={cx('header-actions')}>
                                    {notifications.length > 0 && (
                                        <button
                                            className={cx('clear-all-button')}
                                            onClick={handleClearAll}
                                            title="Clear all notifications"
                                        >
                                            Clear All
                                        </button>
                                    )}
                                    <button
                                        className={cx('refresh-button')}
                                        onClick={handleRefresh}
                                        disabled={loading}
                                    >
                                        <IconRefresh size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className={cx('notifications')}>
                                {loading ? (
                                    <div className={cx('loading')}>Loading notifications...</div>
                                ) : error ? (
                                    <div className={cx('error')}>
                                        {error}
                                        <button onClick={handleRefresh} className={cx('retry-button')}>
                                            Retry
                                        </button>
                                    </div>
                                ) : notifications.length === 0 ? (
                                    <div className={cx('empty')}>No notifications</div>
                                ) : (
                                    notifications.map((notification, index) => (
                                        <NotificationItem
                                            key={notification.id || index}
                                            data={notification}
                                            onClick={handleNotificationClick}
                                            onDelete={handleDeleteNotification}
                                            onRead={handleMarkAsRead}
                                        />
                                    ))
                                )}
                            </div>
                        </PopperWrapper>
                    </div>
                );
            }}
        >
            <div
                className={cx('notification', {
                    'notification-active': visible,
                })}
                onClick={() => setVisible(!visible)}
            >
                <IconBellRinging size={24} />
                {unreadCount > 0 && (
                    <span className={cx('badge')}>{unreadCount}</span>
                )}
            </div>
        </Tippy>
    );
}

export default NotificationButton;
