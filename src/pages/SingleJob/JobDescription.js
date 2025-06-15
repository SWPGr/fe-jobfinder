import React from 'react';
import classNames from 'classnames/bind';
import styles from './JobDetailsPage.module.scss';
import { Button } from '~/components';

const cx = classNames.bind(styles);

function JobDescription() {
    return (
        <div className={cx('job-description')}>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. ...
            </p>
            <p>Nullam scelerisque risus at nisi congue accumsan. ...</p>

            <h3>Responsibilities</h3>
            <ul>
                <li>Collaborate with product and UX teams...</li>
                <li>Conduct user research and testing...</li>
                <li>Design wireframes, prototypes...</li>
                <li>Communicate with stakeholders...</li>
            </ul>

            <div className={cx('share')}>
                <span>Share this job: </span>
                <Button className={cx('btn-facebook')}>Facebook</Button>
                <Button className={cx('btn-twitter')}>Twitter</Button>
                <Button className={cx('btn-pinterest')}>Pinterest</Button>
            </div>
        </div>
    );
}

export default JobDescription;
