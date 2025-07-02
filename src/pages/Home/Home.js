import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect } from 'react';
import { useWindowScroll } from '@mantine/hooks';

import { LandingPage } from '../components';
import PopularVacancy from './PopularVacancy';
import Instruction from './Instruction';
import PopularCategory from './PopularCategory';
import FeaturedJob from './FeaturedJob';
import TopCompanies from './TopCompanies';
import CTA from './CTA';
import JobMarketTrends from './JobMarketTrends';
const cx = classNames.bind(styles);

function Home() {
    const [scroll, scrollTo] = useWindowScroll();

    useEffect(() => {
        scrollTo({ y: 0 });
    }, []);

    return (
        <>
            <div className={cx('wrapper')}>
                <LandingPage />
                {/* <PopularVacancy /> */}
                <JobMarketTrends />
                <Instruction />
                <PopularCategory />
                <FeaturedJob />
                <TopCompanies />
                <CTA />
            </div>
        </>
    );
}

export default Home;
