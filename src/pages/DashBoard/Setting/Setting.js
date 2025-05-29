import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Setting.module.scss';

import Personal from './Personal/Personal';
import Profile from './Profile/Profile';
import SocialLinks from './SocialLinks/SocialLinks';
import AccountSetting from './AccountSetting/AccountSetting';
const cx = classNames.bind(styles);

function Setting() {
    const tabs = [
        { id: 'personal', label: 'Personal', component: Personal },
        { id: 'profile', label: 'Profile', component: Profile },
        { id: 'socialLinks', label: 'Social Links', component: SocialLinks },
        { id: 'accountSetting', label: 'Account Setting', component: AccountSetting },
    ];

    const [activeTab, setActiveTab] = useState('personal');

    const ActiveComponent = tabs.find((tab) => tab.id === activeTab)?.component;

    return (
        <div className={cx('setting-container')}>
            <h1>Setting</h1>

            <div className={cx('tabs')}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={cx('tab-button', { active: activeTab === tab.id })}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className={cx('tab-content')}>{ActiveComponent && <ActiveComponent />}</div>
        </div>
    );
}

export default Setting;
