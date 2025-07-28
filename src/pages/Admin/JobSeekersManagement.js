import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './JobTableManagement.module.scss';
import statisticsService from '~/services/statisticsService';
import { Combobox, useCombobox } from '@mantine/core';
import SeekerDetail from '~/pages/SeekerDetail/SeekerDetail';
import { UserSearchFilters } from '~/components';
import { Pagination } from '@mantine/core';
import { useSearchParams } from 'react-router-dom';
import useNotification from '~/hooks/userNotification';

const cx = classNames.bind(styles);

const sortColumns = [
    { key: 'fullName', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'location', label: 'Location' },
    { key: 'applications', label: 'Applications' },
    { key: 'isPremium', label: 'Premium' },
    { key: 'createdAt', label: 'Joined' },
    { key: 'active', label: 'Active' }, // Thêm cột Active
];

const JobSeekerRowDropdown = ({ onAction, seekerId, isActive }) => {
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
                    {isActive ? (
                        <Combobox.Option value="block" className={cx('dropdownItem', 'dropdownItem--block')}>
                            Block
                        </Combobox.Option>
                    ) : (
                        <Combobox.Option value="unblock" className={cx('dropdownItem', 'dropdownItem--unblock')}>
                            Unblock
                        </Combobox.Option>
                    )}
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

function normalizeVN(str) {
    return (str || '')
        .normalize('NFD')
        .replace(/[ -\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase();
}

const JobSeekersManagement = () => {
    const [jobSeekers, setJobSeekers] = useState([]);
    const [error, setError] = useState('');
    const [selectedSeeker, setSelectedSeeker] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [totalHits, setTotalHits] = useState(1);
    const totalPages = Math.ceil(totalHits / 10);
    const [searchParams, setSearchParams] = useSearchParams();
    const { showSuccess, showError } = useNotification();

    useEffect(() => {

        const fetchJobSeekers = async () => {
            setLoading(true);
            try {
                const data = await statisticsService.fetchAllJobSeekers();
                setJobSeekers(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message || 'Failed to fetch job seekers');
            }

        }
        fetchJobSeekers();
    }, [searchParams]);

    const handleAction = async (action, seekerId) => {
        const seeker = jobSeekers.find((s) => s.id === seekerId);
        const fetchJobSeekers = async () => {
            setLoading(true);
            try {
                const data = await statisticsService.fetchAllJobSeekers();
                setJobSeekers(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message || 'Failed to fetch job seekers');
            }

        }
        if (action === 'block') {
            try {
                await statisticsService.blockJobSeeker(seekerId); // Gọi API để block
                setJobSeekers((prevSeekers) =>
                    prevSeekers.map((s) => (s.id === seekerId ? { ...s, isBlocked: true, active: false } : s)),
                );
                fetchJobSeekers(); // Đồng bộ từ server
                showSuccess('Blocked successfully');
                console.log('Job seeker blocked successfully');
            } catch (err) {
                console.error('Error blocking job seeker:', err);
                showError(`Failed to block: ${err.message || 'Unknown error'}`);
            }
        } else if (action === 'unblock') {
            try {
                await statisticsService.unblockJobSeeker(seekerId); // Gọi API để unblock
                setJobSeekers((prevSeekers) =>
                    prevSeekers.map((s) => (s.id === seekerId ? { ...s, isBlocked: false, active: true } : s)),
                );
                fetchJobSeekers(); // Đồng bộ từ server
                showSuccess('Unblocked successfully');
                console.log('Job seeker unblocked successfully');
            } catch (err) {
                console.error('Error unblocking job seeker:', err);
                showError(`Failed to unblock: ${err.message || 'Unknown error'}`);
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
    const handlePageChange = (page) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page);
        setSearchParams(params);
    };

    if (error) return <div className={cx('error')}>{error}</div>;

    if (loading) {
        return <div>Loading...</div>;
    }



    if (error) return <div className={cx('error')}>{error}</div>;

    return (
        <div className={cx('jobs-wrapper')}>
            <div className={cx('jobs-header')}>
                <div className={cx('title')}>Job Seekers Management</div>
            </div>

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
                        {jobSeekers.length > 0 && jobSeekers.map((seeker, idx) => (
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
                                    <span className={cx('statusText', seeker.active === true ? 'active' : 'inactive')}>
                                        {seeker.active === true ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <JobSeekerRowDropdown
                                        onAction={(action) => handleAction(action, seeker.id)}
                                        seekerId={seeker.id}
                                        isActive={seeker.active === true}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/*  */}

            <div className={cx('pagination')}>
                <Pagination
                    total={totalPages}
                    value={Number(searchParams.get('page')) || 1}
                    onChange={handlePageChange}
                    radius="xl"
                    classNames={{ root: cx('pagination-root'), control: cx('control') }}
                />
            </div>
            {/*  */}
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
