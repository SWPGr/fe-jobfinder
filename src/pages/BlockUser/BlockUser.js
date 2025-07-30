import classNames from 'classnames/bind';
import styles from './BlockUser.module.scss';
import { IconAlertCircle, IconHome, IconMail } from '@tabler/icons-react';
import { Button, Alert } from '@mantine/core';
import { Link } from 'react-router-dom';

// Bind styles for conditional class names
const cx = classNames.bind(styles);

function BlockUser() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content')}>
                    {/* Alert Icon */}
                    <div className={cx('icon-container')}>
                        <IconAlertCircle size={80} className={cx('alert-icon')} />
                    </div>

                    {/* Main Title */}
                    <h1 className={cx('title')}>Account Blocked</h1>

                    {/* Description */}
                    <div className={cx('description')}>
                        <p>Your account has been temporarily suspended due to policy violations or suspicious activity.</p>
                        <p>If you believe this is an error, please contact our support team for assistance.</p>
                    </div>

                    {/* Alert Box */}
                    <Alert
                        icon={<IconAlertCircle size={16} />}
                        title="Account Status"
                        color="red"
                        className={cx('alert')}
                    >
                        Your account is currently blocked and you cannot access the platform.
                        Please review our terms of service and community guidelines.
                    </Alert>

                    {/* Action Buttons */}
                    <div className={cx('actions')}>
                        <Button
                            component={Link}
                            to="/"
                            leftSection={<IconHome size={20} />}
                            className={cx('home-button')}
                            variant="outline"
                        >
                            Back to Home
                        </Button>

                        <Button
                            leftSection={<IconMail size={20} />}
                            className={cx('contact-button')}
                            color="blue"
                        >
                            Contact Support
                        </Button>
                    </div>

                    {/* Additional Information */}
                    <div className={cx('info')}>
                        <h3>What you can do:</h3>
                        <ul>
                            <li>Review our community guidelines</li>
                            <li>Contact support for clarification</li>
                            <li>Wait for account review process</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlockUser; 