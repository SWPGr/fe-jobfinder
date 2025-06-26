import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '~/context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user?.token) {
        // Chuyển hướng về trang login, đồng thời lưu lại đường dẫn hiện tại để redirect sau khi login thành công
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;
