import { Filter } from '~/components';
import classNames from 'classnames/bind';
import styles from './FindJob.module.scss';

const cx = classNames.bind(styles);

function FindJob() {
    return (
        <div className={cx('find-job__wrapper')}>
            <div className={cx('find-job__header')}>
                <div className={cx('header__container')}>
                    <div className={cx('header__title')}>
                        <h1>Find Jobs</h1>
                    </div>
                    <div className={cx('header__filter')}>
                        <Filter />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindJob;
