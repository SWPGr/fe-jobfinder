import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './PaymentManagement.module.scss';
import statisticsService from '~/services/statisticsService';
import { Pagination } from '@mantine/core';
import { AdminHeader, AdminTable, StatusBadge, QuickStats } from './components';

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

    // New state for AdminTable
    const [searchValue, setSearchValue] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

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

    // Quick stats data for the new QuickStats component
    const quickStatsData = [
        {
            value: paymentStats.currentMonthTotalRevenue ? convertVNDtoUSD(paymentStats.currentMonthTotalRevenue) : 0,
            label: 'Total Revenue',
            trend: paymentStats.revenueChangePercentage || 0,
            format: 'currency',
            description: 'Revenue this month'
        },
        {
            value: paymentStats.currentMonthTotalPaidPayments || 0,
            label: 'Successful Payments',
            trend: paymentStats.paidPaymentsChangePercentage || 0,
            format: 'number',
            description: 'Completed payments this month'
        },
        {
            value: paymentStats.currentMonthTotalPendingPayments || 0,
            label: 'Pending Payments',
            trend: paymentStats.pendingPaymentsChangePercentage || 0,
            format: 'number',
            description: 'Pending payments this month'
        }
    ];

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

    // Table columns configuration for AdminTable
    const columns = [
        {
            key: 'id',
            label: 'ID',
            render: (value) => `#${value}`
        },
        {
            key: 'paidAt',
            label: 'Date',
            render: (value) => value ? new Date(value).toLocaleString() : '--'
        },
        {
            key: 'userEmail',
            label: 'Customer',
            render: (value, row) => (
                <div className={cx('customer-info')}>
                    <div className={cx('avatarCircle', 'blue')}>
                        {value ? value.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div className={cx('customer-details')}>
                        <div className={cx('customer-name')}>{value || '--'}</div>
                    </div>
                </div>
            )
        },
        {
            key: 'intendedPlanName',
            label: 'Type',
            render: (value, row) => value || row.paymentMethod || '--'
        },
        {
            key: 'amount',
            label: 'Amount',
            render: (value) => value ? formatUSD(convertVNDtoUSD(value)) : '--'
        },
        {
            key: 'payosStatus',
            label: 'Status',
            render: (value) => <StatusBadge status={value?.toLowerCase()} size="small" />
        }
    ];

    // Actions configuration for AdminTable
    const actions = [
        {
            key: 'view',
            label: 'View Details',
            onClick: (row) => {
                console.log('View payment details:', row);
            }
        }
    ];

    // Filter options
    const filters = [
        { value: 'PENDING', label: 'Pending' },
        { value: 'SUCCESS', label: 'Successful' },
        { value: 'FAILED', label: 'Failed' }
    ];

    return (
        <div className={cx('managementWrapper')}>
            {/* New AdminHeader component */}
            <AdminHeader
                title="Payment Management"
                subtitle="Track and manage all payment transactions on your platform"
                breadcrumbs={['Management', 'Payments']}
                stats={[
                    { value: payments.length, label: 'Total Transactions' },
                    { value: payments.filter(p => p.payosStatus === 'SUCCESS').length, label: 'Successful' },
                    { value: payments.filter(p => p.payosStatus === 'PENDING').length, label: 'Pending' }
                ]}
            />

            {/* New QuickStats component */}
            <QuickStats stats={quickStatsData} />

            {/* New AdminTable component */}
            <AdminTable
                title="Payment Transactions"
                data={payments}
                columns={columns}
                loading={loading}
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                filters={filters}
                onFilterChange={(value) => {
                    // Implement filter logic here
                    console.log('Filter changed:', value);
                }}
                onExport={() => {
                    // Implement export logic here
                    console.log('Export clicked');
                }}
                pagination={{
                    currentPage: page,
                    totalPages: totalPages,
                    from: 1,
                    to: payments.length,
                    total: payments.length
                }}
                onPageChange={setPage}
                actions={actions}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
                emptyMessage="No payment transactions found"
            />
        </div>
    );
};

export default PaymentManagement;
