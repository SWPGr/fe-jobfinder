import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './FindJob.module.scss';
import { useSearchParams } from 'react-router-dom';
import { useNotification } from '~/hooks';

import { jobService } from '~/services';
import { format } from '~/utils';
import { Filter } from '~/components';
import { useLoading } from '~/context/LoadingContext';

const cx = classNames.bind(styles);

function FindJob() {
    const [jobFilters, setJobFilter] = useState({});
    const [dataset, setDataset] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [totalHits, setTotalHits] = useState(0);
    const { showError } = useNotification();
    const { showLoading, hideLoading } = useLoading();
    const [isFilterReady, setIsFilterReady] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const [isSearched, setIsSearched] = useState(false);


    // ===== useEffect 1: Lấy filter options khi load trang =====
    useEffect(() => {
        const fetchOptions = async () => {
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
                    salary: {
                        name: 'Salary / year',
                        type: 'Radio',
                        options: [
                            { id: '', name: 'All', salaryMin: '', salaryMax: '' },
                            { id: 2, name: 'Under $80k', salaryMin: 0, salaryMax: 80000 },
                            { id: 3, name: '$80k - $120k', salaryMin: 80000, salaryMax: 120000 },
                            { id: 4, name: '$120k - $160k', salaryMin: 120000, salaryMax: 160000 },
                            { id: 5, name: '$160k - $200k', salaryMin: 160000, salaryMax: 200000 },
                            { id: 6, name: '$200k+', salaryMin: 200000, salaryMax: '' },
                            { id: 7, name: 'Negotiable', salaryMin: 0, salaryMax: 0, isNegotiable: true },
                        ],
                        grid: true,
                    },
                    jobTypeId: {
                        name: 'Job Type',
                        type: 'Radio',
                        options: [{ name: 'All', id: '' }, ...data.jobTypes],
                        grid: true,
                    },
                    educationId: {
                        name: 'Education',
                        type: 'Radio',
                        options: [{ name: 'All', id: '' }, ...data.educations],
                    },
                    jobLevelId: { name: 'Job Level', type: 'Radio', options: [{ name: 'All', id: '' }, ...data.jobLevels] },
                };
                setJobFilter(filters);
                setCategoryOptions(data.categories);
                setIsFilterReady(true); // ✅ filter đã sẵn sàng

            } catch (error) {
                hideLoading();
                showError(error);
            }

        };

        fetchOptions();
    }, []);

    // ===== useEffect 2: Mỗi khi searchParams thay đổi thì gọi API tìm job =====
    useEffect(() => {
        const fetchJobs = async () => {
            setIsSearched(false);
            if (!isFilterReady) return; // ⛔ Không gọi nếu filter chưa sẵn sàng

            try {
                showLoading();
                const cleanedParams = Object.fromEntries(
                    [...searchParams.entries()].filter(([_, v]) => v !== '' && v !== null && v !== undefined),
                );

                const result = await jobService.searchJob(cleanedParams);
                console.log(result);

                hideLoading();

                const formatted = result.data.map(format.transformJobData);
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
                <h1>Find Job</h1>
            </div>

            <Filter
                type="JOB"
                filters={jobFilters}
                categoryOptions={categoryOptions}
                dataset={dataset}
                totalHits={totalHits}
                buttonLabel="Find Job"
                onSearch={(formValues) => {
                    setSearchParams(formValues);
                }}
                isFindJob
                isSearched={isSearched}
            />
        </div>
    );
}

export default FindJob;
