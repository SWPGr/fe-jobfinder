import React from 'react';
import { Filter } from '~/components';
import classNames from 'classnames/bind';
import styles from './FindJob.module.scss';
import { useEffect } from 'react';

import { jobService } from '~/services';

const cx = classNames.bind(styles);

function FindJob() {
    const [jobFilters, setJobFilter] = React.useState({});

    const [categoryOptions, setCategoryOptions] = React.useState([]);

    const handleFilterSearch = (values) => {
        console.log('User filters:', values);
        // TODO: gọi API tìm kiếm với các giá trị filter truyền về
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await jobService.getAllOptions();

            const rawData = {
                experiences: { name: 'Experience', type: 'Radio', options: [], grid: true },
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
                jobTypes: { name: 'Job Type', type: 'Radio', options: [], grid: true },
                educations: { name: 'Education', type: 'Radio', options: [] },
                jobLevels: { name: 'Job Level', type: 'Radio', options: [] },
            };

            rawData.experiences.options = data.experiences;
            rawData.jobTypes.options = data.jobTypes;
            rawData.educations.options = data.educations;
            rawData.jobLevels.options = data.jobLevels;

            setJobFilter(rawData);
            setCategoryOptions(data.categories);
            console.log('rawData', rawData);
        };

        fetchData();
    }, []);

    return (
        <div className={cx('find-job__wrapper')}>
            <div className={cx('find-job__title')}>
                <h1>Find Job</h1>
            </div>

            <Filter
                filters={jobFilters}
                categoryOptions={categoryOptions}
                buttonLabel="Find Job"
                onSearch={handleFilterSearch}
            />
        </div>
    );
}

export default FindJob;
