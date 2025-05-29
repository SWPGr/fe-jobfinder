import React, { useState } from 'react';
import styles from './SavedCandidates.module.scss';

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
    // ... Có thể thêm ứng viên khác nếu cần
];

const SavedCandidates = () => {
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    const openProfile = (candidate) => setSelectedCandidate(candidate);
    const closeProfile = () => setSelectedCandidate(null);

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
                    <li key={candidate.id} className={styles.candidateItem}>
                        <div className={styles.candidateInfo}>
                            <div className={styles.avatar}></div>
                            <div>
                                <div className={styles.name}>{candidate.name}</div>
                                <div className={styles.role}>{candidate.role}</div>
                            </div>
                        </div>
                        <div className={styles.actions}>
                            <button className={styles.viewProfileBtn} onClick={() => openProfile(candidate)}>
                                View Profile <span>→</span>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {selectedCandidate && (
                <div className={styles.modalBackdrop} onClick={closeProfile} role="dialog" aria-modal="true">
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeBtn} onClick={closeProfile} aria-label="Close modal">
                            ×
                        </button>

                        <div className={styles.headerModal}>
                            <div className={styles.avatarLarge}></div>
                            <div className={styles.infoHeader}>
                                <h2>{selectedCandidate.name}</h2>
                                <p>{selectedCandidate.role}</p>
                            </div>
                            <div className={styles.actionButtons}>
                                <button>☆</button>
                                <button>Send Mail</button>
                                <button>Hire Candidates</button>
                            </div>
                        </div>

                        <section className={styles.bioSection}>
                            <h3>Biography</h3>
                            <p>{selectedCandidate.biography}</p>
                        </section>

                        <section className={styles.coverLetterSection}>
                            <h3>Cover Letter</h3>
                            <p style={{ whiteSpace: 'pre-wrap' }}>{selectedCandidate.coverLetter}</p>
                        </section>

                        <section className={styles.detailsSection}>
                            <div className={styles.detailsColumn}>
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
                                    <strong>Educations</strong>
                                    <br />
                                    {selectedCandidate.education}
                                </div>
                            </div>

                            <div className={styles.downloadResume}>
                                <h4>Download My Resume</h4>
                                <button>Esther Howard PDF ⬇</button>
                            </div>

                            <div className={styles.contactInfo}>
                                <h4>Contact Information</h4>
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

                        <section className={styles.socialMedia}>
                            <h4>Follow me Social Media</h4>
                            <div className={styles.socialIcons}>
                                {/* Bạn có thể dùng icon hoặc hình ảnh */}
                                <a href="#" aria-label="Facebook">
                                    📘
                                </a>
                                <a href="#" aria-label="Twitter">
                                    🐦
                                </a>
                                <a href="#" aria-label="LinkedIn">
                                    🔗
                                </a>
                                <a href="#" aria-label="Reddit">
                                    👽
                                </a>
                                <a href="#" aria-label="Instagram">
                                    📸
                                </a>
                                <a href="#" aria-label="YouTube">
                                    ▶️
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavedCandidates;
