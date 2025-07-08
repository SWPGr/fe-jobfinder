import classNames from 'classnames/bind';
import styles from './RecommendPopup.module.scss';
import Tippy from '@tippyjs/react/headless';

import { PopperWrapper } from '..';
import RecommendItem from './RecommendItem';
import SuggestedItem from './SuggestedItem';

const cx = classNames.bind(styles);
const defaultFn = () => {
    console.log('click outside');
};

function RecommendPopup({
    children,
    items = [],
    suggestedItems = [],
    visible,
    onClickOutside = defaultFn,
    x = 200,
    y = 30,
    className,
}) {
    const classes = cx('recommend__container', {
        [className]: className,
    });
    return (
        <Tippy
            delay={[0, 700]}
            visible={visible}
            interactive
            offset={[x, y]}
            onClickOutside={onClickOutside} // ✅ sử dụng props
            placement="bottom"
            render={(attrs) => {
                return (
                    <div className={cx('recommend-list')} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('recommend-popper')}>
                            <div className={classes}>
                                <div className={cx('historic_search')}>
                                    <div className={cx('recommend__header')}>
                                        <p className={cx('recommend__title')}>Recent search keywords</p>
                                        <p className={cx('recommend__clear')}>Clear all</p>
                                    </div>
                                    <div className={cx('recommend__list')}>
                                        {items.map((item, index) => (
                                            <p key={index} className={cx('recommend__item')}>
                                                {item}
                                            </p>
                                        ))}
                                        <RecommendItem />
                                        <RecommendItem />
                                        <RecommendItem />
                                    </div>
                                </div>
                                {/*  */}
                                <div className={cx('suggestion_search')}>
                                    <p className={cx('recommend__title')}>Jobs that may interest you</p>
                                    <div className={cx('recommend__list')}>
                                        {suggestedItems.map((item, index) => (
                                            <p key={index} className={cx('recommend__item')}>
                                                {item}
                                            </p>
                                        ))}
                                        <SuggestedItem />
                                        <SuggestedItem />
                                        <SuggestedItem />
                                        <SuggestedItem />
                                        <SuggestedItem />
                                    </div>
                                </div>
                            </div>
                        </PopperWrapper>
                    </div>
                );
            }}
        >
            {children}
        </Tippy>
    );
}

export default RecommendPopup;
