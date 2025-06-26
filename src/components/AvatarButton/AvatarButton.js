import { useState } from 'react';
import { Avatar, Title } from '@mantine/core';
import { IconChevronDown, IconSettingsFilled, IconArrowAutofitRightFilled } from '@tabler/icons-react';
import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';

import Menu from '~/components/Popper/Menu';
import { useAuth } from '~/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function AvatarButton({ avatar }) {
    let [visible, setVisible] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const MENU_ITEMS = [
        {
            title: 'Settings',
            iconLeft: <IconSettingsFilled />,
            iconRight: null,
            to: '/profile',
            separate: false,
        },
        {
            title: 'Logout',
            iconLeft: <IconArrowAutofitRightFilled />,
            iconRight: null,
            separate: true,
            onClick: () => {
                console.log('Logout clicked');
                logout();
                navigate('/');
            },
        },
    ];

    return (
        <>
            <Menu visible={visible} items={MENU_ITEMS} onClickOutside={() => setVisible(false)}>
                <div className={cx('avatar-button')}>
                    <Avatar
                        src={avatar}
                        alt="avatar"
                        onClick={() => {
                            console.log('click');
                            console.log('visible', visible);

                            setVisible(!visible);
                        }}
                        // radius={'xl'}
                        // size={'lg'}
                        classNames={{ root: cx('avatar') }}
                    />
                    <IconChevronDown className={cx('icon')} onClick={() => setVisible(!visible)} />
                </div>
            </Menu>
        </>
    );
}

export default AvatarButton;
