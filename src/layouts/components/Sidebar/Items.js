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
    IconChecklist,
    IconFlag,
} from '@tabler/icons-react';
import { lazy } from 'react';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { CreditCard } from 'lucide-react';

const AppliedJobs = lazy(() => import('~/pages/DashBoard/AppliedJobs/AppliedJobs'));
const FavoriteJobs = lazy(() => import('~/pages/DashBoard/FavoriteJobs/FavoriteJobs'));
const JobAlerts = lazy(() => import('~/pages/DashBoard/JobAlerts/JobAlerts'));

const SettingsPage = lazy(() => import('~/pages/CreateCVSeeker/SettingsPage'));
const PostJob = lazy(() => import('~/pages/CreateCVSeeker/PostJob'));
// const SavedCandidates = lazy(() => import('~/pages/CreateCVSeeker/SavedCandidates'));
const MyJob = lazy(() => import('~/pages/CreateCVSeeker/MyJob'));
const PlansBilling = lazy(() => import('~/pages/CreateCVSeeker/PlansBilling'));
const Overview1 = lazy(() => import('~/pages/CreateCVSeeker/Overview1'));
const Single = lazy(() => import('~/pages/Single/Single'));
const DashboardOverview = lazy(() => import('~/pages/Admin/DashboardOverview'));
const EmployersManagement = lazy(() => import('~/pages/Admin/EmployersManagement'));
const JobSeekersManagement = lazy(() => import('~/pages/Admin/JobSeekersManagement'));
const Jobs = lazy(() => import('~/pages/Admin/components/Jobs'));
const SettingAdmin = lazy(() => import('~/pages/Admin/SettingAdmin'));
const Setting = lazy(() => import('~/pages/DashBoard/Setting/Setting'));
const PaymentManagement = lazy(() => import('~/pages/Admin/PaymentManagement'));

const Reports = lazy(() => import('~/pages/Admin/Reports'));

const Dashboard1 = lazy(() => import('~/pages/DashBoard/Dashboard'));

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
            // {
            //     title: 'Saved Candidates',
            //     icon: <IconBookmark />,
            //     page: <SavedCandidates />,
            //     link: '/dashboard/saved-candidates',
            // },
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
