import React from 'react';
import classNames from 'classnames/bind';
import styles from './AdminTable.module.scss';

const cx = classNames.bind(styles);

const AdminTable = ({
    title,
    data,
    columns,
    loading = false,
    searchValue = '',
    onSearchChange,
    filters = [],
    onFilterChange,
    onExport,
    pagination,
    onPageChange,
    actions = [],
    bulkActions = [],
    selectedItems = [],
    onSelectionChange,
    emptyMessage = 'No data available'
}) => {
    return (
        <div className={cx('admin-table-container')}>
            {/* Table Header */}
            <div className={cx('table-header')}>
                <div className={cx('header-left')}>
                    <h2 className={cx('table-title')}>{title}</h2>
                    {selectedItems.length > 0 && (
                        <span className={cx('selected-count')}>
                            {selectedItems.length} selected
                        </span>
                    )}
                </div>

                <div className={cx('header-actions')}>
                    {/* Search */}
                    <div className={cx('search-box')}>
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchValue}
                            onChange={(e) => onSearchChange?.(e.target.value)}
                            className={cx('search-input')}
                        />
                    </div>

                    {/* Filters */}
                    {filters.length > 0 && (
                        <div className={cx('filter-dropdown')}>
                            <select
                                className={cx('filter-select')}
                                onChange={(e) => onFilterChange?.(e.target.value)}
                            >
                                <option value="">All</option>
                                {filters.map((filter) => (
                                    <option key={filter.value} value={filter.value}>
                                        {filter.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Export Button */}
                    {onExport && (
                        <button
                            onClick={onExport}
                            className={cx('action-button', 'export')}
                        >
                            Export
                        </button>
                    )}

                    {/* Bulk Actions */}
                    {bulkActions.length > 0 && selectedItems.length > 0 && (
                        <div className={cx('bulk-actions')}>
                            {bulkActions.map((action) => (
                                <button
                                    key={action.key}
                                    onClick={() => action.onClick(selectedItems)}
                                    className={cx('action-button', action.variant || 'secondary')}
                                >
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Table Content */}
            <div className={cx('table-wrapper')}>
                {loading ? (
                    <div className={cx('loading-state')}>
                        <div className={cx('loading-spinner')}></div>
                        <p>Loading...</p>
                    </div>
                ) : (
                    <table className={cx('admin-table')}>
                        <thead>
                            <tr>
                                {/* Checkbox for bulk selection */}
                                {bulkActions.length > 0 && (
                                    <th className={cx('checkbox-header')}>
                                        <input
                                            type="checkbox"
                                            checked={selectedItems.length === data.length && data.length > 0}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    onSelectionChange?.(data.map(item => item.id));
                                                } else {
                                                    onSelectionChange?.([]);
                                                }
                                            }}
                                            className={cx('checkbox')}
                                        />
                                    </th>
                                )}

                                {columns.map((column) => (
                                    <th key={column.key} className={cx('table-header-cell')}>
                                        {column.label}
                                    </th>
                                ))}

                                {actions.length > 0 && (
                                    <th className={cx('actions-header')}>Actions</th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length + (bulkActions.length > 0 ? 1 : 0) + (actions.length > 0 ? 1 : 0)}
                                        className={cx('empty-state')}
                                    >
                                        <div className={cx('empty-content')}>
                                            <p>{emptyMessage}</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                data.map((row, index) => (
                                    <tr key={row.id || index} className={cx('table-row')}>
                                        {/* Checkbox for row selection */}
                                        {bulkActions.length > 0 && (
                                            <td className={cx('checkbox-cell')}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedItems.includes(row.id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            onSelectionChange?.([...selectedItems, row.id]);
                                                        } else {
                                                            onSelectionChange?.(selectedItems.filter(id => id !== row.id));
                                                        }
                                                    }}
                                                    className={cx('checkbox')}
                                                />
                                            </td>
                                        )}

                                        {columns.map((column) => (
                                            <td key={column.key} className={cx('table-cell')}>
                                                {column.render ? column.render(row[column.key], row) : row[column.key]}
                                            </td>
                                        ))}

                                        {actions.length > 0 && (
                                            <td className={cx('actions-cell')}>
                                                <div className={cx('actions-dropdown')}>
                                                    <button className={cx('actions-trigger')}>
                                                        ⋯
                                                    </button>
                                                    <div className={cx('actions-menu')}>
                                                        {actions.map((action) => {
                                                            // Check if action should be shown
                                                            if (action.show && !action.show(row)) {
                                                                return null;
                                                            }
                                                            return (
                                                                <button
                                                                    key={action.key}
                                                                    onClick={() => action.onClick(row)}
                                                                    className={cx('action-item', action.variant)}
                                                                >
                                                                    {action.label}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            {pagination && (
                <div className={cx('pagination-wrapper')}>
                    <div className={cx('pagination-info')}>
                        Showing {pagination.from} to {pagination.to} of {pagination.total} results
                    </div>
                    <div className={cx('pagination-controls')}>
                        <button
                            onClick={() => onPageChange?.(pagination.currentPage - 1)}
                            disabled={pagination.currentPage <= 1}
                            className={cx('pagination-button')}
                        >
                            Previous
                        </button>
                        <span className={cx('pagination-current')}>
                            Page {pagination.currentPage} of {pagination.totalPages}
                        </span>
                        <button
                            onClick={() => onPageChange?.(pagination.currentPage + 1)}
                            disabled={pagination.currentPage >= pagination.totalPages}
                            className={cx('pagination-button')}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTable; 