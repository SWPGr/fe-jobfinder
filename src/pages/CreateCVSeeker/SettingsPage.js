import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconX, IconPhoto } from '@tabler/icons-react';
import { Modal, TextInput, Image, Group, Button, Text } from '@mantine/core';
import styles from './SettingsPage.module.scss';
import SimpleRichTextEditor from '~/components/RichTextEditor/RichTextEditor';
import ProfileService from '~/services/ProfileService';
import { useNotification } from '~/hooks';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const cx = classNames.bind(styles);

const tabsOrder = ['Company Info', 'Founding Info', 'Contact'];

const SaveNextButton = ({ onClick, style }) => (
  <button type="button" className={cx('saveNextBtn')} onClick={onClick} style={style}>
    Save Changes
  </button>
);

function SettingsPage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { showSuccess, showError, showInfo } = useNotification();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [modalOpened, setModalOpened] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [uploadTarget, setUploadTarget] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      showError('Please fill in all fields');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      showError('New password and confirm password do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      showError('New password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      await ProfileService.changePassword(formData.currentPassword, formData.newPassword);
      showSuccess('Password changed successfully');

      // Reset form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      console.error('Error changing password:', err);
      if (err.code === 7105) {
        showError('Wrong password');
      } else {
        showError(`Failed to change password: ${err.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Load data profile từ API
  const loadData = async () => {
    try {
      const response = await ProfileService.getProfile();
      const data = response[0] || response; // Handle both array and single object
      console.log('Loaded profile data:', data);

      if (data) {
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
        });

        if (data.avatarUrl) setAvatarUrl(data.avatarUrl);
        if (data.banner) setBannerUrl(data.banner);
      } else {
        setCompanyName('Unknown Company');
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
      showError('Failed to load profile data');
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
    if (!imageFile) {
      setError('Please select an image');
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
    setImageFile(null);
    setImagePreview(null);
    setError('');
  };

  const handleSave = async () => {
    if (!companyName || companyName.trim() === '') {
      showError('Company name is required');
      return;
    }
    if (!aboutUs || aboutUs.trim() === '') {
      showError('About Us is required');
      return;
    }

    setSaving(true);
    try {
      const formDataToSend = new FormData();

      // Add form fields
      formDataToSend.append('companyName', companyName.trim());
      formDataToSend.append('description', aboutUs);
      formDataToSend.append('organization', '1');
      formDataToSend.append('category', '1');
      formDataToSend.append('teamSize', form.teamSize);

      // Convert year to integer
      const year = form.yearOfEstablishment
        ? parseInt(form.yearOfEstablishment.substring(0, 4), 10)
        : null;
      formDataToSend.append('yearOfEstablishment', year);

      formDataToSend.append('location', form.location);
      formDataToSend.append('mapLocation', form.location);
      formDataToSend.append('phone', form.phone);
      formDataToSend.append('email', form.email);
      formDataToSend.append('website', form.companyWebsite);
      formDataToSend.append('companyVision', form.companyVision);
      formDataToSend.append('organizationType', form.organizationType);
      formDataToSend.append('categoryName', form.industryTypes);

      // Add images if selected
      if (logoFile) {
        formDataToSend.append('avatar', logoFile);
      }
      if (bannerFile) {
        formDataToSend.append('banner', bannerFile);
      }

      const response = await ProfileService.updateProfileWithFile(formDataToSend);
      showSuccess('Company info updated successfully!');

      // Update local state
      if (response.avatarUrl) setAvatarUrl(response.avatarUrl);
      if (response.banner) setBannerUrl(response.banner);

      // Clear file states
      setLogoFile(null);
      setBannerFile(null);

      // Reload data to show updated information
      await loadData();
      setError('');
    } catch (error) {
      console.error('Error updating company info:', error);
      showError('Update failed. Please check your input.');
    } finally {
      setSaving(false);
    }
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
                />
              ) : avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="logo preview"
                  className={cx('previewImage')}
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
            </div>

            <div className={cx('uploadBox')} onClick={() => openUploadModal('banner')}>
              {bannerFile ? (
                <img
                  src={URL.createObjectURL(bannerFile)}
                  alt="banner preview"
                  className={cx('previewImage')}
                />
              ) : bannerUrl ? (
                <img
                  src={bannerUrl}
                  alt="banner preview"
                  className={cx('previewImage')}
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
              }}
            />
          </div>
        </div>
      )}

      {activeTab === 'Founding Info' && (
        <form className={cx('form')} onSubmit={(e) => e.preventDefault()}>
          <div className={cx('row')}>
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
              }}
            >
              Save Changes
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
              className={cx('phoneInput')}
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

          <form className={cx('account-setting-form')} onSubmit={handleSubmit}>
            <div className={cx('heading3')}>Change Password</div>
            <div className={cx('form-row')}>
              <label>Current Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showCurrent ? 'text' : 'password'}
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
                  tabIndex={-1}
                  onClick={() => setShowCurrent((v) => !v)}
                >
                  {showCurrent ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <div className={cx('form-row')}>
              <label>New Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showNew ? 'text' : 'password'}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
                  tabIndex={-1}
                  onClick={() => setShowNew((v) => !v)}
                >
                  {showNew ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <div className={cx('form-row')}>
              <label>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
                  tabIndex={-1}
                  onClick={() => setShowConfirmPassword((v) => !v)}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className={cx('save-btn')}
              disabled={loading}
            >
              {loading ? 'Changing Password...' : 'Save Changes'}
            </button>
          </form>

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
        {imagePreview ? (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <Image
              src={imagePreview}
              alt="Preview"
              radius="md"
              style={{ maxHeight: 200, objectFit: 'contain', width: '100%', cursor: 'pointer' }}
              withPlaceholder
              onClick={() => {
                setImageFile(null);
                setImagePreview(null);
                setError('');
              }}
            />
            <Text size="sm" color="dimmed" mt="xs">
              Click image to remove
            </Text>
          </div>
        ) : (
          <Dropzone
            onDrop={handleImageChange}
            onReject={() => setError('File type not accepted')}
            maxSize={12 * 1024 ** 2}
            accept={{
              'image/png': [],
              'image/jpeg': [],
              'image/jpg': [],
              'image/webp': [],
              'image/gif': [],
            }}
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
                minHeight: 160,
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
                <div style={{ textAlign: 'center' }}>
                  <Text size="lg" weight={600} color="dark" mb={8}>
                    {uploadTarget === 'logo' ? 'Upload Company Logo' : 'Upload Banner Image'}
                  </Text>
                  <Text size="sm" color="dimmed" mb={8}>
                    Drag and drop your image here, or click to browse
                  </Text>
                  <Text size="xs" color="gray" style={{ lineHeight: 1.4 }}>
                    Supported formats: PNG, JPG, JPEG, WEBP, GIF
                    <br />
                    Maximum file size: 12 MB
                  </Text>
                </div>
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
          <Button onClick={handleAddImage} color="blue" radius="md" disabled={!imageFile}>
            Add Image
          </Button>
        </Group>
      </Modal>
    </div>
  );
}

export default SettingsPage;
