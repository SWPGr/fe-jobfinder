import React from 'react';
import { Users, Briefcase, FileText, CheckCircle } from 'lucide-react';
import { StatCard } from './StatCard';
import { ActivityChart } from './ActivityChart';

const DashboardOverview = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Welcome back! Here's what's happening with your job platform today.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Job Seekers"
                    value="12,486"
                    icon={<Users size={24} />}
                    change="12%"
                    isPositive={true}
                />
                <StatCard
                    title="Total Employers"
                    value="3,254"
                    icon={<Briefcase size={24} />}
                    change="8%"
                    isPositive={true}
                />
                <StatCard
                    title="Active Jobs"
                    value="1,865"
                    icon={<FileText size={24} />}
                    change="5%"
                    isPositive={false}
                />
                <StatCard
                    title="Successful Matches"
                    value="948"
                    icon={<CheckCircle size={24} />}
                    change="15%"
                    isPositive={true}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-medium text-gray-900">Platform Activity</h2>
                        <select className="text-sm border-gray-300 rounded-md">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>Last 3 months</option>
                        </select>
                    </div>
                    <ActivityChart />
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                    <div className="space-y-5">
                        {[
                            {
                                user: 'Amazon Inc.',
                                action: 'Posted a new job',
                                time: '5 minutes ago',
                                type: 'employer',
                            },
                            {
                                user: 'John Smith',
                                action: 'Applied to Senior Developer',
                                time: '15 minutes ago',
                                type: 'jobseeker',
                            },
                            {
                                user: 'Microsoft',
                                action: 'Updated company profile',
                                time: '1 hour ago',
                                type: 'employer',
                            },
                            {
                                user: 'Sarah Johnson',
                                action: 'Completed profile',
                                time: '2 hours ago',
                                type: 'jobseeker',
                            },
                            {
                                user: 'Google',
                                action: 'Reviewed 5 applications',
                                time: '3 hours ago',
                                type: 'employer',
                            },
                        ].map((activity, i) => (
                            <div key={i} className="flex items-start">
                                <div
                                    className={`h-8 w-8 rounded-full flex items-center justify-center text-white ${
                                        activity.type === 'employer' ? 'bg-blue-500' : 'bg-green-500'
                                    }`}
                                >
                                    {activity.type === 'employer' ? <Briefcase size={16} /> : <Users size={16} />}
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                                    <p className="text-xs text-gray-500">
                                        {activity.action} • {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-5 text-sm font-medium text-blue-600 hover:text-blue-500">
                        View all activity
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
