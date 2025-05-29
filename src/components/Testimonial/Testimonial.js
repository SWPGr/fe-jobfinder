import { Rating } from '@mantine/core';
import classNames from 'classnames/bind';
import styles from './Testimonial.module.scss';

const cx = classNames.bind(styles);

function Testimonial({ value, comment, user = {} }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('rating')}>
                <Rating value={value} readOnly />
            </div>
            <div className={cx('comment')}>{comment}</div>
            <div className={cx('user')}>
                <div className={cx('avatar')}>
                    <img src={user.avatar} alt="" />
                </div>
                <div className={cx('info')}>
                    <div className={cx('name')}>{user.name}</div>
                    <div className={cx('position')}>{user.position}</div>
                </div>
            </div>
        </div>
    );
}

export default Testimonial;
