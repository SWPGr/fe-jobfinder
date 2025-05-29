import classNames from 'classnames/bind';
import styles from './Home.module.scss';

import { LandingPage } from '../components';
import PopularVacancy from './PopularVacancy';
import Instruction from './Instruction';
import PopularCategory from './PopularCategory';
import FeaturedJob from './FeaturedJob';
import TopCompanies from './TopCompanies';
import CTA from './CTA';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <LandingPage />
            <PopularVacancy />
            <Instruction />
            <PopularCategory />
            <FeaturedJob />
            <TopCompanies />
            <CTA />
        </div>
    );
}

export default Home;
