import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FeedBack.module.scss';

const cx = classNames.bind(styles);

export default function FeedBack() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        type: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3500);
    };

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Feed Back</h2>
            <div className={cx('row')}>
                <form className={cx('form')} onSubmit={handleSubmit} autoComplete="off">
                    <div className={cx('group')}>
                        <label className={cx('label')}>Tên của bạn *</label>
                        <input className={cx('input')} name="name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className={cx('group')}>
                        <label className={cx('label')}>Email *</label>
                        <input
                            className={cx('input')}
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={cx('group')}>
                        <label className={cx('label')}>Số điện thoại</label>
                        <input
                            className={cx('input')}
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={cx('group')}>
                        <label className={cx('label')}>Chủ đề *</label>
                        <input
                            className={cx('input')}
                            name="subject"
                            value={form.subject}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={cx('group')}>
                        <label className={cx('label')}>Loại phản hồi *</label>
                        <select className={cx('select')} name="type" value={form.type} onChange={handleChange} required>
                            <option value="">-- Chọn --</option>
                            <option value="ask">Hỏi đáp</option>
                            <option value="bug">Báo lỗi</option>
                            <option value="cooperation">Hợp tác</option>
                            <option value="suggest">Góp ý</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>
                    <div className={cx('group')}>
                        <label className={cx('label')}>Nội dung phản hồi *</label>
                        <textarea
                            className={cx('textarea')}
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            rows={4}
                        />
                    </div>
                    <button type="submit" className={cx('button')}>
                        Gửi phản hồi
                    </button>
                    {submitted && (
                        <div className={cx('success')}>Cảm ơn bạn! Chúng tôi đã nhận được phản hồi của bạn.</div>
                    )}
                </form>

                {/* Info */}
                <div className={cx('info')}>
                    <h4 className={cx('infoTitle')}>Thông tin liên hệ</h4>
                    <div className={cx('infoContent')}>
                        <div>
                            <b>Email:</b> feedback@jobfinder.com
                        </div>
                        <div>
                            <b>Hotline:</b> +1 (123) 456-7890
                        </div>
                        <div>
                            <b>Giờ làm việc:</b> 8:00 - 18:00 (T2-T6)
                        </div>
                        <div>
                            <b>Địa chỉ:</b> 156 Nguyễn Hữu Thọ, Đà Nẵng, Việt Nam
                        </div>
                    </div>
                    <div className={cx('note')}>
                        <b>Lưu ý:</b> Chúng tôi luôn trân trọng mọi ý kiến đóng góp và phản hồi của bạn.
                    </div>
                </div>
            </div>
        </div>
    );
}
