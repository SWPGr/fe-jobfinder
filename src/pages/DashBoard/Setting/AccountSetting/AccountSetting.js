import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Setting.module.scss';
import JobSeekerProfileService from '~/services/JobSeekerProfileService';
import useNotification from '~/hooks/userNotification';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const cx = classNames.bind(styles);

function AccountSetting() {
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const { showSuccess, showError, showInfo } = useNotification();

    // State để ẩn/hiện password
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

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
            await JobSeekerProfileService.changePassword(formData.currentPassword, formData.newPassword);
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

    return (
        <div className={cx('setting-content')}>
            <div className={cx('heading2')}>Account Setting</div>
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
                            type={showConfirm ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm new password"
                        />
                        <button
                            type="button"
                            style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
                            tabIndex={-1}
                            onClick={() => setShowConfirm((v) => !v)}
                        >
                            {showConfirm ? <FaEye /> : <FaEyeSlash />}
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
    );
}

export default AccountSetting;
