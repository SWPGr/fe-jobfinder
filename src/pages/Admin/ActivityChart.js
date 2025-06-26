import React from 'react';
import classNames from 'classnames/bind';
import styles from './DashboardOverview.module.scss';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const cx = classNames.bind(styles);

export const ActivityChart = ({ data, height = 320 }) => {
    const chartData = (data || []).map((item) => {
        // Lấy ngày/tháng từ chuỗi date
        let label = 'N/A';
        if (item.date) {
            // Hỗ trợ cả dạng "YYYY-MM-DD" và "YYYY-MM-DDTHH:mm:ssZ"
            const d = new Date(item.date);
            const day = d.getDate().toString().padStart(2, '0');
            const month = (d.getMonth() + 1).toString().padStart(2, '0');
            label = `${day}/${month}`;
        }
        return {
            name: label,
            'Job Seekers': item.totalJobSeekers ?? 0,
            Employers: item.totalEmployers ?? 0,
            Applications: item.totalAppliedJobs ?? 0,
        };
    });

    const getVar = (name, fallback) => {
        const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        return val || fallback;
    };
    const colorJobSeekers = getVar('--primary-color-light', '#3b82f6');
    const colorEmployers = getVar('--red-500', '#e05151');
    const colorApplications = getVar('--green-500', '#0ba02c');

    return (
        <div className={cx('activityChart-wrapper')}>
            <ResponsiveContainer width="100%" height={height}>
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-100)" vertical={false} />
                    <XAxis
                        dataKey="name"
                        stroke="var(--gray-400)"
                        tick={{ fontSize: 12, fill: 'var(--gray-700)', fontWeight: 300 }}
                        tickLine={false}
                        axisLine={{ stroke: 'var(--gray-200)' }}
                        interval={data.length > 14 ? Math.ceil(data.length / 7) : 0}
                    />
                    <YAxis
                        stroke="var(--gray-400)"
                        tick={{ fontSize: 12, fill: 'var(--gray-700)', fontWeight: 300 }}
                        tickLine={false}
                        axisLine={{ stroke: 'var(--gray-200)' }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--white)',
                            border: 'none',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            borderRadius: '6px',
                            fontFamily: 'var(--font-family)',
                        }}
                    />
                    <Legend verticalAlign="top" height={36} iconType="plainline" />
                    <Line
                        type="monotone"
                        dataKey="Job Seekers"
                        stroke={colorJobSeekers}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                        isAnimationActive={true}
                        animationDuration={1700}
                    />
                    <Line
                        type="monotone"
                        dataKey="Employers"
                        stroke={colorEmployers}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                        isAnimationActive={true}
                        animationDuration={2000}
                    />
                    <Line
                        type="monotone"
                        dataKey="Applications"
                        stroke={colorApplications}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                        isAnimationActive={true}
                        animationDuration={2200}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
