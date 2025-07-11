import React, { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import classNames from 'classnames/bind';
import styles from '../Setting.module.scss';
import JobSeekerProfileService from '~/services/JobSeekerProfileService';
import { Modal, TextInput, Button, Group, Text, Alert } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX, IconCheck } from '@tabler/icons-react';

const cx = classNames.bind(styles);

const educationOptions = [
    { label: 'High School', value: 1 },
    { label: 'Bachelor', value: 2 },
    { label: 'Master', value: 3 },
];

const experienceOptions = [
    { label: '1 year', value: 1 },
    { label: '2 years', value: 2 },
    { label: '3 years', value: 3 },
];

function Personal() {
    const [modalOpened, setModalOpened] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [profileData, setProfileData] = useState(null);
    const [message, setMessage] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const form = useForm({
        initialValues: {
            fullName: '',
            location: '',
            phone: '',
            experienceId: '',
            educationId: '',
            resumeUrl: '',
        },
        validate: {
            fullName: (value) => (!value ? 'Vui lòng nhập họ tên' : null),
            location: (value) => (!value ? 'Vui lòng nhập địa chỉ' : null),
            phone: (value) => (!value ? 'Vui lòng nhập số điện thoại' : null),
            experienceId: (value) => (!value || isNaN(value) ? 'Chọn kinh nghiệm' : null),
            educationId: (value) => (!value || isNaN(value) ? 'Chọn học vấn' : null),
            resumeUrl: (value) => (!value ? 'Vui lòng nhập URL resume' : null),
        },
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await JobSeekerProfileService.getProfile();
                const pData = response[0];
                setProfileData(pData);
                setProfileImageUrl(pData.avatarUrl || '');
            } catch (err) {
                setMessage('❌ Lỗi: Không thể tải thông tin profile');
            }
        };
        fetchProfile();
    }, []);

    const handleFileChange = (files) => {
        if (!files || files.length === 0) {
            setAvatarFile(null);
            setPreviewUrl('');
            return;
        }
        const file = files[0];
        if (file) {
            setAvatarFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setAvatarFile(null);
            setPreviewUrl('');
        }
    };

    const handleSubmit = async (values) => {
        setMessage('');
        try {
            const formData = new FormData();
            formData.append('fullName', values.fullName || '');
            formData.append('location', values.location || '');
            formData.append('phone', values.phone || '');
            formData.append('experience', values.experienceId || '');
            formData.append('education', values.educationId || '');
            formData.append('resumeUrl', values.resumeUrl || '');
            if (avatarFile) formData.append('avatar', avatarFile);

            const response = await JobSeekerProfileService.updateProfileWithFile(formData);
            setMessage('Cập nhật thành công');
            setProfileData(response);
            if (response.avatarUrl) setProfileImageUrl(response.avatarUrl);
            setAvatarFile(null);
            setPreviewUrl('');
        } catch (err) {
            setMessage('❌ Lỗi: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleModalSubmit = async () => {
        if (!avatarFile) {
            setMessage('Vui lòng chọn ảnh trước khi upload.');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('avatar', avatarFile);

            const response = await JobSeekerProfileService.updateProfileWithFile(formData);
            setShowSuccessAlert(true);
            if (response.avatarUrl) setProfileImageUrl(response.avatarUrl);
            setAvatarFile(null);
            setPreviewUrl('');
        } catch (err) {
            setMessage('❌ Lỗi: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleAlertClose = () => {
        setShowSuccessAlert(false);
        setModalOpened(false);
    };

    return (
        <div className={cx('setting-content')}>
            <h2>Personal</h2>
            <section className={cx('basic-info')}>
                <h3>Basic Information</h3>
                <div className={cx('personal-form-layout')}>
                    <div className={cx('profile-pic-col')}>
                        <div
                            className={cx('profile-pic')}
                            onClick={() => setModalOpened(true)}
                            style={{ cursor: 'pointer', position: 'relative' }}
                        >
                            {profileImageUrl || previewUrl ? (
                                <img
                                    src={previewUrl || profileImageUrl}
                                    alt="Profile"
                                    style={{ width: 250, height: 250, objectFit: 'cover', borderRadius: 16 }}
                                />
                            ) : (
                                <>
                                    <div className={cx('upload-icon')}>＋</div>
                                    <p>Add Image</p>
                                    <small>Browse image or drop here. Only png, jpg, jpeg</small>
                                </>
                            )}
                        </div>
                    </div>
                    <form className={cx('fields-vertical')} onSubmit={form.onSubmit(handleSubmit)} autoComplete="off">
                        <div className={cx('field-item')}>
                            <label htmlFor="fullName" className={cx('input-label')}>
                                Full name
                            </label>
                            <TextInput
                                id="fullName"
                                {...form.getInputProps('fullName')}
                                placeholder={profileData?.fullName || 'Full name'}
                            />
                        </div>
                        <div className={cx('field-item')}>
                            <label htmlFor="location" className={cx('input-label')}>
                                Location
                            </label>
                            <TextInput
                                id="location"
                                {...form.getInputProps('location')}
                                placeholder={profileData?.location || 'Location'}
                            />
                        </div>
                        <div className={cx('field-item')}>
                            <label htmlFor="phone" className={cx('input-label')}>
                                Phone
                            </label>
                            <TextInput
                                id="phone"
                                {...form.getInputProps('phone')}
                                placeholder={profileData?.phone || 'Phone'}
                            />
                        </div>
                        <div className={cx('field-item')}>
                            <label htmlFor="experienceId" className={cx('input-label')}>
                                Experience
                            </label>
                            <select
                                id="experienceId"
                                {...form.getInputProps('experienceId')}
                                className={cx('input-select')}
                            >
                                <option value="" disabled>
                                    {profileData?.experienceId
                                        ? experienceOptions.find((e) => e.value === profileData.experienceId)?.label
                                        : 'Select Experience'}
                                </option>
                                {experienceOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={cx('field-item')}>
                            <label htmlFor="educationId" className={cx('input-label')}>
                                Education
                            </label>
                            <select
                                id="educationId"
                                {...form.getInputProps('educationId')}
                                className={cx('input-select')}
                            >
                                <option value="" disabled>
                                    {profileData?.educationId
                                        ? educationOptions.find((e) => e.value === profileData.educationId)?.label
                                        : 'Select Education'}
                                </option>
                                {educationOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={cx('field-item')}>
                            <label htmlFor="resumeUrl" className={cx('input-label')}>
                                Resume URL
                            </label>
                            <TextInput
                                id="resumeUrl"
                                {...form.getInputProps('resumeUrl')}
                                placeholder={profileData?.resumeUrl || 'Resume URL'}
                            />
                        </div>
                        <div className={cx('field-item', 'save-btn-wrap')}>
                            <button className={cx('save-btn')} type="submit">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {message && (
                <div style={{ marginTop: 12, color: message.startsWith('❌') ? 'red' : 'green' }}>{message}</div>
            )}

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
                {showSuccessAlert && (
                    <Alert
                        icon={<IconCheck size="1rem" />}
                        title="Success"
                        color="green"
                        mb="md"
                        withCloseButton
                        onClose={handleAlertClose}
                    >
                        Đã up ảnh thành công!
                    </Alert>
                )}
                <Dropzone
                    onDrop={handleFileChange}
                    onReject={() => setMessage('File type not accepted')}
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
                <Text size="sm" color="red" mt="sm" mb="md">
                    {message}
                </Text>
                <Group position="right" spacing="md">
                    <Button variant="outline" onClick={() => setModalOpened(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleModalSubmit} color="blue" radius="md" disabled={!avatarFile}>
                        Add Image
                    </Button>
                </Group>
            </Modal>

            <section className={cx('cv-section')}>
                <h3>Your CV/Resume</h3>
                <div className={cx('cv-list')}>
                    {/* Danh sách CV mẫu */}
                    <div className={cx('cv-item')}>
                        <span className={cx('cv-icon')}>📄</span>
                        <p className={cx('cv-title')}>Professional Resume</p>
                        <p className={cx('cv-size')}>3.5 MB</p>
                        <div className={cx('cv-actions')}>
                            <button>Edit Resume</button>
                            <button>Delete</button>
                        </div>
                    </div>
                    <div className={cx('cv-item')}>
                        <span className={cx('cv-icon')}>📄</span>
                        <p className={cx('cv-title')}>Product Designer</p>
                        <p className={cx('cv-size')}>4.7 MB</p>
                        <div className={cx('cv-actions')}>
                            <button>Edit Resume</button>
                            <button>Delete</button>
                        </div>
                    </div>
                    <div className={cx('cv-item')}>
                        <span className={cx('cv-icon')}>📄</span>
                        <p className={cx('cv-title')}>Visual Designer</p>
                        <p className={cx('cv-size')}>1.3 MB</p>
                        <div className={cx('cv-actions')}>
                            <button>Edit Resume</button>
                            <button>Delete</button>
                        </div>
                    </div>

                    {/* Thêm mới CV bằng Dropzone */}
                    <Dropzone
                        onDrop={(files) => {
                            const file = files[0];
                            if (file) {
                                alert(`Selected CV: ${file.name}, size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
                            }
                        }}
                        onReject={() => alert('Only PDF files under 10MB are accepted.')}
                        accept={{ 'application/pdf': [] }}
                        maxSize={10 * 1024 ** 2}
                        multiple={false}
                    >
                        <div className={cx('cv-add')}>
                            <span className={cx('cv-add-icon')}>＋</span>
                            <p>Add CV/Resume</p>
                            <small>Browse file or drop here. Only pdf</small>
                        </div>
                    </Dropzone>
                </div>
            </section>
        </div>
    );
}

export default Personal;
