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

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!form.message.trim()) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        setResult('Sending...');

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append('access_key', '8d38fd21-fa88-4c36-820f-ef3a39c3b284');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            if (data.success) {
                setResult('✅ Message sent successfully!');
                setSubmitted(true);
                setForm({ name: '', email: '', subject: '', message: '' });
            } else {
                setResult(`❌ ${data.message}`);
            }
        } catch (error) {
            console.error(error);
            setResult('❌ Error sending message. Please try again later.');
        }

        setLoading(false);
        setTimeout(() => {
            setSubmitted(false);
            setResult('');
        }, 4000);
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
                    {submitted ? (
                        <div className={cx('thankYouMessage')}>
                            <h2>🎉 Thank you for your feedback!</h2>
                            <p>We really appreciate you taking the time to reach out to us.</p>
                        </div>
                    ) : (
                        <form className={cx('form')} onSubmit={handleSubmit} autoComplete="off">
                            <div className={cx('grid-row')}>
                                <div>
                                    <input
                                        className={cx('input')}
                                        name="name"
                                        placeholder="Name"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <div className={cx('error')}>{errors.name}</div>}
                                </div>
                                <div>
                                    <input
                                        className={cx('input')}
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <div className={cx('error')}>{errors.email}</div>}
                                </div>
                            </div>
                            <input
                                className={cx('input')}
                                name="subject"
                                placeholder="Subject"
                                value={form.subject}
                                onChange={handleChange}
                            />
                            <div>
                                <textarea
                                    className={cx('textarea')}
                                    name="message"
                                    placeholder="Message"
                                    value={form.message}
                                    onChange={handleChange}
                                />
                                {errors.message && <div className={cx('error')}>{errors.message}</div>}
                            </div>

                            <button type="submit" className={cx('send-btn')} disabled={loading}>
                                {loading ? 'Sending...' : 'Send Message'}
                                {!loading && <span className={cx('icon-paper-plane')} />}
                            </button>

                            {result && <div className={cx('result', { success: submitted, error: !submitted })}>{result}</div>}
                        </form>
                    )}

                </div>
            </div>
        </div>
    );
}
