import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './GoogleLoginButton.module.scss';

import { authService } from '~/services';
import { useNotification } from '~/hooks';
import { useAuth } from '~/context/AuthContext';
import { useLoading } from '~/context/LoadingContext';

const cx = classNames.bind(styles);
const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

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
    const [errorMsg, setErrorMsg] = useState('');
    const { showSuccess, showError } = useNotification();
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    let { setUser } = useAuth();

    const handleSuccess = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            showLoading();
            const response = await authService.googleLogin({ credential: token });
            console.log(response.result);
            localStorage.setItem('user', JSON.stringify(response.result));
            hideLoading();
            setUser({
                role: response.result.role,
                token: response.result.token,
            });

            showSuccess(response.message);

            navigate('/');
        } catch (error) {
            hideLoading(); // quan trọng để tránh loading bị treo

            let message = 'Authentication failed';

            if (error.response?.data?.message) {
                message = error.response.data.message; // lỗi do server trả về
            } else if (error.message === 'Network Error') {
                message = 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng hoặc thử lại sau.';
            } else {
                message = error.message; // fallback cho các lỗi còn lại
            }

            setErrorMsg(message);
            showError(message);
        }
    };

    const handleError = () => {
        hideLoading();
        setErrorMsg('Google login failed');
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                disabled={disabled}
                render={({ onClick, disabled: internalDisabled }) => (
                    <CustomGoogleButton onClick={onClick} disabled={disabled || internalDisabled}>
                        Login with Google
                    </CustomGoogleButton>
                )}
            />
            {errorMsg && <p style={{ color: 'red', marginTop: 8 }}>{errorMsg}</p>}
        </GoogleOAuthProvider>
    );
}

export default GoogleLoginButton;
