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
  const [filterKeyword, setFilterKeyword] = useState('');

  const allApplications = [
    { name: 'Ronald Richards', title: 'UI/UX Designer', experience: '7 Years Experience', education: 'Education: Master Degree', appliedDate: 'Jan 23, 2022', isShortlisted: false },
    { name: 'Theresa Webb', title: 'Product Designer', experience: '7 Years Experience', education: 'Education: High School Degree', appliedDate: 'Jan 23, 2022', isShortlisted: false },
    { name: 'Devon Lane', title: 'User Experience Designer', experience: '7 Years Experience', education: 'Education: Master Degree', appliedDate: 'Jan 23, 2022', isShortlisted: false },
    { name: 'Darlene Robertson', title: 'UI/UX Designer', experience: '7 Years Experience', education: 'Education: Intermediate Degree', appliedDate: 'Jan 23, 2022', isShortlisted: true },
    { name: 'Jenny Wilson', title: 'UI Designer', experience: '7 Years Experience', education: 'Education: Bachelor Degree', appliedDate: 'Jan 23, 2022', isShortlisted: true },
  ];

  const filteredApps = allApplications
    .filter(app => 
      (tab === 'all' || app.isShortlisted) &&
      (app.name.toLowerCase().includes(filterKeyword.toLowerCase()) ||
       app.title.toLowerCase().includes(filterKeyword.toLowerCase()))
    )
    .sort((a, b) =>
      sortOrder === 'newest' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name)
    );

  const handleFilter = () => {
    const keyword = prompt('Enter filter keyword (e.g., name or title):');
    if (keyword) {
      setFilterKeyword(keyword);
    }
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
        <button onClick={handleFilter}>Filter</button>
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