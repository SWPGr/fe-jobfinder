import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobDetailsPage.module.scss';
import { Button } from '~/components';
import { Images } from '~/assets';

const cx = classNames.bind(styles);

function JobOverview() {
    return (
        <aside className={cx('job-overview')}>
            <h3>Job Overview</h3>
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

            <div className={cx('company-info')}>
                <img src={Images.instagram_logo} alt="Instagram" />
                <h4>Instagram</h4>
                <p>Social Networking Service</p>

                <p>
                    <strong>Founded:</strong> March 21, 2006
                </p>
                <p>
                    <strong>Type:</strong> Private Company
                </p>
                <p>
                    <strong>Employees:</strong> 120-180 employees
                </p>
                <p>
                    <strong>Phone:</strong> 555-555-0120
                </p>
                <p>
                    <strong>Email:</strong> twitter@gmail.com
                </p>
                <p>
                    <strong>Website:</strong> https://twitter.com
                </p>
            </div>

            <Button className={cx('btn-apply')} blue_white>
                Apply Now
            </Button>
            <p className={cx('deadline')}>Application Deadline: June 30, 2021</p>
        </aside>
    );
}

export default JobOverview;
