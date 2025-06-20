import { Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classNames from 'classnames/bind';
import { useForm } from '@mantine/form';

import styles from './Login.module.scss';
import { validator } from '~/utils';
import { Button } from '~/components';
import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

function ResetPassword({ children, content, title, className, ...props }) {
    const [opened, { open, close }] = useDisclosure(false);
    const [showResendEmail, setShowResendEmail] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const formResetPassword = useForm({
        initialValues: {
            email: '',
        },
        validate: {
            email: (value) => validator.validateEmail(value),
        },
    });

    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [countdown]);

    const handleSubmitForm = (values) => {
        console.log('Form submitted:', values);
    };

    const handleResendEmail = () => {
        if (countdown === 0) {
            setShowResendEmail(true);
            setCountdown(10); // Start 10-second countdown
            // Add resend email logic here
            console.log('Resending email to:', formResetPassword.values.email);
        }
    };

    return (
        <div className={cx('popup')}>
            <Modal
                title="Reset Password"
                opened={opened}
                onClose={close}
                centered
                withinPortal={true}
                size={'xl'}
                classNames={{
                    content: cx('modal-content'),
                    header: cx('header'),
                    root: cx('root-popup'),
                    close: cx('close'),
                    overlay: cx('overlay'),
                }}
                overlayProps={{
                    opacity: 0.55,
                    blur: 3,
                }}
                {...props}
            >
                <form
                    className={cx('form', 'reset-password-form')}
                    onSubmit={formResetPassword.onSubmit((values) => handleSubmitForm(values))}
                >
                    <TextInput
                        label="Email address"
                        placeholder="you@example.com"
                        key={formResetPassword.key.email}
                        {...formResetPassword.getInputProps('email')}
                        classNames={{
                            wrapper: cx('text-wrapper'),
                            input: cx('input'),
                            section: cx('section'),
                            label: cx('label'),
                            error: cx('error'),
                        }}
                        rightSection={
                            <Button
                                yellow
                                disabled={formResetPassword.values.email === '' || countdown > 0}
                                className={cx('send-email')}
                                onClick={() => {
                                    setShowResendEmail(true);
                                    setCountdown(10);
                                }}
                            >
                                Send
                            </Button>
                        }
                    />
                </form>

                {showResendEmail && formResetPassword.values.email !== '' && (
                    <p className={cx('resend-email-message')}>
                        Please check your email for the reset password link or{' '}
                        <Button
                            text
                            black_white
                            className={cx('resend-email-btn')}
                            disabled={countdown > 0}
                            onClick={handleResendEmail}
                        >
                            Resend Email! {countdown > 0 && `(${countdown}s)`}
                        </Button>
                    </p>
                )}
            </Modal>

            <Button blue_white onClick={open} className={cx('forgot-password')}>
                Forgot your password?
            </Button>
        </div>
    );
}

export default ResetPassword;
