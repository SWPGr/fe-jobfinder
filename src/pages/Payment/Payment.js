import React from 'react';
import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import { FaCheck, FaArrowRight, FaTimes } from 'react-icons/fa';
import images from '~/assets/Images/1.png';

const cx = classNames.bind(styles);

const Payment = ({ onClose }) => {
    return (
        <div className={cx('modalOverlay')}>
            <div className={cx('modalContent')}>
                {/* <button className={cx('closeBtn')} onClick={onClose}>
          <FaTimes />
        </button> */}
                <img src={images} alt="Job Posting Illustration" className={cx('illustration')} />
                <div className={cx('paymentContainer__title')}>Buy Premium Subscription to Post a Job</div>
                <div className={cx('plans')}>
                    <div className={cx('plan')}>
                        <div className={cx('plan__title')}>BASIC</div>
                        <p className={cx('price')}>$19 /Monthly</p>
                        <ul className={cx('plan__features')}>
                            <li>
                                <FaCheck /> Post 1 Job
                            </li>
                            <li>
                                <FaCheck /> Urgents & Featured Jobs
                            </li>
                            <li>
                                <FaCheck /> Highlights Job with Colors
                            </li>
                            <li>
                                <FaCheck /> Access & Saved 5 Candidates
                            </li>
                            <li>
                                <FaCheck /> 10 Days Resume Visibility
                            </li>
                            <li>
                                <FaCheck /> 24/7 Critical Support
                            </li>
                        </ul>
                        <button>
                            <FaArrowRight /> Choose Plan
                        </button>
                    </div>
                    <div className={cx('plan', 'recommended')}>
                        <div className={cx('plan__title')}>STANDARD</div>
                        <p className={cx('price')}>$39 /Monthly</p>
                        <ul className={cx('plan__features')}>
                            <li>
                                <FaCheck /> 3 Active Jobs
                            </li>
                            <li>
                                <FaCheck /> Urgents & Featured Jobs
                            </li>
                            <li>
                                <FaCheck /> Highlights Job with Colors
                            </li>
                            <li>
                                <FaCheck /> Access & Saved 10 Candidates
                            </li>
                            <li>
                                <FaCheck /> 20 Days Resume Visibility
                            </li>
                            <li>
                                <FaCheck /> 24/7 Critical Support
                            </li>
                        </ul>
                        <span>Recommendation</span>
                        <button>
                            <FaArrowRight /> Choose Plan
                        </button>
                    </div>
                    <div className={cx('plan')}>
                        <div className={cx('plan__title')}>PREMIUM</div>
                        <p className={cx('price')}>$59 /Monthly</p>
                        <ul className={cx('plan__features')}>
                            <li>
                                <FaCheck /> 6 Active Jobs
                            </li>
                            <li>
                                <FaCheck /> Urgents & Featured Jobs
                            </li>
                            <li>
                                <FaCheck /> Highlights Job with Colors
                            </li>
                            <li>
                                <FaCheck /> Access & Saved 20 Candidates
                            </li>
                            <li>
                                <FaCheck /> 30 Days Resume Visibility
                            </li>
                            <li>
                                <FaCheck /> 24/7 Critical Support
                            </li>
                        </ul>
                        <button>
                            <FaArrowRight /> Choose Plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
