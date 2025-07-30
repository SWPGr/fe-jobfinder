import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Jobs.module.scss';
import { Combobox, useCombobox } from '@mantine/core';
import JobDetail from '~/pages/JobDetail/JobDetail';
import { JobSearchFilters } from '~/components';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@mantine/core';
import statisticsService from '~/services/statisticsService';
import useNotification from '~/hooks/userNotification';
import { AdminHeader, AdminTable, StatusBadge } from '../components';

const cx = classNames.bind(styles);

const JobRowDropdown = ({ onAction, jobId, isActive }) => {
    const combobox = useCombobox();
    return (
        <Combobox
            store={combobox}
            withinPortal
            offset={0}
            onOptionSubmit={(val) => {
                onAction(val, jobId);
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

const Jobs = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [totalHits, setTotalHits] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);

    // New state for AdminTable
    const [searchValue, setSearchValue] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);

    const { showSuccess, showError } = useNotification();

    const handleAction = async (action, jobId) => {
        const job = jobs.find((j) => j.id === jobId);
        if (action === 'block') {
            try {
                await statisticsService.blockJob(jobId);
                showSuccess('Blocked successfully');
                // Refetch jobs to get updated data
                const response = await statisticsService.fetchAllJobsForManagement();
                const jobArray = response?.content || [];
                setJobs(jobArray);
                setTotalHits(response?.totalElements || 0);
                setTotalPages(response?.totalPages || 1);
            } catch (err) {
                showError(`Failed to block: ${err.message || 'Unknown error'}`);
            }
        } else if (action === 'unblock') {
            try {
                await statisticsService.unblockJob(jobId);
                showSuccess('Unblocked successfully');
                // Refetch jobs to get updated data
                const response = await statisticsService.fetchAllJobsForManagement();
                const jobArray = response?.content || [];
                setJobs(jobArray);
                setTotalHits(response?.totalElements || 0);
                setTotalPages(response?.totalPages || 1);
            } catch (err) {
                showError(`Failed to unblock: ${err.message || 'Unknown error'}`);
            }
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
    };

    const handleSave = (updatedJob) => {
        setJobs((prevJobs) => prevJobs.map((j) => (j.id === updatedJob.id ? updatedJob : j)));
        closeModal();
    };

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const response = await statisticsService.fetchAllJobsForManagement({ page, size: 10 });
                const jobArray = response?.content || [];
                setJobs(jobArray);
                setTotalHits(response?.totalElements || 0);
                setTotalPages(response?.totalPages || 1);
            } catch (err) {
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, [page]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page);
        setSearchParams(params);
    };

    // Table columns configuration for AdminTable
    const columns = [
        {
            key: 'title',
            label: 'Job Title',
            render: (value, row) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className={cx('avatarCircle')}>
                        {row.employer?.email?.charAt(0) || 'U'}
                    </div>
                    <div>
                        <div className={cx('job-title')}>{value}</div>
                        <div className={cx('job-company')}>{row.employer?.email}</div>
                    </div>
                </div>
            )
        },
        {
            key: 'location',
            label: 'Location',
            render: (value) => value
        },
        {
            key: 'jobType',
            label: 'Type',
            render: (value) => (
                <span className={cx('job-type')}>
                    {value?.name || '--'}
                </span>
            )
        },
        {
            key: 'salary',
            label: 'Salary Range',
            render: (value, row) => `$${row.salaryMin} - $${row.salaryMax}`
        },
        {
            key: 'jobApplicationCounts',
            label: 'Applicants',
            render: (value) => value || 0
        },
        {
            key: 'active',
            label: 'Status',
            render: (value) => <StatusBadge status={value ? 'active' : 'inactive'} size="small" />
        },
        {
            key: 'createdAt',
            label: 'Posted',
            render: (value) => value ? formatDate(value).split(',')[0] : ''
        }
    ];

    // Actions configuration for AdminTable
    const actions = [
        {
            key: 'view',
            label: 'View Details',
            onClick: (row) => {
                setSelectedJob(row);
                setIsModalOpen(true);
            }
        },
        {
            key: 'block',
            label: 'Block Job',
            variant: 'danger',
            onClick: (row) => handleAction('block', row.id),
            show: (row) => row.active === true
        },
        {
            key: 'unblock',
            label: 'Unblock Job',
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
        { value: 'fulltime', label: 'Full Time' },
        { value: 'parttime', label: 'Part Time' },
        { value: 'contract', label: 'Contract' }
    ];

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={cx('managementWrapper')}>
            {/* New AdminHeader component */}
            <AdminHeader
                title="Jobs Management"
                subtitle="Manage and monitor all job postings on your platform"
                breadcrumbs={['Management', 'Jobs']}
                stats={[
                    { value: jobs.length, label: 'Total Jobs' },
                    { value: jobs.filter(j => j.active).length, label: 'Active Jobs' },
                    { value: jobs.reduce((sum, job) => sum + (job.jobApplicationCounts || 0), 0), label: 'Total Applications' }
                ]}
            />

            {/* New AdminTable component */}
            <AdminTable
                title="Jobs"
                data={jobs}
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
                    currentPage: page,
                    totalPages: totalPages,
                    from: 1,
                    to: jobs.length,
                    total: totalHits
                }}
                onPageChange={setPage}
                actions={actions}
                bulkActions={bulkActions}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
                emptyMessage="No jobs available"
            />

            {/* Modal với JobDetail */}
            {isModalOpen && selectedJob && (
                <div className={cx('modalOverlay')}>
                    <div className={cx('modalBox')}>
                        <button className={cx('closeBtn')} onClick={closeModal}>
                            ×
                        </button>
                        <JobDetail
                            job={{
                                id: selectedJob.id,
                                jobTitle: selectedJob.title,
                                tags: `${selectedJob.title}, ${selectedJob.category?.name || ''}, ${selectedJob.jobLevel?.name || ''
                                    }`,
                                jobRole: selectedJob.jobLevel?.name || 'N/A',
                                badges: { featured: false, fulltime: selectedJob.jobType?.name || 'N/A' },
                                minSalary: selectedJob.salaryMin,
                                maxSalary: selectedJob.salaryMax,
                                salaryType: 'monthly',
                                education: 'N/A',
                                experience: 'N/A',
                                jobType: selectedJob.jobType?.name || 'N/A',
                                vacancy: selectedJob.vacancy,
                                expirationDate: '2025-07-31',
                                jobLevel: selectedJob.jobLevel?.name || 'N/A',
                                contactUrl: selectedJob.employer?.website || 'N/A',
                                phone: selectedJob.employer?.phone || 'N/A',
                                email: selectedJob.employer?.email || 'N/A',
                                jobDescription: selectedJob.description || '<p>No description available</p>',
                                responsibilities: '<ul><li>Manage job responsibilities</li></ul>',

                                company: {
                                    name: selectedJob.employer?.email || 'N/A',
                                    description: 'N/A',
                                    founded: 'N/A',
                                    organization: 'N/A',
                                    size: 'N/A',
                                    phone: selectedJob.employer?.phone || 'N/A',
                                    email: selectedJob.employer?.email || 'N/A',
                                    website: selectedJob.employer?.website || 'N/A',
                                },
                            }}
                            editable={isModalOpen === 'edit'}
                            onSave={handleSave}
                            onCancel={closeModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Jobs;
