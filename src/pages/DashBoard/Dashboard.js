import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { useEffect, useRef, useState } from 'react';
import { IconDotsVertical, IconBriefcase, IconEye, IconStar, IconClock } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { JobItemOwner } from '~/components';
import { Images } from '~/assets';

const cx = classNames.bind(styles);

function Dashboard() {
    const [selectedMenu, setSelectedMenu] = useState('Overview');

    const [openIndex, setOpenIndex] = useState(null);
    const dropdownRefs = useRef([]);

    const handleToggleDropdown = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!dropdownRefs.current.some((ref) => ref?.contains(e.target))) {
                setOpenIndex(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <aside className={cx('sidebar')}>
                <h3 className={cx('logo')}>MyJob</h3>
                <ul className={cx('nav')}>
                    {[
                        'Overview',
                        'Employers Profile',
                        'Post a Job',
                        'My Jobs',
                        'Saved Candidate',
                        'Plans & Billing',
                        'All Companies',
                        'Settings',
                    ].map((item) => (
                        <li
                            key={item}
                            className={cx('nav-item', { active: item === selectedMenu })}
                            onClick={() => setSelectedMenu(item)}
                        >
                            {item}
                        </li>
                    ))}
                    <li className={cx('logout')}>Log out</li>
                </ul>
            </aside>

            <div className={cx('content')}>
                <header className={cx('topbar')}>
                    <div className={cx('topbar-left')}>
                        <nav className={cx('menu')}>
                            {['Home', 'Find Candidate', 'Dashboard', 'Applications', 'Customer Supports'].map((tab) => (
                                <span key={tab} className={cx('menu-item', { active: tab === 'Dashboard' })}>
                                    {tab}
                                </span>
                            ))}
                        </nav>
                    </div>
                    <div className={cx('topbar-right')} style={{ gap: '10px' }}>
                        <Button className={cx('post-btn')}>Post A Jobs</Button>
                    </div>
                </header>

                <main className={cx('main')}>
                    {selectedMenu === 'Overview' && (
                        <>
                            <h2>Hello, Instagram</h2>
                            <br />
                            <p>Here is your daily activities and applications</p>
                            {/* Rest of overview content */}
                            <div className={cx('stats')}>
                                <div className={cx('stat', 'blue')}>
                                    <h3>hihih</h3>
                                    <br />
                                    <p>Open Jobs</p>
                                </div>
                                <div className={cx('stat', 'yellow')}>
                                    <h3>2,517 số</h3>
                                    <br />
                                    <p>Saved Candidates</p>
                                </div>
                            </div>
                            <div className={cx('job-list')}>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '10px',
                                    }}
                                >
                                    <h4>Recently Posted Jobs</h4>
                                    <a href="#" style={{ color: '#2563eb', textDecoration: 'none' }}>
                                        View all
                                    </a>
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        padding: '10px 0',
                                        borderBottom: '1px solid #e5e7eb',
                                        fontWeight: 'bold',
                                        color: '#6b7280',
                                        marginRight: '130px',
                                    }}
                                >
                                    <span style={{ flex: 2, fontSize: 16 }}>JOBS</span>
                                    <span style={{ flex: 1, textAlign: 'center', fontSize: 16 }}>STATUS</span>
                                    <span style={{ flex: 1, marginLeft: '80px', textAlign: 'center', fontSize: 16 }}>
                                        APPLICATIONS
                                    </span>
                                    <span style={{ flex: 1, marginLeft: '100px', textAlign: 'center', fontSize: 16 }}>
                                        ACTIONS
                                    </span>
                                </div>
                                <JobItemOwner
                                    image={Images.google_image}
                                    jobDescription={{
                                        companyAddress: '1600 Amphitheatre Parkway Mountain ',
                                        jobTitle: 'Software Engineer  ',
                                        workTime: 'Full-time',
                                        salary: '$100 - $200',
                                        remainDate: '3',
                                        isActive: true,
                                        dueDate: 'June 15, 2021',
                                        numberApplications: 102,
                                    }}
                                    isVIP
                                />
                                <JobItemOwner
                                    image={Images.google_image}
                                    jobDescription={{
                                        companyAddress: '1600 Amphitheatre Parkway Mountain ',
                                        jobTitle: 'Software Engineer ',
                                        workTime: 'Full-time',
                                        salary: '$100 - $200',
                                        remainDate: '3',
                                        isActive: false,
                                        dueDate: 'June 15, 2021',
                                        numberApplications: 10,
                                    }}
                                    //isVIP
                                />
                                <JobItemOwner
                                    image={Images.google_image}
                                    jobDescription={{
                                        companyAddress: '1600 Amphitheatre Parkway Mountain ',
                                        jobTitle: 'Software Engineer  ',
                                        workTime: 'Full-time',
                                        salary: '$100 - $200',
                                        remainDate: '3',
                                        isActive: false,
                                        dueDate: 'June 15, 2021',
                                        numberApplications: 10,
                                    }}
                                    //isVIP
                                />
                            </div>
                        </>
                    )}

                    {selectedMenu === 'Post a Job' && (
                        <>
                            <h2>Post a New Job</h2>
                            <p>This is the job posting form.</p>
                            {/* Bạn có thể render một form component tại đây */}
                        </>
                    )}

                    {selectedMenu === 'Saved Candidate' && (
                        <>
                            <h2>Saved Candidates</h2>
                            <p>Here is the list of saved candidates.</p>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
