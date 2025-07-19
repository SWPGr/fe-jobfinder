import classNames from 'classnames/bind';
import styles from './DashboardOverview.module.scss';
import React, { useEffect } from 'react';
import { useMotionValue, animate, useTransform, motion } from 'motion/react';

const cx = classNames.bind(styles);

export const StatCard = ({ title, value, icon, change, isPositive, desc, status }) => {
    // Biểu tượng tăng/giảm
    const trendIcon = status === 'increase' ? '↑' : status === 'decrease' ? '↓' : '±';

    // Sử dụng motion value cho animation số
    const count = useMotionValue(0);
    const rounded = useTransform(() => Math.round(count.get()));

    useEffect(() => {
        const controls = animate(count, value, { duration: 1 }); // animate từ 0 đến value trong 2 giây
        return () => controls.stop(); // clean up khi unmount
    }, [value]);

    return (
        <div className={cx('statCard')}>
            <div className={cx('statIcon')}>{icon}</div>
            <div className={cx('statTitle')}>{title}</div>

            {/* Animate giá trị */}
            <motion.div className={cx('statValue')}>{rounded}</motion.div>

            <div className={cx('statRow')}>
                <span className={cx('statChange', isPositive ? 'positive' : 'negative')}>
                    {trendIcon} {change}
                </span>
                <span className={cx('statDesc')}>{desc}</span>
            </div>
        </div>
    );
};
