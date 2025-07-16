import React, { useState, useEffect } from 'react';
import JobSeekerDashboardService from '~/services/JobSeekerDashboardService';

function AppliedJobs() {
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(20);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true);
            const data = await JobSeekerDashboardService.getAppliedJobs({ page, size, token });
            if (data && data.content) {
                setJobs(data.content);
                setTotalPages(data.totalPages || 1);
                setSize(data.size || size);
            } else {
                setJobs([]);
                setTotalPages(1);
            }
            setLoading(false);
        };
        fetchJobs();
    }, [page, size, token]);

    return (
        <div>
            <h3>Applied Jobs</h3>
            {loading && <div>Loading...</div>}
            <ul>
                {jobs.map((job, i) => (
                    <li key={job.id || i}>
                        {job.jobTitle} - {job.companyName}
                    </li>
                ))}
            </ul>
            <div>
                <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
                    Prev
                </button>
                <span>
                    Page {page}/{totalPages}
                </span>
                <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default AppliedJobs;
