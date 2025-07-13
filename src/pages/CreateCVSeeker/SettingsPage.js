import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconX, IconPhoto } from '@tabler/icons-react';
import { Modal, TextInput, Image, Group, Button, Text } from '@mantine/core';
import styles from './SettingsPage.module.scss';
import SimpleRichTextEditor from '~/components/RichTextEditor/RichTextEditor';
import EmployerService from '~/services/EmployerService';

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
    mapLocation: '',
    phone: '',
    email: '',
    companyWebsite: '',
    companyVision: '',
  });

  const [socialLinks, setSocialLinks] = useState([{ id: 1, type: 'facebook', url: '' }]);
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [logoUrl, setLogoUrl] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [modalOpened, setModalOpened] = useState(false);
  const [imageName, setImageName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [uploadTarget, setUploadTarget] = useState('');

  // Load data profile từ API
  const loadData = async () => {
    try {
      let data = await EmployerService.fetchSettingFake();
      if (Array.isArray(data)) data = data[0];
      if (data && data.companyName) {
        setCompanyName(data.companyName || '');
        setAboutUs(data.description || '');

        setForm({
          organizationType: data.organizationType || '',
          industryTypes: data.industryTypes || '',
          teamSize: data.teamSize || '',
          yearOfEstablishment: data.yearOfEstablishment ? `${data.yearOfEstablishment}-01-01` : '',
          mapLocation: data.mapLocation || '',
          phone: data.phone || '',
          email: data.email || '',
          companyWebsite: data.website || '',
          companyVision: data.companyVision || '',
        });

        if (data.socialLinks && data.socialLinks.length) setSocialLinks(data.socialLinks);
        if (data.logoUrl) setLogoUrl(data.logoUrl);
        if (data.banner) setBannerUrl(data.banner);
      } else {
        setCompanyName('Unknown Company');
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Xử lý input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const openUploadModal = (target) => {
    setUploadTarget(target);
    setModalOpened(true);
    setImageName('');
    setImageFile(null);
    setImagePreview(null);
    setError('');
  };
  const goToNextTab = () => {
  const currentIndex = tabsOrder.indexOf(activeTab);
  if (currentIndex < tabsOrder.length - 1) {
    setActiveTab(tabsOrder[currentIndex + 1]);
  }
};

  const handleImageChange = (files) => {
    if (files.length === 0) return;
    const file = files[0];
    if (file.size > 12 * 1024 * 1024) {
      setError('File size exceeds 12 MB');
      return;
    }
    setImageFile(file);
    setError('');
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAddImage = () => {
    if (!imageFile || !imageName.trim()) {
      setError('Please provide image and image name');
      return;
    }
    if (uploadTarget === 'logo') {
      setLogoFile(imageFile);
      setLogoUrl(null);
    } else if (uploadTarget === 'banner') {
      setBannerFile(imageFile);
      setBannerUrl(null);
    }
    setModalOpened(false);
    setImageName('');
    setImageFile(null);
    setImagePreview(null);
    setError('');
  };

  const handleSave = async () => {
  if (!companyName || companyName.trim() === '') {
    setError('Company name is required');
    return;
  }
  if (!aboutUs || aboutUs.trim() === '') {
    setError('About Us is required');
    return;
  }
  try {
    let logoUrlUploaded = logoUrl;
    if (logoFile) {
      const formData = new FormData();
      formData.append('file', logoFile);
      const res = await EmployerService.uploadFile(formData);
      logoUrlUploaded = res.data.url;
    }

    let bannerUrlUploaded = bannerUrl;
    if (bannerFile) {
      const formData = new FormData();
      formData.append('file', bannerFile);
      const res = await EmployerService.uploadFile(formData);
      bannerUrlUploaded = res.data.url;
    }

    // Chuyển đổi yearOfEstablishment sang số nguyên (năm)
    const year = form.yearOfEstablishment
      ? parseInt(form.yearOfEstablishment.substring(0, 4), 10)
      : null;

    const updatedProfile = {
      companyName: companyName.trim(),
      description: aboutUs,
      organizationType: form.organizationType,
      industryTypes: form.industryTypes,
      teamSize: form.teamSize,
      yearOfEstablishment: year,
      mapLocation: form.mapLocation,
      phone: form.phone,
      email: form.email,
      website: form.companyWebsite,
      companyVision: form.companyVision,
      socialLinks: socialLinks,
      logoUrl: logoUrlUploaded,
      banner: bannerUrlUploaded,  // lưu ý đổi bannerUrl thành banner
    };

    console.log('companyName before API call:', updatedProfile.companyName);
    console.log('updatedProfile:', updatedProfile);

    const response = await EmployerService.fetchSettingFake(updatedProfile);
    console.log('Company info updated successfully!', response);

    await loadData();
    setError('');
  } catch (error) {
    console.error('Error updating company info:', error);
    setError('Update failed. Please check your input.');
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
      <div className={cx('title')}>Settings</div>

      <div className={cx('tabs')}>
        {tabsOrder.map((tab) => (
          <button
            key={tab}
            type="button"
            className={cx('tab', { active: activeTab === tab })}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Company Info' && (
        <div className={cx('companyInfoTab')}>
          <div className={cx('uploadSection')}>
            <div className={cx('uploadBox')} onClick={() => openUploadModal('logo')}>
              {logoFile ? (
                <img
                  src={URL.createObjectURL(logoFile)}
                  alt="logo preview"
                  className={cx('previewImage')}
                  style={{ maxHeight: 140, objectFit: 'contain' }}
                />
              ) : logoUrl ? (
                <img
                  src={logoUrl}
                  alt="logo preview"
                  className={cx('previewImage')}
                  style={{ maxHeight: 140, objectFit: 'contain' }}
                />
              ) : (
                <>
                  <div
                    style={{
                      fontSize: 56,
                      fontWeight: 'bold',
                      color: '#6b7280',
                      marginBottom: 8,
                      userSelect: 'none',
                    }}
                  >
                    +
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#374151' }}>Add Image</div>
                  <small
                    style={{
                      color: '#6b7280',
                      fontSize: 14,
                      marginTop: 2,
                      userSelect: 'none',
                      lineHeight: '1.3em',
                      textAlign: 'center',
                    }}
                  >
                    Browse image or drop here.
                    <br />
                    Only png, jpg, jpeg
                  </small>
                </>
              )}
              <div className={cx('uploadTitle')}>Upload Logo</div>
            </div>

            <div className={cx('uploadBox')} onClick={() => openUploadModal('banner')}>
              {bannerFile ? (
                <img
                  src={URL.createObjectURL(bannerFile)}
                  alt="banner preview"
                  className={cx('previewImage')}
                  style={{ maxHeight: 140, objectFit: 'contain' }}
                />
              ) : bannerUrl ? (
                <img
                  src={bannerUrl}
                  alt="banner preview"
                  className={cx('previewImage')}
                  style={{ maxHeight: 140, objectFit: 'contain' }}
                />
              ) : (
                <>
                  <div
                    style={{
                      fontSize: 56,
                      fontWeight: 'bold',
                      color: '#6b7280',
                      marginBottom: 8,
                      userSelect: 'none',
                    }}
                  >
                    +
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: '#374151' }}>Add Image</div>
                  <small
                    style={{
                      color: '#6b7280',
                      fontSize: 14,
                      marginTop: 2,
                      userSelect: 'none',
                      lineHeight: '1.3em',
                      textAlign: 'center',
                    }}
                  >
                    Browse image or drop here.
                    <br />
                    Only jpeg, png
                  </small>
                </>
              )}
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
              value={typeof aboutUs === 'string' ? aboutUs : ''}
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
              <select name="organizationType" value={form.organizationType} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="Private">Private</option>
                <option value="Public">Public</option>
                <option value="Government">Government</option>
                <option value="Non-profit">Non-profit</option>
              </select>
            </div>
            <div className={cx('inputGroup')}>
              <label>Industry Types</label>
              <select name="industryTypes" value={form.industryTypes} onChange={handleChange}>
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
              onChange={(html) => setForm((prev) => ({ ...prev, companyVision: html }))}
              value={typeof form.companyVision === 'string' ? form.companyVision : ''}
            />
          </div>

          <div className={cx('btnGroup')}>
            <button type="button" className={cx('previousBtn')} onClick={() => setActiveTab('Company Info')}>
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
            <button type="button" className={cx('previousBtn')} onClick={() => setActiveTab('Founding Info')}>
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
          <div className={cx('sectionTitle')}>Contact Information</div>

          <div className={cx('formGroup')}>
            <label>Map Location</label>
            <input
              type="text"
              placeholder="Map Location"
              name="mapLocation"
              value={form.mapLocation || ''}
              onChange={handleChange}
            />
          </div>

          <div className={cx('phoneGroup')}>
            <label>Phone</label>
            <input
              type="tel"
              placeholder="Phone number.."
              name="phone"
              value={form.phone || ''}
              onChange={handleChange}
            />
          </div>

          <div className={cx('formGroup')}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={form.email || ''}
              onChange={handleChange}
            />
          </div>

          <button className={cx('saveBtn')} onClick={handleSave}>
            Save Changes
          </button>

          <hr className={cx('divider')} />

          <div className={cx('sectionTitle')}>Change Password</div>
          {/* Change password UI here */}

          <hr className={cx('divider')} />

          <div className={cx('sectionTitle')}>Delete Your Company</div>
          <p className={cx('deleteDesc')}>
            If you delete your Jobpilot account, you will no longer be able to get information about the matched jobs,
            following employers, and job alert, shortlisted jobs and more. You will be abandoned from all the services of
            Jobpilot.com.
          </p>
          <button className={cx('deleteBtn')}>❌ Close Account</button>
        </div>
      )}

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Add Image"
        centered
        size="sm"
        overlayProps={{
          blur: 3,
          opacity: 0.55,
        }}
        withCloseButton
        closeButtonProps={{ 'aria-label': 'Close modal' }}
      >
        <TextInput
          label="Image Name"
          placeholder="Enter image name"
          value={imageName}
          onChange={(e) => setImageName(e.currentTarget.value)}
          mb="md"
          required
          error={error && !imageName.trim() ? error : null}
        />
        {imagePreview ? (
          <Image
            src={imagePreview}
            alt="Preview"
            radius="md"
            mb="md"
            style={{ maxHeight: 200, objectFit: 'contain', width: '100%' }}
            withPlaceholder
            onClick={() => {
              setImageFile(null);
              setImagePreview(null);
              setError('');
            }}
            sx={{ cursor: 'pointer' }}
          />
        ) : (
          <Dropzone
            onDrop={handleImageChange}
            onReject={() => setError('File type not accepted')}
            maxSize={12 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            multiple={false}
            styles={(theme) => ({
              root: {
                border: `2px dashed ${theme.colors.blue[6]}`,
                borderRadius: theme.radius.md,
                padding: theme.spacing.xl,
                transition: 'border-color 150ms ease, background-color 150ms ease',
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: theme.colors.blue[0],
                  borderColor: theme.colors.blue[7],
                },
              },
              inner: {
                minHeight: 140,
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
            {(status) => (
              <>
                {status.accepted ? (
                  <IconUpload size={48} color="#1c7ed6" />
                ) : status.rejected ? (
                  <IconX size={48} color="#fa5252" />
                ) : (
                  <IconPhoto size={48} color="#868e96" />
                )}
                <Text size="md" color="dimmed" style={{ textAlign: 'center' }}>
                  Drag image here or click to select (PNG, JPG, JPEG). Max 12 MB.
                </Text>
              </>
            )}
          </Dropzone>
        )}
        <Text size="sm" color="red" mt="sm" mb="md">
          {error}
        </Text>
        <Group position="right" spacing="md">
          <Button variant="outline" onClick={() => setModalOpened(false)}>
            Cancel
          </Button>
          <Button onClick={handleAddImage} color="blue" radius="md" disabled={!imageFile || !imageName.trim()}>
            Add Image
          </Button>
        </Group>
      </Modal>
    </div>
  );
}

export default SettingsPage;
