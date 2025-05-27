import React, { useState } from 'react';
import styles from './CreateJob.module.scss'; // Hoặc đường dẫn style bạn dùng

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

const SavedCandidates = () => {
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    setActiveDropdownId((prev) => (prev === id ? null : id));
  };

  return (
    <div className={styles.savedCandidatesContainer}>
      <div className={styles.header}>
        <h2>Saved Candidates</h2>
        <div className={styles.info}>
          <span>ⓘ</span> All of the candidates are visible until 24 March, 2021
        </div>
      </div>

      <ul className={styles.candidateList}>
        {candidatesData.map((candidate) => (
          <li
            key={candidate.id}
            className={`${styles.candidateItem} ${
              activeDropdownId === candidate.id ? styles.active : ''
            }`}
          >
            <div className={styles.candidateInfo}>
              <div className={styles.avatar}></div>
              <div>
                <div className={styles.name}>{candidate.name}</div>
                <div className={styles.role}>{candidate.role}</div>
              </div>
            </div>
            <div className={styles.actions}>
              <button
                className={styles.bookmarkBtn}
                title="Bookmark"
                aria-label={`Bookmark ${candidate.name}`}
              >
                🔖
              </button>
              <button
                className={styles.viewProfileBtn}
                aria-label={`View profile of ${candidate.name}`}
              >
                View Profile <span>→</span>
              </button>
              <button
                className={styles.moreBtn}
                onClick={() => toggleDropdown(candidate.id)}
                aria-label="More options"
              >
                ⋮
              </button>

              {activeDropdownId === candidate.id && (
                <div className={styles.dropdownMenu}>
                  <button className={styles.dropdownItem} type="button">
                    📧 Send Email
                  </button>
                  <button className={styles.dropdownItem} type="button">
                    📄 Download CV
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedCandidates;
