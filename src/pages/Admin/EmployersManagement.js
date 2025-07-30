import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './JobTableManagement.module.scss';
import statisticsService from '~/services/statisticsService';
import { Combobox, useCombobox } from '@mantine/core';
import JobDetail from '~/pages/JobDetail/JobDetail';
import { Pagination } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { UserSearchFilters } from '~/components';
import useNotification from '~/hooks/userNotification';
import { AdminHeader, AdminTable, StatusBadge } from './components';

const cx = classNames.bind(styles);

const EmployerRowDropdown = ({ onAction, employerId, isActive }) => {
    const combobox = useCombobox();
    return (
        <Combobox
            store={combobox}
            withinPortal
            offset={0}
            onOptionSubmit={(val) => {
                onAction(val, employerId);
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <button
                    type="button"
                    className={cx('iconBtn')}
                    style={{
                        minWidth: 0,
                        minHeight: 0,
                        padding: 0,
                        background: 'none',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
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

// Safe initials function
const getInitials = (name) => {
    if (!name || typeof name !== 'string') return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0] ? parts[0][0].toUpperCase() : '';
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const premiumClass = (isPremium) => (isPremium === true ? cx('statusText', 'active') : cx('statusText', 'inactive'));

const EmployersManagement = () => {
    const [employers, setEmployers] = useState([]);
    const [error, setError] = useState('');
    const [selectedEmployer, setSelectedEmployer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [totalHits, setTotalHits] = useState(1);
    const totalPages = Math.ceil(totalHits / 10);
    const [searchParams, setSearchParams] = useSearchParams();
    const { showSuccess, showError } = useNotification();

    // New state for AdminTable
    const [searchValue, setSearchValue] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

    // Fetch employers
    useEffect(() => {
        const fetchEmployers = async () => {
            setLoading(true);
            try {
                const data = await statisticsService.fetchAllEmployers();
                setEmployers(data || []);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message || 'Failed to fetch employers');
            }
        }
        fetchEmployers();
    }, [searchParams]);

    const handleAction = async (action, employerId) => {
        const employer = employers.find((e) => e.id === employerId);
        if (action === 'block') {
            setEmployers((prevEmployers) =>
                prevEmployers.map((emp) =>
                    emp.id === employerId ? { ...emp, isBlocked: true, active: false } : emp,
                ),
            );
            try {
                await statisticsService.blockEmployer(employerId);
                showSuccess('Blocked successfully');
                console.log('Employer blocked successfully');
            } catch (err) {
                setEmployers((prevEmployers) =>
                    prevEmployers.map((emp) =>
                        emp.id === employerId ? { ...emp, isBlocked: false, active: true } : emp,
                    ),
                );
                showError(`Failed to block: ${err.message || 'Unknown error'}`);
            }
        } else if (action === 'unblock') {
            setEmployers((prevEmployers) =>
                prevEmployers.map((emp) =>
                    emp.id === employerId ? { ...emp, isBlocked: false, active: true } : emp,
                ),
            );
            try {
                await statisticsService.unblockEmployer(employerId);
                showSuccess('Unblocked successfully');
                console.log('Employer unblocked successfully');
            } catch (err) {
                setEmployers((prevEmployers) =>
                    prevEmployers.map((emp) =>
                        emp.id === employerId ? { ...emp, isBlocked: true, active: false } : emp,
                    ),
                );
                showError(`Failed to unblock: ${err.message || 'Unknown error'}`);
            }
        }
    };

    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page);
        setSearchParams(params);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEmployer(null);
    };

    // Table columns configuration for AdminTable
    const columns = [
        {
            key: 'id',
            label: 'ID',
            render: (value) => value
        },
        {
            key: 'fullName',
            label: 'Name',
            render: (value, row) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={cx('avatarCircle')}>{getInitials(row.fullName)}</div>
                    <span>{row.fullName || 'Unknown'}</span>
                </div>
            )
        },
        {
            key: 'email',
            label: 'Email',
            render: (value) => value
        },
        {
            key: 'location',
            label: 'Location',
            render: (value) => value || '--'
        },
        {
            key: 'phone',
            label: 'Phone',
            render: (value) => value || '--'
        },
        {
            key: 'createdAt',
            label: 'Joined',
            render: (value) => value ? value.slice(0, 10).split('-').reverse().join('/') : '--'
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
                setSelectedEmployer(row);
                setIsModalOpen(true);
            }
        },
        {
            key: 'block',
            label: 'Block Employer',
            variant: 'danger',
            onClick: (row) => handleAction('block', row.id),
            show: (row) => row.active === true
        },
        {
            key: 'unblock',
            label: 'Unblock Employer',
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
        <div className={cx('managementWrapper')}>
            {/* New AdminHeader component */}
            <AdminHeader
                title="Employers Management"
                subtitle="Manage and monitor all employers on your platform"
                breadcrumbs={['Management', 'Employers']}
                stats={[
                    { value: employers.length, label: 'Total Employers' },
                    { value: employers.filter(e => e.active).length, label: 'Active Employers' },
                    { value: employers.filter(e => e.isPremium).length, label: 'Premium Employers' }
                ]}
            />

            {/* New AdminTable component */}
            <AdminTable
                title="Employers"
                data={employers}
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
                    to: employers.length,
                    total: totalHits
                }}
                onPageChange={handlePageChange}
                actions={actions}
                bulkActions={bulkActions}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
                emptyMessage="No employers found"
            />

            {/* Modal */}
            {isModalOpen && selectedEmployer && (
                <div className={cx('modalOverlay')}>
                    <div className={cx('modalBox')}>
                        <button className={cx('closeBtn')} onClick={closeModal} aria-label="Close modal">
                            ✕
                        </button>
                        <JobDetail
                            job={{
                                id: selectedEmployer.id,
                                jobTitle: selectedEmployer.fullName || 'Unknown Employer',
                                tags: 'Employer, Management',
                                jobRole: selectedEmployer.isPremium ? 'Premium' : 'Normal',
                                badges: { featured: false, fulltime: 'N/A' },
                                minSalary: '0',
                                maxSalary: '0',
                                salaryType: 'N/A',
                                education: 'N/A',
                                experience: 'N/A',
                                jobType: 'N/A',
                                vacancy: selectedEmployer.vacancy || 'N/A',
                                expirationDate: 'N/A',
                                jobLevel: selectedEmployer.isPremium ? 'Premium' : 'Normal',
                                contactUrl: selectedEmployer.website || 'N/A',
                                phone: selectedEmployer.phone || 'N/A',
                                email: selectedEmployer.email || 'N/A',
                                jobDescription: `<p>Details for employer ${selectedEmployer.fullName || 'ID ' + selectedEmployer.id
                                    }</p>`,
                                responsibilities: '<ul><li>Manage company operations</li></ul>',

                                company: {
                                    name: selectedEmployer.fullName || 'N/A',
                                    description: 'N/A',
                                    founded: 'N/A',
                                    organization: 'N/A',
                                    size: 'N/A',
                                    phone: selectedEmployer.phone || 'N/A',
                                    email: selectedEmployer.email || 'N/A',
                                    website: selectedEmployer.website || 'N/A',
                                },
                                active: selectedEmployer.active,
                            }}
                            editable={false}
                            onCancel={closeModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployersManagement;
