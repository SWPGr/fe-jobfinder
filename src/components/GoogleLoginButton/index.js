import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './GoogleLoginButton.module.scss';

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

function GoogleLoginButton({ mode = 'login', role = 'JOB_SEEKER', disabled = false }) {
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            const user = jwtDecode(token);

            console.log(user);

            const apiUrl = mode === 'register' ? '/api/auth/google-signup' : '/api/auth/google-login';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, role }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('accessToken', data.accessToken || '');
                navigate('/');
            } else {
                setErrorMsg(data.message || `${mode} failed`);
            }
        } catch (error) {
            setErrorMsg('Authentication failed');
        }
    };

    const handleError = () => {
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
                        {mode === 'register' ? 'Sign up with Google' : 'Login with Google'}
                    </CustomGoogleButton>
                )}
            />
            {errorMsg && <p style={{ color: 'red', marginTop: 8 }}>{errorMsg}</p>}
        </GoogleOAuthProvider>
    );
}

export default GoogleLoginButton;
