import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useState } from 'react';

import { IconMail, IconBrandSamsungpass, IconEye, IconEyeOff } from '@tabler/icons-react';
import { Checkbox, ActionIcon, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import ResetPassword from './ResetPassword';
import { Link, useNavigate } from 'react-router-dom';
import { LeftSideLogin } from '../components';
import { validator } from '~/utils';
import { Button, GoogleLoginButton } from '~/components';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { useNotification } from '~/hooks';

// Bind styles for conditional class names
const cx = classNames.bind(styles);

function Login() {
    const { user, login } = useContext(AuthContext);

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
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false); // Remember me checkbox
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const { showError, showSuccess } = useNotification();
    const [error, setError] = useState(null);

    // Handler for form submission (currently empty)
    const handleSubmitForm = async (values) => {
        // console.log('Form submitted:', values);
        const data = await login(values.email, values.password);

        // console.log(data);

        if (data.success) {
            setLoading(false);
            navigate('/');
            showSuccess(data.message);
        } else {
            setLoading(false);
            // console.log(data);
            showError(data.message);
            setError(data.message);
        }
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
                            <Button type="submit" className={cx('submit')}>
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
