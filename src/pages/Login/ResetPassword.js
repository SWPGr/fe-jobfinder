import { Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classNames from 'classnames/bind';
import { useForm } from '@mantine/form';

import styles from './Login.module.scss';
import { validator } from '~/utils';
import { Button } from '~/components';

const cx = classNames.bind(styles);

function ResetPassword({
    children,
    content,
    title,

    className,

    ...props
}) {
    const [opened, { open, close }] = useDisclosure(false);
    const formResetPassword = useForm({
        initialValues: {
            email: '',
        },
        validate: {
            email: (value) => validator.validateEmail(value),
        },
    });

    const handleSubmitForm = (values) => {
        console.log('Form submitted:', values);
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
                // closeButtonProps={{
                //     icon: <IconXboxX size={20} stroke={1.5} />,
                // }}
                {...props}
            >
                {/* Nội dung form */}
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
                            <Button yellow disabled={formResetPassword.values.email === ''} className={cx('send-otp')}>
                                Send OTP
                            </Button>
                        }
                    />
                </form>
            </Modal>

            <Button blue_white onClick={open} className={cx('forgot-password')}>
                Forgot your password?
            </Button>
        </div>
    );
}

export default ResetPassword;
