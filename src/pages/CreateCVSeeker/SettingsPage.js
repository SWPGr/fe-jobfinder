import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconX, IconPhoto } from '@tabler/icons-react';
import { Modal, TextInput, Image, Group, Button, Text } from '@mantine/core';
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

    // Modal states
    const [modalOpened, setModalOpened] = useState(false);
    const [imageName, setImageName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');
    const [uploadTarget, setUploadTarget] = useState(''); // 'logo' or 'banner'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Open modal for uploading logo or banner
    const openUploadModal = (target) => {
        setUploadTarget(target);
        setModalOpened(true);
        setImageName('');
        setImageFile(null);
        setImagePreview(null);
        setError('');
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
        const previewURL = URL.createObjectURL(file);
        setImagePreview(previewURL);
    };

    const handleAddImage = () => {
        if (!imageFile || !imageName.trim()) {
            setError('Please provide image and image name');
            return;
        }
        if (uploadTarget === 'logo') {
            setLogoFile(imageFile);
        } else if (uploadTarget === 'banner') {
            setBannerFile(imageFile);
        }
        setModalOpened(false);
        setImageName('');
        setImageFile(null);
        setImagePreview(null);
        setError('');
    };

    const handleSave = () => {
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

    const handleSocialTypeChange = (id, newType) => {
        setSocialLinks((prev) => prev.map((link) => (link.id === id ? { ...link, type: newType } : link)));
    };

    const handleSocialUrlChange = (id, newUrl) => {
        setSocialLinks((prev) => prev.map((link) => (link.id === id ? { ...link, url: newUrl } : link)));
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
            <h6 className={cx('title')}>Settings</h6>
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
                        <div className={cx('uploadBox')} onClick={() => openUploadModal('logo')}>
                            {logoFile ? (
                                <img
                                    src={URL.createObjectURL(logoFile)}
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
                        If you delete your Jobpilot account, you will no longer be able to get information about the
                        matched jobs, following employers, and job alert, shortlisted jobs and more. You will be
                        abandoned from all the services of Jobpilot.com.
                    </p>
                    <button className={cx('deleteBtn')}>❌ Close Account</button>
                </div>
            )}

            {/* Modal for Upload Image */}
            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title="Add Image"
                centered
                overlayBlur={3}
                overlayOpacity={0.55}
                closeButtonLabel="Close modal"
                size="sm"
            >
                <TextInput
                    label="Image Name"
                    placeholder="Enter image name"
                    value={imageName}
                    onChange={(event) => setImageName(event.currentTarget.value)}
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
                                <Text size="md" color="dimmed" align="center">
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
                    <Button
                        onClick={handleAddImage}
                        color="blue"
                        radius="md"
                        disabled={!imageFile || !imageName.trim()}
                    >
                        Add Image
                    </Button>
                </Group>
            </Modal>
        </div>
    );
}

export default SettingsPage;
