import React from 'react';
import classNames from 'classnames/bind';
import styles from './ItemInfo.module.scss';
import { ThemeIcon } from '@mantine/core';
import { IconBriefcase } from '@tabler/icons-react';
import CountUp from 'react-countup';

const cx = classNames.bind(styles);

function ItemInfo({ icon = <IconBriefcase />, title, description, onClick, className }) {
    // Xử lý nếu title là số thì animate, nếu không thì giữ nguyên
    const isNumericTitle = typeof title === 'string' && !isNaN(Number(title.replace(/,/g, '')));
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
                    {isNumericTitle ? (
                        <CountUp start={0} end={Number(title.replace(/,/g, ''))} duration={2} separator="," />
                    ) : (
                        title
                    )}
                </p>
                <p className={cx('description')}>{description}</p>
            </div>
        </div>
    );
}

export default ItemInfo;
