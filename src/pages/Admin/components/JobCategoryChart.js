import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    { category: 'Software Development', count: 245 },
    { category: 'Marketing', count: 186 },
    { category: 'Sales', count: 164 },
    { category: 'Design', count: 142 },
    { category: 'Customer Service', count: 128 },
    { category: 'Finance', count: 112 },
    { category: 'HR', count: 98 },
    { category: 'Operations', count: 86 },
];

const COLORS = [
    'var(--primary-color-light)',
    'var(--blue-300)',
    'var(--blue-400)',
    'var(--blue-200)',
    'var(--green-400)',
    'var(--green-500)',
    'var(--red-400)',
    'var(--orange-500)',
];

export const JobCategoryPieChart = () => (
    <div
        style={{
            height: 300,
            width: 420,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 0,
        }}
    >
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="44%" // Tăng vị trí xuống dưới
                    outerRadius={80}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                    stroke="#fff"
                    style={{ fontSize: 12, fontWeight: 500 }}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        borderRadius: '6px',
                        fontSize: 12,
                    }}
                />
                <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    iconType="circle"
                    iconSize={10}
                    wrapperStyle={{
                        fontSize: 12,
                        paddingTop: 2, // Giảm padding
                        width: '100%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '15px 14px',
                        lineHeight: '1.6',
                    }}
                />
            </PieChart>
        </ResponsiveContainer>
    </div>
);
