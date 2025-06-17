import React from 'react';
import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import { FaCheck, FaArrowRight } from 'react-icons/fa';
import images from '~/assets/Images/1.png';

const cx = classNames.bind(styles);

const Payment = () => {
  return (
    <div className={cx('paymentContainer')}>
      <img src={images} alt="Job Posting Illustration" className={cx('illustration')} />
      <h2>Buy Premium Subscription to Post a Job</h2>
      <p>
        Donec eu dui ut dolor commodo ornare. Sed ac libero, malesuada quis
        justo sit amet, varius tempor neque. Quisque ultricies mi sed lorem
        condimentum, vel tempus lectus ultricies.
      </p>
      <div className={cx('plans')}>
        <div className={cx('plan')}>
          <h3>BASIC</h3>
          <p className={cx('price')}>$19 /Monthly</p>
          <ul>
            <li><FaCheck /> Post 1 Job</li>
            <li><FaCheck /> Urgents & Featured Jobs</li>
            <li><FaCheck /> Highlights Job with Colors</li>
            <li><FaCheck /> Access & Saved 5 Candidates</li>
            <li><FaCheck /> 10 Days Resume Visibility</li>
            <li><FaCheck /> 24/7 Critical Support</li>
          </ul>
          <button><FaArrowRight /> Choose Plan</button>
        </div>
        <div className={cx('plan', 'recommended')}>
          <h3>STANDARD</h3>
          <p className={cx('price')}>$39 /Monthly</p>
          <ul>
            <li><FaCheck /> 3 Active Jobs</li>
            <li><FaCheck /> Urgents & Featured Jobs</li>
            <li><FaCheck /> Highlights Job with Colors</li>
            <li><FaCheck /> Access & Saved 10 Candidates</li>
            <li><FaCheck /> 20 Days Resume Visibility</li>
            <li><FaCheck /> 24/7 Critical Support</li>
          </ul>
          <span>Recommendation</span>
          <button><FaArrowRight /> Choose Plan</button>
        </div>
        <div className={cx('plan')}>
          <h3>PREMIUM</h3>
          <p className={cx('price')}>$59 /Monthly</p>
          <ul>
            <li><FaCheck /> 6 Active Jobs</li>
            <li><FaCheck /> Urgents & Featured Jobs</li>
            <li><FaCheck /> Highlights Job with Colors</li>
            <li><FaCheck /> Access & Saved 20 Candidates</li>
            <li><FaCheck /> 30 Days Resume Visibility</li>
            <li><FaCheck /> 24/7 Critical Support</li>
          </ul>
          <button><FaArrowRight /> Choose Plan</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;