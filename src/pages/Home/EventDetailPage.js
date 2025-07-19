import EventInfoSection from './event/EventInfoSection';
import HeroSection from './event/HeroSection';
import NewsSection from './event/NewsSection';
import StatsSection from './event/StatsSection';
import SustainableLivingSection from './event/SustainableLivingSection';
import RelatedCompaniesSection from './event/RelatedCompaniesSection';
import GreenCompanySection from './event/GreenCompanySection';
import SectionWrapper from '../Home/animation/SectionWrapper';

import styles from '../Home/event/EventDetailPage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function EventDetailPage() {
    return (
        <div className={cx('event-detail-page')}>
            {/* Hero thường là section đầu nên không cần wrap */}
            <HeroSection />

            <SectionWrapper delay={0.05}>
                <StatsSection />
            </SectionWrapper>

            {/* <SectionWrapper delay={0.1}>
                <RelatedCompaniesSection />
            </SectionWrapper> */}

            <SectionWrapper delay={0.1}>
                <GreenCompanySection />
            </SectionWrapper>

            <SectionWrapper delay={0.15}>
                <SustainableLivingSection />
            </SectionWrapper>

            <SectionWrapper delay={0.2}>
                <EventInfoSection />
            </SectionWrapper>

            <SectionWrapper delay={0.25}>
                <NewsSection />
            </SectionWrapper>
        </div>
    );
}

export default EventDetailPage;
