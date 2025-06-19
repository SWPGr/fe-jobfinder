import { useState } from 'react';
import Tippy from '@tippyjs/react/headless'; // different import path!
import classNames from 'classnames/bind';
import styles from './NotificationButton.module.scss';
import { IconBellRinging } from '@tabler/icons-react';

import PopperWrapper from '../Popper/Wrapper';
import NotificationItem from '../NotificationItem/NotificationItem.js';

const cx = classNames.bind(styles);

function NotificationButton() {
    let [visible, setVisible] = useState(false);

    return (
        <Tippy
            delay={[0, 700]}
            visible={visible}
            interactive
            offset={[200, 8]}
            placement="bottom-end"
            onClickOutside={() => setVisible(false)}
            render={(attrs) => {
                return (
                    <div className={cx('notification-list')} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('notification-popper')}>
                            <h4 className={cx('notification-title')}>Notifications</h4>
                            <div className={cx('notifications')}>
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                                <NotificationItem />
                            </div>
                        </PopperWrapper>
                    </div>
                );
            }}
        >
            <div
                className={cx('notification', {
                    'notification-active': visible,
                })}
                onClick={() => setVisible(!visible)}
            >
                <IconBellRinging size={24} />
                <span className={cx('badge')}></span>
            </div>
        </Tippy>
    );
}

export default NotificationButton;
