import classNames from 'classnames/bind';
import styles from './Filter.module.scss';
import { useState, useEffect } from 'react';
import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import RecommendPopup from '../RecommendPopup/RecommendPopup';
import { useDebounce } from '~/hooks';
import { jobService } from '~/services';
import { useAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function SearchRecommend({ type, form, searchLabel, handleSearch = () => {} }) {
    const { user } = useAuth();
    const [showRecommendPopup, setShowRecommendPopup] = useState(false);
    const handleShowPopup = () => setShowRecommendPopup(true);
    const handleHidePopup = () => setShowRecommendPopup(false);
    const [popupContent, setPopupContent] = useState([]);

    const debounceValue = useDebounce(form.values?.keyword, 500);

    useEffect(() => {
        if (debounceValue.trim() !== '') {
            const fetchApi = async () => {
                const response = await jobService.getSuggestions({ keyword: debounceValue });
                setPopupContent(response || []);
            };
            fetchApi();
        } else {
            setPopupContent([]);
        }
    }, [debounceValue]);

    const handleOnKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // tránh reload nếu có form bao ngoài
            handleSearch();
            handleHidePopup();
        }
    };

    return (
        <>
            {user?.role ? (
                <RecommendPopup
                    type={type}
                    visible={showRecommendPopup}
                    handleShowPopup={handleShowPopup}
                    handleHidePopup={handleHidePopup}
                    items={popupContent}
                >
                    <TextInput
                        placeholder={searchLabel}
                        {...form.getInputProps('keyword')}
                        leftSection={<IconSearch />}
                        onFocus={handleShowPopup}
                        onKeyDown={(e) => handleOnKeyDown(e)}
                        onInput={handleShowPopup}
                        classNames={{
                            input: cx('search-input'),
                            root: cx('search-input-root'),
                            wrapper: cx('search-input-wrapper'),
                        }}
                    />
                </RecommendPopup>
            ) : (
                <TextInput
                    placeholder={searchLabel}
                    {...form.getInputProps('keyword')}
                    leftSection={<IconSearch />}
                    onFocus={handleShowPopup}
                    classNames={{
                        input: cx('search-input'),
                        root: cx('search-input-root'),
                        wrapper: cx('search-input-wrapper'),
                    }}
                />
            )}
        </>
    );
}

export default SearchRecommend;
