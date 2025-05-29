import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { IconArrowRight } from '@tabler/icons-react';
import { Pagination } from '@mantine/core';

import { Button } from '~/components';
import { JobItemList, JobItem } from '~/components';
import { Images } from '~/assets';

const cx = classNames.bind(styles);

const fakeJobs = [
    {
        companyName: 'Google',
        companyAddress: '1600 Amphitheatre Parkway Mountain View, CA',
        jobTitle: 'Software Engineer',
        workTime: 'Full-time',
        salary: '$100,000 - $150,000',
        dueDate: '2025-06-15',
    },
    {
        companyName: 'Facebook',
        companyAddress: '1 Hacker Way Menlo Park, CA',
        jobTitle: 'Product Manager',
        workTime: 'Full-time',
        salary: '$110,000 - $160,000',
        dueDate: '2025-07-01',
    },
    {
        companyName: 'Amazon',
        companyAddress: '410 Terry Ave N Seattle, WA',
        jobTitle: 'Data Scientist',
        workTime: 'Part-time',
        salary: '$90,000 - $130,000',
        dueDate: '2025-06-30',
    },
    {
        companyName: 'Microsoft',
        companyAddress: 'One Microsoft Way Redmond, WA',
        jobTitle: 'UX Designer',
        workTime: 'Full-time',
        salary: '$95,000 - $140,000',
        dueDate: '2025-07-15',
    },
    {
        companyName: 'Netflix',
        companyAddress: '100 Winchester Circle Los Gatos, CA',
        jobTitle: 'DevOps Engineer',
        workTime: 'Contract',
        salary: '$120,000 - $170,000',
        dueDate: '2025-08-01',
    },
    {
        companyName: 'Airbnb',
        companyAddress: '888 Brannan Street San Francisco, CA',
        jobTitle: 'Marketing Specialist',
        workTime: 'Full-time',
        salary: '$70,000 - $110,000',
        dueDate: '2025-06-20',
    },
    {
        companyName: 'Tesla',
        companyAddress: '3500 Deer Creek Road Palo Alto, CA',
        jobTitle: 'Electrical Engineer',
        workTime: 'Full-time',
        salary: '$105,000 - $150,000',
        dueDate: '2025-07-10',
    },
    {
        companyName: 'Spotify',
        companyAddress: '4 World Trade Center New York, NY',
        jobTitle: 'Content Strategist',
        workTime: 'Part-time',
        salary: '$65,000 - $95,000',
        dueDate: '2025-06-25',
    },
    {
        companyName: 'Dropbox',
        companyAddress: '185 Berry Street San Francisco, CA',
        jobTitle: 'Customer Support',
        workTime: 'Full-time',
        salary: '$50,000 - $70,000',
        dueDate: '2025-07-05',
    },
    {
        companyName: 'Salesforce',
        companyAddress: '415 Mission Street San Francisco, CA',
        jobTitle: 'Sales Manager',
        workTime: 'Full-time',
        salary: '$90,000 - $140,000',
        dueDate: '2025-07-30',
    },
    {
        companyName: 'Intel',
        companyAddress: '2200 Mission College Blvd Santa Clara, CA',
        jobTitle: 'Hardware Engineer',
        workTime: 'Full-time',
        salary: '$95,000 - $145,000',
        dueDate: '2025-08-05',
    },
    {
        companyName: 'IBM',
        companyAddress: '1 New Orchard Road Armonk, NY',
        jobTitle: 'Cloud Solutions Architect',
        workTime: 'Full-time',
        salary: '$120,000 - $180,000',
        dueDate: '2025-08-20',
    },
    {
        companyName: 'Adobe',
        companyAddress: '345 Park Avenue San Jose, CA',
        jobTitle: 'Graphic Designer',
        workTime: 'Contract',
        salary: '$70,000 - $100,000',
        dueDate: '2025-06-28',
    },
    {
        companyName: 'Uber',
        companyAddress: '1455 Market Street San Francisco, CA',
        jobTitle: 'Operations Manager',
        workTime: 'Full-time',
        salary: '$85,000 - $130,000',
        dueDate: '2025-07-18',
    },
    {
        companyName: 'LinkedIn',
        companyAddress: '1000 W Maude Ave Sunnyvale, CA',
        jobTitle: 'Software Engineer',
        workTime: 'Full-time',
        salary: '$110,000 - $160,000',
        dueDate: '2025-07-22',
    },
];

function FeaturedJob() {
    const [activePage, setActivePage] = useState(1);
    const pageSize = 9;

    const startIndex = (activePage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const currentPageItems = fakeJobs.slice(startIndex, endIndex);

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
                        <JobItem
                            key={index}
                            image={Images.google_image}
                            jobDescription={job}
                            isLogin
                            className={cx('item')}
                        />
                    ))}
                </div>
            </div>

            <div className={cx('featured-job__page')}>
                <Pagination
                    page={activePage}
                    onChange={(page) => setActivePage(page)}
                    total={Math.ceil(fakeJobs.length / pageSize)}
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
