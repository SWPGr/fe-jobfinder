import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DashboardOverview.module.scss';
import { Users, Briefcase, FileText, CheckCircle } from 'lucide-react';
import { StatCard } from './StatCard';
import { ActivityChart } from './ActivityChart';
import { fetchDailyTrends } from '~/services/statisticsService';
import { JobCategoryPieChart } from './components/JobCategoryChart';
import { ApplicationTrendChart } from './components/ApplicationTrendChart';

const cx = classNames.bind(styles);

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
        fetchDailyTrends(token)
            .then((arr) => {
                if (!arr || !arr.length) return;
                setActivityData(arr);
                const lastDay = arr[arr.length - 1];
                setStats({
                    totalJobSeekers: lastDay.totalJobSeekers ?? 0,
                    totalEmployers: lastDay.totalEmployers ?? 0,
                    totalJobs: lastDay.totalJobs ?? 0,
                    totalAppliedJobs: lastDay.totalAppliedJobs ?? 0,
                });
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
                <StatCard
                    title="Total Job Seekers"
                    value={stats.totalJobSeekers}
                    icon={<Users size={24} />}
                    change="12%"
                    isPositive={true}
                />
                <StatCard
                    title="Total Employers"
                    value={stats.totalEmployers}
                    icon={<Briefcase size={24} />}
                    change="8%"
                    isPositive={true}
                />
                <StatCard
                    title="Total Jobs"
                    value={stats.totalJobs}
                    icon={<FileText size={24} />}
                    change="5%"
                    isPositive={false}
                />
                <StatCard
                    title="Successful Matches"
                    value={stats.totalAppliedJobs}
                    icon={<CheckCircle size={24} />}
                    change="15%"
                    isPositive={true}
                />
            </div>
            <div className={cx('mainGrid')}>
                <div className={cx('card')} style={{ minHeight: '380px' }}>
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
                <div className={cx('card')}>
                    <h2>Recent Activity</h2>
                    <div className="space-y-5">{/* Recent Activity */}</div>
                    <button className="mt-5 text-sm font-medium text-blue-600 hover:text-blue-500">
                        View all activity
                    </button>
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
