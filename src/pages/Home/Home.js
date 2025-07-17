import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect, lazy, Suspense } from 'react';
import { useWindowScroll } from '@mantine/hooks';

const JobMarketTrends = lazy(() => import('./JobMarketTrends'));
const FeaturedJob = lazy(() => import('./FeaturedJob'));
const TopCompanies = lazy(() => import('./TopCompanies'));
const PopularVacancy = lazy(() => import('./PopularVacancy'));
const Instruction = lazy(() => import('./Instruction'));
const PopularCategory = lazy(() => import('./PopularCategory'));
const LandingPage = lazy(() => import('../components/LandingPage'));
const CTA = lazy(() => import('./CTA'));

const cx = classNames.bind(styles);

function Home() {
    const [scroll, scrollTo] = useWindowScroll();

    useEffect(() => {
        scrollTo({ y: 0 });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Suspense fallback={<div>Loading...</div>}>
                <LandingPage />
                <JobMarketTrends />
                <Instruction />
                <PopularCategory />
                <FeaturedJob />
                <TopCompanies />
                <CTA />
            </Suspense>
        </div>
    );
}

export default Home;
