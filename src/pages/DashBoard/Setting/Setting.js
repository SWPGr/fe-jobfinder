import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Setting.module.scss';
import { IconUserCircle, IconWorld, IconSettings } from '@tabler/icons-react';

import Personal from './Personal/Personal';
// import Profile from './Profile/Profile';
import SocialLinks from './SocialLinks/SocialLinks';
import AccountSetting from './AccountSetting/AccountSetting';

const cx = classNames.bind(styles);

export default function Setting() {
    const tabs = [
        { id: 'personal', label: 'Personal', icon: <IconUserCircle /> }, // Thêm biểu tượng cho tab Personal

        { id: 'Social Media Profile', label: 'Social Media Profile', icon: <IconWorld /> },
        { id: 'accountSetting', label: 'Account Setting', icon: <IconSettings /> },
    ];

    const [activeTab, setActiveTab] = useState('personal'); // Mặc định là Personal
    const tabComponents = {
        personal: Personal,
        'Social Media Profile': SocialLinks,
        accountSetting: AccountSetting,
    };
    const ActiveComponent = tabComponents[activeTab];

    const goToNextTab = () => {
        const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1].id);
        }
    };

    const handleSave = (data) => {
        console.log('Saved data:', data); // Logic lưu dữ liệu (có thể thay bằng API call)
    };

    return (
        <div className={cx('setting-container')}>
            <h2 className={cx('title')}>Settings</h2>
            <div className={cx('tabs')}>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={cx('tab-button', { active: tab.id === activeTab })}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>
            <div className={cx('tab-content')}>
                {ActiveComponent && <ActiveComponent key={activeTab} onSave={handleSave} goToNextTab={goToNextTab} />}
            </div>
        </div>
    );
}
