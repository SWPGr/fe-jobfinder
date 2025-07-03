import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
} from 'recharts';
import { ChevronDownIcon, TrendingUpIcon, BriefcaseIcon } from 'lucide-react';

import { jobMarketTrendsService, jobService } from '~/services';
import '~/index.css';
import StatCard from './components/StateCard';
import CustomTooltip from './components/CustomToolTip';
import CustomLegend from './components/CustomLegend';
import { format } from '~/utils';
import JobItem from './components/JobItem';

const recentJobs = [
    {
        id: 1,
        title: 'Senior Java Developer - 3I094',
        company: 'Ngân hàng TMCP Hàng Hải Việt Nam',
        location: 'Hà Nội',
        logo: 'https://cdn-icons-png.flaticon.com/512/732/732212.png',
    },
    {
        id: 2,
        title: 'Kế Toán Tổng Hợp (Đi Làm Ngay)',
        company: 'CÔNG TY TNHH THƯƠNG MẠI V...',
        location: 'Hà Nội',
        logo: 'https://cdn-icons-png.flaticon.com/512/906/906324.png',
    },
    {
        id: 3,
        title: 'Trưởng Phòng Kinh Doanh',
        company: 'Công ty Cổ Phần Nhựa Thiếu Niên...',
        location: 'Cần Thơ, Khánh Hoà',
        logo: 'https://cdn-icons-png.flaticon.com/512/2748/2748558.png',
    },
];

const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#06b6d4', '#eab308'];

const valuesSet = [
    { name: 'quantity_job_new_today', title: 'Việc làm mới 24h gần đây' },
    { name: 'quantity_job_recruitment', title: 'Việc làm đang tuyển' },
    { name: 'quantity_company_recruitment', title: 'Công ty đang tuyển' },
];

const cx = classNames.bind(styles);

const JobMarketTrends = () => {
    const [selectedIndustry, setSelectedIndustry] = useState('Ngành nghề');
    const [figure, setFigure] = useState([]);
    const [jobOpportunity, setJobOpportunity] = useState([]);
    const [listTop, setListTop] = useState([]);
    const [date, setDate] = useState('');
    const [topJobs, setTopJobs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res1 = await jobMarketTrendsService.getWorkMarket();
                const data1 = valuesSet.map((item) => ({
                    title: item.title,
                    value: res1.data[item.name],
                }));
                setFigure(data1);
                setDate(res1.data['time_scan'].split(' ')[1]);

                const res2 = await jobMarketTrendsService.getJobOpportunitiesGrowth();
                const growthData = res2.data.map((item) => {
                    const [day, month] = item.key.split('/');
                    return { ...item, key: `${day}/${month}` };
                });
                setJobOpportunity(growthData);

                const res3 = await jobMarketTrendsService.getListTop();
                const top = Object.values(res3.data.categories)
                    .slice(0, 5)
                    .map((item, index) => ({
                        ...item,
                        job_category_count: Number(item.job_category_count.replace(/\./g, '')),
                    }));
                setListTop(top);

                const res4 = await jobService.getTopLatestJobs();
                const data = res4.map((job) => {
                    return format.transformJobData(job);
                });
                setTopJobs(data.slice(0, 4));
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={cx('job-market-trends')}>
            <div className="w-full max-w-[1350px] p-5 mx-auto bg-gradient-to-br from-[#2f3338]  to-[#9199a3] rounded-xl overflow-hidden shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        Thị trường việc làm hôm nay <span className="text-[#93c5fd]">{date}</span>
                    </h2>
                    <div className="w-16 h-16 opacity-30">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3585/3585145.png"
                            alt="Market trends"
                            className="w-full h-full"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-3 bg-[#18191c] bg-opacity-40 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                            <BriefcaseIcon className="mr-2 h-5 w-5 text-[#0a65cc]" />
                            Việc làm mới nhất
                        </h3>
                        <div className="space-y-4">
                            {topJobs.map((job) => (
                                <JobItem key={job.id} job={job} />
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-9 flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {figure.map((item, index) => (
                                <StatCard key={index} number={item.value} label={item.title} />
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-[#18191c] bg-opacity-40 rounded-lg p-4">
                                <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                                    <TrendingUpIcon className="mr-2 h-5 w-5 text-[#0a65cc]" />
                                    Tăng trưởng cơ hội việc làm
                                </h3>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={jobOpportunity}
                                            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                                        >
                                            <defs>
                                                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#0a65cc" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#0a65cc" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <XAxis
                                                dataKey="key"
                                                tick={{ fill: '#f1f2f4', fontSize: 10 }}
                                                axisLine={{ stroke: '#555' }}
                                                angle={-30}
                                                textAnchor="end"
                                                interval={4} // hiển thị 1 nhãn mỗi 2 mục
                                            />
                                            <YAxis
                                                domain={[46000, 56000]}
                                                ticks={[
                                                    46000, 47000, 48000, 49000, 50000, 51000, 52000, 53000, 54000,
                                                    55000, 56000,
                                                ]}
                                                tick={{ fill: '#f1f2f4', fontSize: 10 }}
                                                tickFormatter={(v) => `${v.toLocaleString()}`}
                                                axisLine={{ stroke: '#555' }}
                                            />
                                            <CartesianGrid strokeDasharray="3 3" stroke="#555" vertical={false} />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Area
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#0a65cc"
                                                fillOpacity={1}
                                                fill="url(#colorGrowth)"
                                                strokeWidth={2}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="bg-[#18191c] bg-opacity-40 rounded-lg p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-medium text-white flex items-center">
                                        <TrendingUpIcon className="mr-2 h-5 w-5 text-[#0a65cc]" />
                                        Nhu cầu tuyển dụng theo
                                    </h3>
                                    <button className="flex items-center text-white bg-[#0a65cc] bg-opacity-50 rounded-md px-3 py-1 text-sm">
                                        {selectedIndustry}
                                        <ChevronDownIcon className="ml-1 h-4 w-4" />
                                    </button>
                                </div>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={listTop} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                                            <YAxis
                                                tick={{ fill: '#f1f2f4', fontSize: 10 }}
                                                axisLine={{ stroke: '#555' }}
                                                tickFormatter={(v) => `${v.toLocaleString()}`}
                                            />
                                            <Tooltip content={<CustomTooltip />} />
                                            <defs>
                                                {listTop.map((_, index) => (
                                                    <linearGradient
                                                        key={index}
                                                        id={`gradient-${index}`}
                                                        x1="0"
                                                        y1="0"
                                                        x2="0"
                                                        y2="1"
                                                    >
                                                        <stop offset="0%" stopColor={colors[index]} stopOpacity={1} />
                                                        <stop
                                                            offset="100%"
                                                            stopColor={colors[index]}
                                                            stopOpacity={0.5}
                                                        />
                                                    </linearGradient>
                                                ))}
                                            </defs>
                                            <Bar dataKey="job_category_count" isAnimationActive={false}>
                                                {listTop.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <CustomLegend
                                    payload={listTop.map((item, index) => ({ color: colors[index], payload: item }))}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobMarketTrends;
