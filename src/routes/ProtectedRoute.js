import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();
    const location = useLocation();

    // Nếu chưa đăng nhập
    if (!user?.token) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // Nếu có danh sách allowedRoles mà user.role không nằm trong đó
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;
