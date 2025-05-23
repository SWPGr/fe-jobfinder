import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useState } from 'react';

import { IconMail, IconBrandSamsungpass, IconEye, IconEyeOff } from '@tabler/icons-react';
import { Checkbox, ActionIcon, Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import ResetPassword from './ResetPassword';
import { Link } from 'react-router-dom';
import { LeftSideLogin } from '../components';
import GoogleLoginButton from '~/components/GoogleLoginButton';
import { validator } from '~/utils';
import { Button as CustomButton } from '~/components';

// Bind styles for conditional class names
const cx = classNames.bind(styles);

function Login() {
    // State variables for form fields and UI logic
    const formLogin = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => validator.validateEmail(value),
            password: (value) => validator.validatePassword(value),
        },
    });

    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false); // Remember me checkbox
    const [resetEmail, setResetEmail] = useState(''); // For reset password modal
    const [resetPassword, setResetPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

    // Handler for form submission (currently empty)
    const handleSubmitForm = (values) => {
        console.log('Form submitted:', values);
    };

    return (
        <div className={cx('wrapper')}>
            {/* Main wrapper for the login page */}
            <div className={cx('container')}>
                {/* Container for left and right sides */}

                {/* LEFT SIDE LOGIN */}
                <LeftSideLogin
                    props={[
                        'Access thousands of job listings',
                        'Track your application progress',
                        'Get personalized job recommendations',
                    ]}
                />
                {/* END LEFT SIDE LOGIN */}

                {/* RIGHT SIDE LOGIN */}
                <div className={cx('right-side')}>
                    <div className={cx('top-right')}>
                        {/* Sign in title */}
                        <h1 className={cx('title')}>Sign in to your account</h1>
                    </div>

                    {/* FORM SINGIN */}
                    {/* Email input field */}
                    <form className={cx('form')} onSubmit={formLogin.onSubmit((values) => handleSubmitForm(values))}>
                        <TextInput
                            label="Email address"
                            placeholder="you@example.com"
                            key={formLogin.key.email}
                            {...formLogin.getInputProps('email')}
                            leftSectionPointerEvents="none"
                            leftSection={<IconMail size={20} />}
                            classNames={{
                                wrapper: cx('text-wrapper'),
                                input: cx('input'),
                                section: cx('section'),
                                label: cx('label'),
                                error: cx('error'),
                            }}
                            // Example error message
                        />

                        {/* Password input field with show/hide toggle */}
                        <TextInput
                            label="Password"
                            placeholder="your password..."
                            type={showPassword ? 'text' : 'password'}
                            key={formLogin.key.password}
                            {...formLogin.getInputProps('password')}
                            leftSectionPointerEvents="none"
                            leftSection={<IconBrandSamsungpass size={20} />}
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

                        {/* Remember me checkbox and reset password modal */}
                        <div className={cx('checkbox')}>
                            <Checkbox
                                checked={checked}
                                label="Remember me"
                                onChange={(event) => setChecked(event.currentTarget.checked)}
                                classNames={{
                                    input: cx('checkbox-input'),
                                    label: cx('checkbox-label'),
                                    inner: cx('checkbox-inner'),
                                    icon: cx('checkbox-icon'),
                                    body: cx('checkbox-body'),
                                }}
                            />

                            {/* Reset password modal trigger */}
                            <ResetPassword content={<p>Forgot your password?</p>} title="Reset password">
                                <TextInput
                                    label="Email address"
                                    placeholder="you@example.com"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    classNames={{
                                        wrapper: cx('text-wrapper'),
                                        input: cx('input'),
                                        section: cx('section'),
                                        label: cx('label'),
                                        error: cx('error'),
                                    }}
                                    rightSection={
                                        <CustomButton yellow className={cx('send-otp')}>
                                            Send OTP
                                        </CustomButton>
                                    }
                                />
                            </ResetPassword>
                        </div>

                        {/* Submit button */}
                        <div className={cx('btn-submit')}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="filled"
                                size="md"
                                classNames={{ root: cx('root-submit-btn'), inner: cx('inner-submit-btn') }}
                            >
                                Sign in
                            </Button>
                        </div>
                    </form>

                    {/* END FORM SINGIN */}

                    {/* Sign up prompt */}
                    <div className={cx('signup')}>
                        <p className={cx('description')}>
                            Don't have an account?{' '}
                            <span>
                                <Link to="/register" className={cx('link')}>
                                    Sign up
                                </Link>
                            </span>
                        </p>
                    </div>

                    {/* Social media login options */}
                    <div className={cx('social-media')}>
                        <div className={cx('content')}>
                            {/* <hr className={cx('divider')} /> */}
                            <p className={cx('description')}>Or continue with</p>
                        </div>

                        <GoogleLoginButton />
                    </div>
                </div>
                {/* END RIGHT SIDE LOGIN */}
            </div>
        </div>
    );
}

export default Login;
