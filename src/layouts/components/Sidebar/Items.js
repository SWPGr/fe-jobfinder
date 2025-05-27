import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import Overview from '../Overview';

import {
    IconStack2,
    IconSettings,
    IconBriefcase,
    IconBookmark,
    IconBellRinging,
    IconUserCircle,
    IconCirclePlus,
    IconNotebook,
    IconBuildingCommunity,
} from '@tabler/icons-react';

const cx = classNames.bind(styles);

export const items = {
    EMPLOYER: [
        {
            title: 'Overview',
            icon: <IconStack2 />, // Replace with actual icon component
            // page: <Overview />, // Example page component
        },
        {
            title: 'Employer Profile',
            icon: <IconUserCircle />, // Replace with actual icon component
        },
        {
            title: 'Post a Job',
            icon: <IconCirclePlus />, // Replace with actual icon component
        },
        {
            title: 'My Jobs',
            icon: <IconBriefcase />, // Replace with actual icon component
        },
        {
            title: 'Saved Candidates',
            icon: <IconBookmark />, // Replace with actual icon component
        },
        {
            title: 'Plans & Billing',
            icon: <IconNotebook />, // Replace with actual icon component
        },
        {
            title: 'All Companies',
            icon: <IconBuildingCommunity />, // Replace with actual icon component
        },
        {
            title: 'Settings',
            icon: <IconSettings />, // Replace with actual icon component
        },
    ],

    JOB_SEEKER: [
        {
            title: 'Overview',
            icon: <IconStack2 />, // Replace with actual icon component
            page: <Overview />, // Example page component
        },
        {
            title: 'Applied Jobs',
            icon: <IconBriefcase />, // Replace with actual icon component
        },
        {
            title: 'Favorite Jobs',
            icon: <IconBookmark />, // Replace with actual icon component
        },
        {
            title: 'Job Alert',
            icon: <IconBellRinging />, // Replace with actual icon component
            rightSection: <span className={cx('badge')}>3</span>, // Example right section
        },
        {
            title: 'Settings',
            icon: <IconSettings />, // Replace with actual icon component
        },
    ],
};
