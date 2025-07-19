import React, { useState } from 'react';
import { useEffect } from 'react';
import { Filter } from '~/components';
import classNames from 'classnames/bind';
import styles from './FindCandidate.module.scss';
import { useSearchParams } from 'react-router-dom';

import { jobService, searchService } from '~/services';

const cx = classNames.bind(styles);

function FindCandidate() {
    const [jobFilters, setJobFilter] = useState({});
    const [categoryOptions, setCategoryOptions] = React.useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [dataset, setDataset] = useState([]);
    const [totalHits, setTotalHits] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await jobService.getAllOptions();

            const filters = {
                experienceId: {
                    name: 'Experience',
                    type: 'Radio',
                    options: [{ name: 'All', id: '' }, ...data.experiences],
                    grid: true,
                },
                educationId: {
                    name: 'Education',
                    type: 'Radio',
                    options: [{ name: 'All', id: '' }, ...data.educations],
                },
            };

            setJobFilter(filters);
            setCategoryOptions(data.categories);
        };

        fetchData();
    }, []);

    // ===== useEffect 2: Mỗi khi searchParams thay đổi thì gọi API tìm job =====
    useEffect(() => {
        const fetchJobs = async () => {
            const cleanedParams = Object.fromEntries(
                [...searchParams.entries()].filter(([_, v]) => v !== '' && v !== null),
            );

            const result = await searchService.searchCandidate(cleanedParams);
            // console.log(result.data);

            const formatted = result.data;
            setDataset(formatted);
            setTotalHits(result.totalHits);
        };

        fetchJobs();
    }, [searchParams]);

    return (
        <div className={cx('find-job__wrapper')}>
            <div className={cx('find-job__title')}>
                <h1>Find Candidate</h1>
            </div>

            <Filter
                searchLabel="Find your potential candidates"
                filters={jobFilters}
                categoryOptions={categoryOptions}
                dataset={dataset}
                totalHits={totalHits}
                buttonLabel="Find Job"
                onSearch={(formValues) => {
                    setSearchParams(formValues);
                }}
                type="CANDIDATE"
            />
        </div>
    );
}

export default FindCandidate;
