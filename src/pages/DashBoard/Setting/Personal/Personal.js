import React, { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import classNames from 'classnames/bind';
import styles from '~/pages/DashBoard/Setting/Setting.module.scss';
import JobSeekerProfileService from '~/services/JobSeekerProfileService';
import { Modal, TextInput, Select, Button, Group, Text, Alert } from '@mantine/core';
import { Dropzone } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX, IconCheck } from '@tabler/icons-react';

const cx = classNames.bind(styles);

const educationOptions = [
    { value: '', label: 'Select...' },
    { value: '1', label: 'High School Diploma' },
    { value: '2', label: "Bachelor's Degree" },
    { value: '3', label: "Master's Degree" },
    { value: '4', label: 'PhD' },
];

const experienceOptions = [
    { value: '', label: 'Select...' },
    { value: '1', label: 'Under 1 year' },
    { value: '2', label: '1 year' },
    { value: '3', label: '2 years' },
    { value: '4', label: '3 years' },
    { value: '5', label: '4 years' },
    { value: '6', label: '5 years' },
];

function Personal() {
    const [modalOpened, setModalOpened] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [profileData, setProfileData] = useState(null);
    const [message, setMessage] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const form = useForm({
        initialValues: {
            fullName: '',
            experience: '',
            education: '',
            location: '',
            phone: '',
        },
        validate: {
            fullName: (value) => (!value ? 'Please enter full name' : null),
            experience: (value) => (!value ? 'Please select experience' : null),
            education: (value) => (!value ? 'Please select education' : null),
            location: (value) => (!value ? 'Please enter your location' : null),
            phone: (value) => (!value ? 'Please enter your phone number' : null),
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
                    experience: pData.userExperience || '',
                    education: pData.education || '',
                    location: pData.location || '',
                    phone: pData.phone || '',
                });
            } catch (err) {
                setMessage('❌ Error: Unable to load profile');
            }
        };
        fetchProfile();
    }, []);

    const handleFileChange = (files) => {
        if (files.length > 0) {
            const file = files[0];
            setAvatarFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleResumeFileChange = (files) => {
        if (files.length > 0) {
            const file = files[0];
            setResumeFile(file);
        }
    };

    const handleSubmit = async (values) => {
        setMessage('');
        try {
            const formData = new FormData();
            formData.append('fullName', values.fullName);
            formData.append('userExperience', values.experience);
            formData.append('education', values.education);
            formData.append('location', values.location);
            formData.append('phone', values.phone);
            if (resumeFile) formData.append('resumeUrl', resumeFile);
            if (avatarFile) formData.append('avatar', avatarFile);

            const response = await JobSeekerProfileService.updateProfileWithFile(formData);
            setMessage('Update successful');
            setProfileData(response);
            if (response.avatarUrl) setProfileImageUrl(response.avatarUrl);
            setAvatarFile(null);
            setPreviewUrl('');
            setResumeFile(null);
        } catch (err) {
            setMessage('❌ Error: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleModalSubmit = async () => {
        if (!avatarFile) {
            setMessage('Please select an image before uploading.');
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
            setMessage('❌ Error: ' + (err.response?.data?.message || err.message));
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
                    {/* Image section styled as square */}
                    <div className={cx('profile-pic-col')}>
                        <div className={cx('profile-pic')} onClick={() => setModalOpened(true)}>
                            {previewUrl || profileImageUrl ? (
                                <img
                                    src={previewUrl || profileImageUrl}
                                    alt="Profile"
                                    className={cx('profile-pic-image')}
                                />
                            ) : (
                                <>
                                    <div className={cx('upload-icon')}>＋</div>
                                    <p>Profile Picture</p>
                                    <small>Browse photo or drop here</small>
                                </>
                            )}
                        </div>
                    </div>
                    <div className={cx('fields-container')}>
                        <form className={cx('fields-vertical')} onSubmit={form.onSubmit(handleSubmit)}>
                            <div className={cx('field-item')}>
                                <label className={cx('input-label')}>Full name</label>
                                <TextInput {...form.getInputProps('fullName')} />
                            </div>

                            <div className={cx('field-item')}>
                                <label className={cx('input-label')}>Experience</label>
                                <Select
                                    data={experienceOptions}
                                    {...form.getInputProps('experience')}
                                    placeholder="Select..."
                                />
                            </div>
                            <div className={cx('field-item')}>
                                <label className={cx('input-label')}>Education</label>
                                <Select
                                    data={educationOptions}
                                    {...form.getInputProps('education')}
                                    placeholder="Select..."
                                />
                            </div>

                            <div className={cx('field-item')}>
                                <label className={cx('input-label')}>Location</label>
                                <TextInput {...form.getInputProps('location')} />
                            </div>

                            <div className={cx('field-item')}>
                                <label className={cx('input-label')}>Phone</label>
                                <TextInput {...form.getInputProps('phone')} />
                            </div>

                            <div className={cx('field-item')}>
                                <label className={cx('input-label')}>Resume (PDF only)</label>
                                <Dropzone
                                    onDrop={handleResumeFileChange}
                                    accept={{ 'application/pdf': [] }}
                                    maxSize={10 * 1024 ** 2}
                                    multiple={false}
                                >
                                    <div className={cx('upload-cv')}>
                                        <span className={cx('upload-cv-icon')}>📄</span>
                                        <p>Drag and drop or click to select a file (Max 10MB)</p>
                                    </div>
                                </Dropzone>
                                {resumeFile && (
                                    <div className={cx('file-info')}>
                                        <Text size="sm">{resumeFile.name}</Text>
                                        <Text size="xs">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</Text>
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
                <button type="submit" className={cx('save-btn')}>
                    Save Changes
                </button>
            </section>

            {message && <Text color={message.startsWith('❌') ? 'red' : 'green'}>{message}</Text>}

            <Modal opened={modalOpened} onClose={() => setModalOpened(false)} title="Add Cv/Resume" centered>
                <TextInput placeholder="Cv/Resume Name" mb="md" />
                <Dropzone
                    onDrop={handleFileChange}
                    accept={{ 'application/pdf': [] }}
                    maxSize={10 * 1024 ** 2}
                    multiple={false}
                    mb="md"
                >
                    <div className={cx('upload-cv')}>
                        <span className={cx('upload-cv-icon')}>📄</span>
                        <p>Upload your Cv/Resume</p>
                        <small>Only PDF format available. Max file size 12 MB.</small>
                    </div>
                </Dropzone>
                <Group position="right">
                    <Button variant="subtle" onClick={() => setModalOpened(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleModalSubmit}>Add Cv/Resume</Button>
                </Group>
            </Modal>
        </div>
    );
}

export default Personal;
