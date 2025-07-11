import React, { useCallback, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './JobTableManagement.module.scss';
import statisticsService from '~/services/statisticsService';
import { useDebounce } from '~/hooks';
import { Combobox, useCombobox } from '@mantine/core';
import JobDetail from '~/pages/JobDetail/JobDetail'; // Reuse JobDetail for view

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

const JobSeekerRowDropdown = ({ onAction, seekerId }) => {
    const combobox = useCombobox();
    return (
        <Combobox
            store={combobox}
            withinPortal
            offset={0}
            onOptionSubmit={(val) => {
                onAction(val, seekerId);
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
                    <Combobox.Option value="delete" className={cx('dropdownItem', 'dropdownItem--delete')}>
                        Delete
                    </Combobox.Option>
                    <Combobox.Option value="view" className={cx('dropdownItem')}>
                        View
                    </Combobox.Option>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};

const getInitials = (name) => {
    //lấy chữ cái đầu tiên trong tên người dùng
    if (!name || typeof name !== 'string') return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0] ? parts[0][0].toUpperCase() : '';
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const premiumClass = (isPremium) => (isPremium === true ? cx('statusText', 'active') : cx('statusText', 'inactive'));

const JobSeekersManagement = () => {
    const [jobSeekers, setJobSeekers] = useState([]);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [visibleSeekers, setVisibleSeekers] = useState(10);
    const [selectedSeeker, setSelectedSeeker] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Debounce the search value (500ms delay) -> chưa xong đang chờ BE
    const dataSearch = useDebounce(search, 500);

    // Fetch job seekers based on search query
    const fetchJobSeekers = useCallback(async (searchQuery) => {
        setError('');
        try {
            const data = await statisticsService.fetchAllJobSeekers(searchQuery);
            setJobSeekers(data || []);
        } catch (err) {
            setError(err.message || 'Failed to fetch job seekers');
        }
    }, []);

    // Fetch job seekers whenever the search value changes (debounced)
    useEffect(() => {
        if (dataSearch === '') {
            fetchJobSeekers('');
        } else {
            fetchJobSeekers(dataSearch);
        }
    }, [dataSearch, fetchJobSeekers]);

    const handleAction = (action, seekerId) => {
        const seeker = jobSeekers.find((s) => s.id === seekerId);
        if (action === 'delete') {
            console.log(`Deleting job seeker ${seekerId}`);
            if (window.confirm(`Are you sure you want to delete job seeker ${seeker.fullName || 'ID ' + seekerId}?`)) {
                setJobSeekers((prevSeekers) => prevSeekers.filter((seeker) => seeker.id !== seekerId));
            }
        } else if (action === 'view') {
            console.log(`Viewing job seeker ${seekerId}`);
            setSelectedSeeker(seeker);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSeeker(null);
    };

    const loadMoreSeekers = () => {
        setVisibleSeekers((prev) => prev + 10);
    };

    const seekersToDisplay = jobSeekers.slice(0, visibleSeekers);

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
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
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
                                <th key={col.key}>{col.label}</th>
                            ))}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {seekersToDisplay.map((seeker, idx) => (
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
                                    <JobSeekerRowDropdown
                                        onAction={(action) => handleAction(action, seeker.id)}
                                        seekerId={seeker.id}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {jobSeekers.length > visibleSeekers && (
                    <div className={cx('load-more')}>
                        <button onClick={loadMoreSeekers}>Load More</button>
                    </div>
                )}
            </div>
            {isModalOpen && selectedSeeker && (
                <div className={cx('modalOverlay')}>
                    <div className={cx('modalBox')}>
                        <button className={cx('closeBtn')} onClick={closeModal} aria-label="Close modal">
                            ✕
                        </button>
                        <JobDetail
                            job={{
                                id: selectedSeeker.id,
                                jobTitle: selectedSeeker.fullName || 'Unknown Job Seeker',
                                tags: `Job Seeker, ${selectedSeeker.skills?.join(', ') || 'Skills'}`,
                                jobRole: selectedSeeker.isPremium ? 'Premium' : 'Normal',
                                badges: { featured: false, fulltime: 'N/A' },
                                minSalary: '0', // Job seekers don't have salary
                                maxSalary: '0',
                                salaryType: 'N/A',
                                education: 'N/A',
                                experience: 'N/A',
                                jobType: 'N/A',
                                vacancies: selectedSeeker.applications ?? '0',
                                expirationDate: 'N/A',
                                jobLevel: selectedSeeker.isPremium ? 'Premium' : 'Normal',
                                contactUrl: 'N/A',
                                phone: selectedSeeker.phone || 'N/A',
                                email: selectedSeeker.email || 'N/A',
                                jobDescription: `<p>Details for job seeker ${
                                    selectedSeeker.fullName || 'ID ' + selectedSeeker.id
                                }</p><p>Skills: ${selectedSeeker.skills?.join(', ') || 'None'}</p>`,
                                responsibilities: '<ul><li>Seeking job opportunities</li></ul>',
                                overview: {
                                    posted: selectedSeeker.createdAt?.slice(0, 10) || 'N/A',
                                    expire: 'N/A',
                                    education: 'N/A',
                                    salary: 'N/A',
                                    location: selectedSeeker.location || 'N/A',
                                    jobType: 'N/A',
                                    experience: 'N/A',
                                    vacancies: selectedSeeker.applications ?? '0',
                                    jobLevel: selectedSeeker.isPremium ? 'Premium' : 'Normal',
                                },
                                company: {
                                    name: selectedSeeker.fullName || 'N/A',
                                    description: 'N/A',
                                    founded: 'N/A',
                                    organization: 'N/A',
                                    size: 'N/A',
                                    phone: selectedSeeker.phone || 'N/A',
                                    email: selectedSeeker.email || 'N/A',
                                    website: 'N/A',
                                },
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

export default JobSeekersManagement;
