import React from 'react';
import { Filter } from '~/components';
import classNames from 'classnames/bind';
import styles from './FindEmployer.module.scss';
import { jobService } from '~/services';

const cx = classNames.bind(styles);

function FindEmployer() {
    const [jobFilters, setJobFilter] = React.useState({});
    const [categoryOptions, setCategoryOptions] = React.useState([]);

    const handleFilterSearch = (values) => {
        console.log('User filters:', values);
        // TODO: gọi API tìm kiếm với các giá trị filter truyền về
    };
    React.useEffect(() => {
        const fetchData = async () => {
            const data = await jobService.getAllOptions();

            const rawData = {
                organizationTypeId: { name: 'Organization Type', type: 'Radio', options: [] },
            };

            rawData.organizationTypeId.options = data?.organizations;

            setJobFilter(rawData);
            setCategoryOptions(data.categories);
            console.log('rawData', rawData);
        };

        fetchData();
    }, []);

    return (
        <div className={cx('find-job__wrapper')}>
            <div className={cx('find-job__title')}>
                <h1>Find Company</h1>
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
