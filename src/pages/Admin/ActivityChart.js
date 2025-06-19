import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const ActivityChart = () => {
    const generateData = () => {
        const data = [];
        let jobSeekers = 100;
        let employers = 40;
        let applications = 70;
        for (let i = 0; i < 30; i++) {
            jobSeekers += Math.random() * 20 - 10;
            employers += Math.random() * 10 - 5;
            applications += Math.random() * 15 - 7.5;
            data.push({
                name: `Day ${i + 1}`,
                'Job Seekers': Math.round(jobSeekers),
                Employers: Math.round(employers),
                Applications: Math.round(applications),
            });
        }
        return data;
    };
    const data = generateData();
    return (
        <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis
                        dataKey="name"
                        stroke="#9ca3af"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: '#e5e7eb' }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'white',
                            border: 'none',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            borderRadius: '6px',
                        }}
                    />
                    <Legend verticalAlign="top" height={36} iconType="plainline" />
                    <Line
                        type="monotone"
                        dataKey="Job Seekers"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Employers"
                        stroke="#f43f5e"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="Applications"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
