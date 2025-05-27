import React, { useState } from 'react';
import styles from './CreateJob.module.scss';

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
    if (activeDropdownId === id) {
      setActiveDropdownId(null);
    } else {
      setActiveDropdownId(id);
    }
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
            className={`${styles.candidateItem} ${activeDropdownId === candidate.id ? styles.active : ''}`}
          >
            <div className={styles.candidateInfo}>
              <div className={styles.avatar}></div>
              <div>
                <div className={styles.name}>{candidate.name}</div>
                <div className={styles.role}>{candidate.role}</div>
              </div>
            </div>
            <div className={styles.actions}>
              <button className={styles.bookmarkBtn} title="Bookmark">
                🔖
              </button>
              <button className={styles.viewProfileBtn}>
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
                  <button className={styles.dropdownItem}>
                    📧 Send Email
                  </button>
                  <button className={styles.dropdownItem}>
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

// Các lựa chọn mạng xã hội
const socialOptions = [
  { label: 'Facebook', value: 'facebook', icon: '📘' },
  { label: 'Twitter', value: 'twitter', icon: '🐦' },
  { label: 'Instagram', value: 'instagram', icon: '📸' },
  { label: 'Youtube', value: 'youtube', icon: '▶️' },
];

// Thứ tự các tab trong Settings
const tabsOrder = ['Company Info', 'Founding Info', 'Social Media Profile', 'Contact'];

// Button Save & Next dùng chung cho các tab Settings
const SaveNextButton = ({ onClick }) => (
  <button type="button" className={styles.saveNextBtn} onClick={onClick}>
    Save & Next →
  </button>
);

const CreateJob = () => {
  const [activePage, setActivePage] = useState('Overview');
  const [activeTab, setActiveTab] = useState('Personal');
  const [form, setForm] = useState({
    nationality: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    education: '',
    experience: '',
    biography: '',
    organizationType: '',
    industryTypes: '',
    teamSize: '',
    yearOfEstablishment: '',
    companyWebsite: '',
    companyVision: '',
  });

  const [socialLinks, setSocialLinks] = useState([
    { id: 1, type: 'facebook', url: '' },
  ]);

  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [aboutUs, setAboutUs] = useState('');

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
    if (item === 'Settings') {
      setActiveTab('Company Info');
    } else {
      setActiveTab('Personal');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Saved form data:', form, socialLinks);
  };

  const handleSocialTypeChange = (id, newType) => {
    setSocialLinks((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, type: newType } : link
      )
    );
  };

  const handleSocialUrlChange = (id, newUrl) => {
    setSocialLinks((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, url: newUrl } : link
      )
    );
  };

  const handleRemoveSocialLink = (id) => {
    setSocialLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const handleAddSocialLink = () => {
    const newId = socialLinks.length
      ? Math.max(...socialLinks.map((l) => l.id)) + 1
      : 1;
    setSocialLinks([...socialLinks, { id: newId, type: 'facebook', url: '' }]);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setLogoFile(file);
    } else {
      alert('File quá lớn hoặc không hợp lệ');
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setBannerFile(file);
    } else {
      alert('File quá lớn hoặc không hợp lệ');
    }
  };

  const goToNextTab = () => {
    const currentIndex = tabsOrder.indexOf(activeTab);
    if (currentIndex < tabsOrder.length - 1) {
      setActiveTab(tabsOrder[currentIndex + 1]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2>MyJob</h2>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item}
              className={activePage === item ? styles.active : ''}
              onClick={() => handleClick(item)}
              style={{ cursor: 'pointer' }}
            >
              {item}
              {item === 'Job Alert' && (
                <span className={styles.alertCount}>09</span>
              )}
            </li>
          ))}
        </ul>
        <button className={styles.logoutBtn}>Log-out</button>
      </div>

      <div className={styles.main}>
        {activePage === 'Settings' ? (
          <>
            <h1>Settings</h1>
            <div className={styles.tabs}>
              {tabsOrder.map((tab) => (
                <button
                  key={tab}
                  className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
                  onClick={() => setActiveTab(tab)}
                  type="button"
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'Company Info' && (
              <div className={styles.companyInfoTab}>
                {/* Logo & Banner Image */}
                <h3>Logo & Banner Image</h3>
                <div className={styles.uploadSection}>
                  <div className={styles.uploadBox}>
                    <label htmlFor="logo-upload" className={styles.uploadLabel}>
                      {logoFile ? (
                        <img
                          src={URL.createObjectURL(logoFile)}
                          alt="logo"
                          className={styles.previewImage}
                        />
                      ) : (
                        <>
                          <div className={styles.uploadIcon}>⬆️</div>
                          <div><b>Browse photo</b> or drop here</div>
                          <small>A photo larger than 400 pixels work best. Max photo size 5 MB.</small>
                        </>
                      )}
                    </label>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className={styles.uploadInput}
                    />
                    <div className={styles.uploadTitle}>Upload document</div>
                  </div>

                  <div className={styles.uploadBox}>
                    <label htmlFor="banner-upload" className={styles.uploadLabel}>
                      {bannerFile ? (
                        <img
                          src={URL.createObjectURL(bannerFile)}
                          alt="banner"
                          className={styles.previewImage}
                        />
                      ) : (
                        <>
                          <div className={styles.uploadIcon}>⬆️</div>
                          <div><b>Browse photo</b> or drop here</div>
                          <small>Banner images optical dimension 1520×400. Supported format JPEG, PNG. Max photo size 5 MB.</small>
                        </>
                      )}
                    </label>
                    <input
                      id="banner-upload"
                      type="file"
                      accept="image/jpeg, image/png"
                      onChange={handleBannerChange}
                      className={styles.uploadInput}
                    />
                    <div className={styles.uploadTitle}>Banner Image</div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="company-name">Company name</label>
                  <input
                    id="company-name"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder=""
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="about-us">About Us</label>
                  <textarea
                    id="about-us"
                    value={aboutUs}
                    onChange={(e) => setAboutUs(e.target.value)}
                    rows={5}
                    placeholder="Write down about your company here. Let the candidate know who we are..."
                  />
                </div>

                <div style={{ marginTop: 20 }}>
                  <button
                    type="button"
                    className={styles.saveNextBtn}
                    onClick={() => {
                      handleSave();
                      goToNextTab();
                    }}
                  >
                    Save & Next →
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'Founding Info' && (
              <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.row}>
                  <div className={styles.inputGroup}>
                    <label>Organization Type</label>
                    <select name="organizationType" value={form.organizationType} onChange={handleChange}>
                      <option value="">Select...</option>
                      <option value="Private">Private</option>
                      <option value="Public">Public</option>
                      <option value="Government">Government</option>
                      <option value="Non-profit">Non-profit</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Industry Types</label>
                    <select name="industryTypes" value={form.industryTypes} onChange={handleChange}>
                      <option value="">Select...</option>
                      <option value="Technology">Technology</option>
                      <option value="Finance">Finance</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                    </select>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Team Size</label>
                    <select name="teamSize" value={form.teamSize} onChange={handleChange}>
                      <option value="">Select...</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.inputGroup}>
                    <label>Year of Establishment</label>
                    <input
                      type="date"
                      name="yearOfEstablishment"
                      value={form.yearOfEstablishment}
                      onChange={handleChange}
                      placeholder="dd/mm/yyyy"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Company Website</label>
                    <input
                      type="url"
                      name="companyWebsite"
                      value={form.companyWebsite}
                      onChange={handleChange}
                      placeholder="Website url..."
                    />
                  </div>
                </div>

                <div className={styles.inputGroup} style={{ marginBottom: '20px' }}>
                  <label>Company Vision</label>
                  <textarea
                    name="companyVision"
                    rows="5"
                    placeholder="Tell us about your company vision..."
                    value={form.companyVision}
                    onChange={handleChange}
                    className={styles.textareaVision}
                  />
                  <div className={styles.textEditorIcons}>
                    <button type="button"><b>B</b></button>
                    <button type="button"><i>I</i></button>
                    <button type="button"><u>U</u></button>
                    <button type="button">S</button>
                    <button type="button">🔗</button>
                    <button type="button">•</button>
                    <button type="button">1.</button>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    className={styles.previousBtn}
                    onClick={() => setActiveTab('Company Info')}
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className={styles.saveNextBtn}
                    onClick={() => {
                      handleSave();
                      goToNextTab();
                    }}
                  >
                    Save & Next →
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'Social Media Profile' && (
              <div className={styles.socialLinksContainer}>
                {socialLinks.map((link, idx) => (
                  <div key={link.id} className={styles.socialLinkRow}>
                    <label>{`Social Link ${idx + 1}`}</label>
                    <div className={styles.socialLinkInputs}>
                      <select
                        value={link.type}
                        onChange={(e) => handleSocialTypeChange(link.id, e.target.value)}
                        className={styles.socialSelect}
                      >
                        {socialOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        placeholder="Profile link/url..."
                        value={link.url}
                        onChange={(e) => handleSocialUrlChange(link.id, e.target.value)}
                        className={styles.socialInput}
                      />
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => handleRemoveSocialLink(link.id)}
                        aria-label={`Remove Social Link ${idx + 1}`}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className={styles.addSocialBtn}
                  onClick={handleAddSocialLink}
                >
                  + Add New Social Link
                </button>

                <div style={{ marginTop: 20 }}>
                  <SaveNextButton
                    onClick={() => {
                      handleSave();
                      goToNextTab();
                    }}
                  />
                </div>
              </div>
            )}

            {activeTab === 'Contact' && (
              <div className={styles.contactTab}>
                <h2>Contact Information</h2>
                <div className={styles.formGroup}>
                  <label>Map Location</label>
                  <input type="text" placeholder="Map Location" />
                </div>
                <div className={styles.phoneGroup}>
                  <label>Phone</label>
                  <div className={styles.phoneInput}>
                    <select className={styles.countryCodeSelect} defaultValue="+880">
                      <option value="+880">🇧🇩 +880</option>
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                    </select>
                    <input type="tel" placeholder="Phone number.." />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input type="email" placeholder="Email address" />
                </div>
                <button className={styles.saveBtn}>Save Changes</button>

                <hr className={styles.divider} />

                <h2>Change Password</h2>
                <div className={styles.passwordGroup}>
                  <div className={styles.inputGroup}>
                    <label>Current Password</label>
                    <div className={styles.passwordInput}>
                      <input type="password" placeholder="Password" />
                      <button type="button" aria-label="Toggle visibility">👁️</button>
                    </div>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>New Password</label>
                    <div className={styles.passwordInput}>
                      <input type="password" placeholder="Password" />
                      <button type="button" aria-label="Toggle visibility">👁️</button>
                    </div>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Confirm Password</label>
                    <div className={styles.passwordInput}>
                      <input type="password" placeholder="Password" />
                      <button type="button" aria-label="Toggle visibility">👁️</button>
                    </div>
                  </div>
                </div>
                <button className={styles.saveBtn}>Change Password</button>

                <hr className={styles.divider} />

                <h2>Delete Your Company</h2>
                <p className={styles.deleteDesc}>
                  If you delete your Jobpilot account, you will no longer be able to get information about the matched jobs, following employers, and job alert, shortlisted jobs and more. You will be abandoned from all the services of Jobpilot.com.
                </p>
                <button className={styles.deleteBtn}>❌ Close Account</button>
              </div>
            )}
          </>
        ) : activePage === 'Post a Job' ? (
          // Nội dung tab Post a Job
          <div className={styles.postJobTab}>
            <h2>Post a job</h2>

            <div className={styles.formGroup}>
              <label>Job Title</label>
              <input type="text" placeholder="Add job title, role, vacancies etc" />
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Tags</label>
                <input type="text" placeholder="Job keyword, tags etc..." />
              </div>
              <div className={styles.inputGroup}>
                <label>Job Role</label>
                <select>
                  <option value="">Select...</option>
                  <option value="role1">Role 1</option>
                  <option value="role2">Role 2</option>
                </select>
              </div>
            </div>

            <h3>Salary</h3>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Min Salary</label>
                <input type="number" placeholder="Minimum salary..." />
                <span className={styles.currency}>USD</span>
              </div>
              <div className={styles.inputGroup}>
                <label>Max Salary</label>
                <input type="number" placeholder="Maximum salary..." />
                <span className={styles.currency}>USD</span>
              </div>
              <div className={styles.inputGroup}>
                <label>Salary Type</label>
                <select>
                  <option value="">Select...</option>
                  <option value="monthly">Monthly</option>
                  <option value="hourly">Hourly</option>
                </select>
              </div>
            </div>

            <h3>Advance Information</h3>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Education</label>
                <select>
                  <option value="">Select...</option>
                  <option value="highschool">High School</option>
                  <option value="bachelor">Bachelor</option>
                  <option value="master">Master</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Experience</label>
                <select>
                  <option value="">Select...</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3+">3+ years</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Job Type</label>
                <select>
                  <option value="">Select...</option>
                  <option value="fulltime">Full Time</option>
                  <option value="parttime">Part Time</option>
                  <option value="intern">Internship</option>
                </select>
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Vacancies</label>
                <select>
                  <option value="">Select...</option>
                  <option value="1">1</option>
                  <option value="2-5">2-5</option>
                  <option value="5+">5+</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Expiration Date</label>
                <input type="date" />
              </div>
              <div className={styles.inputGroup}>
                <label>Job Level</label>
                <select>
                  <option value="">Select...</option>
                  <option value="junior">Junior</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior</option>
                </select>
              </div>
            </div>

            <fieldset className={styles.applyJobOn}>
              <legend>Apply Job on:</legend>
              <label>
                <input type="radio" name="applyJob" defaultChecked />
                <strong>On Jobpilot</strong>
                <p>Candidate will apply job using jobpilot & all application will show on your dashboard.</p>
              </label>
              <label>
                <input type="radio" name="applyJob" />
                <strong>External Platform</strong>
                <p>Candidate apply job on your website, all application on your own website.</p>
              </label>
              <label>
                <input type="radio" name="applyJob" />
                <strong>On Your Email</strong>
                <p>Candidate apply job on your email address, and all application in your email.</p>
              </label>
            </fieldset>

            <h3>Description & Responsibility</h3>
            <div className={styles.formGroup}>
              <label>Description</label>
              <textarea placeholder="Add your job description..." rows={5}></textarea>
            </div>
            <div className={styles.formGroup}>
              <label>Responsibilities</label>
              <textarea placeholder="Add your job responsibilities..." rows={5}></textarea>
            </div>

            <button className={styles.saveNextBtn}>Post Job →</button>
          </div>
        ) : activePage === 'Save Candidate' ? (
          // Giao diện Saved Candidates
          <SavedCandidates />
        ) : (
          // Các trang chưa có nội dung hiện "Xin chào"
          <h1>Xin chào</h1>
        )}
      </div>
    </div>
  );
};

export default CreateJob;
