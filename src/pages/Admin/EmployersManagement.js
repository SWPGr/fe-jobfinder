import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './JobTableManagement.module.scss';
import { Search } from 'lucide-react';
import statisticsService from '~/services/statisticsService';
import { Combobox, useCombobox } from '@mantine/core';
import JobDetail from '~/pages/JobDetail/JobDetail'; // Reuse JobDetail for view

const cx = classNames.bind(styles);

const sortColumns = [
    { key: 'id', label: 'ID' },
    { key: 'fullName', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'location', label: 'Location' },
    { key: 'phone', label: 'Phone' },
    { key: 'createdAt', label: 'Joined' },
    { key: 'isPremium', label: 'Premium' },
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
                <Combobox.Option value="delete" className={cx('dropdownItem', 'dropdownItem--delete')}>
                    Delete
                </Combobox.Option>
                <Combobox.Option value="view" className={cx('dropdownItem')}>
                    View
                </Combobox.Option>
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
    const [search, setSearch] = useState('');
    const [visibleEmployers, setVisibleEmployers] = useState(10);
    const [selectedEmployer, setSelectedEmployer] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch employers
    const fetchEmployers = useCallback(async () => {
        try {
            const data = await statisticsService.fetchAllEmployers();
            setEmployers(data || []);
        } catch (err) {
            setError(err.message || 'Failed to fetch employers');
        }
    }, []);

    useEffect(() => {
        fetchEmployers();
    }, [fetchEmployers]);

    const handleAction = (action, employerId) => {
        const employer = employers.find((e) => e.id === employerId);
        if (action === 'delete') {
            console.log(`Deleting employer ${employerId}`);
            if (
                window.confirm(`Are you sure you want to delete employer ${employer.fullName || 'ID ' + employerId}?`)
            ) {
                setEmployers((prevEmployers) => prevEmployers.filter((employer) => employer.id !== employerId));
            }
        } else if (action === 'view') {
            console.log(`Viewing employer ${employerId}`);
            setSelectedEmployer(employer);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEmployer(null);
    };

    const loadMoreEmployers = () => {
        setVisibleEmployers((prev) => prev + 10);
    };

    // Filter by search
    const filteredEmployers = useMemo(() => {
        if (!search) return employers;
        const s = search.toLowerCase();
        return employers.filter(
            (employer) =>
                employer.fullName?.toLowerCase().includes(s) ||
                employer.email?.toLowerCase().includes(s) ||
                employer.location?.toLowerCase().includes(s) ||
                employer.phone?.toLowerCase().includes(s),
        );
    }, [employers, search]);

    const employersToDisplay = filteredEmployers.slice(0, visibleEmployers);

    if (error) return <div className={cx('error')}>{error}</div>;

    return (
        <div className={cx('managementWrapper')}>
            <div className={cx('jobs-header')}>
                <h1 className={cx('title')}>Employers Management</h1>
            </div>
            <div className={cx('toolbar')}>
                <div className={cx('search-box')}>
                    <Search className={cx('search-icon')} />
                    <input
                        placeholder="Search employers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className={cx('toolbar-actions')}>
                    <button className={cx('primary')}>Add Employer</button>
                </div>
            </div>
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
                        {employersToDisplay.map((employer, index) => (
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
                                <td>{employer.createdAt?.slice(0, 10) || '--'}</td>
                                <td>
                                    <span className={premiumClass(employer.isPremium)}>
                                        {employer.isPremium === true ? 'Premium' : 'Normal'}
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
                {filteredEmployers.length > visibleEmployers && (
                    <div className={cx('load-more')}>
                        <button onClick={loadMoreEmployers}>Load More</button>
                    </div>
                )}
            </div>
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
                                minSalary: '0', // Employers don't have salary
                                maxSalary: '0',
                                salaryType: 'N/A',
                                education: 'N/A',
                                experience: 'N/A',
                                jobType: 'N/A',
                                vacancies: 'N/A',
                                expirationDate: 'N/A',
                                jobLevel: selectedEmployer.isPremium ? 'Premium' : 'Normal',
                                contactUrl: selectedEmployer.website || 'N/A',
                                phone: selectedEmployer.phone || 'N/A',
                                email: selectedEmployer.email || 'N/A',
                                jobDescription: `<p>Details for employer ${
                                    selectedEmployer.fullName || 'ID ' + selectedEmployer.id
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
                                    vacancies: 'N/A',
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
                            }}
                            editable={false} // No edit functionality for employers
                            onCancel={closeModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployersManagement;
