import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import { Button } from '~/components';
import { useAuth } from '~/context/AuthContext';
import { Images } from '~/assets';

const cx = classNames.bind(styles);

function CTA() {
    const { user } = useAuth();
    const role = user.role;
    const isEmployer = role === 'EMPLOYER';

    const quotes = {
        EMPLOYER: {
            title: 'Build Your Dream Team Today',
            description:
                'Find and attract top talent quickly and efficiently. Post your job openings, connect with qualified candidates, and grow your business.',
        },
        JOB_SEEKER: {
            title: 'Create A Better Future For Yourself',
            description:
                'Discover thousands of job opportunities tailored to your skills and passions. Take the next step in your career with confidence and support.',
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
                    <Button to={isEmployer ? '/post-job' : '/find-job'} className={cx('CTA__button')}>
                        {isEmployer ? 'Post a Job' : 'Find a Job'}
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
