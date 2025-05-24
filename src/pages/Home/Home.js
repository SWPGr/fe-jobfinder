import { JobItem, JobItemList, JobItemOwner, JobItemApplied } from '~/components';
import { Images } from '~/assets';

function Home() {
    return (
        <>
            <JobItem
                image={Images.google_image}
                jobDescription={{
                    companyName: 'Google',
                    companyAddress: '1600 Amphitheatre Parkway Mountain ',
                    jobTitle: 'Software Engineer',
                    workTime: 'Full-time',
                    salary: '$100 - $200',
                }}
                isLogin
                isVIP
            />

            <JobItemList
                image={Images.google_image}
                jobDescription={{
                    companyName: 'Google',
                    companyAddress: '1600 Amphitheatre Parkway Mountain ',
                    jobTitle: 'Software Engineer',
                    workTime: 'Full-time',
                    salary: '$100 - $200',
                    remainDate: '3',
                }}
                isLogin
                // isVIP
            />

            <JobItemOwner
                image={Images.google_image}
                jobDescription={{
                    companyName: 'Google',
                    companyAddress: '1600 Amphitheatre Parkway Mountain ',
                    jobTitle: 'Software Engineer',
                    workTime: 'Full-time',
                    salary: '$100 - $200',
                    remainDate: '3',
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
                    jobTitle: 'Software Engineer',
                    workTime: 'Full-time',
                    salary: '$100 - $200',
                    dueDate: 'June 15, 2021',
                }}
                isVIP
            />
        </>
    );
}

export default Home;
