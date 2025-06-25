import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './ApplicationTrendChart.module.scss';

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
        <div className={styles.chartCard}>
            <div className={styles.headerRow}>
                <h2>Applications Submitted Over Time</h2>
                <div className={styles.btnGroup}>
                    <button
                        onClick={() => setTimeRange('week')}
                        className={`${styles.rangeBtn} ${timeRange === 'week' ? styles.active : ''}`}
                    >
                        Week
                    </button>
                    <button
                        onClick={() => setTimeRange('month')}
                        className={`${styles.rangeBtn} ${timeRange === 'month' ? styles.active : ''}`}
                    >
                        Month
                    </button>
                </div>
            </div>
            <div className={styles.chartArea}>
                <ResponsiveContainer width="100%" height={270}>
                    <BarChart data={data} margin={{ top: 12, right: 18, left: 10, bottom: 18 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" stroke="#9ca3af" tick={{ fontSize: 12 }} />
                        <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
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
        </div>
    );
};
