import { useState } from 'react';
import { Avatar, Title } from '@mantine/core';
import { IconChevronDown, IconSettingsFilled } from '@tabler/icons-react';
import classNames from 'classnames/bind';
import styles from './Avatar.module.scss';

import Menu from '~/components/Popper/Menu';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        title: 'Settings',
        iconLeft: <IconSettingsFilled />,
        iconRight: null,
        to: '/profile',
        separate: false,
    },
];

function AvatarButton({ avatar }) {
    let [visible, setVisible] = useState(false);

    return (
        <>
            <Menu visible={visible} items={MENU_ITEMS} hideOnClick={true} onClickOutside={() => setVisible(false)}>
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
