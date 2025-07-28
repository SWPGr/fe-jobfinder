import React from 'react';
import classNames from 'classnames/bind';
import styles from '../Setting.module.scss';

const cx = classNames.bind(styles);

function AccountSetting() {
    return (
        <div className={cx('setting-content')}>
            <div className={cx('heading2')}>Account Setting</div>
            <form className={cx('account-setting-form')}>
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

                <button type="submit" className={cx('save-btn')}>
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default AccountSetting;
