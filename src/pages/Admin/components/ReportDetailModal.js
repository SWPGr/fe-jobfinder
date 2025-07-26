import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Mail, Link, MessageSquare, Bug, Lightbulb, Flag } from 'lucide-react';
import { reportService } from '~/services';

const ReportDetailModal = ({ report, onClose }) => {
    const [reportTypes, setReportTypes] = useState([]);

    const reportTypesIcon = [
        { icon: Flag, color: 'text-red-500' },
        { icon: Bug, color: 'text-blue-500' },
        { icon: Lightbulb, color: 'text-yellow-500' },
        { icon: MessageSquare, color: 'text-green-500' },
    ];

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

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
        // Khi modal mở: khóa scroll của body
        document.body.style.overflow = 'hidden';

        // Khi modal đóng: mở lại scroll
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const TypeIcon = reportTypesIcon[report.id - 1].icon;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-[500px] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <TypeIcon className={`w-6 h-6 ${reportTypesIcon[report.id - 1].color}`} />{' '}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Chi tiết báo cáo #{report.id}</h2>
                            <p className="text-md text-gray-500">{report.type.name}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto ">
                    <div className="gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Basic Info */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Thông tin cơ bản</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-6 h-6 text-gray-500" />
                                        <div>
                                            <div className="text-xl text-gray-500">Ngày gửi</div>
                                            <div className="text-md font-medium"> {formatDate(report.createdAt)}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User className="w-6 h-6 text-gray-500" />
                                        <div>
                                            <div className="text-xl text-gray-500">Người gửi</div>
                                            {/* <div className="text-xl text-gray-900">{report.sender.name}</div> */}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-6 h-6 text-gray-500" />
                                        <div>
                                            <div className="text-xl text-gray-500">Email</div>
                                            <div className="text-lg text-gray-500">{report.email}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Title and Description */}
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-800 mb-3">Nội dung báo cáo</h3>
                                <div className="bg-white border border-gray-200 rounded-lg p-4">
                                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{report.subject}</h4>
                                    <p className="text-md text-gray-700 whitespace-pre-wrap">{report.content}</p>
                                </div>
                            </div>

                            {/* URL */}
                            {report.url && (
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-3">Đường dẫn liên quan</h3>
                                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
                                        <Link className="w-6 h-6 text-blue-500" />
                                        {/* <a
                                            href={report?.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 break-all"
                                        >
                                            {report.url}
                                        </a> */}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportDetailModal;
