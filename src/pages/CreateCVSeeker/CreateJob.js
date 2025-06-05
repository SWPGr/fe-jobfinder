import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreateJob.module.scss';
import MyJob from './MyJob';
import SettingsPage from './SettingsPage';
import PostJob from './PostJob';
import PlansBilling from './PlansBilling';
import Overview1 from './Overview1';

const cx = classNames.bind(styles);

// Dữ liệu danh sách ứng viên đã lưu
const candidatesData = [
  { id: 1, name: 'Guy Hawkins', role: 'Technical Support Specialist' },
  { id: 2, name: 'Jacob Jones', role: 'Product Designer' },
  { id: 3, name: 'Cameron Williamson', role: 'Marketing Officer' },
  { id: 4, name: 'Robert Fox', role: 'Marketing Manager' },
  { id: 5, name: 'Kathryn Murphy', role: 'Junior Graphic Designer' },
  { id: 6, name: 'Darlene Robertson', role: 'Visual Designer' },
  { id: 7, name: 'Kristin Watson', role: 'Senior UX Designer' },
  { id: 8, name: 'Jenny Wilson', role: 'Interaction Designer' },
  { id: 9, name: 'Marvin McKinney', role: 'Networking Engineer' },
  { id: 10, name: 'Theresa Webb', role: 'Software Engineer' },
];

// Component danh sách ứng viên đã lưu
const SavedCandidates = () => {
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    setActiveDropdownId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={cx('savedCandidatesContainer')}>
      <div className={cx('header')}>
        <h2>Saved Candidates</h2>
        <div className={cx('info')}>
          <span>ⓘ</span> All of the candidates are visible until 24 March, 2021
        </div>
      </div>

      <ul className={cx('candidateList')}>
        {candidatesData.map((candidate) => (
          <li
            key={candidate.id}
            className={cx('candidateItem', { active: activeDropdownId === candidate.id })}
          >
            <div className={cx('candidateInfo')}>
              <div className={cx('avatar')}></div>
              <div>
                <div className={cx('name')}>{candidate.name}</div>
                <div className={cx('role')}>{candidate.role}</div>
              </div>
            </div>
            <div className={cx('actions')}>
              <button className={cx('bookmarkBtn')} title="Bookmark">
                🔖
              </button>
              <button className={cx('viewProfileBtn')}>
                View Profile <span>→</span>
              </button>
              <button
                className={cx('moreBtn')}
                onClick={() => toggleDropdown(candidate.id)}
                aria-label="More options"
              >
                ⋮
              </button>
              {activeDropdownId === candidate.id && (
                <div className={cx('dropdownMenu')}>
                  <button className={cx('dropdownItem')}>📧 Send Email</button>
                  <button className={cx('dropdownItem')}>📄 Download CV</button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CreateJob = () => {
  const [activePage, setActivePage] = useState('Overview');

  const menuItems = [
    'Overview',
    'Employers Frofile',
    'Post a Job',
    'My Jobs',
    'Save Candidate',
    'Plans & Billing',
    'All Companies',
    'Settings',
  ];

  const handleClick = (item) => {
    setActivePage(item);
  };

  return (
    <div className={cx('container')}>
      <div className={cx('sidebar')}>
        <h2>MyJob</h2>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item}
              className={cx({ active: activePage === item })}
              onClick={() => handleClick(item)}
              style={{ cursor: 'pointer' }}
            >
              {item}
            </li>
          ))}
        </ul>
        <button className={cx('logoutBtn')}>Log-out</button>
      </div>

      <div className={cx('main')}>
        {activePage === 'Settings' ? (
          <SettingsPage />
        ) : activePage === 'Post a Job' ? (
          <PostJob />
        ) : activePage === 'Save Candidate' ? (
          <SavedCandidates />
        ) : activePage === 'My Jobs' ? (
          <MyJob />
        ) : activePage === 'Plans & Billing' ? (
          <PlansBilling />
        ) : activePage === 'Overview' ? (
          <Overview1 />
        ) : null}
      </div>
    </div>
  );
};

export default CreateJob;
