import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './Jobs.module.scss';
import { Combobox, useCombobox } from '@mantine/core';
import statisticsService from '~/services/statisticsService';
const cx = classNames.bind(styles);
const JobRowDropdown = ({ onAction }) => {
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

const Jobs = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const [visibleJobs, setVisibleJobs] = useState(10);

    const [jobs, setJobs] = useState([]);
    const handleAction = (action, jobId) => {
        if (action === 'edit') {
            console.log(`Editing job ${jobId}`);
        } else if (action === 'archive') {
            console.log(`Archiving job ${jobId}`);
        } else if (action === 'share') {
            console.log(`Sharing job ${jobId}`);
        }
    };

    const loadMoreJobs = () => {
        setVisibleJobs(visibleJobs + 10);
    };

    useEffect(() => {
        const fetchJobs = async () => {
            const data = await statisticsService.fetchAllJobs();
            console.log('Jobs from API:', data); // 👉 kiểm tra dữ liệu tại đây
            setJobs(data || []);
        };
        fetchJobs();
    }, []);
    const filteredJobs = React.useMemo(() => {
        if (!searchTerm) return jobs;
        const s = searchTerm.toLowerCase();
        return jobs.filter(
            (job) =>
                job.title?.toLowerCase().includes(s) ||
                job.employer?.email?.toLowerCase().includes(s) ||
                job.location?.toLowerCase().includes(s),
        );
    }, [searchTerm, jobs]);

    const jobsToDisplay = filteredJobs.slice(0, visibleJobs);

    return (
        <div className={cx('managementWrapper')}>
            <div className={cx('jobs-header')}>
                <h1 className={cx('title')}>Jobs Management</h1>
            </div>
            <div className={cx('toolbar')}>
                <div className={cx('search-box')}>
                    <Search className={cx('search-icon')} />
                    <input
                        type="text"
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={cx('toolbar-actions')}>
                    <button className={cx('primary')}>+ Add New Job</button>
                </div>
            </div>
            <div className={cx('tableWrapper')}>
                <table className={cx('jobs-table')}>
                    <thead>
                        <tr>
                            <th>Job Title & Company</th>
                            <th>Location</th>
                            <th>Type</th>
                            <th>Salary Range</th>
                            <th>Applicants</th>
                            <th>Status</th>
                            <th>Posted</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobsToDisplay.map((job) => (
                            <tr key={job.id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div className={cx('avatarCircle')}>
                                            {job.employer?.companyName?.charAt(0) ||
                                                job.employer?.email?.charAt(0) ||
                                                'U'}
                                        </div>
                                        <div>
                                            <div className={cx('job-title')}>{job.title}</div>
                                            <div className={cx('job-company')}>
                                                {job.employer?.companyName || job.employer?.email}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{job.location}</td>
                                <td>
                                    <span className={cx('job-type')}>{job.jobType?.name || '--'}</span>
                                </td>
                                <td>
                                    ${job.salaryMin} - ${job.salaryMax}
                                </td>
                                <td>–</td>
                                <td>
                                    <span className={cx('statusText', { active: true })}>Active</span>
                                </td>
                                <td>{job.createdAt?.split(' ')[0]}</td>
                                <td>
                                    <JobRowDropdown onAction={(action) => handleAction(action, job.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredJobs.length > visibleJobs && (
                    <div className={cx('load-more')}>
                        <button onClick={loadMoreJobs}>Load More</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jobs;
