import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './PlansBilling.module.scss';
import { useSearchParams } from 'react-router-dom';

import Payment from '../Payment/Payment';
import { useParams } from 'react-router-dom';
import { paymentService } from '~/services';
import { useLoading } from '~/context/LoadingContext';

const cx = classNames.bind(styles);

const PlansBilling = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showPayment, setShowPayment] = useState(false);
    const [subscription, setSubscription] = useState([]);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const { item } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = searchParams.get('page') || 1;
    const fromDate = searchParams.get('fromDate') || '';
    const toDate = searchParams.get('toDate') || '';

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setSearchParams({ page });
    };

    useEffect(() => {
        // Giả lập việc lấy dữ liệu từ API
        const fetchSubscription = async () => {
            const response = await paymentService.getAllSubscriptionPlans();
            console.log('response', response);

            setSubscription(response.result || []);
        };

        fetchSubscription();
    }, []);

    useEffect(() => {
        const fetchPaymentHistory = async () => {
            const response = await paymentService.getAllPayments();
            console.log('response', response);
            if (response?.code === 200) {
                setPaymentHistory(response.result || []);
            }
        };

        fetchPaymentHistory();
    }, [page, fromDate, toDate]);

    useEffect(() => {
        if (item) {
            const el = document.getElementById(item);
            if (el) {
                const y = el.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top: y - 50, behavior: 'smooth' });
            }
        }
    }, [item]);

    const formatTime = (date) => {
        const formatted = new Date(date).toLocaleString('en-US', {
            timeZone: 'Asia/Ho_Chi_Minh', // 👈 Giờ Việt Nam
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
        return formatted.replace(',', ''); // Loại bỏ dấu phẩy giữa ngày và giờ
    };

    return (
        <div className={cx('container')}>
            <div className={cx('top-grid')}>
                <div className={cx('box', 'plan-benefits')}>
                    <div id="manage-plans" className={cx('benefits-list-row')}>
                        <Payment items={subscription} onClose={() => setShowPayment(false)} />
                    </div>
                </div>
            </div>
            <div className={cx('latest-invoices')}>
                <h3>Latest Invoices</h3>
                <div className={cx('filter-section')}>
                    <div className={cx('filter-group')}>
                        <label htmlFor="startDate">From Date:</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                                setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc
                            }}
                        />
                    </div>
                    <div className={cx('filter-group')}>
                        <label htmlFor="endDate">To Date:</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => {
                                setEndDate(e.target.value);
                                setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc
                            }}
                        />
                    </div>
                </div>
                <table id="payment-history">
                    <thead>
                        <tr>
                            <th>#ID</th>
                            <th>DATE</th>
                            <th>PLAN</th>
                            <th>AMOUNT</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.length > 0 ? (
                            paymentHistory.map(({ id, paidAt, intendedPlanName, amount }) => (
                                <tr key={id}>
                                    <td>#{id}</td>
                                    <td>{formatTime(paidAt)}</td>
                                    <td>{intendedPlanName}</td>
                                    <td>{amount}</td>
                                    <td>
                                        <button className={cx('download-btn')} title="Download Invoice">
                                            ⬇
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className={cx('no-data-cell')}>
                                    No payment history found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className={cx('pagination')}>
                    <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                        ←
                    </button>
                </div>
            </div>

            {/* Hiển thị modal Payment khi showPayment = true */}
            {showPayment && <Payment onClose={() => setShowPayment(false)} />}
        </div>
    );
};

export default PlansBilling;
