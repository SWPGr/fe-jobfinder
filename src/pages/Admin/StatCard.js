import React from 'react';

export const StatCard = ({ title, value, icon, change, isPositive }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    {icon}
                </div>
            </div>
            {change && (
                <div className="mt-4">
                    <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? '+' : ''}
                        {change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
            )}
        </div>
    );
};
