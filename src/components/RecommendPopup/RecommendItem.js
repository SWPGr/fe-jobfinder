import classNames from 'classnames/bind';
import styles from './RecommendPopup.module.scss';
import { IconHistory, IconX } from '@tabler/icons-react';

import { format } from '~/utils';

const cx = classNames.bind(styles);

function RecommendItem({ title, date }) {
    return (
        <div className={cx('recommend__item')}>
            <div className={cx('left')}>
                <div className={cx('recommend__item-icon')}>
                    <IconHistory />
                </div>
                <div className={cx('recommend__item-info')}>
                    <p className={cx('recommend__item-text')} onClick={() => {}}>
                        Web designer asdasd asdjash ajds ajhksdjashd ajdhks
                    </p>
                    <p className={cx('recommend__item-date')}>{format.formatTimeAgo('2025-06-25')}</p>
                </div>
            </div>
            <div className={cx('recommend__item-icon', 'clear')}>
                <IconX />
            </div>
        </div>
    );
}

export default RecommendItem;
