import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ResetPassword.module.scss';
import { IconBrandSamsungpass, IconEyeOff, IconEye } from '@tabler/icons-react';
import { TextInput, ActionIcon, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';

import validator from '~/utils/validator';
import { useNotification } from '~/hooks';
import { Button } from '~/components';
import { authService } from '~/services';
import { useLoading } from '~/context/LoadingContext';

const cx = classNames.bind(styles);

function ResetPassword() {
    const [visible, { toggle }] = useDisclosure(false);
    const { showLoading, hideLoading } = useLoading();
    const navigate = useNavigate();

    const formResetPassword = useForm({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validate: {
            password: (value) => validator.validatePassword(value),
            confirmPassword: (value, values) => validator.validateConfirmPassword(value, values.password),
        },
    });

    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle password visibility
    const { showError, showSuccess } = useNotification();
    const [isTokenValid, setIsTokenValid] = useState(true);

    const handleSubmitForm = async (values) => {
        try {
            showLoading();
            console.log(token, values.password);

            const response = await authService.resetPassword(token, values.password);
            // const response = {
            //     success: true,
            //     message: 'Password has been reset successfully!',
            // };

            console.log('Response data:', response);
            hideLoading();

            if (response?.success) {
                showSuccess('Password has been reset successfully!');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
                // Điều hướng về login page
            } else {
                const errorMessage = response?.message || 'Reset failed!';
                showError(errorMessage);
            }
        } catch (error) {
            hideLoading();
            const errorMessage = error?.message || 'Unexpected error!';
            console.error('Reset Password Error:', errorMessage);
            showError(errorMessage);
        }
    };

    useEffect(() => {
        if (!token) {
            showError('Invalid or missing reset token.');
            setIsTokenValid(false);
        }
    }, [token]);

    if (!isTokenValid) {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <h1 className={cx('title')}>Error</h1>
                    <p className={cx('description')}>
                        Invalid or missing reset token. Please request a new reset link.
                    </p>
                    <Button onClick={() => navigate('/forgot-password')}>Request New Link</Button>
                </div>
            </div>
        );
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h1 className={cx('title')}>Reset Password</h1>
                <p className={cx('description')}>Please enter your new password</p>
                <form className={cx('form')} onSubmit={formResetPassword.onSubmit(handleSubmitForm)}>
                    <TextInput
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        placeholder="Enter at least 8 characters"
                        {...formResetPassword.getInputProps('password')}
                        leftSection={<IconBrandSamsungpass size={18} />}
                        rightSection={
                            <ActionIcon
                                variant="light"
                                aria-label="Settings"
                                classNames={{ root: cx('root-right-btn'), icon: cx('icon-right-btn') }}
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <IconEyeOff size={24} /> : <IconEye size={24} />}
                            </ActionIcon>
                        }
                        classNames={{
                            wrapper: cx('text-wrapper'),
                            input: cx('input'),
                            section: cx('section'),
                            label: cx('label'),
                            error: cx('error'),
                        }}
                    />

                    <TextInput
                        type={showConfirmPassword ? 'text' : 'password'}
                        label="Confirm password"
                        placeholder="Confirm your password"
                        {...formResetPassword.getInputProps('confirmPassword')}
                        leftSection={<IconBrandSamsungpass size={18} />}
                        rightSection={
                            <ActionIcon
                                variant="light"
                                aria-label="Toggle password visibility"
                                classNames={{ root: cx('root-right-btn'), icon: cx('icon-right-btn') }}
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                            >
                                {showConfirmPassword ? <IconEyeOff size={24} /> : <IconEye size={24} />}
                            </ActionIcon>
                        }
                        classNames={{
                            wrapper: cx('text-wrapper'),
                            input: cx('input'),
                            section: cx('section'),
                            label: cx('label'),
                            error: cx('error'),
                        }}
                    />

                    {/* Submit button */}
                    <div className={cx('btn-submit')}>
                        <Button
                            type="submit"
                            className={cx('submit')}
                            disabled={formResetPassword.isSubmitting || !formResetPassword.isValid()}
                        >
                            Reset Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
