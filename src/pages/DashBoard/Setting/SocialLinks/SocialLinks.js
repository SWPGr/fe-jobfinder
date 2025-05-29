import React from 'react';
import classNames from 'classnames/bind';
import styles from '../Setting.module.scss';

const cx = classNames.bind(styles);

function SocialLinks() {
    return (
        <div className={cx('setting-content')}>
            <h2>Social Links</h2>
            <form className={cx('social-links-form')}>
                <div className={cx('form-row')}>
                    <label>Social Link 1</label>
                    <select>
                        <option>Facebook</option>
                        <option>Twitter</option>
                        <option>Instagram</option>
                        <option>Youtube</option>
                    </select>
                    <input type="text" placeholder="Profile link/url..." />
                    <button type="button" className={cx('remove-btn')}>
                        ×
                    </button>
                </div>
                <div className={cx('form-row')}>
                    <label>Social Link 2</label>
                    <select>
                        <option>Facebook</option>
                        <option>Twitter</option>
                        <option>Instagram</option>
                        <option>Youtube</option>
                    </select>
                    <input type="text" placeholder="Profile link/url..." />
                    <button type="button" className={cx('remove-btn')}>
                        ×
                    </button>
                </div>
                <div className={cx('form-row')}>
                    <label>Social Link 3</label>
                    <select>
                        <option>Facebook</option>
                        <option>Twitter</option>
                        <option>Instagram</option>
                        <option>Youtube</option>
                    </select>
                    <input type="text" placeholder="Profile link/url..." />
                    <button type="button" className={cx('remove-btn')}>
                        ×
                    </button>
                </div>
                <div className={cx('add-new-link')}>+ Add New Social Link</div>
                <button type="submit" className={cx('save-btn')}>
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default SocialLinks;
