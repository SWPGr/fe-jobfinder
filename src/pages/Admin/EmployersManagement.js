import React, { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './JobTableManagement.module.scss';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import statisticsService from '~/services/statisticsService';
import { Combobox, useCombobox } from '@mantine/core';
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
const EmployerRowDropdown = ({ onAction }) => {
    const combobox = useCombobox();
    return (
        <Combobox
            store={combobox}
            withinPortal
            offset={0}
            onOptionSubmit={(val) => {
                onAction(val);
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
                    <Combobox.Option value="edit" className={cx('dropdownItem')}>
                        Edit
                    </Combobox.Option>
                    <Combobox.Option value="archive" className={cx('dropdownItem')}>
                        Archive
                    </Combobox.Option>
                    <Combobox.Option value="share" className={cx('dropdownItem')}>
                        Share
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
    const [sortConfig, setSortConfig] = useState(null);
    const [search, setSearch] = useState('');
    const handleAction = (action, jobId) => {
        if (action === 'edit') {
            console.log(`Editing job ${jobId}`);
        } else if (action === 'archive') {
            console.log(`Archiving job ${jobId}`);
        } else if (action === 'share') {
            console.log(`Sharing job ${jobId}`);
        }
    };
    // Fetch employers
    const fetchEmployers = useCallback(async () => {
        try {
            const data = await statisticsService.fetchAllEmployers();
            setEmployers(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch employers');
        }
    }, []);

    useEffect(() => {
        fetchEmployers();
    }, [fetchEmployers]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Filter by search
    const filteredEmployers = React.useMemo(() => {
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

    const sortedEmployers = useMemo(() => {
        const arr = [...filteredEmployers];
        if (!sortConfig) return arr;
        return arr.sort((a, b) => {
            const aVal = (a[sortConfig.key] || '').toString().toLowerCase();
            const bVal = (b[sortConfig.key] || '').toString().toLowerCase();
            if (aVal < bVal) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        });
    }, [filteredEmployers, sortConfig]);

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
                                <th
                                    key={col.key}
                                    className={cx('sortable', {
                                        sorted: sortConfig?.key === col.key,
                                    })}
                                    onClick={() => requestSort(col.key)}
                                >
                                    {col.label}
                                    {sortConfig?.key === col.key ? (
                                        sortConfig.direction === 'ascending' ? (
                                            <ChevronUp size={14} />
                                        ) : (
                                            <ChevronDown size={14} />
                                        )
                                    ) : null}
                                </th>
                            ))}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedEmployers.map((employer, index) => (
                            <tr key={employer.id || index}>
                                <td>{employer.id}</td>
                                {/* Name with avatar */}
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
                                {/* Status badge */}
                                <td>
                                    <span className={premiumClass(employer.isPremium)}>
                                        {employer.isPremium === true ? 'Premium' : 'Normal'}
                                    </span>
                                </td>
                                <td>
                                    <EmployerRowDropdown onAction={(action) => handleAction(action, employer.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployersManagement;
