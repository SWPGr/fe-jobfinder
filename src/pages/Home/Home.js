import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect, lazy, Suspense } from 'react';
import { useWindowScroll } from '@mantine/hooks';
import { useAuth } from '~/context/AuthContext';

const JobMarketTrends = lazy(() => import('./JobMarketTrends'));
const FeaturedJob = lazy(() => import('./FeaturedJob'));
const TopCompanies = lazy(() => import('./TopCompanies'));
const PopularVacancy = lazy(() => import('./PopularVacancy'));
const Instruction = lazy(() => import('./Instruction'));
const PopularCategory = lazy(() => import('./PopularCategory'));
const LandingPage = lazy(() => import('../components/LandingPage'));
const JobFairBanner = lazy(() => import('./components/JobFairBanner'));
const CTA = lazy(() => import('./CTA'));

const cx = classNames.bind(styles);

function Home() {
    const [scroll, scrollTo] = useWindowScroll();

    const { user } = useAuth();

    useEffect(() => {
        scrollTo({ y: 0 });
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Suspense fallback={<div>Loading...</div>}>
                <LandingPage />
                <JobMarketTrends />
                <Instruction />
                <JobFairBanner role={user?.role} />
                <PopularCategory />
                <FeaturedJob />
                <TopCompanies />
                <CTA />
            </Suspense>
        </div>
    );
}

export default Home;
