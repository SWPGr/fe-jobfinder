import React from 'react';
import { Filter } from '~/components';
import classNames from 'classnames/bind';
import styles from './FindJob.module.scss';
import { useEffect } from 'react';

import { jobService } from '~/services';

const cx = classNames.bind(styles);

function FindJob() {
    const [jobFilter, setJobFilter] = React.useState({});

    const [categoryOptions, setCategoryOptions] = React.useState([]);

    const handleFilterSearch = (values) => {
        console.log('User filters:', values);
        // TODO: gọi API tìm kiếm với các giá trị filter truyền về
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await jobService.getAllOptions();

            const rawData = {
                experiences: { type: 'Radio', options: [], grid: true },
                salary: {
                    type: 'Radio',
                    options: [
                        { id: 1, name: '$0 - $50k', min: 0, max: 50000 },
                        { id: 2, name: '$50k - $100k', min: 50000, max: 100000 },
                        { id: 3, name: '$100k - $200k', min: 100000, max: 200000 },
                        { id: 4, name: '$200k+', min: 200000, max: Infinity },
                    ],
                    grid: true,
                },
                jobTypes: { type: 'Radio', options: [], grid: true },
                educations: { type: 'Radio', options: [] },
                jobLevels: { type: 'Radio', options: [] },
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
                filters={jobFilter}
                categoryOptions={categoryOptions}
                buttonLabel="Find Job"
                onSearch={handleFilterSearch}
            />
        </div>
    );
}

export default FindJob;
