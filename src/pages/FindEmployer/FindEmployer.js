import React from 'react';
import { Filter } from '~/components';
import classNames from 'classnames/bind';
import styles from './FindEmployer.module.scss';

const cx = classNames.bind(styles);

function FindEmployer() {
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

export default FindEmployer;
