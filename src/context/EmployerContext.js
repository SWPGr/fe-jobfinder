import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { fetchAllEmployers } from '~/services/employerService';

const EmployerContext = createContext();

const EmployerProvider = ({ children }) => {
    const [employers, setEmployers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadEmployers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const token = JSON.parse(localStorage.getItem('user'))?.token;
            const data = await fetchAllEmployers(token);
            setEmployers(data || []);
        } catch (err) {
            setError(err.message || 'Failed to fetch employers');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadEmployers();
    }, [loadEmployers]);

    const value = {
        employers,
        loading,
        error,
        reloadEmployers: loadEmployers,
        setEmployers,
    };

    return <EmployerContext.Provider value={value}>{children}</EmployerContext.Provider>;
};

export const useEmployers = () => {
    const context = useContext(EmployerContext);
    if (!context) throw new Error('useEmployers must be used within an EmployerProvider');
    return context;
};

export default EmployerProvider;
