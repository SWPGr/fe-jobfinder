import React from 'react';
import { BarChart3, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const StatsOverview = ({ reports }) => {
    const totalReports = reports.length;
    const pendingReports = reports.filter((r) => r.status === 'pending').length;
    const resolvedReports = reports.filter((r) => r.status === 'resolved').length;
    const inProgressReports = reports.filter((r) => r.status === 'in-progress').length;

    const reportsByType = reports.reduce((acc, report) => {
        acc[report.type] = (acc[report.type] || 0) + 1;
        return acc;
    }, {});

    const typeLabels = {
        'inappropriate-content': 'Nội dung không phù hợp',
        spam: 'Spam',
        'technical-issue': 'Lỗi kỹ thuật',
        suggestion: 'Góp ý',
        other: 'Khác',
    };

    const stats = [
        {
            title: 'Total Reports',
            value: totalReports,
            icon: BarChart3,
            color: 'bg-blue-500',
            textColor: 'text-blue-600',
        },
        {
            title: 'Not yet processed',
            value: pendingReports,
            icon: Clock,
            color: 'bg-yellow-500',
            textColor: 'text-yellow-600',
        },
        {
            title: 'Pending',
            value: inProgressReports,
            icon: TrendingUp,
            color: 'bg-orange-500',
            textColor: 'text-orange-600',
        },
        {
            title: 'Resolved',
            value: resolvedReports,
            icon: CheckCircle,
            color: 'bg-green-500',
            textColor: 'text-green-600',
        },
    ];

    return (
        <div className="mb-8">
            {/* Main Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                            <div className="flex items-center">
                                <div className={`${stat.color} rounded-lg p-3`}>
                                    <Icon className="w-12 h-12 text-white" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-2xl font-medium text-gray-600">{stat.title}</p>
                                    <p className={`text-4xl font-bold ${stat.textColor}`}>{stat.value}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Reports by Type */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Báo cáo theo loại</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {Object.entries(reportsByType).map(([type, count]) => (
                        <div key={type} className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-800">{count}</div>
                            <div className="text-lg text-gray-600">{typeLabels[type]}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatsOverview;
