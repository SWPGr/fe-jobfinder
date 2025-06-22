import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { useState } from 'react';
import { IconMail, IconBrandSamsungpass, IconEyeOff, IconEye } from '@tabler/icons-react';
import { Checkbox, TextInput, ActionIcon, Radio, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import { useForm } from '@mantine/form';

import GoogleLoginButton from '~/components/GoogleLoginButton';
import { LeftSideLogin } from '../components';
import { Button } from '~/components';
// popup phần chính sách bảo mật
import { validator } from '~/utils';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { useNotification } from '~/hooks';

const cx = classNames.bind(styles);

function Register() {
    const formRegister = useForm({
        initialValues: {
            // firstName: '',
            // lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            userRole: 'JOB_SEEKER', // ban đầu chưa chọn
            agree: false,
        },
        validate: {
            // firstName: (value) => (value.trim().length > 0 ? null : 'First name is required'),
            // lastName: (value) => (value.trim().length > 0 ? null : 'Last name is required'),
            email: (value) => validator.validateEmail(value),
            password: (value) => validator.validatePassword(value),
            confirmPassword: (value, values) => validator.validateConfirmPassword(value, values.password),
            userRole: (value) => (value ? null : 'Please select your role'),
            agree: (value) => (value ? null : 'You must agree to terms'),
        },
    });

    const { register } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle password visibility
    const { showError, showSuccess } = useNotification();

    const handleSubmitForm = async (values) => {
        console.log('Form submitted:', values);

        const data = await register(values.email, values.password, values.userRole);
        console.log('Response data:', data);

        if (data.success) {
            window.location.href = '/login';
            showSuccess('Login successful!');
        } else {
            showError(data.message);
            // setError(data.message);
        }
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

                    <form className={cx('form')} onSubmit={formRegister.onSubmit(handleSubmitForm)}>
                        <TextInput
                            label="Email address"
                            placeholder="you@example.com"
                            {...formRegister.getInputProps('email')}
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
                            {...formRegister.getInputProps('password')}
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
                            type={showConfirmPassword ? 'text' : 'password'}
                            label="Confirm password"
                            placeholder="Confirm your password"
                            {...formRegister.getInputProps('confirmPassword')}
                            leftSection={<IconBrandSamsungpass size={18} />}
                            withVisibilityToggle
                            rightSection={
                                <ActionIcon
                                    variant="light"
                                    aria-label="Settings"
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

                        {/* USER ROLE */}
                        <div className={'user-role'}>
                            <Radio.Group
                                name="userRole"
                                label="You are "
                                withAsterisk
                                {...formRegister.getInputProps('userRole')}
                                classNames={{
                                    label: cx('group-label'),
                                    error: cx('error'),
                                }}
                            >
                                <Group>
                                    <Radio
                                        value="JOB_SEEKER"
                                        label="Applicant"
                                        size="md"
                                        classNames={{
                                            radio: cx('radio'),
                                            icon: cx('radio-icon'),
                                            body: cx('radio-body'),
                                            inner: cx('radio-inner'),
                                            label: cx('radio-label'),
                                        }}
                                    />
                                    <Radio
                                        value="EMPLOYER"
                                        label="Employer"
                                        size="md"
                                        classNames={{
                                            radio: cx('radio'),
                                            icon: cx('radio-icon'),
                                            body: cx('radio-body'),
                                            inner: cx('radio-inner'),
                                            label: cx('radio-label'),
                                        }}
                                    />
                                </Group>
                            </Radio.Group>
                        </div>

                        <div className={cx('checkbox')}>
                            <Checkbox
                                key={formRegister.key.agree}
                                {...formRegister.getInputProps('agree', { type: 'checkbox' })}
                                label={
                                    <>
                                        I agree to the{' '}
                                        <Link to="/service-and-policy" className={cx('link')}>
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link to="/service-and-policy" className={cx('link')}>
                                            Privacy Policy
                                        </Link>
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

                        {/* Submit button */}
                        <div className={cx('btn-submit')}>
                            <Button type="submit" className={cx('submit')}>
                                Create account
                            </Button>
                        </div>

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

                        <GoogleLoginButton
                            mode="register"
                            role={formRegister.values.userRole}
                            disabled={!formRegister.values.userRole}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
