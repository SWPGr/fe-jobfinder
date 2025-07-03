import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import classNames from 'classnames/bind';
import styles from '../Setting.module.scss';
import JobSeekerProfileService from '~/services/JobSeekerProfileService';
import { Modal, TextInput, Button, Group, Text, Image, Alert } from '@mantine/core';
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
    const [previewUrl, setPreviewUrl] = useState(''); // Preview trong modal
    const [profileImageUrl, setProfileImageUrl] = useState(''); // Ảnh hiển thị trên giao diện chính
    const [message, setMessage] = useState('');
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    // 1. Khởi tạo Mantine useForm với các trường bổ sung
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

    // 2. File change handler
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
        console.log('[FileChange] avatar:', file);
    };

    // 3. Submit handler cho Save Changes
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

            console.log('🟡 [Submit] FormData gửi lên:', Object.fromEntries(formData));

            const response = await JobSeekerProfileService.updateProfileWithFile(formData);

            console.log('🟢 [Submit] Update profile response:', response);
            setMessage('Cập nhật thành công');

            // Cập nhật form với dữ liệu mới từ response
            form.setValues({
                fullName: response.fullName,
                location: response.location || '',
                phone: response.phone || '',
                experienceId: response.experienceId,
                educationId: response.educationId,
                resumeUrl: response.resumeUrl || '',
            });
            if (response.avatarUrl) {
                setProfileImageUrl(response.avatarUrl); // Cập nhật ảnh từ URL trả về
            }
            setAvatarFile(null);
            setPreviewUrl('');
        } catch (err) {
            console.error('🔴 [Submit] Lỗi cập nhật profile:', err.response || err);
            setMessage('❌ Lỗi: ' + (err.response?.data?.message || err.message));
        }
    };

    // 4. Xử lý submit từ modal (chỉ upload ảnh)
    const handleModalSubmit = async () => {
        if (!avatarFile) {
            setMessage('Vui lòng chọn ảnh trước khi upload.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('avatar', avatarFile);

            console.log('🟡 [Modal Submit] FormData gửi lên:', Object.fromEntries(formData));

            const response = await JobSeekerProfileService.updateProfileWithFile(formData);

            console.log('🟢 [Modal Submit] Update profile response:', response);
            setShowSuccessAlert(true);
            if (response.avatarUrl) {
                setProfileImageUrl(response.avatarUrl); // Cập nhật ảnh trên giao diện chính
            }
        } catch (err) {
            console.error('🔴 [Modal Submit] Lỗi cập nhật avatar:', err.response || err);
            setMessage('❌ Lỗi: ' + (err.response?.data?.message || err.message));
        }
    };

    // 5. Xử lý đóng alert và thoát modal
    const handleAlertClose = () => {
        setShowSuccessAlert(false);
        setModalOpened(false);
    };

    return (
        <div className={cx('setting-content')}>
            <h2>Personal</h2>
            <section className={cx('basic-info')}>
                <h3>Basic Information</h3>
                <div className={cx('form-row')}>
                    <div
                        className={cx('profile-pic')}
                        onClick={() => setModalOpened(true)}
                        style={{ cursor: 'pointer', position: 'relative' }}
                    >
                        {profileImageUrl || previewUrl ? (
                            <img
                                src={profileImageUrl || previewUrl}
                                alt="Profile"
                                style={{ width: 160, height: 160, objectFit: 'cover', borderRadius: 8 }}
                            />
                        ) : (
                            <>
                                <div className={cx('upload-icon')}>＋</div>
                                <p>Add Image</p>
                                <small>Browse image or drop here. Only png, jpg, jpeg</small>
                            </>
                        )}
                    </div>
                    <div className={cx('fields')}>
                        <TextInput placeholder="Full name" {...form.getInputProps('fullName')} />
                        <TextInput placeholder="Location" {...form.getInputProps('location')} />
                        <TextInput placeholder="Phone" {...form.getInputProps('phone')} />
                        <select {...form.getInputProps('experienceId')} required>
                            <option value="">Select Experience</option>
                            {experienceOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <select {...form.getInputProps('educationId')} required>
                            <option value="">Select Education</option>
                            {educationOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <TextInput placeholder="Resume URL" {...form.getInputProps('resumeUrl')} />
                    </div>
                </div>
                <button className={cx('save-btn')} onClick={form.onSubmit(handleSubmit)}>
                    Save Changes
                </button>
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
