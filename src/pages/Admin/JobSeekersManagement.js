import React from 'react';
import { Filter, MoreHorizontal, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import { useJobSeekers } from '~/context/JobSeekerContext';

const JobSeekersManagement = () => {
    const { jobSeekers, loading, error, reloadJobSeekers } = useJobSeekers();
    const [sortConfig, setSortConfig] = React.useState(null);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedJobSeekers = React.useMemo(() => {
        const arr = [...jobSeekers];
        if (!sortConfig) return arr;
        return arr.sort((a, b) => {
            if ((a[sortConfig.key] || '') < (b[sortConfig.key] || '')) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if ((a[sortConfig.key] || '') > (b[sortConfig.key] || '')) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    }, [jobSeekers, sortConfig]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Job Seekers</h2>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={reloadJobSeekers}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50"
                        title="Reload list"
                    >
                        <RotateCcw className="h-5 w-5 mr-1" /> Reload
                    </button>
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50">
                        <Filter className="h-5 w-5 mr-1" /> Filters
                    </button>
                    <button className="inline-flex items-center px-3 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">
                        Add Seeker
                    </button>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                onClick={() => requestSort('id')}
                            >
                                ID{' '}
                                {sortConfig?.key === 'id' ? (
                                    sortConfig.direction === 'ascending' ? (
                                        <ChevronUp size={14} />
                                    ) : (
                                        <ChevronDown size={14} />
                                    )
                                ) : null}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Full Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Phone
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
                        {sortedJobSeekers.map((seeker) => (
                            <tr key={seeker.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{seeker.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{seeker.fullName || '--'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{seeker.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{seeker.phone || '--'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{seeker.location || '--'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{seeker.createdAt?.slice(0, 10)}</td>
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

export default JobSeekersManagement;
