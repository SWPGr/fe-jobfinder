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
    { label: 'Optional', value: 1 },
    { label: 'High School Diploma', value: 2 },
    { label: 'Associate Degree', value: 3 },
    { label: "Bachelor's Degree", value: 4 },
    { label: "Master's Degree", value: 5 },
    { label: 'PhD', value: 6 },
];

const experienceOptions = [
    { label: 'Under 1 year', value: 1 },
    { label: '1 year', value: 2 },
    { label: '2 years', value: 3 },
    { label: '3 years', value: 4 },
    { label: '4 years', value: 5 },
    { label: '5 years', value: 6 },
    { label: 'Not required', value: 7 },
];

function Personal() {
    const [modalOpened, setModalOpened] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);
    const [resumeFile, setResumeFile] = useState(null); // Added for resume file
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
            resumeUrl: '', // Will be handled by file upload
        },
        validate: {
            fullName: (value) => (!value ? 'Vui lòng nhập họ tên' : null),
            location: (value) => (!value ? 'Vui lòng nhập địa chỉ' : null),
            phone: (value) => (!value ? 'Vui lòng nhập số điện thoại' : null),
            experienceId: (value) => (!value || isNaN(value) ? 'Chọn kinh nghiệm' : null),
            educationId: (value) => (!value || isNaN(value) ? 'Chọn học vấn' : null),
            resumeUrl: (value) => (!value ? 'Vui lòng tải lên CV' : null), // No URL required, just file
        },
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await JobSeekerProfileService.getProfile();
                const pData = response[0];
                setProfileData(pData);
                setProfileImageUrl(pData.avatarUrl || '');
                form.setValues({
                    fullName: pData.fullName || '',
                    location: pData.location || '',
                    phone: pData.phone || '',
                    experienceId: pData.experienceId || '',
                    educationId: pData.educationId || '',
                    resumeUrl: pData.resumeUrl || '',
                });
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

    const handleResumeFileChange = (files) => {
        if (!files || files.length === 0) {
            setResumeFile(null);
            return;
        }
        const file = files[0];
        if (file) {
            setResumeFile(file);
        } else {
            setResumeFile(null);
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
            if (resumeFile) formData.append('resumeUrl', resumeFile); // Send resume file
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
                            <TextInput id="fullName" {...form.getInputProps('fullName')} />
                        </div>
                        <div className={cx('field-item')}>
                            <label htmlFor="location" className={cx('input-label')}>
                                Location
                            </label>
                            <TextInput id="location" {...form.getInputProps('location')} />
                        </div>
                        <div className={cx('field-item')}>
                            <label htmlFor="phone" className={cx('input-label')}>
                                Phone
                            </label>
                            <TextInput id="phone" {...form.getInputProps('phone')} />
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
                                {educationOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={cx('field-item')}>
                            <label htmlFor="resumeUrl" className={cx('input-label')}>
                                Resume (PDF only)
                            </label>
                            <Dropzone
                                onDrop={handleResumeFileChange}
                                onReject={() => setMessage('Only PDF files are allowed.')}
                                accept={{ 'application/pdf': [] }}
                                maxSize={10 * 1024 ** 2}
                                multiple={false}
                            >
                                <div className={cx('upload-cv')}>
                                    <span className={cx('upload-cv-icon')}>📄</span>
                                    <p>Drag and drop or click to select a file (Max 10MB, PDF only)</p>
                                </div>
                            </Dropzone>
                            {resumeFile && (
                                <div className={cx('file-info')}>
                                    <Text size="sm">{resumeFile.name}</Text>
                                    <Text size="xs">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</Text>
                                </div>
                            )}
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
        </div>
    );
}

export default Personal;
