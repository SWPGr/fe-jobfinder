import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './PlansBilling.module.scss';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePickerInput } from '@mantine/dates';

import Payment from '../Payment/Payment';
import { useParams } from 'react-router-dom';
import { paymentService } from '~/services';

const cx = classNames.bind(styles);

const PlansBilling = () => {
    const [showPayment, setShowPayment] = useState(false);
    const [subscription, setSubscription] = useState([]);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const { item } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const [pagination, setPagination] = useState(null);

    const form = useForm({
        initialValues: {
            paymentStatus: 'SUCCESS',
            pageNumber: Number(searchParams.get('pageNumber')) || 1,
            fromDate: searchParams.get('fromDate') || '',
            toDate: searchParams.get('toDate') || '',
        },
    });

    const [value, setValue] = useState([form.values.fromDate, form.values.toDate]);

    useEffect(() => {
        const fetchSubscription = async () => {
            const response = await paymentService.getAllSubscriptionPlans();
            setSubscription(response.result || []);
        };
        fetchSubscription();
    }, []);

    // ✅ Sync form.values → searchParams
    useEffect(() => {
        const entries = Object.entries(form.values).filter(([_, v]) => v !== '' && v !== null && v !== undefined);
        setSearchParams(entries);
    }, [form.values, searchParams]);

    // ✅ Fetch data khi searchParams đổi
    useEffect(() => {
        const fetchPaymentHistory = async () => {
            const params = Object.fromEntries(searchParams.entries());
            const response = await paymentService.getAllPayments(params);
            if (response?.code === 200) {
                const { pageNumber, pageSize, totalElements, totalPages, content } = response.result;
                setPagination({ pageNumber, pageSize, totalElements, totalPages });
                setPaymentHistory(content || []);
            }
        };
        fetchPaymentHistory();
    }, [searchParams]);

    useEffect(() => {
        const y = item === 'payment-history' ? 'pagination' : item;
        const el = document.getElementById(y);
        if (el) {
            const y = el.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: y - 50, behavior: 'smooth' });
        }
    }, [item]);

    const handelDateChange = (dates) => {
        setValue(dates);
        form.setFieldValue('fromDate', dates?.[0] || '');
        form.setFieldValue('toDate', dates?.[1] || '');
        form.setFieldValue('pageNumber', 1); // reset về trang 1 khi filter
    };

    const handlePageChange = (page) => {
        form.setFieldValue('pageNumber', page);
    };

    const formatTime = (date) => {
        const formatted = new Date(date).toLocaleString('en-US', {
            timeZone: 'Asia/Ho_Chi_Minh',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
        return formatted.replace(',', '');
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
                <div className={cx('invoice-header')}>
                    <h3>Latest Invoices</h3>
                    <div className={cx('filter-section')}>
                        <DatePickerInput
                            type="range"
                            label="Pick dates range"
                            size="xl"
                            placeholder="Pick dates range"
                            value={value}
                            onChange={handelDateChange}
                            popoverProps={{
                                position: 'bottom-end',
                                offset: 8,
                                withArrow: true,
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

                <div className={cx('pagination')} id="pagination">
                    <Pagination
                        total={pagination?.totalPages || 1}
                        value={form.values.pageNumber}
                        onChange={handlePageChange}
                        radius="xl"
                        classNames={{ root: cx('pagination-root'), control: cx('control') }}
                    />
                </div>
            </div>

            {showPayment && <Payment onClose={() => setShowPayment(false)} />}
        </div>
    );
};

export default PlansBilling;
