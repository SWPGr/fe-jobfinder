import classNames from 'classnames/bind';
import styles from './RecommendPopup.module.scss';
import { IconHistory, IconX, IconSearch } from '@tabler/icons-react';

import { format } from '~/utils';

const cx = classNames.bind(styles);

function RecommendItem({ id, title, date, isRecommend = false, onClick = () => {}, handleDeleteHistory = () => {} }) {
    if (!title) {
        return <div className={cx('recommend__empty')}>No recommendations available</div>;
    }

    return (
        <div className={cx('recommend__item')} onClick={onClick}>
            <div className={cx('left')}>
                <div className={cx('recommend__item-icon')}>{isRecommend ? <IconSearch /> : <IconHistory />}</div>
                <div className={cx('recommend__item-info')}>
                    <p className={cx('recommend__item-text')} onClick={() => {}}>
                        {title}
                    </p>
                    {!isRecommend && <p className={cx('recommend__item-date')}>{format.formatTimeAgo(date)}</p>}
                </div>
            </div>
            {!isRecommend && (
                <div
                    className={cx('recommend__item-icon', 'delete')}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent click from propagating to the parent div
                        handleDeleteHistory(id); // Assuming title.id is the ID of the search history item
                    }}
                >
                    <IconX />
                </div>
            )}
        </div>
    );
}

export default RecommendItem;
