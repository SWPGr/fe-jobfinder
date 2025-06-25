import React, { useState } from 'react';
import styles from './Application.module.scss';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const Application = ({ name, title, experience, education, appliedDate, isShortlisted }) => (
  <div className={styles.application}>
    <div className={styles.profile}>
      <div className={styles.avatar}></div>
      <div>
        <div className={styles.name}>{name}</div>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
    <ul className={styles.details}>
      <li>{experience}</li>
      <li>{education}</li>
      <li>Applied: {appliedDate}</li>
    </ul>
    <button className={styles.download}>Download CV</button>
    {isShortlisted && (
      <div className={styles.actions}>
      </div>
    )}
  </div>
);

const JobApplications = () => {
  const [sortOrder, setSortOrder] = useState('newest');
  const [tab, setTab] = useState('all');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState({
    name: '',
    title: '',
    experience: '',
    salary: '',
    jobType: '',
    education: '',
    jobLevel: ''
  });

  const allApplications = [
    { name: 'Ronald Richards', title: 'UI/UX Designer', experience: '7 Years Experience', education: 'Master Degree', appliedDate: 'Jan 23, 2022', isShortlisted: false, salary: '75000', jobType: 'Full-time', jobLevel: 'Senior Level' },
    { name: 'Theresa Webb', title: 'Product Designer', experience: '2 Years Experience', education: 'High School', appliedDate: 'Jan 23, 2022', isShortlisted: false, salary: '45000', jobType: 'Part-time', jobLevel: 'Entry Level' },
    { name: 'Devon Lane', title: 'User Experience Designer', experience: '4 Years Experience', education: 'Bachelor', appliedDate: 'Jan 23, 2022', isShortlisted: false, salary: '90000', jobType: 'Full-time', jobLevel: 'Mid Level' },
    { name: 'Darlene Robertson', title: 'UI/UX Designer', experience: '6 Years Experience', education: 'Bachelor', appliedDate: 'Jan 23, 2022', isShortlisted: true, salary: '65000', jobType: 'Contract', jobLevel: 'Mid Level' },
    { name: 'Jenny Wilson', title: 'UI Designer', experience: '1 Year Experience', education: 'PhD', appliedDate: 'Jan 23, 2022', isShortlisted: true, salary: '30000', jobType: 'Part-time', jobLevel: 'Internship' },
  ];

  const filteredApps = allApplications
    .filter(app => 
      (tab === 'all' || app.isShortlisted) &&
      (!filters.name || app.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.title || app.title.toLowerCase().includes(filters.title.toLowerCase())) &&
      (!filters.experience || app.experience.includes(filters.experience)) &&
      (!filters.salary || (parseInt(app.salary) >= parseInt(filters.salary.split('-')[0]) && (filters.salary.split('-')[1] === '+' ? true : parseInt(app.salary) <= parseInt(filters.salary.split('-')[1].replace('$', ''))))) &&
      (!filters.jobType || app.jobType.toLowerCase().includes(filters.jobType.toLowerCase())) &&
      (!filters.education || app.education.toLowerCase().includes(filters.education.toLowerCase())) &&
      (!filters.jobLevel || app.jobLevel.toLowerCase().includes(filters.jobLevel.toLowerCase()))
    )
    .sort((a, b) =>
      sortOrder === 'newest' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
    );

  const handleFilterToggle = (e) => {
    e.stopPropagation();
    console.log('Toggling filter panel, current state:', showFilterPanel);
    setShowFilterPanel(prev => !prev);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    const promises = filteredApps.map(async (app, index) => {
      const cvContent = `CV for ${app.name}\nTitle: ${app.title}\nExperience: ${app.experience}\nEducation: ${app.education}\nApplied: ${app.appliedDate}`;
      zip.file(`${app.name}_CV.txt`, cvContent);
    });

    await Promise.all(promises);
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, 'all_cvs.zip');
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Job Applications</div>

      <div className={styles.tabs}>
        <button
          className={tab === 'all' ? styles.active : ''}
          onClick={() => setTab('all')}
        >
          All Applications ({allApplications.length})
        </button>
        <button
          className={tab === 'shortlisted' ? styles.active : ''}
          onClick={() => setTab('shortlisted')}
        >
          Shortlisted ({allApplications.filter(app => app.isShortlisted).length})
        </button>
      </div>

      <div className={styles.sort}>
        <div className={styles.filterWrapper}>
          <button onClick={handleFilterToggle}>Filter</button>
          {showFilterPanel && (
            <div className={styles.filterPanel}>
              <div className={styles.filterHeader}>
                <input
                  name="name"
                  placeholder="Name"
                  value={filters.name}
                  onChange={handleFilterChange}
                />
                <input
                  name="title"
                  placeholder="Title"
                  value={filters.title}
                  onChange={handleFilterChange}
                />
                <select
                  name="experience"
                  value={filters.experience}
                  onChange={handleFilterChange}
                >
                  <option value="">Experience</option>
                  <option value="0-1 year">0-1 year</option>
                  <option value="1-3 year">1-3 year</option>
                  <option value="3-5 year">3-5 year</option>
                  <option value="5+ year">5+ year</option>
                </select>
                <select
                  name="salary"
                  value={filters.salary}
                  onChange={handleFilterChange}
                >
                  <option value="">Salary</option>
                  <option value="0-50k$">0-50k$</option>
                  <option value="50k-100k$">50k-100k$</option>
                  <option value="100k-200k$">100k-200k$</option>
                  <option value="200k$+">200k$+</option>
                </select>
                <select
                  name="jobType"
                  value={filters.jobType}
                  onChange={handleFilterChange}
                >
                  <option value="">Job Type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                </select>
                <select
                  name="education"
                  value={filters.education}
                  onChange={handleFilterChange}
                >
                  <option value="">Education</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Master">Master</option>
                  <option value="PhD">PhD</option>
                </select>
                <select
                  name="jobLevel"
                  value={filters.jobLevel}
                  onChange={handleFilterChange}
                >
                  <option value="">Job Level</option>
                  <option value="Internship">Internship</option>
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                </select>
              </div>
            </div>
          )}
        </div>
        <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
        <button onClick={handleDownloadAll} className={styles.downloadAll}>Download All</button>
      </div>

      <div className={styles.applications}>
        {filteredApps.length > 0 ? (
          filteredApps.map((app, index) => (
            <Application key={index} {...app} />
          ))
        ) : (
          <div className={styles.noResults}>No results found</div>
        )}
      </div>
    </div>
  );
};

export default JobApplications;