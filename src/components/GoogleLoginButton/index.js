import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import classNames from 'classnames/bind';
import styles from './GoogleLoginButton.module.scss';

const cx = classNames.bind(styles);

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function CustomGoogleButton({ onClick, disabled }) {
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
                cursor: 'pointer',
            }}
        >
            Login with Google
        </button>
    );
}

function GoogleLoginButton() {
    const handleLoginSuccess = (credentialResponse) => {
        const token = credentialResponse.credential;
        const user = jwtDecode(token);
        console.log('User info:', user);
        // TODO: Lưu user info, chuyển trang, gọi API backend...
    };

    const handleLoginError = () => {
        console.error('Login Failed');
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
                render={({ onClick, disabled }) => <CustomGoogleButton onClick={onClick} disabled={disabled} />}
            />
        </GoogleOAuthProvider>
    );
}

export default GoogleLoginButton;
