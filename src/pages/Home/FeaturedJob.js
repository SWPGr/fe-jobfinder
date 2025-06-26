import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { IconArrowRight } from '@tabler/icons-react';
import { Pagination } from '@mantine/core';

import { Button } from '~/components';
import { JobItem } from '~/components';
import { Images } from '~/assets';
import { jobService } from '~/services';
import { format } from '~/utils';
import { useAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function FeaturedJob() {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const pageSize = 9;

    const startIndex = (activePage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const currentPageItems = jobs.slice(startIndex, endIndex);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const data = await jobService.listAllJobs();
                console.log(data);

                setJobs(data.map(format.transformJobData));
                console.log(data.map(format.transformJobData));
            } catch (error) {
                console.log(error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className={cx('featured-job')}>
            <div className={cx('featured-job__container')}>
                <div className={cx('featured-job__title')}>
                    <h1>Featured Job</h1>
                    <Button to={'/find-job'} rightIcon={<IconArrowRight />} blue_white>
                        View All
                    </Button>
                </div>
                <div className={cx('featured-job__list')}>
                    {currentPageItems.map((job, index) => (
                        <JobItem key={index} image={Images.google_image} jobDescription={job} className={cx('item')} />
                    ))}
                </div>
            </div>

            <div className={cx('featured-job__page')}>
                <Pagination
                    page={activePage}
                    onChange={(page) => setActivePage(page)}
                    total={Math.ceil(jobs.length / pageSize)}
                    defaultValue={1}
                    siblings={1}
                    radius="xl"
                    classNames={{ control: cx('control') }}
                />
            </div>
        </div>
    );
}

export default FeaturedJob;
