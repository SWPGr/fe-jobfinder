import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconX, IconPhoto } from '@tabler/icons-react';
import { Modal, TextInput, Image, Group, Button, Text } from '@mantine/core';
import styles from './SettingsPage.module.scss';
import SimpleRichTextEditor from '~/components/RichTextEditor/RichTextEditor';
import EmployerService from '~/services/EmployerService';
import Single from '../Single/Single';

const cx = classNames.bind(styles);

const tabsOrder = ['Company Info', 'Founding Info', 'Contact'];



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
    location: '',
    phone: '',
    email: '',
    companyWebsite: '',
    companyVision: '',
  });

  const [socialLinks, setSocialLinks] = useState([{ id: 1, type: 'facebook', url: '' }]);
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);
  const [showSingle, setShowSingle] = useState(false);
  const [singleData, setSingleData] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [modalOpened, setModalOpened] = useState(false);
  const [imageName, setImageName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [uploadTarget, setUploadTarget] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
          location: data.location || '',
          phone: data.phone || '',
          email: data.email || '',
          companyWebsite: data.website || '',
          companyVision: data.companyVision || '',
          avatarUrl: data.avatarUrl || '',
          banner: data.banner || '',
        });

        if (data.socialLinks && data.socialLinks.length) setSocialLinks(data.socialLinks);
        if (data.avatarUrl) setAvatarUrl(data.avatarUrl);
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
      setAvatarUrl(null);
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
  async function urlToFile(url, filename, mimeType) {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    return new File([buffer], filename, { type: mimeType });
  }

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
      setLoading(true); // Bật overlay loading
      setSuccess(false);
      let avatarUrlUploaded = avatarUrl;
      if (logoFile) {
        const formData = new FormData();
        formData.append('file', logoFile);
        const res = await EmployerService.uploadFile(formData);
        avatarUrlUploaded = res.data.url;
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

      const profileFormData = new FormData();

      profileFormData.append("companyName", companyName.trim());
      profileFormData.append("description", aboutUs);
      profileFormData.append("teamSize", form.teamSize);
      profileFormData.append("yearOfEstablishment", year);
      profileFormData.append("location", form.location);
      profileFormData.append("mapLocation", form.location);
      profileFormData.append("phone", form.phone);
      profileFormData.append("email", form.email);
      profileFormData.append("website", form.companyWebsite);
      profileFormData.append("companyVision", form.companyVision);
      if (form.avatarUrl) {
        const avatarFile = await urlToFile(form.avatarUrl, "logo.jpg", "image/jpeg");
        profileFormData.append("avatarUrl", avatarFile);
        profileFormData.append("avatar", avatarFile);
      } else {
        profileFormData.append("avatarUrl", avatarUrlUploaded);
        profileFormData.append("avatar", avatarUrlUploaded);
      }
      if (form.banner) {
        const bannerFile = await urlToFile(form.banner, "banner.jpg", "image/jpeg");
        profileFormData.append("banner", bannerFile);
      } else {
        profileFormData.append("banner", bannerUrlUploaded); // lưu ý đổi tên thành banner
      }
      const response = await EmployerService.fetchSettingFake(profileFormData);
      console.log('Company info updated successfully!', response);

      await loadData();
      setError('');
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.error('Error updating company info:', error);
      setError('Update failed. Please check your input.');
    } finally {
      setLoading(false);
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
              ) : avatarUrl ? (
                <img
                  src={avatarUrl}
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
            <SaveNextButton onClick={() => { handleSave(); }} />

          </div>
        </div>
      )}

      {activeTab === 'Founding Info' && (
        <form className={cx('form')} onSubmit={(e) => e.preventDefault()}>
          <div className={cx('row')}>
  <div className={cx('inputGroup')}>
    <label>Team Size</label>
    <input
      type="text"
      name="teamSize"
      value={form.teamSize}
      onChange={handleChange}
      placeholder="Enter team size"
    />
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

      {activeTab === 'Contact' && (
        <div className={cx('contactTab')}>

          <div className={cx('formGroup')}>
            <label>Map Location</label>
            <input
              type="text"
              placeholder="Map Location"
              name="location"
              value={form.location || ''}
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
              className={cx('phoneInput')}  // thêm class này
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
      </Modal>{loading && (
        <div className={cx('overlay')}>
          <div className={cx('spinner')}></div>
          <div className={cx('loadingText')}>
            Loading
            <span className={cx('dot')}>.</span>
            <span className={cx('dot')}>.</span>
            <span className={cx('dot')}>.</span>
          </div>
        </div>
      )}

      {success && (
        <div className={cx('successToast')}>
          Update Successful!
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
