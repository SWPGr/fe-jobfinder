import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobTableManagement.module.scss';
import { Filter, MoreHorizontal, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { useEmployers } from '~/context/EmployerContext';

const cx = classNames.bind(styles);

const EmployersManagement = () => {
    const { employers, loading, error, reloadEmployers } = useEmployers();
    const [sortConfig, setSortConfig] = React.useState(null);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedEmployers = React.useMemo(() => {
        const arr = [...employers];
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
    }, [employers, sortConfig]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className={cx('managementWrapper')}>
            <div className={cx('headerRow')}>
                <h2>Employers</h2>
                <div className={cx('actionGroup')}>
                    <button onClick={reloadEmployers} className={cx('btn')} title="Reload list">
                        <RotateCcw size={18} /> Reload
                    </button>
                    <button className={cx('btn')}>
                        <Filter size={18} /> Filters
                    </button>
                    <button className={cx('btn', 'primary')}>Add Employer</button>
                </div>
            </div>
            <div className={cx('tableWrapper')}>
                <table className={cx('dataTable')}>
                    <thead>
                        <tr>
                            <th>#</th>
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
                            <th>Email</th>
                            <th>Location</th>
                            <th>Phone</th>
                            <th>Joined</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedEmployers.map((employer, index) => (
                            <tr key={employer.id || index}>
                                <td>{index + 1}</td>
                                <td>{employer.id}</td>
                                <td>{employer.email}</td>
                                <td>{employer.location || '--'}</td>
                                <td>{employer.phone || '--'}</td>
                                <td>{employer.createdAt?.slice(0, 10)}</td>
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
