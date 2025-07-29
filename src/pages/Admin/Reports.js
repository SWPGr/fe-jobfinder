import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Eye, MessageSquare, Bug, Lightbulb, Flag } from 'lucide-react';
import ReportDetailModal from './components/ReportDetailModal';
import StatsOverview from './components/StatsOverview';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@mantine/core';

import { reportService } from '~/services';

const Reports = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [reports, setReports] = useState([]);
    const [reportTypes, setReportTypes] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    const reportTypesIcon = [
        { icon: Flag, color: 'text-red-500' },
        { icon: Bug, color: 'text-blue-500' },
        { icon: Lightbulb, color: 'text-yellow-500' },
        { icon: MessageSquare, color: 'text-green-500' },
    ];

    const [filters, setFilters] = useState({
        type: searchParams.get('typeId') || '',
        fromDate: searchParams.get('fromDate') || '',
        toDate: searchParams.get('toDate') || '',
        keyword: searchParams.get('keyword') || '',
        page: searchParams.get('page') || 1,
    });

    useEffect(() => {
        const fetchAllReportTypes = async () => {
            try {
                const response = await reportService.getAllReportTypes();
                setReportTypes(response || []);
            } catch (error) {
                console.error('Error fetching report types:', error);
            }
        };

        fetchAllReportTypes();
    }, []);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const entries = Object.fromEntries(searchParams);
                const response = await reportService.getReports(entries);
                setReports(response.content || []);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error('Error fetching reports:', error);
            }
        };

        fetchReports();
    }, [searchParams]);

    const handleChangeValue = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));

        // const url = new URLSearchParams(searchParams);
        // url.set(name, value);
        // setSearchParams(url);
    };

    const handleSearch = () => {
        const entries = Object.entries({ ...filters, page: 1 }).filter(
            ([_, v]) => v !== '' && v !== null && v !== undefined,
        );
        setSearchParams(entries);
    };

    const handleViewReport = (report) => {
        setSelectedReport(report);
        setShowDetailModal(true);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleExportData = async () => {
        try {
            const response = await reportService.getReports();
            const data = response.content || [];
            await reportService.exportToExcel(data, 'report.xlsx');
        } catch (error) {
            console.log(error);
        }
    };
    const handlePageChange = (page) => {
        setFilters((prev) => ({ ...prev, page }));
        const params = new URLSearchParams(searchParams);
        params.set('page', page);
        setSearchParams(params);
    };

    return (
        <div className="min-h-screen">
            <div className=" mx-auto">
                <div className="mb-8">
                    <h1 className="text-[24px] font-bold text-gray-900 mb-2 mt-4">Report Management</h1>
                    <p className="text-lg text-gray-600">Track and handle user-submitted reports</p>
                </div>

                {/* <StatsOverview reports={reports} /> */}

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6 bg-white shadow-sm border border-gray-100 rounded-lg p-4 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="w-6 h-6 text-gray-500" />
                        <h2 className="text-2xl font-semibold text-gray-800">Filters</h2>
                    </div>

                    <div className="flex">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div className="relative flex items-center">
                                <Search className="w-6 h-6 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    name="keyword"
                                    value={filters.keyword}
                                    onChange={(e) => handleChangeValue(e)}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-xl"
                                />
                            </div>

                            <select
                                value={filters.type.id}
                                name="typeId"
                                onChange={(e) => handleChangeValue(e)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xl"
                            >
                                <option value="">All Types</option>
                                {reportTypes &&
                                    reportTypes.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name}
                                        </option>
                                    ))}
                            </select>

                            <input
                                type="date"
                                value={filters.fromDate}
                                placeholder='From Date'
                                name="fromDate"
                                max={filters.toDate}
                                onChange={(e) => handleChangeValue(e)}
                                className="text-xl px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />

                            <input
                                type="date"
                                name="toDate"
                                value={filters.toDate}
                                min={filters.fromDate}
                                onChange={(e) => handleChangeValue(e)}
                                className="text-xl px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            className="text-xl px-4 py-2 mt-2 bg-blue-500 text-white   rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* Reports Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden ">
                    <div className="flex justify-end  py-4">
                        <button
                            onClick={handleExportData}
                            className="text-xl px-4 py-2 bg-white border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition duration-300"
                        >
                            Export data to excel
                        </button>
                    </div>
                    <div className="overflow-hidden rounded-lg shadow-xl border border-gray-200">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                        Code
                                    </th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                        Time
                                    </th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                        Content type
                                    </th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                        From
                                    </th>
                                    <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                        Subject
                                    </th>

                                    <th className="px-6 py-3 text-left text-md font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {reports.length > 0 &&
                                    reports.map((report) => {
                                        const TypeIcon = reportTypesIcon[report.id - 1].icon;

                                        return (
                                            <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-xl font-medium text-gray-900">{report.id}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-xl text-gray-900">
                                                        {formatDate(report.createdAt)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <TypeIcon
                                                            className={`w-6 h-6 ${reportTypesIcon[report.id - 1].color
                                                                }`}
                                                        />
                                                        <span className="text-xl text-gray-900">
                                                            {report.type.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {/* <div className="text-xl text-gray-900">{report.sender.name}</div> */}
                                                    <div className="text-lg text-gray-500">{report.email}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div
                                                        className="text-xl text-gray-900 max-w-[180px] truncate"
                                                        title={report.subject}
                                                    >
                                                        {report.subject}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleViewReport(report)}
                                                            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                                                            title="Xem chi tiết"
                                                        >
                                                            <Eye className="w-6 h-6" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Pagination */}
                <div className="flex justify-end bg-gray-50 py-4 px-4">
                    <Pagination
                        total={totalPages}
                        value={Number(filters.page)}
                        onChange={handlePageChange}
                        radius="xl"
                        size={'xl'}
                    />
                </div>

                {/* Report Detail Modal */}
                {showDetailModal && selectedReport && (
                    <ReportDetailModal report={selectedReport} onClose={() => setShowDetailModal(false)} />
                )}
            </div>
        </div>
    );
};

export default Reports;
