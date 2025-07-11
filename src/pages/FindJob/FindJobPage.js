import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FindJob.module.scss';
import { useSearchParams } from 'react-router-dom';

import { jobService } from '~/services';
import { format } from '~/utils';
import { Filter } from '~/components';

const cx = classNames.bind(styles);

function FindJob() {
    const [jobFilters, setJobFilter] = useState({});
    const [dataset, setDataset] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [totalHits, setTotalHits] = useState(0);

    const [searchParams, setSearchParams] = useSearchParams();

    // ===== useEffect 1: Lấy filter options khi load trang =====
    useEffect(() => {
        const fetchOptions = async () => {
            const data = await jobService.getAllOptions();

            const filters = {
                experienceId: { name: 'Experience', type: 'Radio', options: data.experiences, grid: true },
                salary: {
                    name: 'Salary',
                    type: 'Radio',
                    options: [
                        { id: 1, name: 'Under $80k', min: 0, max: 80000 },
                        { id: 2, name: '$80k - $120k', min: 80000, max: 120000 },
                        { id: 3, name: '$120k - $160k', min: 120000, max: 160000 },
                        { id: 4, name: '$160k - $200k', min: 160000, max: 200000 },
                        { id: 5, name: '$200k+', min: 200000, max: null },
                        { id: 6, name: 'Negotiable', min: null, max: null },
                    ],
                    grid: true,
                },
                jobTypeId: { name: 'Job Type', type: 'Radio', options: data.jobTypes, grid: true },
                educationId: { name: 'Education', type: 'Radio', options: data.educations },
                jobLevelId: { name: 'Job Level', type: 'Radio', options: data.jobLevels },
            };

            setJobFilter(filters);
            setCategoryOptions(data.categories);
        };

        fetchOptions();
    }, []);

    // ===== useEffect 2: Mỗi khi searchParams thay đổi thì gọi API tìm job =====
    useEffect(() => {
        const fetchJobs = async () => {
            const cleanedParams = Object.fromEntries(
                [...searchParams.entries()].filter(([_, v]) => v !== '' && v !== null),
            );

            const result = await jobService.searchJob(cleanedParams);
            console.log(result.data);

            const formatted = result.data.map(format.transformJobData);
            setDataset(formatted);
            setTotalHits(result.totalHits);
        };

        fetchJobs();
    }, [searchParams]);

    return (
        <div className={cx('find-job__wrapper')}>
            <div className={cx('find-job__title')}>
                <h1>Find Job</h1>
            </div>

            <Filter
                filters={jobFilters}
                categoryOptions={categoryOptions}
                dataset={dataset}
                totalHits={totalHits}
                buttonLabel="Find Job"
                onSearch={(formValues) => {
                    setSearchParams(formValues);
                }}
            />
        </div>
    );
}

export default FindJob;
