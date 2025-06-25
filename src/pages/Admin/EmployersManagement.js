import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobTableManagement.module.scss';
import { Filter, MoreHorizontal, ChevronDown, ChevronUp, RotateCcw, Search } from 'lucide-react';
import statisticsService from '~/services/statisticsService';

const cx = classNames.bind(styles);

const sortColumns = [
    { key: 'id', label: 'ID' },
    { key: 'fullName', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'location', label: 'Location' },
    { key: 'phone', label: 'Phone' },
    { key: 'createdAt', label: 'Joined' },
    { key: 'enabled', label: 'Status' },
];

// Safe initials function
const getInitials = (name) => {
    if (!name || typeof name !== 'string') return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0] ? parts[0][0].toUpperCase() : '';
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const statusClass = (enabled) => (enabled ? cx('statusText', 'active') : cx('statusText', 'inactive'));

const EmployersManagement = () => {
    const [employers, setEmployers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [sortConfig, setSortConfig] = React.useState(null);
    const [search, setSearch] = React.useState('');

    // Fetch employers
    const fetchEmployers = React.useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const data = await statisticsService.fetchAllEmployers();
            setEmployers(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch employers');
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
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

    const sortedEmployers = React.useMemo(() => {
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

    if (loading) return <div className={cx('loading')}>Loading...</div>;
    if (error) return <div className={cx('error')}>{error}</div>;

    return (
        <div className={cx('managementWrapper')}>
            <div className={cx('headerRow')}>
                <h2>Employers</h2>
                <div className={cx('actionGroup')}>
                    <button onClick={fetchEmployers} className={cx('btn')} title="Reload list">
                        <RotateCcw size={18} /> Reload
                    </button>
                    {/* <button className={cx('btn')}>
                        <Filter size={18} /> Filters
                    </button> */}
                    <button className={cx('btn', 'primary')}>Add Employer</button>
                </div>
            </div>

            <div className={cx('searchBar')}>
                <Search size={18} style={{ marginRight: 8, opacity: 0.7 }} />
                <input
                    type="text"
                    placeholder="Search employers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
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
                                    <span className={statusClass(employer.enabled)}>
                                        {employer.enabled ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <button className={cx('iconBtn')}>
                                        <MoreHorizontal size={18} />
                                    </button>
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
