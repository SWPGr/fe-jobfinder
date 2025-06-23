import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobTableManagement.module.scss';
import { Filter, MoreHorizontal, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { useJobSeekers } from '~/context/JobSeekerContext';

const cx = classNames.bind(styles);

const JobSeekersManagement = () => {
    const { jobSeekers, loading, error, reloadJobSeekers } = useJobSeekers();
    const [sortConfig, setSortConfig] = React.useState(null);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedJobSeekers = React.useMemo(() => {
        const arr = [...jobSeekers];
        if (!sortConfig) return arr;
        return arr.sort((a, b) => {
            if ((a[sortConfig.key] || '') < (b[sortConfig.key] || '')) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if ((a[sortConfig.key] || '') > (b[sortConfig.key] || '')) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }, [jobSeekers, sortConfig]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className={cx('managementWrapper')}>
            <div className={cx('headerRow')}>
                <h2>Job Seekers</h2>
                <div className={cx('actionGroup')}>
                    <button onClick={reloadJobSeekers} className={cx('btn')} title="Reload list">
                        <RotateCcw size={18} /> Reload
                    </button>
                    <button className={cx('btn')}>
                        <Filter size={18} /> Filters
                    </button>
                    <button className={cx('btn', 'primary')}>Add Seeker</button>
                </div>
            </div>
            <div className={cx('tableWrapper')}>
                <table className={cx('dataTable')}>
                    <thead>
                        <tr>
                            <th className={cx('sortable')} onClick={() => requestSort('id')}>
                                ID
                                {sortConfig?.key === 'id' ? (
                                    sortConfig.direction === 'ascending' ? (
                                        <ChevronUp size={14} />
                                    ) : (
                                        <ChevronDown size={14} />
                                    )
                                ) : null}
                            </th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Location</th>
                            <th>Joined</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedJobSeekers.map((seeker) => (
                            <tr key={seeker.id}>
                                <td>{seeker.id}</td>
                                <td>{seeker.fullName || '--'}</td>
                                <td>{seeker.email}</td>
                                <td>{seeker.phone || '--'}</td>
                                <td>{seeker.location || '--'}</td>
                                <td>{seeker.createdAt?.slice(0, 10)}</td>
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
