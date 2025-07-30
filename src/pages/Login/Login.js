import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useState, useEffect } from 'react';

import { IconMail, IconBrandSamsungpass, IconEye, IconEyeOff } from '@tabler/icons-react';
import { Checkbox, ActionIcon, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

import ResetPassword from './ResetPassword';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { LeftSideLogin } from '../components';
import { validator } from '~/utils';
import { GoogleLoginButton } from '~/components';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { useNotification } from '~/hooks';
import config from '~/config';

// Bind styles for conditional class names
const cx = classNames.bind(styles);

function Login() {
    const { login } = useContext(AuthContext);

    // State variables for form fields and UI logic
    const formLogin = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => validator.validateEmail(value),
            password: (value) => validator.validateLoginPassword(value),
        },
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false); // Remember me checkbox
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const { showError, showSuccess } = useNotification();
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();

    // Handler for form submission (currently empty)
    const handleSubmitForm = async (values) => {
        console.log('Form submitted:', values);

        setLoading(true);
        const data = await login(values.email, values.password, values.userRole);
        setLoading(false);
        console.log('📡 Response data:', data);
        console.log('🔍 Checking conditions - Code:', data.code, 'Message:', data.message);
        console.log('🔍 Message type:', typeof data.message);
        console.log('🔍 Message content:', data.message);
        if (data.message && typeof data.message === 'object') {
            console.log('🔍 Message.message:', data.message.message);
        }

        if (data.success) {
            navigate('/');
            showSuccess('Login successful!');
        } else {
            const message =
                typeof data.message === 'string' ? data.message : data.message?.toString() || 'An error occurred';

            // Check if user is blocked and redirect to block-user page
            if ((data.code === 1004) ||
                (data.message && typeof data.message === 'string' && (data.message.toLowerCase().includes('blocked') || data.message.toLowerCase().includes('inactive'))) ||
                (data.message && typeof data.message === 'object' && data.message.message && data.message.message.toLowerCase().includes('blocked'))) {
                console.log('🚫 User is blocked - Showing error message:', message);
                showError(message);
                // Delay redirect to allow user to see the error message
                setTimeout(() => {
                    console.log('🔄 Redirecting to blocked user page:', config.routes.blockedUser);
                    navigate(config.routes.blockedUser);
                }, 1000); // 1 seconds delay
                return;
            }

            showError(message);
            // setError(data.message);
        }
    };

    useEffect(() => {
        if (searchParams.get('error') === 'session-expired') {
            showError('Session expired. Please log in again.');
        }
    }, []);

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
                            key={formLogin.key.email} // Unique key
                            {...formLogin.getInputProps('email')} // Get input props
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
                            error={formLogin.errors.password || error}
                            onInput={() => setError(null)} // Clear error on input
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
                            <ResetPassword />
                        </div>

                        {/* Submit button */}
                        <div className={cx('btn-submit')}>
                            <Button
                                type="submit"
                                classNames={{
                                    root: cx('submit'),
                                    label: cx('submit-label'),
                                    loader: cx('submit-loader'),
                                }}
                                loading={loading}
                                loaderProps={{ type: 'dots' }}
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
