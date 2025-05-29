import React from 'react';
import classNames from 'classnames/bind';
import styles from '../Setting.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('setting-content')}>
            <h2>Profile</h2>
            <form className={cx('profile-form')}>
                <div className={cx('form-row')}>
                    <label>Nationality</label>
                    <select>
                        <option>Select...</option>
                        <option>Vietnamese</option>
                        <option>American</option>
                    </select>
                </div>
                <div className={cx('form-row')}>
                    <label>Date of Birth</label>
                    <input type="date" />
                </div>
                <div className={cx('form-row')}>
                    <label>Gender</label>
                    <select>
                        <option>Select...</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </div>
                <div className={cx('form-row')}>
                    <label>Marital Status</label>
                    <select>
                        <option>Select...</option>
                        <option>Single</option>
                        <option>Married</option>
                    </select>
                </div>
                <div className={cx('form-row')}>
                    <label>Education</label>
                    <select>
                        <option>Select...</option>
                        <option>High school</option>
                        <option>Bachelor</option>
                    </select>
                </div>
                <div className={cx('form-row')}>
                    <label>Experience</label>
                    <select>
                        <option>Select...</option>
                        <option>1 year</option>
                        <option>2 years</option>
                    </select>
                </div>
                <div className={cx('form-row', 'biography')}>
                    <label>Biography</label>
                    <textarea placeholder="Write down your biography here..." />
                </div>
                <button type="submit" className={cx('save-btn')}>
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default Profile;
