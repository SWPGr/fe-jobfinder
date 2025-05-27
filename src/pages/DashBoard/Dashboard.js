import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import { useEffect, useRef, useState } from 'react';
import { IconDotsVertical, IconBriefcase, IconEye, IconStar, IconClock } from '@tabler/icons-react';
import { Button } from '@mantine/core';

const cx = classNames.bind(styles);

const jobsData = [
  {
    title: 'UI/UX Designer',
    type: 'Full Time',
    remaining: '27 days remaining',
    status: 'Active',
    applications: 798,
  },
  {
    title: 'Senior UX Designer',
    type: 'Internship',
    remaining: '8 days remaining',
    status: 'Active',
    applications: 185,
  },
  {
    title: 'Technical Support Specialist',
    type: 'Part Time',
    remaining: '4 days remaining',
    status: 'Active',
    applications: 556,
  },
  {
    title: 'Junior Graphic Designer',
    type: 'Full Time',
    remaining: '24 days remaining',
    status: 'Active',
    applications: 583,
  },
  {
    title: 'Front End Developer',
    type: 'Full Time',
    remaining: 'Dec 7, 2019',
    status: 'Expired',
    applications: 740,
  },
];

function Dashboard() {
  const [openIndex, setOpenIndex] = useState(null);
  const dropdownRefs = useRef([]);

  const handleToggleDropdown = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRefs.current.some(ref => ref?.contains(e.target))) {
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
          {['Overview', 'Employers Profile', 'Post a Job', 'My Jobs', 'Saved Candidate', 'Plans & Billing', 'All Companies', 'Settings'].map(item => (
            <li key={item} className={cx('nav-item', { active: item === 'Overview' })}>{item}</li>
          ))}
          <li className={cx('logout')}>Log out</li>
        </ul>
      </aside>

      <div className={cx('content')}>
        <header className={cx('topbar')}>
          <div className={cx('topbar-left')}>
            <nav className={cx('menu')}>
              {['Home', 'Find Candidate', 'Dashboard', 'My Jobs', 'Applications', 'Customer Supports'].map(tab => (
                <span key={tab} className={cx('menu-item', { active: tab === 'Dashboard' })}>{tab}</span>
              ))}
            </nav>
          </div>
          <div className={cx('topbar-right')}>
            <span>+1-202-555-0178</span>
            <Button className={cx('post-btn')}>Post A Jobs</Button>
          </div>
        </header>

        <main className={cx('main')}>
          <h2>Hello, Instagram</h2>
          <p>Here is your daily activities and applications</p>

          <div className={cx('stats')}>
            <div className={cx('stat', 'blue')}>
              <h3>hihih</h3>
              <p>Open Jobs</p>
            </div>
            <div className={cx('stat', 'yellow')}>
              <h3>2,517 số</h3>
              <p>Saved Candidates</p>
            </div>
          </div>

          <div className={cx('job-list')}>
            <h4>Recently Posted Jobs nè</h4>
            {jobsData.map((job, index) => (
              <div key={job.title} className={cx('job-row')}>
                <div className={cx('job-info')}>
                  <strong>{job.title}</strong>
                  <span className={cx('job-type')}>{job.type} • {job.remaining}</span>
                </div>
                <div className={cx('job-status', job.status === 'Active' ? 'active' : 'expired')}>
                  {job.status}
                </div>
                <div className={cx('job-apps')}>{job.applications} Applications</div>
                <Button  size="xs" color="blue" onClick={() => alert('view')}> View Applications</Button>
                <div className={cx('dropdown-container')} ref={el => dropdownRefs.current[index] = el}>
                  <IconDotsVertical className={cx('dots')} onClick={() => handleToggleDropdown(index)} />
                  {openIndex === index && (
                    <div className={cx('dropdown')}>
                      <div><IconStar size={16} /> Promote Job</div>
                      <div><IconEye size={16} /> View Detail</div>
                      <div><IconClock size={16} /> Mark as expired</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
