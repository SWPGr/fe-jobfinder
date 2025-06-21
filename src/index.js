import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/GlobalStyles';
import { AuthContext } from './context';
import { MantineProvider } from '@mantine/core'; // Import MantineProvider
import '@mantine/core/styles.css';

// import './index.css';
import 'tippy.js/dist/tippy.css'; // optional for styling
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { LoadingProvider } from '~/context/LoadingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyles>
            <AuthContext.AuthProvider>
                <MantineProvider withGlobalStyles withNormalizeCSS>
                    <LoadingProvider>
                        <Notifications />
                        <App />
                    </LoadingProvider>
                </MantineProvider>
            </AuthContext.AuthProvider>
        </GlobalStyles>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
