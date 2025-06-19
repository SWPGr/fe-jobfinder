import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, ChevronDown, ChevronUp } from 'lucide-react';

export const EmployersManagement = () => {
    const [sortConfig, setSortConfig] = useState(null);
    const employers = [
        { id: 1, name: 'Amazon Inc.', jobs: 28, location: 'Seattle, WA', joined: '2022-01-12', status: 'Active' },
        {
            id: 2,
            name: 'Google LLC',
            jobs: 35,
            location: 'Mountain View, CA',
            joined: '2021-11-20',
            status: 'Inactive',
        },
        { id: 3, name: 'Microsoft', jobs: 19, location: 'Redmond, WA', joined: '2022-02-05', status: 'Active' },
        { id: 4, name: 'Tesla', jobs: 12, location: 'Austin, TX', joined: '2022-03-15', status: 'Active' },
    ];

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedEmployers = [...employers].sort((a, b) => {
        if (!sortConfig) return 0;
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Employers</h2>
                <div className="flex items-center space-x-2">
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50">
                        <Filter className="h-5 w-5 mr-1" /> Filters
                    </button>
                    <button className="inline-flex items-center px-3 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">
                        Add Employer
                    </button>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => requestSort('name')}
                            >
                                Company{' '}
                                {sortConfig?.key === 'name' ? (
                                    sortConfig.direction === 'ascending' ? (
                                        <ChevronUp size={14} />
                                    ) : (
                                        <ChevronDown size={14} />
                                    )
                                ) : null}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Jobs
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Location
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Joined
                            </th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sortedEmployers.map((employer) => (
                            <tr key={employer.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{employer.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{employer.jobs}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{employer.location}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{employer.joined}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                    <button className="text-gray-500 hover:text-gray-900">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
