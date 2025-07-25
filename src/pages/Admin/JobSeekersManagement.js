import React, { useCallback, useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './JobTableManagement.module.scss';
import statisticsService from '~/services/statisticsService';
import { useDebounce } from '~/hooks';
import { Combobox, useCombobox } from '@mantine/core';
import JobDetail from '~/pages/JobDetail/JobDetail';
import { IconAdjustments, IconAdjustmentsOff } from '@tabler/icons-react';
import SeekerDetail from '~/pages/SeekerDetail/SeekerDetail';
import { UserSearchFilters } from '~/components';

const cx = classNames.bind(styles);

const sortColumns = [
    { key: 'fullName', label: 'Name' },
    { key: 'email', label: 'Email' },
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
                    style={{ background: 'none', border: 'none' }}
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
                    <Combobox.Option value="block" className={cx('dropdownItem', 'dropdownItem--block')}>
                        Block
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
    if (!name || typeof name !== 'string') return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || '';
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

    const [filter, setFilter] = useState({
        location: '',
        isPremium: '',
        minApplications: '',
        maxApplications: '',
    });
    const [pendingFilter, setPendingFilter] = useState({
        location: '',
        isPremium: '',
        minApplications: '',
        maxApplications: '',
    });

    const dataSearch = useDebounce(search, 500);

    function normalizeVN(str) {
        return (str || '')
            .normalize('NFD')
            .replace(/[ -\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .toLowerCase();
    }

    const fetchJobSeekers = useCallback(async () => {
        setError('');
        try {
            const data = await statisticsService.fetchAllJobSeekers();
            setJobSeekers(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch job seekers');
        }
    }, []);

    useEffect(() => {
        fetchJobSeekers();
    }, [fetchJobSeekers]);

    const filteredJobSeekers = React.useMemo(() => {
        return jobSeekers.filter((seeker) => {
            const keyword = normalizeVN(dataSearch.trim());
            const matchKeyword =
                !keyword ||
                normalizeVN(seeker.fullName).includes(keyword) ||
                normalizeVN(seeker.email).includes(keyword) ||
                normalizeVN(seeker.location).includes(keyword) ||
                normalizeVN(seeker.phone).includes(keyword);

            const matchLocation =
                filter.location === '' || normalizeVN(seeker.location) === normalizeVN(filter.location);

            const matchPremium = filter.isPremium === '' || String(seeker.isPremium) === filter.isPremium;

            const minApp = Number(filter.minApplications || 0);
            const maxApp = Number(filter.maxApplications || Infinity);
            const seekerApps = seeker.applications ?? 0;
            const matchApplications = seekerApps >= minApp && seekerApps <= maxApp;

            return matchKeyword && matchLocation && matchPremium && matchApplications;
        });
    }, [jobSeekers, filter, dataSearch]);

    const handleAction = (action, seekerId) => {
        const seeker = jobSeekers.find((s) => s.id === seekerId);
        if (action === 'block') {
            if (window.confirm(`Are you sure you want to block job seeker ${seeker.fullName || 'ID ' + seekerId}?`)) {
                setJobSeekers((prevSeekers) =>
                    prevSeekers.map((s) => (s.id === seekerId ? { ...s, isBlocked: true } : s)),
                );
            }
        } else if (action === 'view') {
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

    const seekersToDisplay = filteredJobSeekers.slice(0, visibleSeekers);

    if (error) return <div className={cx('error')}>{error}</div>;

    return (
        <div className={cx('jobs-wrapper')}>
            <div className={cx('jobs-header')}>
                <div className={cx('title')}>Job Seekers Management</div>
            </div>

            {/* Toolbar filter ngang hiện đại */}

            <UserSearchFilters />


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
                                <td>{seeker.location || '--'}</td>
                                <td>{seeker.applications ?? 0}</td>
                                <td>
                                    <span className={premiumClass(seeker.isPremium)}>
                                        {seeker.isPremium ? 'Premium' : 'Normal'}
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
                {filteredJobSeekers.length > visibleSeekers && (
                    <div className={cx('load-more')}>
                        <button onClick={loadMoreSeekers}>Load More</button>
                    </div>
                )}
            </div>

            {isModalOpen && selectedSeeker && (
                <div className={cx('modalOverlay')}>
                    <div className={cx('modalBox')}>
                        <button className={cx('closeBtn')} onClick={closeModal}>
                            ✕
                        </button>
                        <SeekerDetail applicant={selectedSeeker} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobSeekersManagement;
