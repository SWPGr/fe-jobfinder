import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { useState } from 'react';
import { IconBriefcase, IconMail, IconBrandSamsungpass } from '@tabler/icons-react';
import { TextInput, PasswordInput, Checkbox, Button } from '@mantine/core';
import { Link } from 'react-router-dom';

import GoogleLoginButton from '~/components/GoogleLoginButton';
import TextInputCustom from '~/components/TextInputCustom';

//popup phần chính sách bảo mật

const cx = classNames.bind(styles);

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agree, setAgree] = useState(false);

    const handleSubmitForm = () => {
        // Handle form submission logic here
        // For example, you can send the data to your backend API
        // or perform validation before submitting
        console.log('Form submitted:', {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            agree,
        });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {/* LEFT SIDE REGISTER */}
                <div className={cx('left-side')}>
                    <div className={cx('top-left')}>
                        {/* Logo and app name */}
                        <div className={cx('logo')}>
                            <span className={cx('logo-icon')}>
                                <IconBriefcase size={25} />
                            </span>
                            <h3 className={cx('logo-text')}>JobFinder</h3>
                        </div>
                        {/* Welcome title and description */}
                        <h1 className={cx('title')}>Start your journey</h1>
                        <p className={cx('description')}>
                            Create an account to unlock your career potential and connect with employers worldwide
                        </p>
                    </div>
                    {/* Features or highlights */}
                    <div className={cx('bottom-left')}>
                        <div className={cx('content')}>
                            <span className={cx('icon')}>
                                <IconBriefcase />
                            </span>
                            <p className={cx('description')}>Create your professional profile</p>
                        </div>
                        <div className={cx('content')}>
                            <span className={cx('icon')}>
                                <IconBriefcase />
                            </span>
                            <p className={cx('description')}>Get noticed by top companies</p>
                        </div>
                        <div className={cx('content')}>
                            <span className={cx('icon')}>
                                <IconBriefcase />
                            </span>
                            <p className={cx('description')}>Apply to jobs with one click</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE REGISTER */}
                <div className={cx('right-side')}>
                    <h2 className={cx('title')}>Create your account</h2>

                    <div className={cx('form')}>
                        <div className={cx('name-fields')}>
                            <TextInputCustom
                                label="First name"
                                placeholder="John"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                classNames={{ input: cx('input'), label: cx('label') }}
                            />
                            <TextInputCustom
                                label="Last name"
                                placeholder="Doe"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                classNames={{ input: cx('input'), label: cx('label') }}
                            />
                        </div>

                        <TextInputCustom
                            label="Email address"
                            placeholder="you@example.com"
                            value={email}
                            leftSection={<IconMail size={18} />}
                            onChange={(e) => setEmail(e.target.value)}
                            classNames={{ input: cx('input'), label: cx('label'), section: cx('section') }}
                        />

                        <TextInputCustom
                            type="password"
                            label="Password"
                            placeholder="Enter at least 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            withVisibilityToggle
                            leftSection={<IconBrandSamsungpass size={18} />}
                            classNames={{ input: cx('input'), label: cx('label'), section: cx('section') }}
                        />

                        <TextInputCustom
                            type="password"
                            label="Confirm password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            withVisibilityToggle
                            classNames={{ input: cx('input'), label: cx('label') }}
                        />

                        <div className={cx('checkbox')}>
                            <Checkbox
                                checked={agree}
                                onChange={(e) => setAgree(e.currentTarget.checked)}
                                label={
                                    //agree to the link trang term  of service và privacy policy và em đang bỏ tạm link fb của đạt đẹp trai
                                    <>
                                        I agree to the{' '}
                                        <a href="https://www.facebook.com/mai.dat.270705" className={cx('link')}>
                                            Terms of Service
                                        </a>{' '}
                                        and{' '}
                                        <a href="https://www.facebook.com/mai.dat.270705" className={cx('link')}>
                                            Privacy Policy
                                        </a>
                                    </>
                                }
                            />
                        </div>

                        <Button
                            fullWidth
                            size="md"
                            classNames={{ root: cx('root-submit-btn') }}
                            onClick={handleSubmitForm}
                        >
                            Create account
                        </Button>

                        <p className={cx('description')}>
                            Already have an account?{' '}
                            <Link to="/login" className={cx('link')}>
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <div className={cx('social-media')}>
                        <p className={cx('description')}>Or continue with</p>
                        <GoogleLoginButton />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
