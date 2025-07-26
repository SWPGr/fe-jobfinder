// 📁 Items.js
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
    IconChecklist,
    IconFlag,
} from '@tabler/icons-react';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';

import Dashboard1 from '../../../pages/DashBoard/Dashboard';
import AppliedJobs from '../../../pages/DashBoard/AppliedJobs/AppliedJobs';
import FavoriteJobs from '../../../pages/DashBoard/FavoriteJobs/FavoriteJobs';
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
import SettingAdmin from '~/pages/Admin/SettingAdmin';
import Setting from '~/pages/DashBoard/Setting/Setting';
import { CreditCard } from 'lucide-react';
import PaymentManagement from '~/pages/Admin/PaymentManagement';

import Reports from '~/pages/Admin/Reports';
const cx = classNames.bind(styles);

export const items = {
    ADMIN: {
        header: 'ADMIN DASHBOARD',
        items: [
            {
                title: 'Overview',
                icon: <IconStack2 />,
                page: (chartKey = 0) => <DashboardOverview chartKey={chartKey} />,
                link: '/dashboard/overview',
            },
            {
                title: 'Manage Jobs',
                icon: <IconBriefcase />,
                page: <Jobs />,
                link: '/dashboard/jobs',
            },
            {
                title: 'Manage Employers',
                icon: <IconUserCircle />,
                page: <EmployersManagement />,
                link: '/dashboard/employers',
            },
            {
                title: 'Manage Job Seekers',
                icon: <IconUserCircle />,
                page: <JobSeekersManagement />,
                link: '/dashboard/job-seekers',
            },
            {
                title: 'Payment',
                icon: <CreditCard size={20} />,
                link: '/dashboard/payment',
                page: <PaymentManagement />,
            },
            {
                title: 'Reports',
                icon: <IconFlag />,
                link: '/dashboard/reports',
                page: <Reports />,
            },
            {
                title: 'Settings',
                icon: <IconSettings />,

                link: '/dashboard/settings',
                page: <SettingAdmin />,
            },
        ],
    },

    EMPLOYER: {
        header: 'CANDIDATE DASHBOARD',
        items: [
            {
                title: 'Overview',
                icon: <IconStack2 />,
                page: <Overview1 />,
                link: '/dashboard/overview',
            },
            {
                title: 'Employer Profile',
                icon: <IconUserCircle />,
                page: <Single />,
                link: '/dashboard/profile',
            },
            {
                title: 'Post a Job',
                icon: <IconCirclePlus />,
                page: <PostJob />,
                link: '/dashboard/postjob',
            },
            {
                title: 'My Jobs',
                icon: <IconBriefcase />,
                page: <MyJob />,
                link: '/dashboard/my-jobs',
            },
            {
                title: 'Saved Candidates',
                icon: <IconBookmark />,
                page: <SavedCandidates />,
                link: '/dashboard/saved-candidates',
            },
            {
                title: 'Plans & Billing',
                icon: <IconNotebook />,
                page: <PlansBilling />,
                link: '/dashboard/plans',
                children: [
                    {
                        title: 'Manage Plans',
                        icon: <IconChecklist />,
                        page: <PlansBilling />,
                        link: '/dashboard/plans/manage-plans',
                    },
                    {
                        title: 'Payment History',
                        icon: <CreditCard size={20} />,
                        page: <PlansBilling />,
                        link: '/dashboard/plans/payment-history',
                    },
                ],
            },
            // {
            //     title: 'All Companies',
            //     icon: <IconBuildingCommunity />,
            //     page: null,
            //     link: '/dashboard/companies',
            // },
            {
                title: 'Settings',
                icon: <IconSettings />,
                page: <SettingsPage />,
                link: '/dashboard/settings',
            },
        ],
    },

    JOB_SEEKER: {
        header: 'JOB SEEKER DASHBOARD',
        items: [
            {
                title: 'Overview',
                icon: <IconStack2 />,
                page: <Dashboard1 />,
                link: '/dashboard/overview',
            },
            {
                title: 'Applied Jobs',
                icon: <IconBriefcase />,
                page: <AppliedJobs />,
                link: '/dashboard/applied',
            },
            {
                title: 'Favorite Jobs',
                icon: <IconBookmark />,
                page: <FavoriteJobs />,
                link: '/dashboard/favorites',
            },
            {
                title: 'Job Alert',
                icon: <IconBellRinging />,
                rightSection: <span className={cx('badge')}>3</span>,
                page: <JobAlerts />,
                link: '/dashboard/alerts',
            },
            {
                title: 'Plans & Billing',
                icon: <IconNotebook />,
                page: <PlansBilling />,
                link: '/dashboard/plans',
                children: [
                    {
                        title: 'Manage Plans',
                        icon: <IconChecklist />,
                        page: <PlansBilling />,
                        link: '/dashboard/plans/manage-plans',
                    },
                    {
                        title: 'Payment History',
                        icon: <CreditCard size={20} />,
                        page: <PlansBilling />,
                        link: '/dashboard/plans/payment-history',
                    },
                ],
            },
            {
                title: 'Settings',
                icon: <IconSettings />,
                page: <Setting />,
                link: '/dashboard/settings',
            },
        ],
    },
};
