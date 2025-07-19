import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { useEffect, lazy, Suspense } from 'react';
import { useWindowScroll } from '@mantine/hooks';
import { useAuth } from '~/context/AuthContext';

import { LandingPage } from '../components';
import PopularVacancy from './PopularVacancy';
import Instruction from './Instruction';
import PopularCategory from './PopularCategory';
import FeaturedJob from './FeaturedJob';
import TopCompanies from './TopCompanies';
import CTA from './CTA';
import JobMarketTrends from './JobMarketTrends';
import SectionWrapper from './animation/SectionWrapper';
import EventBanner from './EventBanner';
import JobFairBanner  from './components/JobFairBanner'

const cx = classNames.bind(styles);

function Home() {
    const [scroll, scrollTo] = useWindowScroll();

    const { user } = useAuth();

    useEffect(() => {
        scrollTo({ y: 0 });
    }, []);

    return (
        <div className={cx('wrapper')}>

            {/* Không cần wrapper cho LandingPage vì nó là phần đầu */}
            <LandingPage />

            <SectionWrapper delay={0.05}>
                <EventBanner />
            </SectionWrapper>
            <SectionWrapper delay={0.1}>

                <JobMarketTrends />
            </SectionWrapper>

            <SectionWrapper delay={0.2}>
                <Instruction />

            </SectionWrapper>

            <SectionWrapper delay={0.25}>
                <JobFairBanner />
            </SectionWrapper>

            <SectionWrapper delay={0.3}>

                <PopularCategory />
            </SectionWrapper>

            <SectionWrapper delay={0.4}>
                <FeaturedJob />
            </SectionWrapper>

            <SectionWrapper delay={0.5}>
                <TopCompanies />
            </SectionWrapper>

            <SectionWrapper delay={0.6}>
                <CTA />

            </SectionWrapper>

        </div>
    );
}

export default Home;
