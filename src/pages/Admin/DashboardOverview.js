import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DashboardOverview.module.scss';
import { Users, Briefcase, FileText, CheckCircle } from 'lucide-react';
import { StatCard } from './StatCard';
import { ActivityChart } from './ActivityChart';
import statisticsService from '~/services/statisticsService';
import { ApplicationTrendChart } from './components/ApplicationTrendChart';
import JobCategoryPieChart from './components/JobCategoryChart';

const cx = classNames.bind(styles);

const statCardsConfig = [
    {
        title: 'Total Job Seekers',
        icon: <Users size={24} />,
        key: 'totalJobSeekers',
        change: '12%',
        isPositive: true,
        desc: 'from last month',
    },
    {
        title: 'Total Employers',
        icon: <Briefcase size={24} />,
        key: 'totalEmployers',
        change: '8%',
        isPositive: true,
        desc: 'from last month',
    },
    {
        title: 'Active Jobs',
        icon: <FileText size={24} />,
        key: 'totalJobs',
        change: '5%',
        isPositive: false,
        desc: 'from last month',
    },
    {
        title: 'Successful Matches',
        icon: <CheckCircle size={24} />,
        key: 'totalAppliedJobs',
        change: '15%',
        isPositive: true,
        desc: 'from last month',
    },
];

const DashboardOverview = () => {
    const [stats, setStats] = useState({
        totalJobSeekers: '...',
        totalEmployers: '...',
        totalJobs: '...',
        totalAppliedJobs: '...',
    });
    const [activityData, setActivityData] = useState([]);
    const [selectedRange, setSelectedRange] = useState(7);
    const [chartKey, setChartKey] = useState(0);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        if (!token) return;

        Promise.all([
            statisticsService.fetchAllJobSeekers(token),
            statisticsService.fetchAllEmployers(token),
            statisticsService.fetchTotalJobs(token),
            statisticsService.fetchTotalAppliedJobs(token),
            statisticsService.fetchDailyTrends(token),
        ])
            .then(([jobSeekersArr, employersArr, totalJobs, totalAppliedJobs, trendsArr]) => {
                setStats({
                    totalJobSeekers: jobSeekersArr?.length ?? 0,
                    totalEmployers: employersArr?.length ?? 0,
                    totalJobs: totalJobs ?? 0,
                    totalAppliedJobs: totalAppliedJobs ?? 0,
                });
                setActivityData(trendsArr || []);
            })
            .catch(() => {
                setStats({
                    totalJobSeekers: 'Err',
                    totalEmployers: 'Err',
                    totalJobs: 'Err',
                    totalAppliedJobs: 'Err',
                });
            });
    }, []);

    useEffect(() => {
        setChartKey((k) => k + 1);
    }, [activityData, selectedRange]);

    const filteredActivityData = activityData.slice(-selectedRange);

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <h1>Dashboard Overview</h1>
                <div className={cx('subtitle')}>
                    Welcome back! Here's what's happening with your job platform today.
                </div>
            </div>
            <div className={cx('statsGrid')}>
                {statCardsConfig.map((card) => (
                    <StatCard
                        key={card.key}
                        title={card.title}
                        value={stats[card.key]}
                        icon={card.icon}
                        change={card.change}
                        isPositive={card.isPositive}
                        desc={card.desc}
                    />
                ))}
            </div>
            <div className={cx('mainGrid')}>
                <div className={cx('card-activity')} style={{ minHeight: '380px' }}>
                    <div className={cx('selectRow')}>
                        <h2>Platform Activity</h2>
                        <select
                            className="text-sm border-gray-300 rounded-md"
                            value={selectedRange}
                            onChange={(e) => setSelectedRange(Number(e.target.value))}
                        >
                            <option value={7}>Last 7 days</option>
                            <option value={30}>Last 30 days</option>
                            <option value={90}>Last 3 months</option>
                        </select>
                    </div>
                    <ActivityChart key={chartKey} data={filteredActivityData} />
                </div>
            </div>

            <div className={cx('chartsRow')}>
                <div className={cx('card')}>
                    <h2>Job Postings by Category</h2>
                    <JobCategoryPieChart />
                </div>
                <div className={cx('card')}>
                    <h2>Applications Submitted Over Time</h2>
                    <ApplicationTrendChart />
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
