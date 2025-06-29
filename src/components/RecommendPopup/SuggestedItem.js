import classNames from 'classnames/bind';
import styles from './RecommendPopup.module.scss';

import { Images } from '~/assets';

const cx = classNames.bind(styles);

function SuggestedItem({ image = Images.default_image, jobDescription = {} }) {
    const { companyName, jobTitle, salary } = jobDescription;

    return (
        <div className={cx('suggested__item')} onClick={() => {}}>
            <div className={cx('suggested__item-icon')}>
                <img src={Images.google_image} alt="Suggested Icon" />
            </div>
            <div className={cx('suggested__item-info')}>
                <p className={cx('suggested__item-company')} onClick={() => {}}>
                    Google
                </p>
                <p className={cx('suggested__item-job')} onClick={() => {}}>
                    Web Designer asdjas jshdkaj shdkajsh kajdhskjdhks hd
                </p>
                <p className={cx('suggested__item-salary')}>$50k - $100k</p>
            </div>
        </div>
    );
}

export default SuggestedItem;
