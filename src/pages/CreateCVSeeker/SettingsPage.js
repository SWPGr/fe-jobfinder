import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SettingsPage.module.scss';
import SimpleRichTextEditor from '~/components/RichTextEditor/RichTextEditor';

const cx = classNames.bind(styles);

// Các tab trong settings
const tabsOrder = ['Company Info', 'Founding Info', 'Social Media Profile', 'Contact'];

// Các lựa chọn mạng xã hội
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

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) setLogoFile(file);
    else alert('File quá lớn hoặc không hợp lệ');
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) setBannerFile(file);
    else alert('File quá lớn hoặc không hợp lệ');
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

  // Xử lý social links
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
            {/* Giữ nguyên phần upload logo và banner */}
            <div className={cx('uploadBox')}>
              <label htmlFor="logo-upload" className={cx('uploadLabel')}>
                {logoFile ? (
                  <img
                    src={URL.createObjectURL(logoFile)}
                    alt="logo"
                    className={cx('previewImage')}
                  />
                ) : (
                  <>
                    <div className={cx('uploadIcon')}>⬆️</div>
                    <div>
                      <b>Browse photo</b> or drop here
                    </div>
                    <small>
                      A photo larger than 400 pixels work best. Max photo size 5 MB.
                    </small>
                  </>
                )}
              </label>
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className={cx('uploadInput')}
              />
              <div className={cx('uploadTitle')}>Upload document</div>
            </div>

            <div className={cx('uploadBox')}>
              <label htmlFor="banner-upload" className={cx('uploadLabel')}>
                {bannerFile ? (
                  <img
                    src={URL.createObjectURL(bannerFile)}
                    alt="banner"
                    className={cx('previewImage')}
                  />
                ) : (
                  <>
                    <div className={cx('uploadIcon')}>⬆️</div>
                    <div>
                      <b>Browse photo</b> or drop here
                    </div>
                    <small>
                      Banner images optical dimension 1520×400. Supported format JPEG,
                      PNG. Max photo size 5 MB.
                    </small>
                  </>
                )}
              </label>
              <input
                id="banner-upload"
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleBannerChange}
                className={cx('uploadInput')}
              />
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
