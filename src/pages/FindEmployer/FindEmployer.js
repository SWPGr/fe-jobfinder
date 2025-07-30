import React, { useEffect, useState } from 'react';
import { Filter } from '~/components';
import classNames from 'classnames/bind';
import styles from './FindEmployer.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useNotification } from '~/hooks';

import { jobService, searchService } from '~/services';
import { useLoading } from '~/context/LoadingContext';

const cx = classNames.bind(styles);

function FindEmployer() {
    const [jobFilters, setJobFilter] = React.useState({});
    const [dataset, setDataset] = useState([]);
    const [categoryOptions, setCategoryOptions] = React.useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalHits, setTotalHits] = useState(0);
    const { showError } = useNotification();
    const [isSearched, setIsSearched] = useState(false);
    const { showLoading, hideLoading } = useLoading();
    const [isFilterReady, setIsFilterReady] = useState(false);



    // ===== useEffect 1: Lấy filter options khi load trang =====
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                showLoading();
                const data = await jobService.getAllOptions();
                hideLoading();
                const filters = {
                    organizationId: {
                        name: 'Organization Type',
                        type: 'Radio',
                        options: [{ name: 'All', id: '' }, ...data?.organizations],
                    },
                };

                setJobFilter(filters);
                setCategoryOptions(data?.categories);
                setIsFilterReady(true); // ✅ filter đã sẵn sàng

            } catch (error) {
                hideLoading();
                showError('Get options failed');
            }
        };

        fetchOptions();
    }, []);

    useEffect(() => {
        const fetchJobs = async () => {

            setIsSearched(false);
            if (!isFilterReady) return; // ⛔ Không gọi nếu filter chưa sẵn sàng

            try {
                const cleanedParams = Object.fromEntries(
                    [...searchParams.entries()].filter(([_, v]) => v !== '' && v !== null),
                );

                const result = await searchService.searchEmployer(cleanedParams);
                const formatted = result.data;
                setDataset(formatted);
                setTotalHits(result.totalHits);
            } catch (error) {
                hideLoading();
                showError('Get options failed');
            } finally {
                setIsSearched(true); // ✅ đánh dấu đã search xong
            }
        };

        fetchJobs();
    }, [searchParams, isFilterReady]);

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
                type="COMPANY"
                isSearched={isSearched}
            />
        </div>
    );
}

export default FindEmployer;
