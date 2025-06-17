import React from 'react';
import classNames from 'classnames/bind';
import styles from '../Setting.module.scss';
import '@mantine/tiptap/styles.css';
import SimpleRichTextEditor from '~/components/RichTextEditor/RichTextEditor';

const cx = classNames.bind(styles);

function Profile() {
    return (
        <div className={cx('setting-content')}>
            <h2>Profile</h2>
            <form className={cx('profile-form')}>
                <div className={cx('form-row')}>
                    <label>Nationality</label>
                    <select>
                        <option value="">Select...</option>
                        <option value="vietnamese">Vietnamese</option>
                        <option value="american">American</option>
                    </select>
                </div>
                <div className={cx('form-row')}>
                    <label>Date of Birth</label>
                    <input type="date" />
                </div>
                <div className={cx('form-row')}>
                    <label>Gender</label>
                    <select>
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className={cx('form-row')}>
                    <label>Marital Status</label>
                    <select>
                        <option value="">Select...</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                    </select>
                </div>
                <div className={cx('form-row')}>
                    <label>Education</label>
                    <select>
                        <option value="">Select...</option>
                        <option value="highschool">High School</option>
                        <option value="bachelor">Bachelor</option>
                    </select>
                </div>
                <div className={cx('form-row')}>
                    <label>Experience</label>
                    <select>
                        <option value="">Select...</option>
                        <option value="1">1 year</option>
                        <option value="2">2 years</option>
                        <option value="3">3 years</option>
                    </select>
                </div>
                <div className={cx('form-row', 'biography')}>
                    <label>Biography</label>
                    <SimpleRichTextEditor
                        placeholder="Write down your biography here..."
                        onChange={(content) => console.log(content)}
                    />
                </div>
                <button type="submit" className={cx('save-btn')}>
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default Profile;
