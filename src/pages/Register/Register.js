import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { useState } from 'react';
import { IconMail, IconBrandSamsungpass, IconEyeOff, IconEye } from '@tabler/icons-react';
import { Checkbox, Button, TextInput, ActionIcon } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useForm } from '@mantine/form';

import GoogleLoginButton from '~/components/GoogleLoginButton';
import { LeftSideLogin } from '../components';
// popup phần chính sách bảo mật
import { validator } from '~/utils';

const cx = classNames.bind(styles);

function Register() {
    const formLogin = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            agree: false,
        },
        validate: {
            firstName: (value) => (value.trim().length > 0 ? null : 'First name is required'),
            lastName: (value) => (value.trim().length > 0 ? null : 'Last name is required'),
            email: (value) => validator.validateEmail(value),
            password: (value) => validator.validatePassword(value),
            confirmPassword: (value, values) => validator.validateConfirmPassword(value, values.password),
            agree: (value) => (value === true ? null : alert('You must agree to terms')),
        },
    });

    const [agree, setAgree] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

    const handleSubmitForm = (values) => {
        console.log('Form submitted:', values);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {/* LEFT SIDE REGISTER */}
                <LeftSideLogin
                    props={[
                        'Create your professional profile',
                        'Get noticed by top companies',
                        'Apply to jobs with one click',
                    ]}
                />

                {/* RIGHT SIDE REGISTER */}
                <div className={cx('right-side')}>
                    <h2 className={cx('title')}>Create your account</h2>

                    <form className={cx('form')} onSubmit={formLogin.onSubmit(handleSubmitForm)}>
                        <div className={cx('name-fields')}>
                            <TextInput
                                label="First name"
                                placeholder="John"
                                {...formLogin.getInputProps('firstName')}
                                classNames={{
                                    wrapper: cx('text-wrapper'),
                                    input: cx('input'),
                                    section: cx('section'),
                                    label: cx('label'),
                                    error: cx('error'),
                                }}
                            />
                            <TextInput
                                label="Last name"
                                placeholder="Doe"
                                {...formLogin.getInputProps('lastName')}
                                classNames={{
                                    wrapper: cx('text-wrapper'),
                                    input: cx('input'),
                                    section: cx('section'),
                                    label: cx('label'),
                                    error: cx('error'),
                                }}
                            />
                        </div>

                        <TextInput
                            label="Email address"
                            placeholder="you@example.com"
                            {...formLogin.getInputProps('email')}
                            leftSection={<IconMail size={18} />}
                            classNames={{
                                wrapper: cx('text-wrapper'),
                                input: cx('input'),
                                section: cx('section'),
                                label: cx('label'),
                                error: cx('error'),
                            }}
                        />

                        <TextInput
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            placeholder="Enter at least 8 characters"
                            {...formLogin.getInputProps('password')}
                            withVisibilityToggle
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
                            type="password"
                            label="Confirm password"
                            placeholder="Confirm your password"
                            {...formLogin.getInputProps('confirmPassword')}
                            leftSection={<IconBrandSamsungpass size={18} />}
                            withVisibilityToggle
                            classNames={{
                                wrapper: cx('text-wrapper'),
                                input: cx('input'),
                                section: cx('section'),
                                label: cx('label'),
                                error: cx('error'),
                            }}
                        />

                        <div className={cx('checkbox')}>
                            <Checkbox
                                key={formLogin.key.agree}
                                {...formLogin.getInputProps('agree', { type: 'checkbox' })}
                                label={
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
                                classNames={{
                                    input: cx('checkbox-input'),
                                    label: cx('checkbox-label'),
                                    inner: cx('checkbox-inner'),
                                    icon: cx('checkbox-icon'),
                                    body: cx('checkbox-body'),
                                    error: cx('error'),
                                }}
                            />
                        </div>

                        <Button fullWidth size="md" classNames={{ root: cx('root-submit-btn') }} type="submit">
                            Create account
                        </Button>

                        <div className={cx('login')}>
                            <p className={cx('description')}>
                                Already have an account?{' '}
                                <span>
                                    <Link to="/login" className={cx('link')}>
                                        Log in
                                    </Link>
                                </span>
                            </p>
                        </div>
                    </form>

                    <div className={cx('social-media')}>
                        <div className={cx('content')}>
                            {/* <hr className={cx('divider')} /> */}
                            <p className={cx('description')}>Or continue with</p>
                        </div>

                        <GoogleLoginButton />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
