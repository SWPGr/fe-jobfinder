import React from 'react';
import classNames from 'classnames/bind';
import styles from '../Setting.module.scss';

const cx = classNames.bind(styles);

function Personal() {
    return (
        <div className={cx('setting-content')}>
            <h2>Personal</h2>

            <section className={cx('basic-info')}>
                <h3>Basic Information</h3>
                <div className={cx('form-row')}>
                    <div className={cx('profile-pic')}>
                        <div className={cx('upload-box')}>
                            <div className={cx('upload-icon')}>⬆️</div>
                            <p>Browse photo or drop here</p>
                            <small>A photo larger than 400 pixels work best. Max photo size 5 MB.</small>
                        </div>
                    </div>
                    <div className={cx('fields')}>
                        <input type="text" placeholder="Full name" />
                        <input type="text" placeholder="Title/headline" />
                        <select>
                            <option>Select Experience</option>
                            <option>1 year</option>
                            <option>2 years</option>
                            <option>3 years</option>
                        </select>
                        <select>
                            <option>Select Education</option>
                            <option>Bachelor</option>
                            <option>Master</option>
                        </select>
                        <input type="text" placeholder="Personal Website" />
                    </div>
                </div>

                <button className={cx('save-btn')}>Save Changes</button>
            </section>

            <section className={cx('cv-section')}>
                <h3>Your Cv/Resume</h3>
                <div className={cx('cv-list')}>
                    <div className={cx('cv-item')}>
                        <div className={cx('cv-icon')}>📄</div>
                        <div>
                            <p>Professional Resume</p>
                            <small>3.5 MB</small>
                        </div>
                        <div className={cx('cv-actions')}>
                            <button>Edit Resume</button>
                            <button>Delete</button>
                        </div>
                    </div>
                    <div className={cx('cv-item')}>
                        <div className={cx('cv-icon')}>📄</div>
                        <div>
                            <p>Product Designer</p>
                            <small>4.7 MB</small>
                        </div>
                        <div className={cx('cv-actions')}>
                            <button>Edit Resume</button>
                            <button>Delete</button>
                        </div>
                    </div>
                    <div className={cx('cv-item')}>
                        <div className={cx('cv-icon')}>📄</div>
                        <div>
                            <p>Visual Designer</p>
                            <small>1.3 MB</small>
                        </div>
                        <div className={cx('cv-actions')}>
                            <button>Edit Resume</button>
                            <button>Delete</button>
                        </div>
                    </div>

                    <div className={cx('cv-add')}>
                        <div className={cx('cv-add-icon')}>＋</div>
                        <p>Add Cv/Resume</p>
                        <small>Browse file or drop here. only pdf</small>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Personal;
