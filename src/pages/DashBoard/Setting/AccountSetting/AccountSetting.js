import React from 'react';
import classNames from 'classnames/bind';
import styles from '../Setting.module.scss';

const cx = classNames.bind(styles);

function AccountSetting() {
    return (
        <div className={cx('setting-content')}>
            <div className={cx('heading2')}>Account Setting</div>
            <form className={cx('account-setting-form')}>
                <div className={cx('heading3')}>Contact Info</div>
                <div className={cx('form-row')}>
                    <label>Map Location</label>
                    <input type="text" placeholder="Map Location" />
                </div>
                <div className={cx('form-row')}>
                    <label>Phone</label>
                    <input type="tel" placeholder="Phone number..." />
                </div>
                <div className={cx('form-row')}>
                    <label>Email</label>
                    <input type="email" placeholder="Email address" />
                </div>

                <div className={cx('heading3')}>Notifications</div>
                <div className={cx('checkbox-group')}>
                    <label>
                        <input type="checkbox" /> Notify me when employers shortlisted me
                    </label>
                    <label>
                        <input type="checkbox" /> Notify me when employers saved my profile
                    </label>
                    <label>
                        <input type="checkbox" /> Notify me when my applied jobs expire
                    </label>
                    <label>
                        <input type="checkbox" /> Notify me when employers rejected me
                    </label>
                    <label>
                        <input type="checkbox" /> Notify me when I have up to 5 job alerts
                    </label>
                </div>

                <div className={cx('heading3')}>Job Alerts</div>
                <div className={cx('form-row')}>
                    <label>Role</label>
                    <input type="text" placeholder="Your job roles" />
                </div>
                <div className={cx('form-row')}>
                    <label>Location</label>
                    <input type="text" placeholder="City, state, country name" />
                </div>

                <div className={cx('heading3')}>Privacy</div>
                <div className={cx('toggle-group')}>
                    <div className={cx('toggle-item')}>
                        <label>
                            <input type="checkbox" /> Profile Privacy
                        </label>
                    </div>
                    <div className={cx('toggle-item')}>
                        <label>
                            <input type="checkbox" /> Resume Privacy
                        </label>
                    </div>
                </div>

                <div className={cx('heading3')}>Change Password</div>
                <div className={cx('form-row')}>
                    <label>Current Password</label>
                    <input type="password" placeholder="Password" />
                </div>
                <div className={cx('form-row')}>
                    <label>New Password</label>
                    <input type="password" placeholder="Password" />
                </div>
                <div className={cx('form-row')}>
                    <label>Confirm Password</label>
                    <input type="password" placeholder="Password" />
                </div>

                <div className={cx('heading3')}>Delete Your Account</div>
                <p className={cx('delete-desc')}>
                    If you delete your Jobpilot account, you will no longer be able to get information about matched
                    jobs, following employers, and job alerts, shortlisted jobs and more. You will be abandoned from all
                    the services of Jobpilot.com.
                </p>
                <button type="submit" className={cx('save-btn')}>
                    Save Changes
                </button>
                <button className={cx('delete-btn')}>Close Account</button>
            </form>
        </div>
    );
}

export default AccountSetting;
