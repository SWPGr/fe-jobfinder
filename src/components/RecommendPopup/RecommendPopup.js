import classNames from 'classnames/bind';
import styles from './RecommendPopup.module.scss';
import Tippy from '@tippyjs/react/headless';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { PopperWrapper } from '..';
import RecommendItem from './RecommendItem';
import SuggestedItem from './SuggestedItem';
import { searchService } from '~/services';

const cx = classNames.bind(styles);
const defaultFn = () => {
    console.log('click outside');
};

function RecommendPopup({
    children,
    items = [],
    suggestedItems = [],
    visible,
    x = 200,
    y = 30,
    className,
    handleShowPopup = defaultFn,
    handleHidePopup = defaultFn,
    forwardLink = false,
}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const classes = cx('recommend__container', {
        [className]: className,
    });
    const [history, setHistory] = useState([]);

    const handleOnClick = (title) => {
        if (forwardLink) {
            const params = new URLSearchParams({ keyword: title });
            navigate(`${forwardLink}?${params.toString()}`);
            // console.log(title);
        } else {
            setSearchParams({ keyword: title });
        }
        handleHidePopup();
    };

    useEffect(() => {
        const fetchSearchHistory = async () => {
            try {
                const response = await searchService.searchHistory();
                if (response && response.result) {
                    setHistory(response.result);
                }
            } catch (error) {
                console.error('Failed to fetch search history:', error);
            }
        };
        fetchSearchHistory();
    }, []);

    const handleDeleteHistory = async (id) => {
        try {
            await searchService.deleteSearchHistory(id);
            setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
        } catch (error) {
            console.error('Failed to delete search history:', error);
        }
    };

    const handleDeleteAllSearchHistory = async () => {
        try {
            await searchService.deleteAllSearchHistory();
            setHistory([]);
        } catch (error) {
            console.error('Failed to delete all search history:', error);
        }
    };

    return (
        <Tippy
            delay={[0, 700]}
            visible={visible}
            interactive
            offset={[x, y]}
            onClickOutside={handleHidePopup} // ✅ sử dụng props
            placement="bottom"
            render={(attrs) => {
                return (
                    <div className={cx('recommend-list')} tabIndex="-1" {...attrs}>
                        <PopperWrapper className={cx('recommend-popper')}>
                            <div className={classes}>
                                <div className={cx('historic_search')}>
                                    <div className={cx('recommend__header')}>
                                        <p className={cx('recommend__title')}>
                                            {items.length > 0 ? 'Suggestions' : 'Recent search keywords'}
                                        </p>
                                        {!items.length > 0 && history.length > 0 && (
                                            <p
                                                className={cx('recommend__clear')}
                                                onClick={handleDeleteAllSearchHistory}
                                            >
                                                Clear all
                                            </p>
                                        )}
                                    </div>
                                    <div className={cx('recommend__list')}>
                                        {items.length > 0 ? (
                                            items.map((item, index) => (
                                                <RecommendItem
                                                    id={item.id}
                                                    title={item}
                                                    key={index}
                                                    isRecommend
                                                    onClick={() => handleOnClick(item)}
                                                />
                                            ))
                                        ) : (
                                            <>
                                                {history.length > 0 ? (
                                                    history.map((item, index) => (
                                                        <RecommendItem
                                                            id={item.id}
                                                            title={item.searchQuery}
                                                            date={item.createdAt}
                                                            key={index}
                                                            onClick={() => handleOnClick(item.searchQuery)}
                                                            handleDeleteHistory={handleDeleteHistory}
                                                        />
                                                    ))
                                                ) : (
                                                    <p className={cx('recommend__empty')}>No recent search keywords</p>
                                                )}
                                            </>
                                        )}
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
