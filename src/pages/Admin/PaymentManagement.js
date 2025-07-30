import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './PaymentManagement.module.scss';
import {
    Search,
    CheckCircle2,
    Clock,
    Coins,
} from 'lucide-react';
import statisticsService from '~/services/statisticsService';
import { Pagination } from '@mantine/core';

const cx = classNames.bind(styles);

// Currency conversion service
const convertVNDtoUSD = (vndAmount) => {
    if (!vndAmount || isNaN(vndAmount)) return 0;
    return vndAmount / 25000; // 1 USD = 25,000 VND
};

const formatUSD = (usdAmount) => {
    return `$${usdAmount.toFixed(2)}`;
};

const PaymentManagement = () => {
    // Thay thế dateFilter bằng fromDate, toDate
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [payments, setPayments] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    // Thêm filter FE
    const [searchText, setSearchText] = useState('');
    const [paymentType, setPaymentType] = useState('all');
    const [status, setStatus] = useState('all');

    // Thêm state cho applied filters
    const [appliedFilters, setAppliedFilters] = useState({
        searchText: '',
        paymentType: 'all',
        status: 'all',
        fromDate: '',
        toDate: ''
    });

    // Thêm state cho payment statistics
    const [paymentStats, setPaymentStats] = useState({
        currentMonthTotalRevenue: 0,
        revenueChangePercentage: 0,
        revenueStatus: 'no_change',
        currentMonthTotalPaidPayments: 0,
        paidPaymentsChangePercentage: 0,
        paidPaymentsStatus: 'no_change',
        currentMonthTotalPendingPayments: 0,
        pendingPaymentsChangePercentage: 0,
        pendingPaymentsStatus: 'no_change',
        currentMonthTotalPayments: 0,
        totalPaymentsChangePercentage: 0,
        totalPaymentsStatus: 'no_change'
    });
    const [statsLoading, setStatsLoading] = useState(false);

    useEffect(() => {
        const fetchPayments = async () => {
            setLoading(true);
            try {
                // Chỉ truyền các key có giá trị
                const params = { page: page - 1, size: 10 };
                if (appliedFilters.userEmail) params.userEmail = appliedFilters.userEmail;
                if (appliedFilters.paymentStatus) params.paymentStatus = appliedFilters.paymentStatus;
                if (appliedFilters.fromDate) params.fromDate = appliedFilters.fromDate;
                if (appliedFilters.toDate) params.toDate = appliedFilters.toDate;
                const res = await statisticsService.fetchAllPayments(params);
                setPayments(res.content || []);
                setTotalPages(res.totalPages || 1);
            } catch (err) {
                setPayments([]);
                setTotalPages(1);
            } finally {
                setLoading(false);
            }
        };
        fetchPayments();
    }, [page, appliedFilters]);

    // Fetch payment statistics
    useEffect(() => {
        const fetchPaymentStats = async () => {
            setStatsLoading(true);
            try {
                const stats = await statisticsService.fetchAllPaymentsComparison();
                setPaymentStats(stats || {});
            } catch (err) {
                console.error('Failed to fetch payment stats:', err);
                setPaymentStats({});
            } finally {
                setStatsLoading(false);
            }
        };
        fetchPaymentStats();
    }, []);

    // Khi filter thay đổi, không reset page ngay
    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };
    const handlePaymentTypeChange = (e) => {
        setPaymentType(e.target.value);
    };
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };
    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
    };
    const handleToDateChange = (e) => {
        setToDate(e.target.value);
    };

    // Hàm apply filters
    const handleApplyFilters = () => {
        setAppliedFilters({
            userEmail: searchText, // dùng userEmail cho input search
            paymentStatus: status !== 'all' ? status : undefined, // dùng paymentStatus cho select
            fromDate,
            toDate
        });
        setPage(1); // Reset về trang 1 khi apply filters
    };

    // Hàm clear filters
    const handleClearFilters = () => {
        setSearchText('');
        setPaymentType('all');
        setStatus('all');
        setFromDate('');
        setToDate('');
        setAppliedFilters({
            searchText: '',
            paymentType: 'all',
            status: 'all',
            fromDate: '',
            toDate: ''
        });
        setPage(1);
    };

    return (
        <div className={cx('managementWrapper')}>
            {/* Header */}
            <div className={cx('payment-header')}>
                <div className={cx('title')}>Payment Management</div>
                <p className={cx('description')}>Track and manage all payment transactions on your platform.</p>
            </div>

            {/* Payment Summary Cards */}
            <div className={cx('summary-grid')}>
                {/* Total Revenue Card */}
                <div className={cx('summary-card')}>
                    <div className={cx('card-header')}>
                        <div className={cx('card-icon', 'blue')}>
                            <Coins size={24} className={cx('icon-blue')} />
                        </div>
                        <span className={cx('card-period')}>This Month</span>
                    </div>
                    <h3 className={cx('card-value')}>
                        {statsLoading ? 'Loading...' :
                            paymentStats.currentMonthTotalRevenue ?
                                formatUSD(convertVNDtoUSD(paymentStats.currentMonthTotalRevenue)) :
                                'No data'}
                    </h3>
                    <p className={cx('card-label')}>Total Revenue</p>
                    {paymentStats.revenueChangePercentage !== undefined ? (
                        <div className={cx('card-trend', paymentStats.revenueStatus === 'increase' ? 'up' : paymentStats.revenueStatus === 'decrease' ? 'down' : 'neutral')}>
                            {paymentStats.revenueChangePercentage !== 0 ? (
                                <span className={cx('trend-icon')}>
                                    {paymentStats.revenueStatus === 'increase' ? '↑' : paymentStats.revenueStatus === 'decrease' ? '↓' : ''}
                                </span>
                            ) : null}
                            {paymentStats.revenueChangePercentage > 0 && paymentStats.revenueChangePercentage < 100
                                ? paymentStats.revenueChangePercentage.toFixed(2)
                                : Math.round(paymentStats.revenueChangePercentage)}% from last month
                        </div>
                    ) : (
                        <div className={cx('card-trend', 'neutral')}>
                            <span className={cx('trend-icon')}>→</span>
                            No comparison data
                        </div>
                    )}
                </div>

                {/* Successful Payments Card */}
                <div className={cx('summary-card')}>
                    <div className={cx('card-header')}>
                        <div className={cx('card-icon', 'green')}>
                            <CheckCircle2 size={24} className={cx('icon-green')} />
                        </div>
                        <span className={cx('card-period')}>This Month</span>
                    </div>
                    <h3 className={cx('card-value')}>
                        {statsLoading ? 'Loading...' :
                            paymentStats.currentMonthTotalPaidPayments !== undefined ?
                                paymentStats.currentMonthTotalPaidPayments :
                                'No data'}
                    </h3>
                    <p className={cx('card-label')}>Successful Payments</p>
                    {paymentStats.paidPaymentsChangePercentage !== undefined ? (
                        <div className={cx('card-trend', paymentStats.paidPaymentsStatus === 'increase' ? 'up' : paymentStats.paidPaymentsStatus === 'decrease' ? 'down' : 'neutral')}>
                            {paymentStats.paidPaymentsChangePercentage !== 0 ? (
                                <span className={cx('trend-icon')}>
                                    {paymentStats.paidPaymentsStatus === 'increase' ? '↑' : paymentStats.paidPaymentsStatus === 'decrease' ? '↓' : ''}
                                </span>
                            ) : null}
                            {paymentStats.paidPaymentsChangePercentage > 0 && paymentStats.paidPaymentsChangePercentage < 100
                                ? paymentStats.paidPaymentsChangePercentage.toFixed(2)
                                : Math.round(paymentStats.paidPaymentsChangePercentage)}% from last month
                        </div>
                    ) : (
                        <div className={cx('card-trend', 'neutral')}>
                            <span className={cx('trend-icon')}>→</span>
                            No comparison data
                        </div>
                    )}
                </div>

                {/* Pending Payments Card */}
                <div className={cx('summary-card')}>
                    <div className={cx('card-header')}>
                        <div className={cx('card-icon', 'yellow')}>
                            <Clock size={24} className={cx('icon-yellow')} />
                        </div>
                        <span className={cx('card-period')}>This Month</span>
                    </div>
                    <h3 className={cx('card-value')}>
                        {statsLoading ? 'Loading...' :
                            paymentStats.currentMonthTotalPendingPayments !== undefined ?
                                paymentStats.currentMonthTotalPendingPayments :
                                'No data'}
                    </h3>
                    <p className={cx('card-label')}>Pending Payments</p>
                    {paymentStats.pendingPaymentsChangePercentage !== undefined ? (
                        <div className={cx('card-trend', paymentStats.pendingPaymentsStatus === 'increase' ? 'up' : paymentStats.pendingPaymentsStatus === 'decrease' ? 'down' : 'neutral')}>
                            {paymentStats.pendingPaymentsChangePercentage !== 0 ? (
                                <span className={cx('trend-icon')}>
                                    {paymentStats.pendingPaymentsStatus === 'increase' ? '↑' : paymentStats.pendingPaymentsStatus === 'decrease' ? '↓' : ''}
                                </span>
                            ) : null}
                            {paymentStats.pendingPaymentsChangePercentage > 0 && paymentStats.pendingPaymentsChangePercentage < 100
                                ? paymentStats.pendingPaymentsChangePercentage.toFixed(2)
                                : Math.round(paymentStats.pendingPaymentsChangePercentage)}% from last month
                        </div>
                    ) : (
                        <div className={cx('card-trend', 'neutral')}>
                            <span className={cx('trend-icon')}>→</span>
                            No comparison data
                        </div>
                    )}
                </div>
            </div>

            {/* Chỉ giữ lại filter và transaction table */}
            <div className={cx('toolbar')}>
                <div className={cx('toolbar-filters')}>
                    <div className={cx('search-box')}>
                        <Search className={cx('search-icon')} size={18} />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            className={cx('search-input')}
                            value={searchText}
                            onChange={handleSearchChange}
                        />
                    </div>
                    {/* Thay thế dropdown bằng 2 input date */}
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                            type="date"
                            className={cx('filter-select')}
                            value={fromDate}
                            max={toDate || new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' })}
                            onChange={handleFromDateChange}
                            placeholder="From date"
                            style={{ minWidth: '140px' }}
                        />
                        <span style={{ color: '#666', fontSize: '14px' }}>-</span>
                        <input
                            type="date"
                            className={cx('filter-select')}
                            value={toDate}
                            max={new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Ho_Chi_Minh' })}
                            min={fromDate}
                            onChange={handleToDateChange}
                            placeholder="To date"
                            style={{ minWidth: '140px' }}
                        />
                    </div>

                    <select
                        className={cx('filter-select')}
                        value={status}
                        onChange={handleStatusChange}
                    >
                        <option value="all">All Statuses</option>
                        <option value="PENDING">Pending</option>
                        <option value="SUCCESS">Successful</option>
                        <option value="FAILED">Failed</option>
                    </select>
                </div>

                {/* Filter buttons */}
                <div className={cx('toolbar-actions')}>
                    <button
                        className={cx('action-button', 'primary')}
                        onClick={handleApplyFilters}
                    >
                        Apply Filters
                    </button>
                    <button
                        className={cx('action-button')}
                        onClick={handleClearFilters}
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Transactions Table */}
            <div className={cx('tableWrapper')}>
                {loading ? (
                    <div style={{ padding: 32, textAlign: 'center' }}>Loading...</div>
                ) : (
                    <table className={cx('dataTable')}>
                        <thead className={cx('table-head')}>
                            <tr>
                                <th className={cx('table-header')}>
                                    <div className={cx('header-content')}>
                                        ID

                                    </div>
                                </th>
                                <th className={cx('table-header')}>
                                    <div className={cx('header-content')}>
                                        Date

                                    </div>
                                </th>
                                <th className={cx('table-header')}>Customer</th>
                                <th className={cx('table-header')}>Type</th>
                                <th className={cx('table-header')}>
                                    <div className={cx('header-content')}>
                                        Amount

                                    </div>
                                </th>
                                <th className={cx('table-header')}>Status</th>
                                <th className={cx('table-header')}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={cx('table-body')}>
                            {payments.length === 0 ? (
                                <tr><td colSpan={7} style={{ textAlign: 'center', padding: 32 }}>No data</td></tr>
                            ) : (
                                payments.map((payment) => (
                                    <tr className={cx('table-row')} key={payment.id}>
                                        <td className={cx('table-cell', 'transaction-id')}>#{payment.id}</td>
                                        <td className={cx('table-cell')}>
                                            {payment.paidAt ? new Date(payment.paidAt).toLocaleString() : '--'}
                                        </td>
                                        <td className={cx('table-cell')}>
                                            <div className={cx('customer-info')}>
                                                <div className={cx('avatarCircle', 'blue')}>
                                                    {payment.userEmail ? payment.userEmail.charAt(0).toUpperCase() : '?'}
                                                </div>
                                                <div className={cx('customer-details')}>
                                                    <div className={cx('customer-name')}>{payment.userEmail || '--'}</div>
                                                    {/* Có thể thêm tên user nếu có */}
                                                </div>
                                            </div>
                                        </td>
                                        <td className={cx('table-cell')}>
                                            {payment.intendedPlanName || payment.paymentMethod || '--'}
                                        </td>
                                        <td className={cx('table-cell')}>
                                            {/* chuyển từ việt nam đồng sang USD */}
                                            {payment.amount ? formatUSD(convertVNDtoUSD(payment.amount)) : '--'}
                                        </td>
                                        <td className={cx('table-cell')}>
                                            <span className={cx('statusText', payment.payosStatus === 'PENDING' ? 'pending' : payment.payosStatus === 'SUCCESS' ? 'success' : payment.payosStatus === 'FAILED' ? 'failed' : '')}>
                                                {payment.payosStatus || '--'}
                                            </span>
                                        </td>
                                        <td className={cx('table-cell', 'actions')}>
                                            <button className={cx('action-button', 'view')}>View</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'center', margin: '32px 0' }}>
                {totalPages > 1 && (
                    <Pagination
                        total={totalPages}
                        value={page}
                        onChange={setPage}
                        radius="xl"
                        classNames={{
                            root: cx('pagination-root'),
                            control: cx('control'),
                            item: cx('pagination-item'),
                            active: cx('pagination-active')
                        }}
                    />
                )}
            </div>
        </div >
    );
};

export default PaymentManagement;
