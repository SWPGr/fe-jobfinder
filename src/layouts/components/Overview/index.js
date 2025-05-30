import { JobItemApplied, JobItem, JobItemOwner, JobItemList } from '~/components';
import classNames from 'classnames/bind';
import styles from './Overview.module.scss';
import { RichTextEditor } from '~/components';

const cx = classNames.bind(styles);

function Overview() {
    return (
        <div>
            <div className={cx('box')}>
                <JobItem
                    image={'asdasd'}
                    jobDescription={{
                        companyName: 'Google',
                        companyAddress: '1600 Amphitheatre Parkway Mountain ',
                        jobTitle: 'Software Engineer asdasd asdasds asdadasd',
                        workTime: 'Full-time',
                        salary: '$100 - $200',
                        dueDate: 'June 15, 2021',
                    }}
                    saved
                    isLogin
                    isVIP
                    className={cx('item')}
                />
            </div>
            <div className={cx('box')}>
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
                    className={cx('item')}
                />
            </div>
            <div className={cx('box')}>
                <JobItemList
                    saved
                    isLogin
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
                    className={cx('item')}
                />
            </div>
            <div className={cx('box')}>
                <JobItemOwner
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
                    className={cx('item')}
                />
            </div>

            <RichTextEditor />
        </div>
    );
}

export default Overview;