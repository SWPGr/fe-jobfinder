import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import statisticsService from '~/services/statisticsService'; // Đảm bảo import đúng

const COLORS = [
    'var(--blue-500)', // Xanh dương đậm
    'var(--green-500)', // Xanh lá đậm
    'var(--orange-500)', // Cam đậm
    'var(--red-500)', // Đỏ đậm
    'var(--blue-300)', // Xanh dương nhạt
    'var(--green-400)', // Xanh lá vừa
    'var(--orange-400)', // Cam vừa
    'var(--red-400)', // Đỏ vừa
    'var(--blue-200)', // Xanh dương nhẹ
    'var(--green-300)', // Xanh lá nhạt
    'var(--orange-300)', // Cam nhạt
    'var(--red-300)', // Đỏ nhạt
    'var(--blue-100)', // Xanh dương cực nhẹ
    'var(--green-200)', // Xanh lá rất nhạt
    'var(--orange-200)', // Cam rất nhạt
    'var(--red-200)', // Đỏ rất nhạt
    'var(--blue-50)', // Xanh dương siêu nhẹ
    'var(--green-100)', // Xanh lá cực nhạt
    'var(--orange-100)', // Cam cực nhạt
    'var(--red-100)', // Đỏ cực nhạt
    'var(--gray-500)', // Xám vừa
    'var(--gray-400)', // Xám nhạt
    'var(--gray-300)', // Xám rất nhạt
    'var(--gray-200)', // Xám cực nhạt
    'var(--gray-100)', // Xám siêu nhạt
    'var(--gray-50)', // Xám siêu siêu nhạt
];

const JobCategoryPieChart = () => {
    const [categories, setCategories] = useState([]); // State lưu dữ liệu category
    const [total, setTotal] = useState(0); // Tổng để tính phần trăm
    const [isLoading, setIsLoading] = useState(true); // Trạng thái loading

    useEffect(() => {
        // Gọi hàm fetch từ service
        const fetchCategories = async () => {
            try {
                // Lấy dữ liệu từ API qua service
                const fetchedData = await statisticsService.fetchJobCategories();

                // Kiểm tra dữ liệu trả về
                console.log('Fetched Job Categories:', fetchedData);

                // Chuyển đổi dữ liệu về đúng định dạng
                const categoryData = fetchedData.map((item) => ({
                    category: item.categoryName, // Thay đổi từ categoryName thành category
                    count: item.jobCount, // Thay đổi từ jobCount thành count
                }));

                setCategories(categoryData); // Cập nhật vào state categories

                // Tính tổng số lượng để tính phần trăm
                const totalCount = categoryData.reduce((sum, entry) => sum + entry.count, 0);
                setTotal(totalCount); // Cập nhật total
                setIsLoading(false); // Đánh dấu đã xong
            } catch (error) {
                console.error('Error fetching job categories:', error); // Xử lý lỗi
                setIsLoading(false); // Đánh dấu xong dù có lỗi
            }
        };

        fetchCategories(); // Gọi hàm fetchCategories khi component mount
    }, []);

    // Nếu đang tải dữ liệu, hiển thị loading
    if (isLoading) {
        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <h3>Loading...</h3>
            </div>
        );
    }

    // Hàm định dạng nhãn với phần trăm
    const formatLabel = (name, value) => {
        const percentage = ((value / total) * 100).toFixed(0);
        return `${name}: ${percentage}%`;
    };

    return (
        <div
            style={{
                height: '100%',
                width: '100%',
                maxWidth: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 0,
                position: 'relative',
            }}
        >
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={categories}
                        dataKey="count"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, value }) => formatLabel(name, value)} // Sử dụng hàm formatLabel
                        labelLine={true}
                        stroke="#fff"
                    >
                        {categories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value, name) => {
                            const percentage = ((value / total) * 100).toFixed(0);
                            return [`Total: ${value} (${percentage}%)`, name];
                        }}
                        contentStyle={{
                            backgroundColor: 'white',
                            border: 'none',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                            borderRadius: '6px',
                            fontSize: 12,
                            whiteSpace: 'normal',
                            maxWidth: '150px',
                            wordBreak: 'break-word',
                        }}
                    />
                    <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="center"
                        iconType="circle"
                        iconSize={10}
                        formatter={(value) => value}
                        wrapperStyle={{
                            fontSize: 12,
                            paddingTop: 2,
                            width: '100%',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: '15px 14px',
                            lineHeight: '1.6',
                            whiteSpace: 'normal',
                            maxWidth: '100%',
                            wordBreak: 'break-word',
                        }}
                        contentStyle={{
                            whiteSpace: 'normal',
                            wordBreak: 'break-word',
                            maxWidth: '110px',
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
            <style>
                {`
                    .recharts-pie-label-text {
                        white-space: normal !important;
                        max-width: 100px !important;
                        word-break: break-word !important;
                        text-align: center !important;
                        font-size: 12px !important;
                        font-weight: 500 !important;
                    }
                    .recharts-legend-item-text {
                        white-space: normal !important;
                        word-break: break-word !important;
                    }
                    @media (max-width: 600px) {
                        .recharts-pie-label-text {
                            max-width: 80px !important;
                        }
                    }
                    @media (min-width: 601px) {
                        .recharts-pie-label-text {
                            max-width: 120px !important;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default JobCategoryPieChart;
