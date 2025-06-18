import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import { Button } from '~/components';
import { useAuth } from '~/context/AuthContext';
import { Images } from '~/assets';

const cx = classNames.bind(styles);

function CTA() {
    const { user } = useAuth();
    const role = user?.role || 'JOB_SEEKER';
    const isEmployer = role === 'EMPLOYER';

    const quotes = {
        ADMIN: {
            title: 'Welcome to Your Admin Dashboard',
            description:
                'Manage your platform efficiently with powerful tools and insights. Monitor activities, manage users, and ensure a smooth operation.',
            link: '/dashboard',
            linkText: 'Go to Admin Dashboard',
        },
        EMPLOYER: {
            title: 'Build Your Dream Team Today',
            description:
                'Find and attract top talent quickly and efficiently. Post your job openings, connect with qualified candidates, and grow your business.',
            link: '/post-job',
            linkText: 'Post a Job Now',
        },
        JOB_SEEKER: {
            title: 'Create A Better Future For Yourself',
            description:
                'Discover thousands of job opportunities tailored to your skills and passions. Take the next step in your career with confidence and support.',
            link: '/find-job',
            linkText: 'Find Your Dream Job',
        },
    };

    return (
        <div className={cx('CTA__wrapper')}>
            <div className={cx('CTA__container')}>
                <div className={cx('CTA__content-wrapper')}>
                    <div className={cx('CTA__content')}>
                        <h1 className={cx('CTA__title')}>{quotes[role].title}</h1>
                        <p className={cx('CTA__description')}>{quotes[role].description}</p>
                    </div>
                    <Button to={quotes[role].link} className={cx('CTA__button')}>
                        {quotes[role].linkText}
                    </Button>
                </div>
                {/*  */}
                <div className={cx('CTA__image')}>
                    <img src={Images.quota} alt="illustration" />
                </div>
            </div>
        </div>
    );
}

export default CTA;
