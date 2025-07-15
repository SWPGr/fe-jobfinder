import React from 'react';
import { useEffect } from 'react';
import { Filter } from '~/components';
import classNames from 'classnames/bind';
import styles from './FindCandidate.module.scss';

import { jobService } from '~/services';

const cx = classNames.bind(styles);

function FindCandidate() {
    const [employerFilter, setEmployerFilter] = React.useState({});
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
                // jobTypes: { name: 'Job Type', type: 'Radio', options: [], grid: true },
                educations: { name: 'Education', type: 'Radio', options: [] },
                // candidateLevel: { name: 'Candidate Level', type: 'Radio', options: [] },
            };

            rawData.experiences.options = [{ name: 'All', id: '' }, ...data.experiences];
            // rawData.jobTypes.options = [{ name: 'All', id: '' }, ...data.jobTypes];
            rawData.educations.options = [{ name: 'All', id: '' }, ...data.educations];
            // rawData.candidateLevel.options = [{ name: 'All', id: '' }, ...data.jobLevels];

            setEmployerFilter(rawData);
            setCategoryOptions(data.categories);
            console.log('rawData', rawData);
        };

        fetchData();
    }, []);

    return (
        <div className={cx('find-job__wrapper')}>
            <div className={cx('find-job__title')}>
                <h1>Find Candidate</h1>
            </div>

            <Filter
                searchLabel="Find your potential candidates"
                filters={employerFilter}
                categoryOptions={categoryOptions}
                buttonLabel="Find Candidate"
                onSearch={handleFilterSearch}
            />
        </div>
    );
}

export default FindCandidate;
