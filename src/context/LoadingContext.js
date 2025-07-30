import { createContext, useContext, useState, useCallback } from 'react';
import { LoadingOverlay } from '@mantine/core';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
    const [visible, setVisible] = useState(false);

    const showLoading = useCallback(() => setVisible(true), []);
    const hideLoading = useCallback(() => setVisible(false), []);

    return (
        <LoadingContext.Provider value={{ visible, showLoading, hideLoading }}>
            {/* Overlay nên đặt ở cuối để phủ toàn bộ */}
            <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    return useContext(LoadingContext);
}
