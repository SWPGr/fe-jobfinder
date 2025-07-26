import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Eye, MessageSquare, Bug, Lightbulb, Flag } from 'lucide-react';
import ReportDetailModal from './components/ReportDetailModal';
import StatsOverview from './components/StatsOverview';
import { useSearchParams } from 'react-router-dom';

import { reportService } from '~/services';

const mockReports = [
    {
        id: 'RPT-001',
        date: '2024-01-15T10:30:00Z',
        type: 'inappropriate-content',
        sender: {
            name: 'Nguyễn Văn A',
            email: 'nguyenvana@email.com',
        },
        title: 'Bài viết chứa nội dung không phù hợp',
        description:
            'Bài viết này chứa hình ảnh và ngôn từ không phù hợp với cộng đồng. Tôi nghĩ nó vi phạm quy định của trang web.',
        url: 'https://example.com/post/123',
        priority: 'high',
        status: 'pending',
        attachments: ['screenshot1.png', 'evidence.pdf'],
        internalNotes: '',
        assignedTo: 'Admin 1',
    },
    {
        id: 'RPT-002',
        date: '2024-01-14T14:20:00Z',
        type: 'technical-issue',
        sender: {
            name: 'Trần Thị B',
            email: 'tranthib@email.com',
        },
        title: 'Lỗi không thể tải trang',
        description:
            'Trang web bị lỗi 500 khi tôi cố gắng truy cập vào phần bình luận. Lỗi này xảy ra liên tục từ sáng nay.',
        url: 'https://example.com/comments',
        priority: 'urgent',
        status: 'in-progress',
        attachments: ['error-log.txt'],
        internalNotes: 'Đã chuyển cho team kỹ thuật xử lý',
        assignedTo: 'Tech Team',
    },
    {
        id: 'RPT-003',
        date: '2024-01-13T09:15:00Z',
        type: 'spam',
        sender: {
            name: 'Lê Văn C',
            email: 'levanc@email.com',
        },
        title: 'Tài khoản spam quảng cáo',
        description: 'Có một tài khoản liên tục đăng các bài quảng cáo không liên quan trong các nhóm thảo luận.',
        url: 'https://example.com/user/spammer123',
        priority: 'medium',
        status: 'resolved',
        attachments: [],
        internalNotes: 'Đã khóa tài khoản và xóa các bài đăng spam',
        assignedTo: 'Moderator',
        resolvedAt: '2024-01-13T16:30:00Z',
    },
    {
        id: 'RPT-004',
        date: '2024-01-12T16:45:00Z',
        type: 'suggestion',
        sender: {
            name: 'Phạm Thị D',
            email: 'phamthid@email.com',
        },
        title: 'Đề xuất thêm tính năng dark mode',
        description:
            'Tôi nghĩ trang web nên có tính năng dark mode để dễ nhìn hơn vào ban đêm. Nhiều người dùng cũng mong muốn điều này.',
        priority: 'low',
        status: 'pending',
        attachments: ['mockup-darkmode.png'],
        internalNotes: '',
        assignedTo: 'Product Team',
    },
    {
        id: 'RPT-005',
        date: '2024-01-11T11:20:00Z',
        type: 'other',
        sender: {
            name: 'Hoàng Văn E',
            email: 'hoangvane@email.com',
        },
        title: 'Vấn đề về quyền riêng tư',
        description: 'Tôi muốn biết làm thế nào để xóa hoàn toàn tài khoản và dữ liệu cá nhân khỏi hệ thống.',
        priority: 'medium',
        status: 'rejected',
        attachments: [],
        internalNotes: 'Đã hướng dẫn qua email, không phải là báo cáo',
        assignedTo: 'Support Team',
    },
    {
        id: 'RPT-006',
        date: '2024-01-10T08:30:00Z',
        type: 'technical-issue',
        sender: {
            name: 'Vũ Thị F',
            email: 'vuthif@email.com',
        },
        title: 'Lỗi upload hình ảnh',
        description: 'Không thể upload hình ảnh lên bài viết. Hệ thống báo lỗi "File too large" nhưng file chỉ có 2MB.',
        url: 'https://example.com/create-post',
        priority: 'medium',
        status: 'resolved',
        attachments: ['error-screenshot.png'],
        internalNotes: 'Đã fix lỗi validation file size',
        assignedTo: 'Dev Team',
        resolvedAt: '2024-01-10T14:20:00Z',
    },
];

const Reports = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [reports, setReports] = useState([]);
    const [reportTypes, setReportTypes] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const reportTypesIcon = [
        { icon: Flag, color: 'text-red-500' },
        { icon: Bug, color: 'text-blue-500' },
        { icon: Lightbulb, color: 'text-yellow-500' },
        { icon: MessageSquare, color: 'text-green-500' },
    ];

    const [filters, setFilters] = useState({
        type: searchParams.get('typeId') || '',
        dateFrom: searchParams.get('dateFrom') || '',
        dateTo: searchParams.get('dateTo') || '',
        keyword: searchParams.get('keyword') || '',
        page: searchParams.get('page') || 1,
    });

    useEffect(() => {
        const fetchAllReportTypes = async () => {
            try {
                const response = await reportService.getAllReportType();
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

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className=" mx-auto">
                <div className="mb-8">
                    <h1 className="text-[24px] font-bold text-gray-900 mb-2">Report Management</h1>
                    <p className="text-lg text-gray-600">Track and handle user-submitted reports</p>
                </div>

                {/* <StatsOverview reports={reports} /> */}

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Filter className="w-6 h-6 text-gray-500" />
                        <h2 className="text-2xl font-semibold text-gray-800">Filters</h2>
                    </div>

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
                            value={filters.dateFrom}
                            name="dateFrom"
                            onChange={(e) => handleChangeValue(e)}
                            className="text-xl px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />

                        <input
                            type="date"
                            name="dateTo"
                            value={filters.dateTo}
                            min={filters.dateFrom}
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

                {/* Reports Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
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
                                                            className={`w-6 h-6 ${
                                                                reportTypesIcon[report.id - 1].color
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

                    {/* Pagination */}
                    {/* {totalPages > 1 && (
                        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                            <div className="flex-1 flex justify-between sm:hidden">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Trước
                                </button>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Sau
                                </button>
                            </div>
                            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        Hiển thị{' '}
                                        <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> đến{' '}
                                        <span className="font-medium">
                                            {Math.min(currentPage * itemsPerPage, filteredReports.length)}
                                        </span>{' '}
                                        trong tổng số <span className="font-medium">{filteredReports.length}</span> kết
                                        quả
                                    </p>
                                </div>
                                <div>
                                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                        <button
                                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            Trước
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                    page === currentPage
                                                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                                        >
                                            Sau
                                        </button>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    )} */}
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
