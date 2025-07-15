import React, { useEffect, useState } from 'react';
import { Filter } from '~/components';
import classNames from 'classnames/bind';
import styles from './FindEmployer.module.scss';
import { useSearchParams } from 'react-router-dom';

import { jobService, searchService } from '~/services';

const cx = classNames.bind(styles);

function FindEmployer() {
    const [jobFilters, setJobFilter] = React.useState({});
    const [dataset, setDataset] = useState([]);
    const [categoryOptions, setCategoryOptions] = React.useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalHits, setTotalHits] = useState(0);

    // ===== useEffect 1: Lấy filter options khi load trang =====
    useEffect(() => {
        const fetchOptions = async () => {
            const data = await jobService.getAllOptions();

            const filters = {
                organizationId: {
                    name: 'Organization Type',
                    type: 'Radio',
                    options: [{ name: 'All', id: '' }, ...data?.organizations],
                },
            };

            setJobFilter(filters);
            setCategoryOptions(data.categories);
        };

        fetchOptions();
    }, []);

    useEffect(() => {
        const fetchJobs = async () => {
            const cleanedParams = Object.fromEntries(
                [...searchParams.entries()].filter(([_, v]) => v !== '' && v !== null),
            );

            const result = await searchService.searchEmployer(cleanedParams);
            const formatted = result.data;
            setDataset(formatted);
            setTotalHits(result.totalHits);
        };

        fetchJobs();
    }, [searchParams]);

    return (
        <div className={cx('find-job__wrapper')}>
            <div className={cx('find-job__title')}>
                <h1>Find Company</h1>
            </div>

            <Filter
                searchLabel="Enter company name or keyword"
                filters={jobFilters}
                categoryOptions={categoryOptions}
                buttonLabel="Find Company"
                onSearch={(formValues) => {
                    setSearchParams(formValues);
                }}
                totalHits={totalHits}
                dataset={dataset}
                type="company"
            />
        </div>
    );
}

export default FindEmployer;
