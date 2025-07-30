import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './JobTableManagement.module.scss';
import statisticsService from '~/services/statisticsService';
import { Combobox, useCombobox } from '@mantine/core';
import SeekerDetail from '~/pages/SeekerDetail/SeekerDetail';
import { UserSearchFilters } from '~/components';
import { Pagination } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import useNotification from '~/hooks/userNotification';
import { AdminHeader, AdminTable, StatusBadge } from './components';

const cx = classNames.bind(styles);

const JobSeekerRowDropdown = ({ onAction, seekerId, isActive }) => {
    const combobox = useCombobox();

    return (
        <Combobox
            store={combobox}
            withinPortal
            offset={0}
            onOptionSubmit={(val) => {
                onAction(val, seekerId);
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <button
                    type="button"
                    className={cx('iconBtn')}
                    style={{ background: 'none', border: 'none' }}
                    onClick={() => combobox.toggleDropdown()}
                >
                    <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="#7b809a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="9" cy="9" r="1" />
                        <circle cx="15" cy="9" r="1" />
                        <circle cx="3" cy="9" r="1" />
                    </svg>
                </button>
            </Combobox.Target>
            <Combobox.Dropdown className={cx('dropdownMenu')}>
                <Combobox.Options>
                    {isActive ? (
                        <Combobox.Option value="block" className={cx('dropdownItem', 'dropdownItem--block')}>
                            Block
                        </Combobox.Option>
                    ) : (
                        <Combobox.Option value="unblock" className={cx('dropdownItem', 'dropdownItem--unblock')}>
                            Unblock
                        </Combobox.Option>
                    )}

                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};

const getInitials = (name) => {
    if (!name || typeof name !== 'string') return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || '';
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const premiumClass = (isPremium) => (isPremium === true ? cx('statusText', 'active') : cx('statusText', 'inactive'));

const JobSeekersManagement = () => {
    const [jobSeekers, setJobSeekers] = useState([]);
    const [error, setError] = useState('');
    const [selectedSeeker, setSelectedSeeker] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [totalHits, setTotalHits] = useState(1);
    const totalPages = Math.ceil(totalHits / 10);
    const [searchParams, setSearchParams] = useSearchParams();
    const { showSuccess, showError } = useNotification();

    // New state for AdminTable
    const [searchValue, setSearchValue] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const fetchJobSeekers = async () => {
            setLoading(true);
            try {
                const data = await statisticsService.fetchAllJobSeekers();
                setJobSeekers(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message || 'Failed to fetch job seekers');
            }
        }
        fetchJobSeekers();
    }, [searchParams]);

    const handleAction = async (action, seekerId) => {
        const seeker = jobSeekers.find((s) => s.id === seekerId);
        if (action === 'block') {
            // Optimistic update: cập nhật local state ngay
            setJobSeekers((prevSeekers) =>
                prevSeekers.map((s) => (s.id === seekerId ? { ...s, isBlocked: true, active: false } : s)),
            );
            try {
                await statisticsService.blockJobSeeker(seekerId);
                showSuccess('Blocked successfully');
                console.log('Job seeker blocked successfully');
            } catch (err) {
                // Revert lại nếu lỗi
                setJobSeekers((prevSeekers) =>
                    prevSeekers.map((s) => (s.id === seekerId ? { ...s, isBlocked: false, active: true } : s)),
                );
                showError(`Failed to block: ${err.message || 'Unknown error'}`);
            }
        } else if (action === 'unblock') {
            // Optimistic update: cập nhật local state ngay
            setJobSeekers((prevSeekers) =>
                prevSeekers.map((s) => (s.id === seekerId ? { ...s, isBlocked: false, active: true } : s)),
            );
            try {
                await statisticsService.unblockJobSeeker(seekerId);
                showSuccess('Unblocked successfully');
                console.log('Job seeker unblocked successfully');
            } catch (err) {
                // Revert lại nếu lỗi
                setJobSeekers((prevSeekers) =>
                    prevSeekers.map((s) => (s.id === seekerId ? { ...s, isBlocked: true, active: false } : s)),
                );
                showError(`Failed to unblock: ${err.message || 'Unknown error'}`);
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSeeker(null);
    };
    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page);
        setSearchParams(params);
    };

    // Table columns configuration for AdminTable
    const columns = [
        {
            key: 'fullName',
            label: 'Name',
            render: (value, row) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={cx('company-avatar')}>{getInitials(row.fullName)}</div>
                    <div style={{ marginLeft: 12 }}>
                        <div className={cx('job-title')}>{row.fullName || '--'}</div>
                    </div>
                </div>
            )
        },
        {
            key: 'email',
            label: 'Email',
            render: (value) => value || '--'
        },
        {
            key: 'location',
            label: 'Location',
            render: (value) => value || '--'
        },
        {
            key: 'applications',
            label: 'Applications',
            render: (value) => value ?? 0
        },
        {
            key: 'isPremium',
            label: 'Premium',
            render: (value) => <StatusBadge status={value ? 'premium' : 'normal'} size="small" />
        },
        {
            key: 'active',
            label: 'Status',
            render: (value) => <StatusBadge status={value ? 'active' : 'inactive'} size="small" />
        }
    ];

    // Actions configuration for AdminTable
    const actions = [
        {
            key: 'view',
            label: 'View Details',
            onClick: (row) => {
                setSelectedSeeker(row);
                setIsModalOpen(true);
            }
        },
        {
            key: 'block',
            label: 'Block User',
            variant: 'danger',
            onClick: (row) => handleAction('block', row.id),
            show: (row) => row.active === true
        },
        {
            key: 'unblock',
            label: 'Unblock User',
            variant: 'success',
            onClick: (row) => handleAction('unblock', row.id),
            show: (row) => row.active === false
        }
    ];

    // Bulk actions configuration
    const bulkActions = [
        {
            key: 'block',
            label: 'Block Selected',
            variant: 'danger',
            onClick: (selectedIds) => {
                selectedIds.forEach(id => handleAction('block', id));
            }
        },
        {
            key: 'unblock',
            label: 'Unblock Selected',
            variant: 'success',
            onClick: (selectedIds) => {
                selectedIds.forEach(id => handleAction('unblock', id));
            }
        }
    ];

    // Filter options
    const filters = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
        { value: 'premium', label: 'Premium' },
        { value: 'normal', label: 'Normal' }
    ];

    if (error) return <div className={cx('error')}>{error}</div>;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={cx('jobs-wrapper')}>
            {/* New AdminHeader component */}
            <AdminHeader
                title="Job Seekers Management"
                subtitle="Manage and monitor all job seekers on your platform"
                breadcrumbs={['Management', 'Job Seekers']}
                stats={[
                    { value: jobSeekers.length, label: 'Total Job Seekers' },
                    { value: jobSeekers.filter(s => s.active).length, label: 'Active Users' },
                    { value: jobSeekers.filter(s => s.isPremium).length, label: 'Premium Users' }
                ]}
            />

            {/* New AdminTable component */}
            <AdminTable
                title="Job Seekers"
                data={jobSeekers}
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
                    currentPage: Number(searchParams.get('page')) || 1,
                    totalPages: totalPages,
                    from: 1,
                    to: jobSeekers.length,
                    total: totalHits
                }}
                onPageChange={handlePageChange}
                actions={actions}
                bulkActions={bulkActions}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
                emptyMessage="No job seekers found"
            />

            {/* Modal */}
            {isModalOpen && selectedSeeker && (
                <div className={cx('modalOverlay')}>
                    <div className={cx('modalBox')}>
                        <button className={cx('closeBtn')} onClick={closeModal}>
                            ✕
                        </button>
                        <SeekerDetail applicant={selectedSeeker} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobSeekersManagement;
