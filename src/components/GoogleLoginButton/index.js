import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './GoogleLoginButton.module.scss';

import { useNotification } from '~/hooks';
import { useLoading } from '~/context/LoadingContext';
import { authService } from '~/services';

const cx = classNames.bind(styles);
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

if (!clientId) {
    console.error('Google Client ID is not defined. Please set REACT_APP_GOOGLE_CLIENT_ID in .env');
}

function CustomGoogleButton({ onClick, disabled, children }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cx('google-button')}
            style={{
                height: '60px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 20px',
                fontSize: '18px',
                backgroundColor: '#4285F4',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.6 : 1,
            }}
        >
            {children}
        </button>
    );
}

function GoogleLoginButton({ disabled = false }) {
    const { showSuccess, showError } = useNotification();
    const { showLoading, hideLoading } = useLoading();
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse) => {
        try {
            showLoading();
            const credential = credentialResponse.credential;
            const user = jwtDecode(credential);

            // Gửi credential tới BE thay vì giải mã
            // const response = await authService.googleLogin(user.email);

            window.location.href = 'http://localhost:8080/api/auth/google/callback';
        } catch (error) {
            hideLoading();
            showError(error.message || 'Đăng nhập Google thất bại');
        }
    };

    const handleError = () => {
        showError('Không thể kết nối với Google');
    };

    if (!clientId) {
        return <p className={cx('error')}>Lỗi cấu hình Google Sign-In. Vui lòng liên hệ hỗ trợ.</p>;
    }

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                disabled={disabled}
                render={({ onClick, disabled: internalDisabled }) => (
                    <CustomGoogleButton onClick={onClick} disabled={disabled || internalDisabled}>
                        Đăng nhập với Google
                    </CustomGoogleButton>
                )}
            />
        </GoogleOAuthProvider>
    );
}

export default GoogleLoginButton;
