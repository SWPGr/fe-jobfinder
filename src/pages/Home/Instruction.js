import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { ThemeIcon } from '@mantine/core';
import { IconUserPlus, IconCloudUp, IconReportSearch, IconCircleDashedCheck } from '@tabler/icons-react';
import { motion } from 'framer-motion'; // ✅ Thêm vào

import { Icons } from '~/assets';

const cx = classNames.bind(styles);

// Khai báo animation variants
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: 'easeOut',
        },
    }),
};

function Instruction() {
    const items = [
        {
            icon: <IconUserPlus />,
            title: 'Create an account',
            desc: 'Sign up to create your profile and start exploring job opportunities.',
        },
        {
            icon: <IconCloudUp />,
            title: 'Upload your resume',
            desc: 'Upload your resume to showcase your skills and experience.',
        },
        {
            icon: <IconReportSearch />,
            title: 'Find your dream job',
            desc: 'Browse through a wide range of job opportunities and apply for your dream role.',
        },
        {
            icon: <IconCircleDashedCheck />,
            title: 'Get your dream job',
            desc: 'Once you find the perfect job, apply and get your dream job.',
        },
    ];

    return (
        <div className={cx('instruction__wrapper')}>
            <div className={cx('instruction__container')}>
                <h1 className={cx('instruction__title')}>How JobFinder Work</h1>
                <div className={cx('instruction__content')}>
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            className={cx('instruction__item')}
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: i * 0.2 + 0.1, duration: 0.4, ease: 'easeOut' }}
                            >
                                <ThemeIcon className={cx('root_instruction__item')}>{item.icon}</ThemeIcon>
                            </motion.div>

                            <div className={cx('instruction-item__title')}>{item.title}</div>
                            <p className={cx('instruction-item__description')}>{item.desc}</p>
                        </motion.div>
                    ))}
                    <span className={cx('arrow-icon-1')}>
                        <Icons.CurvedArrowDown />
                    </span>
                    <span className={cx('arrow-icon-2')}>
                        <Icons.CurvedArrowUp />
                    </span>
                    <span className={cx('arrow-icon-3')}>
                        <Icons.CurvedArrowDown />
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Instruction;
