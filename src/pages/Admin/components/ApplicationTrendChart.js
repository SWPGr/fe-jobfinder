import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
export const ApplicationTrendChart = () => {
    const [timeRange, setTimeRange] = useState('week');
    const generateData = () => {
        const data = [];
        let value = 150;
        const days = timeRange === 'week' ? 7 : 30;
        for (let i = 0; i < days; i++) {
            value += Math.random() * 40 - 20;
            data.push({
                day: `Day ${i + 1}`,
                applications: Math.round(value),
            });
        }
        return data;
    };
    const data = generateData();
    return (
        <div className="h-80">
            <div className="mb-4 flex justify-end">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        onClick={() => setTimeRange('week')}
                        className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
                            timeRange === 'week'
                                ? 'bg-blue-50 text-blue-600 border-blue-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        Week
                    </button>
                    <button
                        onClick={() => setTimeRange('month')}
                        className={`px-4 py-2 text-sm font-medium rounded-r-md border-t border-r border-b ${
                            timeRange === 'month'
                                ? 'bg-blue-50 text-blue-600 border-blue-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                        Month
                    </button>
                </div>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="day"
                        stroke="#9ca3af"
                        tick={{
                            fontSize: 12,
                        }}
                    />
                    <YAxis
                        stroke="#9ca3af"
                        tick={{
                            fontSize: 12,
                        }}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'white',
                            border: 'none',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            borderRadius: '6px',
                        }}
                    />
                    <Bar dataKey="applications" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
