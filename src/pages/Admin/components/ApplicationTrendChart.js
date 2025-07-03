import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import statisticsService from '~/services/statisticsService';
import styles from './ApplicationTrendChart.module.scss';

export const ApplicationTrendChart = () => {
    const [timeRange, setTimeRange] = useState('week');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await statisticsService.fetchApplicationsTrend();
                let counts = res.dailyCounts || [];
                // Lấy 7 hoặc 30 ngày gần nhất
                if (timeRange === 'week') {
                    counts = counts.slice(-7);
                } else {
                    counts = counts.slice(-30);
                }
                // Map sang { day, applications }
                const formatted = counts.map((item) => {
                    const [year, month, day] = item.date.split('-');
                    return {
                        day: `${day}/${month}`,
                        applications: item.count,
                    };
                });
                setData(formatted);
            } catch (err) {
                setData([]);
            }
            setLoading(false);
        };
        fetchData();
    }, [timeRange]);

    return (
        <div className={styles.chartCard}>
            <div className={styles.headerRow}>
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
                {loading ? (
                    <div>Loading...</div>
                ) : (
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
                )}
            </div>
        </div>
    );
};
