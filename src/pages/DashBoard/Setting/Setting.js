import React, { useState } from 'react';
import { useClickOutside } from '@mantine/hooks';
import { Transition, Paper, Button, Box } from '@mantine/core';
import classNames from 'classnames/bind';
import styles from './Setting.module.scss';

import Personal from './Personal/Personal';
import Profile from './Profile/Profile';
import SocialLinks from './SocialLinks/SocialLinks';
import AccountSetting from './AccountSetting/AccountSetting';

const cx = classNames.bind(styles);

// Transition config for dropdown
const scaleY = {
    in: { opacity: 1, transform: 'scaleY(1)' },
    out: { opacity: 0, transform: 'scaleY(0)' },
    common: { transformOrigin: 'top' },
    transitionProperty: 'transform, opacity',
};

export default function Setting() {
    const tabs = [
        { id: 'personal', label: 'Personal' },
        { id: 'profile', label: 'Profile' },
        { id: 'socialLinks', label: 'Social Links' },
        { id: 'accountSetting', label: 'Account Setting' },
    ];

    const [activeTab, setActiveTab] = useState('accountSetting'); // Set to 'accountSetting' as per screenshot
    const [opened, setOpened] = useState(false);
    const closeRef = useClickOutside(() => setOpened(false));

    // Map tab ID to corresponding component
    const tabComponents = {
        personal: Personal,
        profile: Profile,
        socialLinks: SocialLinks,
        accountSetting: AccountSetting,
    };
    const ActiveComponent = tabComponents[activeTab];

    return (
        <div className={cx('setting-container')}>
            <h1>Setting</h1>
            <div className={cx('tabs')} ref={closeRef}>
                {/* Mobile dropdown (visible only on screens <= 1024px) */}
                <Box
                    maw={250} // Increased width to accommodate longer labels
                    pos="relative"
                    className={cx('mobile-dropdown')}
                    sx={{
                        display: { base: 'block', lg: 'none' },
                        width: '100%',
                        textAlign: 'center',
                        fontSize: 'large',
                    }}
                >
                    <Button
                        onClick={() => setOpened((o) => !o)}
                        variant="default"
                        fullWidth
                        className={cx('dropdown-button')}
                    >
                        {tabs.find((t) => t.id === activeTab).label}
                    </Button>
                    <Transition mounted={opened} transition={scaleY} duration={200} timingFunction="ease" keepMounted>
                        {(transitionStyles) => (
                            <Paper
                                shadow="md"
                                p="sm"
                                pos="absolute"
                                top="100%"
                                left="50%"
                                right="auto"
                                style={{
                                    ...transitionStyles,
                                    zIndex: 10,
                                    minWidth: '200px',
                                    height: 'auto',
                                    fontSize: 'large',
                                    transform: `${transitionStyles.transform} translateX(-50%)`,
                                }} // Increased height for all items
                            >
                                {tabs.map((tab) => (
                                    <Button
                                        key={tab.id}
                                        variant="subtle"
                                        fullWidth
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            setOpened(false);
                                        }}
                                        className={cx('mobile-item', { active: tab.id === activeTab })}
                                    >
                                        {tab.label}
                                    </Button>
                                ))}
                            </Paper>
                        )}
                    </Transition>
                </Box>

                {/* Desktop tabs (visible only on screens > 1024px) */}
                <nav className={cx('desktop-tabs')} sx={{ display: { base: 'none', lg: 'flex' } }}>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={cx('tab-button', { active: tab.id === activeTab })}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>

            <div className={cx('tab-content')}>{ActiveComponent && <ActiveComponent key={activeTab} />}</div>
        </div>
    );
}
