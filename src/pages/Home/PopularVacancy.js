import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function PopularVacancy() {
    const VacancyData = [
        {
            title: 'Software Engineer',
            total: 120,
        },
        {
            title: 'Data Scientist',
            total: 95,
        },
        {
            title: 'Product Manager',
            total: 80,
        },
        {
            title: 'UX/UI Designer',
            total: 70,
        },
        {
            title: 'DevOps Engineer',
            total: 60,
        },
        {
            title: 'Full Stack Developer',
            total: 55,
        },
        {
            title: 'Business Analyst',
            total: 50,
        },
        {
            title: 'Marketing Specialist',
            total: 45,
        },
        {
            title: 'System Administrator',
            total: 40,
        },
        {
            title: 'Network Engineer',
            total: 35,
        },
        {
            title: 'Data Analyst',
            total: 30,
        },
        {
            title: 'Project Manager',
            total: 25,
        },
    ];

    return (
        <div className={cx('popular-vacancy')}>
            <div className={cx('popular-vacancy__container')}>
                <div className={cx('popular-vacancy__header')}>
                    <h1>Most Popular Vacancies</h1>
                </div>
                <div className={cx('popular-vacancy__content')}>
                    {VacancyData.map((vacancy, index) => (
                        <div key={index} className={cx('vacancy-item')}>
                            {/* Link to the job details page */}
                            <Link to={`/find-job/${vacancy.title}`} className={cx('title')}>
                                {vacancy.title}
                            </Link>
                            <p>{vacancy.total} Open Positions</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PopularVacancy;
