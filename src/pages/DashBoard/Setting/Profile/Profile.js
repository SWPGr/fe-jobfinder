import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import classNames from 'classnames/bind';
import styles from '../Setting.module.scss';
import JobSeekerProfileService from '~/services/JobSeekerProfileService';

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

function Profile() {
    const [avatarFile, setAvatarFile] = useState();
    const [previewUrl, setPreviewUrl] = useState('');
    const [message, setMessage] = useState('');

    // 1. Khởi tạo Mantine useForm
    const form = useForm({
        initialValues: {
            location: '',
            fullName: '',
            phone: '',
            educationId: '',
            experienceId: '',
            resumeUrl: '',
        },
        validate: {
            location: (value) => (!value ? 'Vui lòng nhập địa chỉ' : null),
            fullName: (value) => (!value ? 'Vui lòng nhập họ tên' : null),
            phone: (value) => (!value ? 'Vui lòng nhập số điện thoại' : null),
            educationId: (value) => (!value || isNaN(value) ? 'Chọn học vấn' : null),
            experienceId: (value) => (!value || isNaN(value) ? 'Chọn kinh nghiệm' : null),
        },
    });

    // 2. File change handler
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setAvatarFile(null);
            setPreviewUrl('');
        }
        console.log('[FileChange] avatar:', file);
    };
    // 3. Submit handler
    const handleSubmit = async (values) => {
        setMessage('');
        try {
            const formData = new FormData();
            formData.append('location', values.location || '');
            formData.append('fullName', values.fullName || '');
            formData.append('phone', values.phone || '');
            formData.append('education', values.educationId || '');
            formData.append('userExperience', values.experienceId || '');
            formData.append('resumeUrl', values.resumeUrl || '');
            if (avatarFile) formData.append('avatar', avatarFile);

            console.log('🟡 [Submit] FormData gửi lên:', Object.fromEntries(formData));

            const response = await JobSeekerProfileService.updateProfileWithFile(formData);

            console.log('🟢 [Submit] Update profile response:', response);
            setMessage('✅ Cập nhật thành công!');

            // Cập nhật form với dữ liệu mới từ response
            form.setValues({
                location: response.location,
                fullName: response.fullName,
                phone: response.phone,
                educationId: response.educationId,
                experienceId: response.experienceId,
                resumeUrl: response.resumeUrl,
            });
            setAvatarFile(null); // Đặt lại avatar nếu cần
            setPreviewUrl(''); // Đặt lại preview
        } catch (err) {
            console.error('🔴 [Submit] Lỗi cập nhật profile:', err.response || err);
            setMessage('❌ Lỗi: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className={cx('setting-content')}>
            <h2>Profile</h2>
            <form className={cx('profile-form')} onSubmit={form.onSubmit(handleSubmit)} autoComplete="off">
                <div className={cx('form-row')}>
                    <label>Location</label>
                    <input key={form.key.location} {...form.getInputProps('location')} placeholder="Địa chỉ" />
                </div>
                <div className={cx('form-row')}>
                    <label>Full Name</label>
                    <input key={form.key.fullName} {...form.getInputProps('fullName')} placeholder="Họ tên" />
                </div>
                <div className={cx('form-row')}>
                    <label>Phone</label>
                    <input key={form.key.phone} {...form.getInputProps('phone')} placeholder="Số điện thoại" />
                </div>
                <div className={cx('form-row')}>
                    <label>Education</label>
                    <select key={form.key.educationId} {...form.getInputProps('educationId')} required>
                        <option value="">Select...</option>
                        {educationOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('form-row')}>
                    <label>User Experience</label>
                    <select key={form.key.experienceId} {...form.getInputProps('experienceId')} required>
                        <option value="">Select...</option>
                        {experienceOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={cx('form-row')}>
                    <label>Resume URL</label>
                    <input
                        key={form.key('resumeUrl')}
                        {...form.getInputProps.resumeUrl}
                        placeholder="https://your-resume-link.com"
                    />
                </div>
                <div className={cx('form-row')}>
                    <label>Avatar (.jpg, .png...)</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    {previewUrl && (
                        <img src={previewUrl} alt="Preview" style={{ width: 80, borderRadius: 8, marginTop: 6 }} />
                    )}
                </div>
                <button type="submit" className={cx('save-btn')}>
                    Save Changes
                </button>
            </form>
            {message && (
                <div style={{ marginTop: 12, color: message.startsWith('✅') ? 'green' : 'red' }}>{message}</div>
            )}
        </div>
    );
}

export default Profile;
