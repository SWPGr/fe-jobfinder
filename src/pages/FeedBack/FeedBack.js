import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FeedBack.module.scss';

const cx = classNames.bind(styles);

export default function FeedBack() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
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
            <div className={cx('container')}>
                <div className={cx('left-info')}>
                    <div className={cx('infoTitle')}>Who we are</div>
                    <div className={cx('headline')}>
                        <span className={cx('highlight-orange')}>We care</span> about
                        <br />
                        customer services
                    </div>
                    <div className={cx('infoContent')}>
                        Want to chat? We’d love to hear from you! Get in touch with our Customer Success Team to inquire
                        about speaking events, advertising rates, or just say hello.
                    </div>
                </div>
                <div className={cx('right-form')}>
                    <div className={cx('formTitle')}>Get in Touch</div>
                    <form className={cx('form')} onSubmit={handleSubmit} autoComplete="off">
                        <div className={cx('grid-row')}>
                            <input
                                className={cx('input')}
                                name="name"
                                placeholder="Name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className={cx('input')}
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <input
                            className={cx('input')}
                            name="subject"
                            placeholder="Subjects"
                            value={form.subject}
                            onChange={handleChange}
                        />
                        <textarea
                            className={cx('textarea')}
                            name="message"
                            placeholder="Message"
                            value={form.message}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className={cx('send-btn')}>
                            Send Message <span className={cx('icon-paper-plane')} />
                        </button>
                        {submitted && <div className={cx('success')}>Thank you! Your message has been sent.</div>}
                    </form>
                </div>
            </div>
        </div>
    );
}
