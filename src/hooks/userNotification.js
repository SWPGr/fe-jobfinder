// useNotification.js
import { notifications } from '@mantine/notifications';
import { IconCheck, IconInfoCircle, IconExclamationCircle, IconX } from '@tabler/icons-react';

const useNotification = () => {
    const defaultOptions = {
        autoClose: 3000,
        withCloseButton: true,
        position: 'top-right',
        title: 'Default Notification',
        message: 'You have a new notification!',
    };

    const showNotification = (options) => {
        notifications.show({
            ...defaultOptions,
            ...options,
        });
    };

    // Hàm cho thông báo thành công
    const showSuccess = (message, title = 'Success') => {
        showNotification({
            message,
            title,
            color: 'green',
            icon: <IconCheck size={18} />,
        });
    };

    // Hàm cho thông báo thông tin
    const showInfo = (message, title = 'Info') => {
        showNotification({
            message,
            title,
            color: 'blue',
            icon: <IconInfoCircle size={18} />,
        });
    };

    // Hàm cho thông báo cảnh báo
    const showWarning = (message, title = 'Warning') => {
        showNotification({
            message,
            title,
            color: 'yellow',
            icon: <IconExclamationCircle size={18} />,
        });
    };

    // Hàm cho thông báo lỗi
    const showError = (message, title = 'Error') => {
        showNotification({
            message,
            title,
            color: 'red',
            icon: <IconX size={18} />,
        });
    };

    return { showNotification, showSuccess, showInfo, showWarning, showError };
};

export default useNotification;
