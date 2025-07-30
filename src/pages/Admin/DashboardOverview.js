import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DashboardOverview.module.scss';
import { ActivityChart } from './ActivityChart';
import statisticsService from '~/services/statisticsService';
import { ApplicationTrendChart } from './components/ApplicationTrendChart';
import JobCategoryPieChart from './components/JobCategoryChart';
import { AdminHeader, QuickStats } from './components';

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
    const [statCardData, setStatCardData] = useState(null);
    const [totalJobs, setTotalJobs] = useState('...');

    // Quick stats data for the new QuickStats component
    const quickStatsData = [
        {
            value: statCardData?.currentMonthTotalJobSeekers || 0,
            label: 'Job Seekers',
            trend: statCardData?.jobSeekersChangePercentage || 0,
            format: 'number',
            description: 'Active job seekers this month'
        },
        {
            value: statCardData?.currentMonthTotalEmployers || 0,
            label: 'Employers',
            trend: statCardData?.employersChangePercentage || 0,
            format: 'number',
            description: 'Registered employers this month'
        },
        {
            value: statCardData?.currentMonthTotalJobs || 0,
            label: 'Active Jobs',
            trend: statCardData?.jobsChangePercentage || 0,
            format: 'number',
            description: 'Job postings this month'
        },
        {
            value: statCardData?.currentMonthTotalAppliedJobs || 0,
            label: 'Applications',
            trend: statCardData?.appliedJobsChangePercentage || 0,
            format: 'number',
            description: 'Job applications submitted'
        }
    ];

    const statCardsConfig = statCardData
        ? [
            {
                title: 'Total Job Seekers',
                value: statCardData.currentMonthTotalJobSeekers,
                change: statCardData.jobSeekersChangePercentage,
                status: statCardData.jobSeekersStatus,
            },
            {
                title: 'Total Employers',
                value: statCardData.currentMonthTotalEmployers,
                change: statCardData.employersChangePercentage,
                status: statCardData.employersStatus,
            },
            {
                title: 'Active Jobs',
                value: statCardData.currentMonthTotalJobs,
                change: statCardData.jobsChangePercentage,
                status: statCardData.jobsStatus,
            },
            {
                title: 'Successful Matches',
                value: statCardData.currentMonthTotalAppliedJobs,
                change: statCardData.appliedJobsChangePercentage,
                status: statCardData.appliedJobsStatus,
            },
        ]
        : [];

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user'))?.token;
        if (!token) return;

        statisticsService
            .fetchMonthOverMonthComparison(token)
            .then((result) => {
                setStatCardData(result);
            })
            .catch(() => {
                setStatCardData(null);
            });
    }, []);

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
        statisticsService.fetchTotalJobs().then((result) => {
            setTotalJobs(result ?? '...');
        });
    }, []);

    useEffect(() => {
        setChartKey((k) => k + 1);
    }, [activityData, selectedRange]);

    const filteredActivityData = activityData.slice(-selectedRange);

    return (
        <div className={cx('container')}>
            {/* New AdminHeader component */}
            <AdminHeader
                title="Dashboard Overview"
                subtitle="Welcome back! Here's what's happening with your job platform today."
                breadcrumbs={['Dashboard']}
                stats={statCardsConfig.map(card => ({
                    title: card.title,
                    value: card.value,
                    change: card.change,
                    status: card.status,
                    description: card.status === 'nochange'
                        ? 'unchanged from last month'
                        : 'from last month'
                }))}
            />

            {/* New QuickStats component */}
            {/* <QuickStats stats={quickStatsData} /> */}

            {/* Removed StatCard section - now integrated into AdminHeader */}

            <div className={cx('mainGrid')}>
                <div className={cx('card-activity')} style={{ minHeight: '320px' }}>
                    <div className={cx('selectRow')}>
                        <h2 style={{ fontSize: '16px', margin: '0 0 8px 0' }}>Platform Activity</h2>
                        <select
                            className="text-sm border-gray-300 rounded-md"
                            value={selectedRange}
                            onChange={(e) => setSelectedRange(Number(e.target.value))}
                            style={{ fontSize: '12px', padding: '4px 8px' }}
                        >
                            <option value={7}>Last 7 days</option>
                            <option value={30}>Last 30 days</option>
                            <option value={90}>Last 3 months</option>
                        </select>
                    </div>
                    <ActivityChart key={chartKey} data={filteredActivityData} />
                    {/* Summary Table for Total Jobs */}
                    <div className={cx('summaryTable')} style={{ marginTop: 12, fontSize: '12px' }}>
                        <table>
                            <tbody>
                                <tr>
                                    <td><b>Total Jobs (All Time):</b></td>
                                    <td>{totalJobs}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className={cx('chartsRow')}>
                <div className={cx('card')}>
                    <h2 style={{ fontSize: '16px', margin: '0 0 12px 0' }}>Job Postings by Category</h2>
                    <JobCategoryPieChart />
                </div>
                <div className={cx('card')}>
                    <h2 style={{ fontSize: '16px', margin: '0 0 12px 0' }}>Applications Submitted Over Time</h2>
                    <ApplicationTrendChart />
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
