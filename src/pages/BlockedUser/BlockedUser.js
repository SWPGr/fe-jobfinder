import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconLock, IconHome, IconRefresh, IconAlertTriangle, IconMail, IconPhone, IconLogout } from '@tabler/icons-react';
import classNames from 'classnames/bind';
import styles from './BlockedUser.module.scss';

const cx = classNames.bind(styles);

function BlockedUser() {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    const handleLogout = () => {
        // Xóa token và chuyển về trang login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleContactSupport = () => {
        // Mở email client với địa chỉ support
        window.open('mailto:support@jobfinder.com?subject=Account Blocked - Need Assistance', '_blank');
    };

    const handleCallSupport = () => {
        // Mở số điện thoại support
        window.open('tel:+1234567890', '_blank');
    };

    return (
        <div className={cx('blocked-container')}>
            <div className={cx('blocked-content')}>
                <div className={cx('blocked-circle-container')}>
                    <div className={cx('blocked-circle-pulse')}></div>
                    <div className={cx('blocked-circle-inner')}>
                        <IconLock size={80} color="#dc3545" />
                    </div>
                </div>
                <h2 className={cx('blocked-title')}>Access Denied</h2>
                <p className={cx('blocked-message')}>
                    Your account has been temporarily suspended. You are not authorized to access this platform at the moment.
                </p>

                {/* Phần hiển thị lý do bị chặn */}
                <div className={cx('reason')}>
                    <IconAlertTriangle size={20} className={cx('reason-icon')} />
                    <div>
                        <strong>Reason for suspension:</strong>
                        <br />
                        Violation of platform terms and conditions - Multiple policy violations detected including inappropriate content posting and spam activities.
                    </div>
                </div>

                {/* Phần thông tin liên hệ */}
                <div className={cx('contact-section')}>
                    <h3 className={cx('contact-title')}>Need Help? Contact Support</h3>
                    <div className={cx('contact-buttons')}>
                        <button onClick={handleContactSupport} className={cx('contact-link')}>
                            <IconMail size={18} className={cx('contact-icon')} />
                            <span>Email Support</span>
                        </button>
                        <button onClick={handleCallSupport} className={cx('contact-link')}>
                            <IconPhone size={18} className={cx('contact-icon')} />
                            <span>Call Support</span>
                        </button>
                    </div>
                </div>

                <div className={cx('blocked-buttons')}>
                    <button onClick={handleGoHome} className={cx('button-primary')}>
                        <IconHome size={20} />
                        <span>Home page</span>
                    </button>
                    <button onClick={handleRefresh} className={cx('button-secondary')}>
                        <IconRefresh size={20} />
                        <span>Refresh</span>
                    </button>
                </div>

                {/* Nút đăng xuất */}
                <button onClick={handleLogout} className={cx('logout-button')}>
                    <IconLogout size={18} />
                    <span>Logout</span>
                </button>

                <div className={cx('blocked-footer')}>
                    <p className={cx('note')}>
                        If you believe this is an error, please contact our support team for assistance.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BlockedUser; 