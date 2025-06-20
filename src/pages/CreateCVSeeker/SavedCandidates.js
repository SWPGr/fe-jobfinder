import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SavedCandidates.module.scss';

const cx = classNames.bind(styles);

const candidatesData = [
  {
    id: 1,
    name: 'Esther Howard',
    role: 'Website Designer (UI/UX)',
    biography:
      "I've been passionate about graphic design and digital art from an early age with a keen interest in Website and Mobile Application User Interfaces. I can create high-quality and aesthetically pleasing designs in a quick turnaround time. Check out the portfolio section of my profile to see samples of my work and feel free to discuss your designing needs. I mostly use Adobe Photoshop, Illustrator, XD and Figma. *Website User Experience and Interface (UI/UX) Design - for all kinds of Professional and Personal websites. *Mobile Application User Experience and Interface Design - for all kinds of IOS/Android and Hybrid Mobile Applications. *Wireframe Designs.",
    coverLetter:
      "Dear Sir,\n\nI am writing to express my interest in the fourth grade instructional position that is currently available in the Fort Wayne Community School System. I learned of the opening through a notice posted on JobZone, IPFW's job database. I am confident that my academic background and curriculum development skills would be successfully utilized in this teaching position.\n\nI have just completed my Bachelor of Science degree in Elementary Education and have successfully completed Praxis I and Praxis II. During my student teaching experience, I developed and initiated a three-week curriculum sequence on animal species and earth resources. This collaborative unit involved working with three other third grade teachers within my team, and culminated in a field trip to the Indianapolis Zoo Animal Research Unit.\n\nSincerely,\n\nEsther Howard",
    dob: '14 June, 2021',
    nationality: 'Bangladesh',
    maritalStatus: 'Single',
    gender: 'Male',
    experience: '7 Years',
    education: 'Master Degree',
    website: 'www.estherhoward.com',
    location: 'Beverly Hills, California 90202\nZone/Block Basement 1 Unit B2, 1372 Spring Avenue, Portland,',
    phone: '+1-202-555-0141',
    secondaryPhone: '+1-202-555-0189',
    email: 'esther.howard@gmail.com',
  },
  // Bạn có thể thêm các ứng viên khác tương tự
];

const SavedCandidates = () => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const openProfile = (candidate) => setSelectedCandidate(candidate);
  const closeProfile = () => setSelectedCandidate(null);

  return (
    <div className={cx('savedCandidatesContainer')}>
      <div className={cx('header')}>
        <div className={cx('header__title')}>Saved Candidates</div>
        <div className={cx('info')}>
          <span>ⓘ</span> All of the candidates are visible until 24 March, 2021
        </div>
      </div>

      <ul className={cx('candidateList')}>
        {candidatesData.map((candidate) => (
          <li key={candidate.id} className={cx('candidateItem')}>
            <div className={cx('candidateInfo')}>
              <div className={cx('avatar')}></div>
              <div>
                <div className={cx('name')}>{candidate.name}</div>
                <div className={cx('role')}>{candidate.role}</div>
              </div>
            </div>
            <div className={cx('actions')}>
              <button className={cx('viewProfileBtn')} onClick={() => openProfile(candidate)}>
                View Profile <span>→</span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedCandidate && (
        <div
          className={cx('modalBackdrop')}
          onClick={closeProfile}
          role="dialog"
          aria-modal="true"
          aria-labelledby="candidate-profile-title"
        >
          <div className={cx('modalContent')} onClick={(e) => e.stopPropagation()}>
            <button
              className={cx('closeBtn')}
              onClick={closeProfile}
              aria-label="Close modal"
            >
              ×
            </button>

            <div className={cx('headerModal')}>
              <div className={cx('avatarLarge')}></div>
              <div className={cx('infoHeader')}>
                <div id="candidate-profile-title" className={cx('modalName')}>
                  {selectedCandidate.name}
                </div>
                <p className={cx('modalRole')}>{selectedCandidate.role}</p>
              </div>
              <div className={cx('actionButtons')}>
                <button aria-label="Favorite Candidate">☆</button>
                <button aria-label="Send Mail">Send Mail</button>
                <button aria-label="Hire Candidate">Hire Candidate</button>
              </div>
            </div>

            <section className={cx('bioSection')}>
              <div className={cx('sectionTitle')}>Biography</div>
              <p>{selectedCandidate.biography}</p>
            </section>

            <section className={cx('coverLetterSection')}>
              <div className={cx('sectionTitle')}>Cover Letter</div>
              <p style={{ whiteSpace: 'pre-wrap' }}>{selectedCandidate.coverLetter}</p>
            </section>

            <section className={cx('detailsSection')}>
              <div className={cx('detailsColumn')}>
                <div>
                  <strong>Date of Birth</strong>
                  <br />
                  {selectedCandidate.dob}
                </div>
                <div>
                  <strong>Nationality</strong>
                  <br />
                  {selectedCandidate.nationality}
                </div>
                <div>
                  <strong>Marital Status</strong>
                  <br />
                  {selectedCandidate.maritalStatus}
                </div>
                <div>
                  <strong>Gender</strong>
                  <br />
                  {selectedCandidate.gender}
                </div>
                <div>
                  <strong>Experience</strong>
                  <br />
                  {selectedCandidate.experience}
                </div>
                <div>
                  <strong>Education</strong>
                  <br />
                  {selectedCandidate.education}
                </div>
              </div>

              <div className={cx('downloadResume')}>
                <div className={cx('sectionTitle')}>Download My Resume</div>
                <button>Esther Howard PDF ⬇</button>
              </div>

              <div className={cx('contactInfo')}>
                <div className={cx('sectionTitle')}>Contact Information</div>
                <p>
                  <strong>Website:</strong> {selectedCandidate.website}
                </p>
                <p>
                  <strong>Location:</strong> {selectedCandidate.location}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedCandidate.phone}
                </p>
                <p>
                  <strong>Secondary Phone:</strong> {selectedCandidate.secondaryPhone}
                </p>
                <p>
                  <strong>Email:</strong> {selectedCandidate.email}
                </p>
              </div>
            </section>

            <section className={cx('socialMedia')}>
              <div className={cx('sectionTitle')}>Follow me Social Media</div>
              <div className={cx('socialIcons')}>
                {/* Icons or images can be added here */}
                <a href="#" aria-label="Facebook">📘</a>
                <a href="#" aria-label="Twitter">🐦</a>
                <a href="#" aria-label="LinkedIn">🔗</a>
                <a href="#" aria-label="Reddit">👽</a>
                <a href="#" aria-label="Instagram">📸</a>
                <a href="#" aria-label="YouTube">▶️</a>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedCandidates;
