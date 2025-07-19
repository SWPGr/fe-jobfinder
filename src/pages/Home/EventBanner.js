// src/pages/Home/EventBanner.jsx
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // 👈 import điều hướng
import banner from '~/assets/Images/Banner.png';

const cx = classNames.bind(styles);

function EventBanner() {
    const navigate = useNavigate(); // 👈 hook điều hướng

    const handleClick = () => {
        navigate('/event-detail'); // 👈 đường dẫn trang mới
    };

    return (
        <motion.div
            className={cx('event-banner')}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
        >
            <img
                src={banner}
                alt="Event Banner"
                className={cx('event-banner__image')}
                onClick={handleClick} // 👈 thêm sự kiện click
                style={{ cursor: 'pointer' }} // 👈 giúp người dùng biết có thể nhấn
            />
        </motion.div>
    );
}

export default EventBanner;
