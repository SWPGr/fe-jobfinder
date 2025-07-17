import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './PlansBilling.module.scss';
import Payment from '../Payment/Payment';

import { useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const latestInvoices = [
    { id: '#487441', date: 'Dec 7, 2019 23:26', plan: 'Premium', amount: '$999 USD' },
    { id: '#653518', date: 'Dec 7, 2019 23:26', plan: 'Standard', amount: '$999 USD' },
    { id: '#267400', date: 'Dec 7, 2019 23:26', plan: 'Premium', amount: '$999 USD' },
    { id: '#651535', date: 'Dec 7, 2019 23:26', plan: 'Premium', amount: '$999 USD' },
    { id: '#449003', date: 'Dec 7, 2019 23:26', plan: 'Premium', amount: '$999 USD' },
    { id: '#558612', date: 'Dec 7, 2019 23:26', plan: 'Premium', amount: '$999 USD' },
];

const ITEMS_PER_PAGE = 7;

const PlansBilling = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [showPayment, setShowPayment] = useState(false);
    const { item } = useParams();

    const parseDate = (dateStr) => new Date(dateStr);

    const filteredInvoices = latestInvoices.filter(({ date }) => {
        const invoiceDate = parseDate(date);
        const start = startDate ? parseDate(startDate) : null;
        const end = endDate ? parseDate(endDate) : null;

        if (start && end) return invoiceDate >= start && invoiceDate <= end;
        if (start) return invoiceDate >= start;
        if (end) return invoiceDate <= end;
        return true;
    });

    const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE);

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentInvoices = filteredInvoices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    useEffect(() => {
        if (item) {
            const el = document.getElementById(item);
            if (el) {
                const y = el.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({ top: y - 80, behavior: 'smooth' }); // scroll lệch 80px
            }
        }
    }, [item]);

    return (
        <div className={cx('container')}>
            <div className={cx('top-grid')}>
                <div className={cx('box', 'plan-benefits')}>
                    <div id="manage-plans" className={cx('benefits-list-row')}>
                        <Payment onClose={() => setShowPayment(false)} />
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
                        {currentInvoices.map(({ id, date, plan, amount }) => (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{date}</td>
                                <td>{plan}</td>
                                <td>{amount}</td>
                                <td>
                                    <button className={cx('download-btn')} title="Download Invoice">
                                        ⬇
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className={cx('pagination')}>
                    <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                        ←
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            className={cx({ active: currentPage === i + 1 })}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                        →
                    </button>
                </div>
            </div>

            {/* Hiển thị modal Payment khi showPayment = true */}
            {showPayment && <Payment onClose={() => setShowPayment(false)} />}
        </div>
    );
};

export default PlansBilling;
