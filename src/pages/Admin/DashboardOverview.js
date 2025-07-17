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

    const statCardsConfig = statCardData
        ? [
              {
                  title: 'Total Job Seekers',
                  value: statCardData.currentMonthTotalJobSeekers,
                  change: statCardData.jobSeekersChangePercentage,
                  status: statCardData.jobSeekersStatus,
                  icon: <Users size={24} />,
              },
              {
                  title: 'Total Employers',
                  value: statCardData.currentMonthTotalEmployers,
                  change: statCardData.employersChangePercentage,
                  status: statCardData.employersStatus,
                  icon: <Briefcase size={24} />,
              },
              {
                  title: 'Active Jobs',
                  value: statCardData.currentMonthTotalJobs,
                  change: statCardData.jobsChangePercentage,
                  status: statCardData.jobsStatus,
                  icon: <FileText size={24} />,
              },
              {
                  title: 'Successful Matches',
                  value: statCardData.currentMonthTotalAppliedJobs,
                  change: statCardData.appliedJobsChangePercentage,
                  status: statCardData.appliedJobsStatus,
                  icon: <CheckCircle size={24} />,
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
                        key={card.title}
                        title={card.title}
                        value={card.value}
                        icon={card.icon}
                        status={card.status}
                        change={
                            card.status === 'nochange'
                                ? '0.00%' // hoặc '±0%' tùy bạn
                                : parseFloat(card.change) === 100
                                ? '100%' // không có phần thập phân
                                : `${parseFloat(card.change).toFixed(2)}%`
                        }
                        isPositive={card.status === 'increase'}
                        desc={
                            card.status === 'nochange'
                                ? 'unchanged from last month'
                                : card.status === 'increase'
                                ? 'from last month'
                                : 'from last month'
                        }
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
