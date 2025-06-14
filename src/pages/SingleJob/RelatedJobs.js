import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobDetailsPage.module.scss';
import { JobItem } from '~/components';
import { Images } from '~/assets';

const cx = classNames.bind(styles);

const relatedJobs = [
    {
        companyName: 'Freepik',
        jobTitle: 'Visual Designer',
        workTime: 'Full-time',
        salary: '$90K-$120K',
        image: Images.freepik_logo,
    },
    {
        companyName: 'Instagram',
        jobTitle: 'Front End Developer',
        workTime: 'Contract Exp',
        salary: '$50K-$80K',
        image: Images.instagram_logo,
    },
    {
        companyName: 'Upwork',
        jobTitle: 'Technical Support Specialist',
        workTime: 'Full-time',
        salary: '$40K-$60K',
        image: Images.upwork_logo,
    },
];

function RelatedJobs() {
    return (
        <section className={cx('related-jobs')}>
            <h3>Related Jobs</h3>
            <div className={cx('related-jobs-list')}>
                {relatedJobs.map((job, idx) => (
                    <JobItem
                        key={idx}
                        image={job.image}
                        jobDescription={{
                            companyName: job.companyName,
                            jobTitle: job.jobTitle,
                            workTime: job.workTime,
                            salary: job.salary,
                        }}
                        className={cx('related-job-item')}
                    />
                ))}
            </div>
        </section>
    );
}

export default RelatedJobs;
