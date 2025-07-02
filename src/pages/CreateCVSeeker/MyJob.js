import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './MyJob.module.scss';
import JobItemOwner from '~/components/JobItemOwner';
import EmployerService from '~/services/EmployerService';

const cx = classNames.bind(styles);

const JobApplications = ({ jobId, onClose }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [applications, setApplications] = useState([]);
    const [pagination, setPagination] = useState({
        pageNumber: 0,
        pageSize: 10,
        totalElements: 0,
        totalPages: 1,
        isFirst: true,
        isLast: true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState('newest');

    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            try {
                const { applications, pagination } = await EmployerService.fetchJobApplications(
                    jobId,
                    pagination.pageNumber,
                    pagination.pageSize
                );
                const sortedApplications = [...applications].sort((a, b) => {
                    const dateA = new Date(a.applied);
                    const dateB = new Date(b.applied);
                    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
                });
                setApplications(sortedApplications);
                setPagination(pagination);
            } catch (err) {
                setError('Failed to fetch applications');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [jobId, pagination.pageNumber, pagination.pageSize, sortOrder]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < pagination.totalPages) {
            setPagination((prev) => ({ ...prev, pageNumber: newPage }));
        }
    };

    const filteredApplications = applications.filter((app) =>
        activeTab === 'all' ? true : app.status === 'SHORTLISTED'
    );

    if (loading) {
        return <div className={cx('modal')}>Loading applications...</div>;
    }

    if (error) {
        return <div className={cx('modal')}>{error}</div>;
    }

    return (
        <div className={cx('overlay')}>
            <div className={cx('modal')}>
                <button className={cx('closeBtn')} onClick={onClose}>
                    ×
                </button>
                <div className={cx('breadcrumb')}>
                    Home / Job / Job Applications / <span>Applications</span>
                </div>
                <div className={cx('headingMain')}>Job Applications</div>

                <div className={cx('tabs')}>
                    <button
                        type="button"
                        className={cx('tabBtn', { active: activeTab === 'all' })}
                        onClick={() => setActiveTab('all')}
                    >
                        All Applications ({applications.length})
                    </button>
                    <button
                        type="button"
                        className={cx('tabBtn', { active: activeTab === 'shortlisted' })}
                        onClick={() => setActiveTab('shortlisted')}
                    >
                        Shortlisted (
                        {applications.filter((app) => app.status === 'SHORTLISTED').length})
                    </button>
                </div>

                <div className={cx('applicationList')}>
                    {filteredApplications.length > 0 ? (
                        filteredApplications.map((app) => (
                            <div key={app.id} className={cx('applicationCard')}>
                                <div className={cx('avatar')}></div>
                                <div className={cx('applicantInfo')}>
                                    <div className={cx('name')}>{app.name}</div>
                                    <div className={cx('role')}>{app.role}</div>
                                    <ul className={cx('details')}>
                                        <li>• {app.experience}</li>
                                        <li>• Education: {app.education}</li>
                                        <li>• Applied: {app.applied}</li>
                                    </ul>
                                    <a href={app.cvLink} className={cx('downloadCv')}>
                                        Download CV
                                    </a>
                                </div>
                                <button className={cx('menuBtn')}>...</button>
                            </div>
                        ))
                    ) : (
                        <div className={cx('noData')}>
                            No applications available for this job.
                        </div>
                    )}
                </div>

                <div className={cx('sortSection')}>
                    <label>Sort Applications</label>
                    <div className={cx('sortOptions')}>
                        <label>
                            <input
                                type="radio"
                                name="sort"
                                checked={sortOrder === 'newest'}
                                onChange={() => setSortOrder('newest')}
                            />
                            Newest
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="sort"
                                checked={sortOrder === 'oldest'}
                                onChange={() => setSortOrder('oldest')}
                            />
                            Oldest
                        </label>
                    </div>
                </div>

                <div className={cx('pagination')}>
                    <button
                        disabled={pagination.isFirst}
                        onClick={() => handlePageChange(pagination.pageNumber - 1)}
                    >
                        {'<'}
                    </button>
                    {Array.from({ length: pagination.totalPages }, (_, i) => (
                        <button
                            key={i}
                            className={cx({ active: i === pagination.pageNumber })}
                            onClick={() => handlePageChange(i)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        disabled={pagination.isLast}
                        onClick={() => handlePageChange(pagination.pageNumber + 1)}
                    >
                        {'>'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const MyJob = () => {
    const [openJobApplications, setOpenJobApplications] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [pageNumber, setPageNumber] = useState(0); // Separate state for pageNumber
    const [pageSize, setPageSize] = useState(10); // Separate state for pageSize
    const [paginationMeta, setPaginationMeta] = useState({
        totalElements: 0,
        totalPages: 1,
        isFirst: true,
        isLast: true,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            try {
                const { jobs, pagination } = await EmployerService.fetchMyJobFake(
                    pageNumber,
                    pageSize
                );
                setJobs(jobs);
                setPaginationMeta({
                    totalElements: pagination.totalElements,
                    totalPages: pagination.totalPages,
                    isFirst: pagination.isFirst,
                    isLast: pagination.isLast,
                });
            } catch (err) {
                setError('Failed to fetch jobs');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [pageNumber, pageSize]); // Depend on pageNumber and pageSize directly

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < paginationMeta.totalPages) {
            setPageNumber(newPage);
        }
    };

    const handleViewApplications = (jobId) => {
        setSelectedJobId(jobId);
        setOpenJobApplications(true);
    };

    if (loading) {
        return <div>Loading jobs...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={cx('job-list-container')}>
            <div className={cx('header')}>
                <div className={cx('headingMain')}>
                    My Jobs <span>({paginationMeta.totalElements})</span>
                </div>
            </div>

            <div className={cx('job-table-head')}>
                <span className={cx('jobs')}>JOBS</span>
                <span className={cx('status')}>STATUS</span>
                <span className={cx('applications')}>APPLICATIONS</span>
                <span className={cx('actions')}>ACTIONS</span>
            </div>

            <div className={cx('job-items-list')}>
                {jobs.map((job) => (
                    <JobItemOwner
                        key={job.id}
                        jobDescription={{
                            jobTitle: job.jobTitle,
                            workTime: job.workTime,
                            remainDay: job.remainDay,
                            isActive: job.isActive,
                            numberApplications: job.numberApplications,
                        }}
                        isVIP={job.isVIP}
                        onViewApplications={() => handleViewApplications(job.id)}
                    />
                ))}
            </div>

            <div className={cx('pagination')}>
                <button
                    disabled={paginationMeta.isFirst}
                    onClick={() => handlePageChange(pageNumber - 1)}
                >
                    {'<'}
                </button>
                {Array.from({ length: paginationMeta.totalPages }, (_, i) => (
                    <button
                        key={i}
                        className={cx({ active: i === pageNumber })}
                        onClick={() => handlePageChange(i)}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    disabled={paginationMeta.isLast}
                    onClick={() => handlePageChange(pageNumber + 1)}
                >
                    {'>'}
                </button>
            </div>

            {openJobApplications && (
                <JobApplications
                    jobId={selectedJobId}
                    onClose={() => {
                        setOpenJobApplications(false);
                        setSelectedJobId(null);
                    }}
                />
            )}
        </div>
    );
};

export default MyJob;