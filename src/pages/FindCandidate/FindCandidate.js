import React from 'react';
import { useEffect } from 'react';
import { Filter } from '~/components';
import classNames from 'classnames/bind';
import styles from './FindCandidate.module.scss';

import { jobService } from '~/services';

const cx = classNames.bind(styles);

function FindCandidate() {
    const [employerFilter, setEmployerFilter] = React.useState({});

    const jobFilters = {
        experience: { type: 'Radio', options: ['0-1 year', '1-3 years', '3-5 years', '5+ years'] },
        salary: { type: 'Radio', options: ['$0 - $50k', '$50k - $100k', '$100k - $200k', '$200k+'] },
        jobType: { type: 'Checkbox', options: ['Full-time', 'Part-time', 'Contract'] },
        education: { type: 'Checkbox', options: ['High School', 'Bachelor', 'Master', 'PhD'] },
        jobLevel: { type: 'Radio', options: ['Internship', 'Entry Level', 'Mid Level', 'Senior Level'] },
    };

    const categoryOptions = ['Software Development', 'Design', 'Marketing', 'Sales'];

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

            setEmployerFilter(rawData);
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
                filters={employerFilter}
                categoryOptions={categoryOptions}
                buttonLabel="Find "
                onSearch={handleFilterSearch}
            />
        </div>
    );
}

export default FindCandidate;
