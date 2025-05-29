import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import Overview from '../../../pages/Overview';

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
import Dashboard1 from '../../../pages/DashBoard/Dashboard'; //Overview của Job Seeker
import AppliedJobs from '../../../pages/DashBoard/AppliedJobs/AppliedJobs'; //Applied Jobs page của Job Seeker
import FavoriteJobs from '../../../pages/DashBoard/FavoriteJobs/FavoriteJobs'; //Favorite Jobs page của Job Seeker
import JobAlerts from '~/pages/DashBoard/JobAlerts/JobAlerts';
import Setting from '~/pages/DashBoard/Setting/Setting';
const cx = classNames.bind(styles);

export const items = {
    EMPLOYER: [
        {
            title: 'Overview',
            icon: <IconStack2 />, // Replace with actual icon component
            // page: <Overview />, // Example page component
            page: <Overview />,
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
            page: <Dashboard1 />, // Example page component
        },
        {
            title: 'Applied Jobs',
            icon: <IconBriefcase />, // Replace with actual icon component
            page: <AppliedJobs />,
        },
        {
            title: 'Favorite Jobs',
            icon: <IconBookmark />, // Replace with actual icon component
            page: <FavoriteJobs />,
        },
        {
            title: 'Job Alert',
            icon: <IconBellRinging />, // Replace with actual icon component
            rightSection: <span className={cx('badge')}>3</span>, // Example right section
            page: <JobAlerts />,
        },
        {
            title: 'Settings',
            icon: <IconSettings />, // Replace with actual icon component
            page: <Setting />,
        },
    ],
};
