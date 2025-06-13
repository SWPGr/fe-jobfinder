import React from 'react';
import classNames from 'classnames/bind';
import styles from './ItemInfo.module.scss';
import { ThemeIcon } from '@mantine/core';
import { IconPhoto } from '@tabler/icons-react';

const cx = classNames.bind(styles);

function ItemInfo({ icon = <IconPhoto />, title, description, onClick, className }) {
    return (
        <div className={cx('wrapper', { [className]: className })}>
            <ThemeIcon classNames={{ root: cx('root') }}>
                {/* Render icon được truyền vào với className riêng */}
                {icon && React.cloneElement(icon, { className: cx('icon') })}
            </ThemeIcon>
            <div className={cx('content')}>
                <p
                    className={cx('title', {
                        pointer: onClick,
                    })}
                    onClick={onClick}
                >
                    {title}
                </p>
                <p className={cx('description')}>{description}</p>
            </div>
        </div>
    );
}

export default ItemInfo;
