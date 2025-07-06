import { useEffect, useState, useLayoutEffect } from 'react';
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
    const [totalJobs, setTotalJobs] = useState(0);
    const pageSize = 9;

    useEffect(() => {
        console.log('render');
        const fetchJobs = async () => {
            try {
                const data = await jobService.listAllJobs(activePage, 9);
                const jobsList = data.content.map(format.transformJobData);
                console.log('jobsList', jobsList);
                setJobs(jobsList);
                setTotalJobs(data.totalElements);
            } catch (error) {
                console.log(error);
            }
        };

        fetchJobs();
    }, [activePage]);

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
                    {jobs.map((job, index) => (
                        <JobItem
                            key={index}
                            image={Images.google_image}
                            jobDescription={job}
                            className={cx('item')}
                            saved={job.save}
                        />
                    ))}
                </div>
            </div>

            <div className={cx('featured-job__page')}>
                <Pagination
                    page={activePage}
                    onChange={(page) => setActivePage(page)}
                    total={Math.ceil(totalJobs / pageSize)}
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
