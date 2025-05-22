import classNames from 'classnames/bind';
import styles from './Error.module.scss';
import { HomeIcon, RefreshCwIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
const cs = classNames.bind(styles);

function ErrorPage() {
    return (
        <div className={cs('error-container')}>
            <div className={cs('error-content')}>
                <div className={cs('error-circle-container')}>
                    <div className={cs('error-circle-pulse')}></div>
                    <div className={cs('error-circle-inner')}>
                        <h1 className={cs('error-404')}>404</h1>
                    </div>
                </div>
                <h2 className={cs('error-title')}>Rất tiếc! Trang không tồn tại</h2>
                <p className={cs('error-message')}>
                    Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng.
                </p>
                <div className={cs('error-buttons')}>
                    <Link to={'/'} className={cs('button-primary')}>
                        <HomeIcon size={20} />
                        <span>Về trang chủ</span>
                    </Link>
                    <Link className={cs('button-secondary')}>
                        <RefreshCwIcon size={20} />
                        <span>Tải lại trang</span>
                    </Link>
                </div>
                <div className={cs('error-footer')}>
                    <p>Nếu bạn cho rằng đây là lỗi, vui lòng liên hệ với chúng tôi.</p>
                    <p>Mã lỗi: 404 | Trang không tìm thấy</p>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
