import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { fetchAllJobSeekers } from '~/services/jobSeekerService';

const JobSeekerContext = createContext();

export const JobSeekerProvider = ({ children }) => {
    const [jobSeekers, setJobSeekers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadJobSeekers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const token = JSON.parse(localStorage.getItem('user'))?.token;
            const data = await fetchAllJobSeekers(token);
            setJobSeekers(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch job seekers');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadJobSeekers();
    }, [loadJobSeekers]);

    const value = {
        jobSeekers,
        loading,
        error,
        reloadJobSeekers: loadJobSeekers,
        setJobSeekers,
    };

    return <JobSeekerContext.Provider value={value}>{children}</JobSeekerContext.Provider>;
};

export const useJobSeekers = () => {
    const context = useContext(JobSeekerContext);
    if (!context) {
        throw new Error('useJobSeekers must be used within a JobSeekerProvider');
    }
    return context;
};
