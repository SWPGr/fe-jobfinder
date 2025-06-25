import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobTableManagement.module.scss';
import { Filter, MoreHorizontal, ChevronDown, ChevronUp, RotateCcw, Search } from 'lucide-react';
import statisticsService from '~/services/statisticsService';
const cx = classNames.bind(styles);

const sortColumns = [
    { key: 'fullName', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'skills', label: 'Skills' },
    { key: 'location', label: 'Location' },
    { key: 'applications', label: 'Applications' },
    { key: 'status', label: 'Status' },
    { key: 'createdAt', label: 'Joined' },
];

// SAFER getInitials function
const getInitials = (name) => {
    if (!name || typeof name !== 'string') return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0] ? parts[0][0].toUpperCase() : '';
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const statusClass = (status) =>
    status?.toLowerCase() === 'active' ? cx('statusText', 'active') : cx('statusText', 'inactive');

const JobSeekersManagement = () => {
    const [jobSeekers, setJobSeekers] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [sortConfig, setSortConfig] = React.useState(null);
    const [search, setSearch] = React.useState('');

    // Fetch job seekers
    const fetchJobSeekers = React.useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const data = await statisticsService.fetchAllJobSeekers();
            setJobSeekers(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch job seekers');
        } finally {
            setLoading(false);
        }
    }, []);

    React.useEffect(() => {
        fetchJobSeekers();
    }, [fetchJobSeekers]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Filter by search
    const filteredJobSeekers = React.useMemo(() => {
        if (!search) return jobSeekers;
        const s = search.toLowerCase();
        return jobSeekers.filter(
            (seeker) =>
                seeker.fullName?.toLowerCase().includes(s) ||
                seeker.email?.toLowerCase().includes(s) ||
                seeker.location?.toLowerCase().includes(s),
        );
    }, [jobSeekers, search]);

    // Sort
    const sortedJobSeekers = React.useMemo(() => {
        const arr = [...filteredJobSeekers];
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
    }, [filteredJobSeekers, sortConfig]);

    if (loading) return <div className={cx('loading')}>Loading...</div>;
    if (error) return <div className={cx('error')}>{error}</div>;

    return (
        <div className={cx('managementWrapper')}>
            <div className={cx('headerRow')}>
                <h2>Job Seekers</h2>
                <div className={cx('actionGroup')}>
                    <button onClick={fetchJobSeekers} className={cx('btn')} title="Reload list">
                        <RotateCcw size={18} /> Reload
                    </button>
                    {/* <button className={cx('btn')}>
                        <Filter size={18} /> Filters
                    </button> */}
                    <button className={cx('btn', 'primary')}>Add Job Seeker</button>
                </div>
            </div>
            <div className={cx('searchBar')}>
                <Search size={18} style={{ marginRight: 8, opacity: 0.7 }} />
                <input
                    type="text"
                    placeholder="Search job seekers..."
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
                        {sortedJobSeekers.map((seeker, idx) => (
                            <tr key={seeker.id || idx}>
                                {/* Name with avatar */}
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className={cx('avatarCircle')}>{getInitials(seeker.fullName)}</div>
                                        <span>{seeker.fullName || '--'}</span>
                                    </div>
                                </td>
                                <td>{seeker.email}</td>
                                {/* Skills as tags */}
                                <td>
                                    {(seeker.skills || []).map((skill, i) => (
                                        <span key={i} className={cx('skillTag')}>
                                            {skill}
                                        </span>
                                    ))}
                                </td>
                                <td>{seeker.location || '--'}</td>
                                <td>{seeker.applications ?? 0}</td>
                                {/* Status badge */}
                                <td>
                                    <span className={statusClass(seeker.status)}>{seeker.status || 'Inactive'}</span>
                                </td>
                                <td>{seeker.createdAt?.slice(0, 10) || '--'}</td>
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

export default JobSeekersManagement;
