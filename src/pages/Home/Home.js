import { JobItem, JobItemList, JobItemOwner, JobItemApplied } from '~/components';
import { Images } from '~/assets';
import { Button } from '~/components';
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
                    remainDate: '3',
                }}
                isLogin

                // isVIP
            />

            <JobItemOwner
                image={Images.google_image}
                jobDescription={{
                    companyAddress: '1600 Amphitheatre Parkway Mountain ',
                    jobTitle: 'Software Engineer asdasd asdhasdjahs asd asdhagsd asdsh ',
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
                    jobTitle: 'Software Engineer asdasd asdasds asdadasd',
                    workTime: 'Full-time',
                    salary: '$100 - $200',
                    dueDate: 'June 15, 2021',
                }}
                isVIP
            />

            <Button black_lighter disabled large type="submit">
                CLick
            </Button>
        </>
    );
}

export default Home;
