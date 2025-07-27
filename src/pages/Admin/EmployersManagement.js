import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './JobTableManagement.module.scss';
import statisticsService from '~/services/statisticsService';
import { Combobox, useCombobox } from '@mantine/core';
import JobDetail from '~/pages/JobDetail/JobDetail';
import { Pagination } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import { UserSearchFilters } from '~/components';

const cx = classNames.bind(styles);

const sortColumns = [
    { key: 'id', label: 'ID' },
    { key: 'fullName', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'location', label: 'Location' },
    { key: 'phone', label: 'Phone' },
    { key: 'createdAt', label: 'Joined' },
    { key: 'isPremium', label: 'Premium' },
    { key: 'active', label: 'Active' },
];

const EmployerRowDropdown = ({ onAction, employerId }) => {
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
                    <Combobox.Option value="block" className={cx('dropdownItem', 'dropdownItem--block')}>
                        Block
                    </Combobox.Option>
                    <Combobox.Option value="view" className={cx('dropdownItem')}>
                        View
                    </Combobox.Option>
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
            if (window.confirm(`Bạn có chắc muốn chặn nhà tuyển dụng ${employer.fullName || 'ID ' + employerId}?`)) {
                try {
                    await statisticsService.blockEmployer(employerId);
                    setEmployers((prevEmployers) =>
                        prevEmployers.map((emp) =>
                            emp.id === employerId ? { ...emp, isBlocked: true, active: false } : emp,
                        ),
                    );
                    fetchEmployers();
                    console.log('Employer blocked successfully');
                } catch (err) {
                    console.error('Lỗi khi chặn nhà tuyển dụng:', err);
                    alert(`Không thể chặn nhà tuyển dụng. Lỗi: ${err.message || 'Không xác định'}`);
                }
            }
        } else if (action === 'view') {
            setSelectedEmployer(employer);
            setIsModalOpen(true);
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

    if (error) return <div className={cx('error')}>{error}</div>;

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={cx('managementWrapper')}>
            <div className={cx('jobs-header')}>
                <div className={cx('title')}>Employers Management</div>
            </div>
            {/* Thanh filter ngang hiện đại, giống trang Jobs */}
            <UserSearchFilters type="EMPLOYER" />

            {/* Bảng employers và các phần còn lại giữ nguyên */}
            <div className={cx('tableWrapper')}>
                <table className={cx('dataTable')}>
                    <thead>
                        <tr>
                            {sortColumns.map((col) => (
                                <th key={col.key}>{col.label}</th>
                            ))}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {employers.length > 0 && employers.map((employer, index) => (
                            <tr key={employer.id || index}>
                                <td>{employer.id}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className={cx('avatarCircle')}>{getInitials(employer.fullName)}</div>
                                        <span>{employer.fullName || 'Unknown'}</span>
                                    </div>
                                </td>
                                <td>{employer.email}</td>
                                <td>{employer.location || '--'}</td>
                                <td>{employer.phone || '--'}</td>
                                <td>{employer.createdAt ? employer.createdAt.slice(5, 10) : '--'}</td>
                                <td>
                                    <span
                                        className={cx(
                                            'statusText',
                                            employer.isPremium === true ? 'active' : 'inactive',
                                        )}
                                    >
                                        {employer.isPremium === true ? 'Premium' : 'Normal'}
                                    </span>
                                </td>
                                <td>
                                    <span
                                        className={cx('statusText', employer.active === true ? 'active' : 'inactive')}
                                    >
                                        {employer.active === true ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <EmployerRowDropdown
                                        onAction={(action) => handleAction(action, employer.id)}
                                        employerId={employer.id}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/*  */}
            <div className={cx('pagination')}>
                <Pagination
                    total={totalPages}
                    value={Number(searchParams.get('page')) || 1}
                    onChange={handlePageChange}
                    radius="xl"
                    classNames={{ root: cx('pagination-root'), control: cx('control') }}
                />
            </div>
            {/*  */}
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
                                overview: {
                                    posted: selectedEmployer.createdAt?.slice(0, 10) || 'N/A',
                                    expire: 'N/A',
                                    education: 'N/A',
                                    salary: 'N/A',
                                    location: selectedEmployer.location || 'N/A',
                                    jobType: 'N/A',
                                    experience: 'N/A',
                                    vacancy: 'N/A',
                                    jobLevel: selectedEmployer.isPremium ? 'Premium' : 'Normal',
                                },
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
