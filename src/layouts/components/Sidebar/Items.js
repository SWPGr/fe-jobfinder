import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

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

import SettingsPage from '~/pages/CreateCVSeeker/SettingsPage';
import PostJob from '~/pages/CreateCVSeeker/PostJob';
import SavedCandidates from '~/pages/CreateCVSeeker/SavedCandidates';
import MyJob from '~/pages/CreateCVSeeker/MyJob';
import PlansBilling from '~/pages/CreateCVSeeker/PlansBilling';
import Overview1 from '~/pages/CreateCVSeeker/Overview1';
import Single from '~/pages/Single/Single';
import DashboardOverview from '~/pages/Admin/DashboardOverview';
import EmployersManagement from '~/pages/Admin/EmployersManagement';
import JobSeekersManagement from '../../../pages/Admin/JobSeekersManagement';
import Jobs from '~/pages/Admin/components/Jobs';
import Setting from '~/pages/Admin/Setting';
const cx = classNames.bind(styles);

export const items = {
    ADMIN: {
        header: 'ADMIN DASHBOARD',
        items: [
            {
                title: 'Overview',
                icon: <IconStack2 />,
                page: (chartKey = 0) => <DashboardOverview chartKey={chartKey} />,
            },
            {
                title: 'Manage Jobs',
                icon: <IconBriefcase />,
                page: <Jobs />,
            },
            {
                title: 'Manage Employers',
                icon: <IconUserCircle />,
                page: <EmployersManagement />,
            },
            {
                title: 'Manage Job Seekers',
                icon: <IconUserCircle />,
                page: <JobSeekersManagement />,
            },
            {
                title: 'Settings',
                icon: <IconSettings />,
                page: <Setting />,
            },
        ],
    },

    EMPLOYER: {
        header: 'CANDIDATE DASHBOARD',
        items: [
            {
                title: 'Overview',
                icon: <IconStack2 />, // Replace with actual icon component

                // page: <Overview />, // Example page component

                page: <Overview1 />,
            },
            {
                title: 'Employer Profile',
                icon: <IconUserCircle />, // Replace with actual icon component
                page: <Single />,
            },
            {
                title: 'Post a Job',
                icon: <IconCirclePlus />, // Replace with actual icon component
                page: <PostJob />,
            },
            {
                title: 'My Jobs',
                icon: <IconBriefcase />, // Replace with actual icon component
                page: <MyJob />,
            },
            {
                title: 'Saved Candidates',
                icon: <IconBookmark />, // Replace with actual icon component
                page: <SavedCandidates />,
            },
            {
                title: 'Plans & Billing',
                icon: <IconNotebook />, // Replace with actual icon component
                page: <PlansBilling />,
            },
            {
                title: 'All Companies',
                icon: <IconBuildingCommunity />, // Replace with actual icon component
            },
            {
                title: 'Settings',
                icon: <IconSettings />, // Replace with actual icon component
                page: <SettingsPage />,
            },
        ],
    },

    JOB_SEEKER: {
        header: 'JOB SEEKER DASHBOARD',
        items: [
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
    },
};
