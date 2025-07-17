import React from 'react';
import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import { FaCheck, FaArrowRight, FaTimes } from 'react-icons/fa';
import images from '~/assets/Images/1.png';

import { paymentService } from '~/services';
import { useLoading } from '~/context/LoadingContext';

const cx = classNames.bind(styles);

const Payment = ({ items = [], onClose }) => {
    const { showLoading, hideLoading } = useLoading();

    function renderSubscriptionPlan(plan, index) {
        const returnUrl = `${window.location.origin}/`;
        const cancelUrl = `${window.location.origin}/`;
        return (
            <div key={plan.id || index} className={cx('plan', { recommended: index === 1 })}>
                <div className={cx('plan__title')}>{plan.subscriptionPlanName.toUpperCase()}</div>
                <p className={cx('price')}>
                    ${plan.price} /{plan.durationDays} Days
                </p>
                <ul className={cx('plan__features')}>
                    <li>
                        <FaCheck /> Post {plan.maxJobsPost} Job{plan.maxJobsPost > 1 ? 's' : ''}
                    </li>
                    <li>
                        <FaCheck /> Urgents & Featured Jobs
                    </li>
                    <li>
                        <FaCheck /> Highlights Job with Colors: {plan.highlightJobs ? 'Yes' : 'No'}
                    </li>
                    <li>
                        <FaCheck /> Access & Saved {plan.maxApplicationsView} Candidates
                    </li>
                    <li>
                        <FaCheck /> {plan.durationDays} Days Resume Visibility
                    </li>
                    <li>
                        <FaCheck /> 24/7 Critical Support
                    </li>
                </ul>
                {index === 1 && <span>Recommendation</span>}
                <button
                    onClick={() =>
                        handleSubscription({
                            planId: plan.id,
                            returnUrl: returnUrl,
                            cancelUrl: cancelUrl,
                        })
                    }
                >
                    <FaArrowRight /> Choose Plan
                </button>
            </div>
        );
    }
    const handleSubscription = async (data) => {
        try {
            showLoading();
            const response = await paymentService.createPayment(data);
            if (response?.code === 200) {
                window.location.href = response.result.checkoutUrl;
            }
            hideLoading();
        } catch (err) {
            hideLoading();
            console.error('Failed to create premium payment link:', err);
        }
    };

    return (
        <div className={cx('modalOverlay')}>
            <div className={cx('modalContent')}>
                {/* <button className={cx('closeBtn')} onClick={onClose}>
          <FaTimes />
        </button> */}
                <img src={images} alt="Job Posting Illustration" className={cx('illustration')} />
                <div className={cx('paymentContainer__title')}>Buy Premium Subscription to Post a Job</div>
                <div className={cx('plans')}>{items.map((plan, index) => renderSubscriptionPlan(plan, index))}</div>
            </div>
        </div>
    );
};

export default Payment;
