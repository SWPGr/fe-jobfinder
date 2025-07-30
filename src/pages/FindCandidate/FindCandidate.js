import React, { useState } from 'react';
import { useEffect } from 'react';
import { Filter } from '~/components';
import classNames from 'classnames/bind';
import styles from './FindCandidate.module.scss';
import { useSearchParams } from 'react-router-dom';

import { jobService, searchService } from '~/services';
import { useLoading } from '~/context/LoadingContext';
import { useNotification } from '~/hooks';

const cx = classNames.bind(styles);

function FindCandidate() {
    const [jobFilters, setJobFilter] = useState({});
    const [categoryOptions, setCategoryOptions] = React.useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [dataset, setDataset] = useState([]);
    const [totalHits, setTotalHits] = useState(0);
    const [isSearched, setIsSearched] = useState(false);
    const { showLoading, hideLoading } = useLoading();
    const [isFilterReady, setIsFilterReady] = useState(false);
    const { showError } = useNotification();


    useEffect(() => {
        const fetchData = async () => {
            try {
                showLoading();
                const data = await jobService.getAllOptions();
                hideLoading();

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
                setIsFilterReady(true); // ✅ filter đã sẵn sàng
            } catch (error) {
                hideLoading();
                showError(error);
            }
        };

        fetchData();
    }, []);

    // ===== useEffect 2: Mỗi khi searchParams thay đổi thì gọi API tìm job =====
    useEffect(() => {
        const fetchJobs = async () => {
            setIsSearched(false);
            if (!isFilterReady) return; // ⛔ Không gọi nếu filter chưa sẵn sàng

            try {
                const cleanedParams = Object.fromEntries(
                    [...searchParams.entries()].filter(([_, v]) => v !== '' && v !== null),
                );

                const result = await searchService.searchCandidate(cleanedParams);
                // console.log(result.data);

                const formatted = result.data;
                setDataset(formatted);
                setTotalHits(result.totalHits);
            } catch (error) {
                hideLoading();
                showError(error);
            } finally {
                setIsSearched(true); // ✅ đánh dấu đã search xong
            }
        };

        fetchJobs();
    }, [searchParams, isFilterReady]);

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
                isSearched={isSearched}
            />
        </div>
    );
}

export default FindCandidate;
