import React from 'react';
import classNames from 'classnames/bind';
import styles from './SingleJob.module.scss';

import { Button, JobItem } from '~/components';
import { Images } from '~/assets';
import { IconBrandFacebook, IconBrandTwitter, IconBrandPinterest } from '@tabler/icons-react';

const cx = classNames.bind(styles);

const relatedJobsData = [
    {
        companyName: 'Freepik',
        jobTitle: 'Visual Designer',
        workTime: 'Full-time',
        salary: '$90K-$120K',
        image: Images.freepik_logo || Images.coming_soon,
        isFeatured: true,
    },
    {
        companyName: 'Instagram',
        jobTitle: 'Front End Developer',
        workTime: 'Contract Exp',
        salary: '$50K-$80K',
        image: Images.instagram_logo || Images.coming_soon,
    },
    {
        companyName: 'Upwork',
        jobTitle: 'Technical Support Specialist',
        workTime: 'Full-time',
        salary: '$40K-$60K',
        image: Images.upwork_logo || Images.coming_soon,
    },
];

function SingleJob() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('job-details')}>
                <div className={cx('left')}>
                    <h1 className={cx('job-title')}>
                        Senior UX Designer
                        <span className={cx('badge', 'featured')}>Featured</span>
                        <span className={cx('badge', 'part-time')}>Part Time</span>
                    </h1>

                    <div className={cx('contact-info')}>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className={cx('contact-link')}>
                            https://instagram.com
                        </a>{' '}
                        | <span>+8495 555-0120</span> | <a href="mailto:career@instagram.com">career@instagram.com</a>
                    </div>

                    <div className={cx('description')}>
                        <p>
                            Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus
                            tellus. Duis et est ac leo rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam.
                            Pellentesque quis justo sit amet arcu commodo sollicitudin. Integer finibus blandit
                            condimentum. Vivamus sit amet ligula ullamcorper, pulvinar ante id, tristique erat. Quisque
                            sit amet aliquam urna. Maecenas blandit felis id massa sodales finibus.
                        </p>
                        <p>
                            Integer bibendum eu nulla eu sollicitudin. Sed lobortis diam tincidunt accumsan faucibus.
                            Quisque blandit augue quis turpis auctor, dapibus euismod ante ultricies. Ut non felis
                            lacinia turpis feugiat euismod at id magna. Sed ut orci arcu. Suspendisse sollicitudin
                            faucibus aliquet.
                        </p>
                    </div>

                    <div className={cx('responsibilities')}>
                        <h3>Responsibilities</h3>
                        <ul>
                            <li>Quisque semper gravida est et consectetur.</li>
                            <li>Curabitur blandit lorem velit, vitae pretium leo placerat eget.</li>
                            <li>Morbi mattis in ipsum ac tempus.</li>
                            <li>
                                Curabitur eu vehicula libero. Vestibulum sed purus ullamcorper, lobortis lectus nec.
                            </li>
                            <li>Vulputate turpis. Quisque ante odio, iaculis a porttitor sit amet.</li>
                            <li>Islorts vel lectus. Nullam at risus ut diam.</li>
                            <li>Commodo feugiat. Nullam lacinia, diam placerat dapibus tincidunt.</li>
                            <li>Dolor metus posuere lorem, id condimentum erat velit nec neque.</li>
                            <li>Dui sodales ut. Curabitur tempus augue.</li>
                        </ul>
                    </div>

                    <div className={cx('share')}>
                        <span>Share this job:</span>
                        <Button className={cx('btn-social')} leftIcon={<IconBrandFacebook size={20} />}>
                            Facebook
                        </Button>
                        <Button className={cx('btn-social')} leftIcon={<IconBrandTwitter size={20} />}>
                            Twitter
                        </Button>
                        <Button className={cx('btn-social')} leftIcon={<IconBrandPinterest size={20} />}>
                            Pinterest
                        </Button>
                    </div>
                </div>

                <div className={cx('right')}>
                    <div className={cx('job-overview')}>
                        <h2>Job Overview</h2>
                        <ul>
                            <li>
                                <strong>Posted Date:</strong> 29 June, 2021
                            </li>
                            <li>
                                <strong>Vacancy:</strong> 3 Positions
                            </li>
                            <li>
                                <strong>Job Nature:</strong> Contractual
                            </li>
                            <li>
                                <strong>Salary:</strong> $15k - $25k
                            </li>
                            <li>
                                <strong>Location:</strong> New York, USA
                            </li>
                            <li>
                                <strong>Application Date:</strong> 15 July, 2021
                            </li>
                        </ul>
                    </div>

                    <div className={cx('company-info')}>
                        <img src={Images.instagram_logo} alt="Instagram" className={cx('company-logo')} />
                        <h3>Instagram</h3>
                        <p>Social Networking Service</p>

                        <p>
                            <strong>Founded:</strong> March 21, 2006
                        </p>
                        <p>
                            <strong>Type:</strong> Private Company
                        </p>
                        <p>
                            <strong>Employees:</strong> 120-180 Employees
                        </p>
                        <p>
                            <strong>Phone:</strong> 555-555-0120
                        </p>
                        <p>
                            <strong>Email:</strong> twitter@gmail.com
                        </p>
                        <p>
                            <strong>Website:</strong>{' '}
                            <a href="https://twitter.com" target="_blank" rel="noreferrer">
                                https://twitter.com
                            </a>
                        </p>
                    </div>

                    <Button className={cx('btn-apply')} blue_white>
                        Apply Now
                    </Button>
                    <p className={cx('deadline')}>
                        Application Deadline: <strong>June 30, 2021</strong>
                    </p>
                </div>
            </div>

            <div className={cx('related-jobs')}>
                <h2>Related Jobs</h2>
                <div className={cx('related-jobs-list')}>
                    {relatedJobsData.map((job, idx) => (
                        <JobItem
                            key={idx}
                            image={job.image}
                            jobDescription={{
                                companyName: job.companyName,
                                jobTitle: job.jobTitle,
                                workTime: job.workTime,
                                salary: job.salary,
                            }}
                            isFeatured={job.isFeatured}
                            className={cx('related-job-item')}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SingleJob;
