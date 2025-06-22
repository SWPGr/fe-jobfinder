import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const ActivityChart = ({ data }) => {
    // Chuẩn hóa data cho chart
    const chartData = (data || []).map((item, idx) => ({
        name: `Day ${idx + 1}`,
        'Job Seekers': item.totalJobSeekers ?? 0,
        Employers: item.totalEmployers ?? 0,
        Applications: item.totalAppliedJobs ?? 0,
    }));

    // Lấy mã màu từ biến CSS
    const getVar = (name, fallback) => {
        const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        return val || fallback;
    };
    const colorJobSeekers = getVar('--primary-color-light', '#3b82f6');
    const colorEmployers = getVar('--red-500', '#e05151');
    const colorApplications = getVar('--green-500', '#0ba02c');

    return (
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-100)" vertical={false} />
                    <XAxis
                        dataKey="name"
                        stroke="var(--gray-400)"
                        tick={{ fontSize: 12, fill: 'var(--gray-700)', fontWeight: 300 }}
                        tickLine={false}
                        axisLine={{ stroke: 'var(--gray-200)' }}
                        interval={data.length > 14 ? Math.ceil(data.length / 7) : 0}
                        tickFormatter={(value, idx) => {
                            if (idx === data.length - 1) return `Day ${data.length}`;
                            return value;
                        }}
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
