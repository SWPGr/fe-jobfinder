import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import styles from './SettingsPage.module.scss';
import SimpleRichTextEditor from '~/components/RichTextEditor/RichTextEditor';

const cx = classNames.bind(styles);

const tabsOrder = ['Company Info', 'Founding Info', 'Social Media Profile', 'Contact'];

const socialOptions = [
  { label: 'Facebook', value: 'facebook', icon: '📘' },
  { label: 'Twitter', value: 'twitter', icon: '🐦' },
  { label: 'Instagram', value: 'instagram', icon: '📸' },
  { label: 'Youtube', value: 'youtube', icon: '▶️' },
];

const SaveNextButton = ({ onClick, style }) => (
  <button type="button" className={cx('saveNextBtn')} onClick={onClick} style={style}>
    Save & Next →
  </button>
);

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Company Info');
  const [form, setForm] = useState({
    organizationType: '',
    industryTypes: '',
    teamSize: '',
    yearOfEstablishment: '',
    companyWebsite: '',
    companyVision: '',
  });

  const [socialLinks, setSocialLinks] = useState([{ id: 1, type: 'facebook', url: '' }]);
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [aboutUs, setAboutUs] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Dropzone handlers for logo and banner
  const handleLogoChange = (files) => {
    if (files.length === 0) return;
    const file = files[0];
    if (file.size <= 5 * 1024 * 1024) {
      setLogoFile(file);
    } else {
      alert('Logo file too large. Max size is 5 MB.');
    }
  };

  const handleBannerChange = (files) => {
    if (files.length === 0) return;
    const file = files[0];
    if (file.size <= 5 * 1024 * 1024) {
      setBannerFile(file);
    } else {
      alert('Banner file too large. Max size is 5 MB.');
    }
  };

  const handleSave = () => {
    // xử lý lưu dữ liệu
    console.log({
      companyName,
      aboutUs,
      form,
      socialLinks,
      logoFile,
      bannerFile,
    });
  };

  const goToNextTab = () => {
    const currentIndex = tabsOrder.indexOf(activeTab);
    if (currentIndex < tabsOrder.length - 1) {
      setActiveTab(tabsOrder[currentIndex + 1]);
    }
  };

  // Social links handlers...
  const handleSocialTypeChange = (id, newType) => {
    setSocialLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, type: newType } : link))
    );
  };

  const handleSocialUrlChange = (id, newUrl) => {
    setSocialLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, url: newUrl } : link))
    );
  };

  const handleRemoveSocialLink = (id) => {
    setSocialLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const handleAddSocialLink = () => {
    const newId = socialLinks.length ? Math.max(...socialLinks.map((l) => l.id)) + 1 : 1;
    setSocialLinks([...socialLinks, { id: newId, type: 'facebook', url: '' }]);
  };

  return (
    <div className={cx('main')}>
      <h1>Settings</h1>
      <div className={cx('tabs')}>
        {tabsOrder.map((tab) => (
          <button
            key={tab}
            className={cx('tab', { active: activeTab === tab })}
            onClick={() => setActiveTab(tab)}
            type="button"
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Company Info' && (
        <div className={cx('companyInfoTab')}>
          <h3>Logo & Banner Image</h3>
          <div className={cx('uploadSection')}>
            {/* Logo Dropzone */}
            <div className={cx('uploadBox')}>
              <Dropzone
                onDrop={handleLogoChange}
                onReject={() => alert('Only image files under 5MB are accepted for logo.')}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                multiple={false}
                styles={(theme) => ({
                  root: {
                    border: `2px dashed ${theme.colors.blue[6]}`,
                    borderRadius: theme.radius.md,
                    padding: theme.spacing.xl,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 180,
                    position: 'relative',
                  },
                  inner: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: theme.spacing.sm,
                  },
                  icon: {
                    width: 48,
                    height: 48,
                  },
                })}
              >
                {(status) =>
                  logoFile ? (
                    <img
                      src={URL.createObjectURL(logoFile)}
                      alt="logo preview"
                      className={cx('previewImage')}
                      style={{ maxHeight: 150, maxWidth: '100%', objectFit: 'contain' }}
                    />
                  ) : status.accepted ? (
                    <IconUpload size={48} color="#1c7ed6" />
                  ) : status.rejected ? (
                    <IconX size={48} color="#fa5252" />
                  ) : (
                    <>
                      <IconPhoto size={48} color="#868e96" />
                      <div>
                        <b>Browse photo</b> or drop here
                      </div>
                      <small>A photo larger than 400 pixels works best. Max photo size 5 MB.</small>
                    </>
                  )
                }
              </Dropzone>
              <div className={cx('uploadTitle')}>Upload Logo</div>
            </div>

            {/* Banner Dropzone */}
            <div className={cx('uploadBox')}>
              <Dropzone
                onDrop={handleBannerChange}
                onReject={() =>
                  alert('Only JPEG or PNG banner images under 5MB are accepted.')
                }
                maxSize={5 * 1024 ** 2}
                accept={['image/jpeg', 'image/png']}
                multiple={false}
                styles={(theme) => ({
                  root: {
                    border: `2px dashed ${theme.colors.blue[6]}`,
                    borderRadius: theme.radius.md,
                    padding: theme.spacing.xl,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 180,
                    position: 'relative',
                  },
                  inner: {
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: theme.spacing.sm,
                  },
                  icon: {
                    width: 48,
                    height: 48,
                  },
                })}
              >
                {(status) =>
                  bannerFile ? (
                    <img
                      src={URL.createObjectURL(bannerFile)}
                      alt="banner preview"
                      className={cx('previewImage')}
                      style={{ maxHeight: 150, maxWidth: '100%', objectFit: 'contain' }}
                    />
                  ) : status.accepted ? (
                    <IconUpload size={48} color="#1c7ed6" />
                  ) : status.rejected ? (
                    <IconX size={48} color="#fa5252" />
                  ) : (
                    <>
                      <IconPhoto size={48} color="#868e96" />
                      <div>
                        <b>Browse photo</b> or drop here
                      </div>
                      <small>
                        Banner image optimal dimension 1520×400. Supported format JPEG, PNG. Max 5
                        MB.
                      </small>
                    </>
                  )
                }
              </Dropzone>
              <div className={cx('uploadTitle')}>Banner Image</div>
            </div>
          </div>

          <div className={cx('formGroup')}>
            <label htmlFor="company-name">Company name</label>
            <input
              id="company-name"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder=""
            />
          </div>

          <div className={cx('formGroup')}>
            <label htmlFor="about-us">About Us</label>
            <SimpleRichTextEditor
              placeholder="Write down about your company here. Let the candidate know who we are..."
              onChange={(html) => setAboutUs(html)}
            />
          </div>

          <div className={cx('btnGroup')}>
            <SaveNextButton
              onClick={() => {
                handleSave();
                goToNextTab();
              }}
            />
          </div>
        </div>
      )}
      {activeTab === 'Founding Info' && (
        <form className={cx('form')} onSubmit={(e) => e.preventDefault()}>
          <div className={cx('row')}>
            <div className={cx('inputGroup')}>
              <label>Organization Type</label>
              <select
                name="organizationType"
                value={form.organizationType}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="Private">Private</option>
                <option value="Public">Public</option>
                <option value="Government">Government</option>
                <option value="Non-profit">Non-profit</option>
              </select>
            </div>
            <div className={cx('inputGroup')}>
              <label>Industry Types</label>
              <select
                name="industryTypes"
                value={form.industryTypes}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="Technology">Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
              </select>
            </div>
            <div className={cx('inputGroup')}>
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

          <div className={cx('row')}>
            <div className={cx('inputGroup')}>
              <label>Year of Establishment</label>
              <input
                type="date"
                name="yearOfEstablishment"
                value={form.yearOfEstablishment}
                onChange={handleChange}
                placeholder="dd/mm/yyyy"
              />
            </div>
            <div className={cx('inputGroup')}>
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

          <div className={cx('inputGroup')} style={{ marginBottom: '20px' }}>
            <label>Company Vision</label>
            <SimpleRichTextEditor
              placeholder="Tell us about your company vision..."
              onChange={(value) => setForm((prev) => ({ ...prev, companyVision: value }))}
            />
          </div>

          <div className={cx('btnGroup')}>
            <button
              type="button"
              className={cx('previousBtn')}
              onClick={() => setActiveTab('Company Info')}
            >
              Previous
            </button>
            <button
              type="submit"
              className={cx('saveNextBtn')}
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
        <div className={cx('socialLinksContainer')}>
          {socialLinks.map((link, idx) => (
            <div key={link.id} className={cx('socialLinkRow')}>
              <label>{`Social Link ${idx + 1}`}</label>
              <div className={cx('socialLinkInputs')}>
                <select
                  value={link.type}
                  onChange={(e) => handleSocialTypeChange(link.id, e.target.value)}
                  className={cx('socialSelect')}
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
                  className={cx('socialInput')}
                />
                <button
                  type="button"
                  className={cx('removeBtn')}
                  onClick={() => handleRemoveSocialLink(link.id)}
                  aria-label={`Remove Social Link ${idx + 1}`}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
          <button type="button" className={cx('addSocialBtn')} onClick={handleAddSocialLink}>
            + Add New Social Link
          </button>

          <div className={cx('btnGroup')}>
            <button
              type="button"
              className={cx('previousBtn')}
              onClick={() => setActiveTab('Founding Info')}
            >
              Previous
            </button>
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
        <div className={cx('contactTab')}>
          <h2>Contact Information</h2>
          <div className={cx('formGroup')}>
            <label>Map Location</label>
            <input type="text" placeholder="Map Location" />
          </div>
          <div className={cx('phoneGroup')}>
            <label>Phone</label>
            <div className={cx('phoneInput')}>
              <select className={cx('countryCodeSelect')} defaultValue="+880">
                <option value="+880">🇧🇩 +880</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
              </select>
              <input type="tel" placeholder="Phone number.." />
            </div>
          </div>
          <div className={cx('formGroup')}>
            <label>Email</label>
            <input type="email" placeholder="Email address" />
          </div>
          <button className={cx('saveBtn')}>Save Changes</button>

          <hr className={cx('divider')} />

          <h2>Change Password</h2>
          <div className={cx('passwordGroup')}>
            <div className={cx('inputGroup')}>
              <label>Current Password</label>
              <div className={cx('passwordInput')}>
                <input type="password" placeholder="Password" />
                <button type="button" aria-label="Toggle visibility">
                  👁️
                </button>
              </div>
            </div>
            <div className={cx('inputGroup')}>
              <label>New Password</label>
              <div className={cx('passwordInput')}>
                <input type="password" placeholder="Password" />
                <button type="button" aria-label="Toggle visibility">
                  👁️
                </button>
              </div>
            </div>
            <div className={cx('inputGroup')}>
              <label>Confirm Password</label>
              <div className={cx('passwordInput')}>
                <input type="password" placeholder="Password" />
                <button type="button" aria-label="Toggle visibility">
                  👁️
                </button>
              </div>
            </div>
          </div>
          <button className={cx('saveBtn')}>Change Password</button>

          <hr className={cx('divider')} />

          <h2>Delete Your Company</h2>
          <p className={cx('deleteDesc')}>
            If you delete your Jobpilot account, you will no longer be able to get information about
            the matched jobs, following employers, and job alert, shortlisted jobs and more. You
            will be abandoned from all the services of Jobpilot.com.
          </p>
          <button className={cx('deleteBtn')}>❌ Close Account</button>
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
