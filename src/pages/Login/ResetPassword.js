import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classNames from 'classnames/bind';

import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function ResetPassword({
    children,
    content,
    title,

    className,

    ...props
}) {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <div className="popup">
            <Modal
                opened={opened}
                onClose={close}
                title={title}
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
                {children}
            </Modal>

            <Button variant="subtle" onClick={open} classNames={{ root: cx('root-btn'), inner: cx('inner-btn') }}>
                {content}
            </Button>
        </div>
    );
}

export default ResetPassword;
