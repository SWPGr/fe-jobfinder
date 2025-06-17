import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import JobItemApplied from '~/components/JobItemApplied';
import { Images } from '~/assets';
import { Pagination } from '@mantine/core';
import { useState } from 'react';
const cx = classNames.bind(styles);

const jobList = [
    <JobItemApplied
        image={Images}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={Images}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={'asdasd'}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={Images}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={'asdasd'}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={Images}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={'asdasd'}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={'asdasd'}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={'asdasd'}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={'asdasd'}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={'asdasd'}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={'asdasd'}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={'asdasd'}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={'asdasd'}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={'asdasd'}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={'asdasd'}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={'asdasd'}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={'asdasd'}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={'asdasd'}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
    <JobItemApplied
        image={'asdasd'}
        jobDescription={{
            companyName: 'Google',
            companyAddress: '1600 Amphitheatre Parkway Mountain ',
            jobTitle: 'Software Engineer asdasd asdasds asdadasd',
            workTime: 'Full-time',
            salary: '$100 - $200',
            dueDate: 'June 15, 2021',
        }}
        isVIP
    />,
];

function Dashboard1() {
    const itemsPerPage = 5;
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(jobList.length / itemsPerPage);
    const startIdx = (page - 1) * itemsPerPage;
    const currentJobs = jobList.slice(startIdx, startIdx + itemsPerPage);
    return (
        <div className={cx('dashboard-content')}>
            <div className={cx('dashboard-header')}>
                <div>
                    <h2>Hello, Esther Howard</h2>
                    <span className={cx('desc')}>Here is your daily activities and job alerts</span>
                </div>
            </div>

            <div className={cx('stats-cards')}>
                <div className={cx('stat-card', 'blue')}>
                    <div className={cx('stat-number')}>589</div>
                    <div className={cx('stat-label')}>Applied jobs</div>
                </div>
                <div className={cx('stat-card', 'yellow')}>
                    <div className={cx('stat-number')}>238</div>
                    <div className={cx('stat-label')}>Favorite jobs</div>
                </div>
                <div className={cx('stat-card', 'green')}>
                    <div className={cx('stat-number')}>574</div>
                    <div className={cx('stat-label')}>Job Alerts</div>
                </div>
            </div>

            <div className={cx('profile-warning')}>
                <div className={cx('warning-text')}>
                    <span className={cx('warning-title')}>Your profile editing is not completed.</span>
                    <span className={cx('warning-desc')}>Complete your profile editing & build your custom Resume</span>
                </div>
                <button className={cx('edit-profile-btn')}>Edit Profile →</button>
            </div>

            <div className={cx('job-list-container')}>
                <div className={cx('job-list-header')}>
                    <div>
                        <b>Recently Applied</b>
                    </div>
                    <button className={cx('view-all-btn')}>View all →</button>
                </div>
                <div className={cx('job-table-head')}>
                    <span>Job</span>
                    <span>Date Applied</span>
                    <span>Status</span>
                    <span>Action</span>
                </div>
                <div className={cx('job-list')}>
                    {currentJobs.map((jobComponent, index) => (
                        <div key={index} className={cx('job-item')}>
                            {jobComponent}
                        </div>
                    ))}
                </div>
                {/* Phân trang Mantine */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32, fontSize: '18px' }}>
                    <Pagination total={totalPages} value={page} onChange={setPage} size="xl" />
                </div>
            </div>
        </div>
    );
}

export default Dashboard1;
