import React, { useState } from 'react';
import { Save } from 'lucide-react';
import classNames from 'classnames/bind';
import styles from './Setting.module.scss';

const cx = classNames.bind(styles);

const SettingAdmin = () => {
    const [generalSettings, setGeneralSettings] = useState({
        siteName: 'JobFinder',
        siteDescription: 'Find your dream job with JobFinder',
        contactEmail: 'admin@jobfinder.com',
        supportPhone: '+1 (555) 123-4567',
    });
    const [emailSettings, setEmailSettings] = useState({
        smtpServer: 'smtp.jobfinder.com',
        smtpPort: '587',
        smtpUsername: 'notifications@jobfinder.com',
        smtpPassword: '••••••••••••',
        senderName: 'JobFinder Team',
        senderEmail: 'no-reply@jobfinder.com',
    });
    const [notificationSettings, setNotificationSettings] = useState({
        newJobSeekerAlert: true,
        newJobPostingAlert: true,
        applicationSubmittedAlert: true,
        weeklyReportEmail: true,
        systemMaintenanceAlerts: false,
    });

    const handleGeneralChange = (e) => {
        const { name, value } = e.target;
        setGeneralSettings((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEmailChange = (e) => {
        const { name, value } = e.target;
        setEmailSettings((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleNotificationChange = (e) => {
        const { name, checked } = e.target;
        setNotificationSettings((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    return (
        <div className={cx('managementWrapper')}>
            <div className={cx('jobs-header')}>
                <div className={cx('title')}>Settings</div>
                <p className={cx('desc')}>Configure your JobFinder platform settings.</p>
            </div>
            <div className={cx('settingsContent')}>
                <div className={cx('settingsSection')}>
                    <h2 className={cx('sectionTitle')}>General Settings</h2>
                    <div className={cx('grid')}>
                        <div>
                            <label className={cx('label')}>Site Name</label>
                            <input
                                type="text"
                                name="siteName"
                                value={generalSettings.siteName}
                                onChange={handleGeneralChange}
                                className={cx('input')}
                            />
                        </div>
                        <div>
                            <label className={cx('label')}>Site Description</label>
                            <input
                                type="text"
                                name="siteDescription"
                                value={generalSettings.siteDescription}
                                onChange={handleGeneralChange}
                                className={cx('input')}
                            />
                        </div>
                        <div>
                            <label className={cx('label')}>Contact Email</label>
                            <input
                                type="email"
                                name="contactEmail"
                                value={generalSettings.contactEmail}
                                onChange={handleGeneralChange}
                                className={cx('input')}
                            />
                        </div>
                        <div>
                            <label className={cx('label')}>Support Phone</label>
                            <input
                                type="tel"
                                name="supportPhone"
                                value={generalSettings.supportPhone}
                                onChange={handleGeneralChange}
                                className={cx('input')}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('settingsSection')}>
                    <h2 className={cx('sectionTitle')}>Email Settings</h2>
                    <div className={cx('grid')}>
                        <div>
                            <label className={cx('label')}>SMTP Server</label>
                            <input
                                type="text"
                                name="smtpServer"
                                value={emailSettings.smtpServer}
                                onChange={handleEmailChange}
                                className={cx('input')}
                            />
                        </div>
                        <div>
                            <label className={cx('label')}>SMTP Port</label>
                            <input
                                type="text"
                                name="smtpPort"
                                value={emailSettings.smtpPort}
                                onChange={handleEmailChange}
                                className={cx('input')}
                            />
                        </div>
                        <div>
                            <label className={cx('label')}>SMTP Username</label>
                            <input
                                type="text"
                                name="smtpUsername"
                                value={emailSettings.smtpUsername}
                                onChange={handleEmailChange}
                                className={cx('input')}
                            />
                        </div>
                        <div>
                            <label className={cx('label')}>SMTP Password</label>
                            <input
                                type="password"
                                name="smtpPassword"
                                value={emailSettings.smtpPassword}
                                onChange={handleEmailChange}
                                className={cx('input')}
                            />
                        </div>
                        <div>
                            <label className={cx('label')}>Sender Name</label>
                            <input
                                type="text"
                                name="senderName"
                                value={emailSettings.senderName}
                                onChange={handleEmailChange}
                                className={cx('input')}
                            />
                        </div>
                        <div>
                            <label className={cx('label')}>Sender Email</label>
                            <input
                                type="email"
                                name="senderEmail"
                                value={emailSettings.senderEmail}
                                onChange={handleEmailChange}
                                className={cx('input')}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('settingsSection')}>
                    <h2 className={cx('sectionTitle')}>Notification Settings</h2>
                    <div className={cx('notificationList')}>
                        <div className={cx('checkboxItem')}>
                            <input
                                type="checkbox"
                                id="newJobSeekerAlert"
                                name="newJobSeekerAlert"
                                checked={notificationSettings.newJobSeekerAlert}
                                onChange={handleNotificationChange}
                                className={cx('checkbox')}
                            />
                            <label htmlFor="newJobSeekerAlert" className={cx('checkboxLabel')}>
                                New job seeker registration alerts
                            </label>
                        </div>
                        <div className={cx('checkboxItem')}>
                            <input
                                type="checkbox"
                                id="newJobPostingAlert"
                                name="newJobPostingAlert"
                                checked={notificationSettings.newJobPostingAlert}
                                onChange={handleNotificationChange}
                                className={cx('checkbox')}
                            />
                            <label htmlFor="newJobPostingAlert" className={cx('checkboxLabel')}>
                                New job posting alerts
                            </label>
                        </div>
                        <div className={cx('checkboxItem')}>
                            <input
                                type="checkbox"
                                id="applicationSubmittedAlert"
                                name="applicationSubmittedAlert"
                                checked={notificationSettings.applicationSubmittedAlert}
                                onChange={handleNotificationChange}
                                className={cx('checkbox')}
                            />
                            <label htmlFor="applicationSubmittedAlert" className={cx('checkboxLabel')}>
                                Application submitted alerts
                            </label>
                        </div>
                        <div className={cx('checkboxItem')}>
                            <input
                                type="checkbox"
                                id="weeklyReportEmail"
                                name="weeklyReportEmail"
                                checked={notificationSettings.weeklyReportEmail}
                                onChange={handleNotificationChange}
                                className={cx('checkbox')}
                            />
                            <label htmlFor="weeklyReportEmail" className={cx('checkboxLabel')}>
                                Weekly report emails
                            </label>
                        </div>
                        <div className={cx('checkboxItem')}>
                            <input
                                type="checkbox"
                                id="systemMaintenanceAlerts"
                                name="systemMaintenanceAlerts"
                                checked={notificationSettings.systemMaintenanceAlerts}
                                onChange={handleNotificationChange}
                                className={cx('checkbox')}
                            />
                            <label htmlFor="systemMaintenanceAlerts" className={cx('checkboxLabel')}>
                                System maintenance alerts
                            </label>
                        </div>
                    </div>
                </div>
                <div className={cx('toolbar', 'saveToolbar')}>
                    <div className={cx('search-box')}></div>
                    <div className={cx('toolbar-actions')}>
                        <button className={cx('primary')}>
                            <Save size={18} className="mr-2" />
                            Save Settings
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingAdmin;
