import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { JobItem, JobItemList, JobItemOwner, JobItemApplied } from '~/components';
import { Images } from '~/assets';
import { Button } from '~/components';
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
        <>
            <JobItem
                image={Images.google_image}
                jobDescription={{
                    companyName: 'Google ádas ádasds ádasdad ádsadadasd ádas',
                    companyAddress: '1600 Amphitheatre Parkway Mountain ',
                    jobTitle: 'Software Engineer sdasdash ahsdhas ahdsasjh bdjashdbsajh dajshdbjsa sbjdhasdjadhabdajsh',
                    workTime: 'Full-time',
                    salary: '$100 - $200',
                }}
                // isLogin
                isVIP
            />

            <JobItemList
                image={Images.google_image}
                jobDescription={{
                    companyName: 'Google',
                    companyAddress: '1600 Amphitheatre Parkway Mountain ',
                    jobTitle: 'Software Engineer asdsa asdas asdasdasdad asdas',
                    workTime: 'Full-time',
                    salary: '$100 - $200',
                    remainDay: '3',
                }}
                isLogin
                isVIP
            />

            <JobItemOwner
                image={Images.google_image}
                jobDescription={{
                    companyAddress: '1600 Amphitheatre Parkway Mountain ',
                    jobTitle: 'Software Engineer sdasdas ádasdas ádasdasd âdsda dsadasds ',
                    workTime: 'Full-time',
                    salary: '$100 - $200',
                    remainDay: '3',
                    isActive: false,
                    dueDate: 'June 15, 2021',
                    numberApplications: 10,
                }}
                isVIP
            />

            <JobItemApplied
                image={'asdasd'}
                jobDescription={{
                    companyName: 'Google',
                    companyAddress: '1600 Amphitheatre Parkway Mountain ',
                    jobTitle: 'Software Engineer asdasd asdasds asdadasd',
                    workTime: 'Full-time',
                    salary: '$100 - $200',
                    dueDate: 'June 15, 2021',
                }}
                isVIP
            />

            <Button green large type="submit">
                CLick
            </Button>
            <div className={cx('wrapper')}>
                <LandingPage />
                <PopularVacancy />
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
