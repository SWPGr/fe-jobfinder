import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './JobTableManagement.module.scss';
import statisticsService from '~/services/statisticsService';
import { useDebounce } from '~/hooks'; // Ensure you have the useDebounce hook
import { Combobox, useCombobox } from '@mantine/core';
const cx = classNames.bind(styles);

const sortColumns = [
    { key: 'fullName', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'skills', label: 'Skills' },
    { key: 'location', label: 'Location' },
    { key: 'applications', label: 'Applications' },
    { key: 'isPremium', label: 'Premium' },
    { key: 'createdAt', label: 'Joined' },
];
const JobSeekerRowDropdown = ({ onAction }) => {
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

const getInitials = (name) => {
    if (!name || typeof name !== 'string') return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0] ? parts[0][0].toUpperCase() : '';
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const premiumClass = (isPremium) => (isPremium === true ? cx('statusText', 'active') : cx('statusText', 'inactive'));

const JobSeekersManagement = () => {
    const [jobSeekers, setJobSeekers] = useState([]);
    const [error, setError] = useState('');
    const [sortConfig, setSortConfig] = useState(null);
    const [search, setSearch] = useState('');

    // Debounce the search value (500ms delay)
    const dataSearch = useDebounce(search, 500);

    const handleAction = (action, jobId) => {
        if (action === 'edit') {
            console.log(`Editing job ${jobId}`);
        } else if (action === 'archive') {
            console.log(`Archiving job ${jobId}`);
        } else if (action === 'share') {
            console.log(`Sharing job ${jobId}`);
        }
    };
    // Fetch job seekers based on search query
    const fetchJobSeekers = useCallback(async (searchQuery) => {
        setError('');
        try {
            const data = await statisticsService.fetchAllJobSeekers(searchQuery); // Pass searchQuery to API
            setJobSeekers(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch job seekers');
        }
    }, []); // Không cần thêm dataSearch vào dependency của useCallback

    // Fetch job seekers whenever the search value changes (debounced)
    useEffect(() => {
        if (dataSearch === '') {
            fetchJobSeekers(''); // Fetch all job seekers when search is empty
        } else {
            fetchJobSeekers(dataSearch); // Fetch filtered job seekers based on searchQuery
        }
    }, [dataSearch, fetchJobSeekers]); // Trigger effect when dataSearch changes

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedJobSeekers = useMemo(() => {
        const arr = [...jobSeekers];
        if (!sortConfig) return arr;
        return arr.sort((a, b) => {
            let aVal = a[sortConfig.key];
            let bVal = b[sortConfig.key];
            if (Array.isArray(aVal)) aVal = aVal.join(', ');
            if (Array.isArray(bVal)) bVal = bVal.join(', ');
            aVal = (aVal || '').toString().toLowerCase();
            bVal = (bVal || '').toString().toLowerCase();
            if (aVal < bVal) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        });
    }, [jobSeekers, sortConfig]);

    if (error) return <div className={cx('error')}>{error}</div>;

    return (
        <div className={cx('jobs-wrapper')}>
            <div className={cx('jobs-header')}>
                <h1 className={cx('title')}>Job Seekers Management</h1>
            </div>

            <div className={cx('jobs-toolbar')}>
                <div className={cx('search-box')}>
                    <Search className={cx('search-icon')} />
                    <input
                        type="text"
                        placeholder="Search job seekers..."
                        value={search} // Bind the input to search state
                        onChange={(e) => setSearch(e.target.value)} // Directly update search state
                    />
                </div>
                <div className={cx('toolbar-actions')}>
                    <button className={cx('primary')}>+ Add New Job Seeker</button>
                </div>
            </div>
            <div className={cx('jobs-table-wrapper')}>
                <table className={cx('jobs-table')}>
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
                        {sortedJobSeekers.map((seeker, idx) => (
                            <tr key={seeker.id || idx}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className={cx('company-avatar')}>{getInitials(seeker.fullName)}</div>
                                        <div style={{ marginLeft: 12 }}>
                                            <div className={cx('job-title')}>{seeker.fullName || '--'}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{seeker.email || '--'}</td>
                                <td>{seeker.skills?.join(', ') || '--'}</td>
                                <td>{seeker.location || '--'}</td>
                                <td>{seeker.applications ?? 0}</td>
                                <td>
                                    <span className={premiumClass(seeker.isPremium)}>
                                        {seeker.isPremium === true ? 'Premium' : 'Normal'}
                                    </span>
                                </td>
                                <td>{seeker.createdAt?.slice(0, 10) || '--'}</td>
                                <td>
                                    <JobSeekerRowDropdown onAction={(action) => handleAction(action, seeker.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default JobSeekersManagement;
