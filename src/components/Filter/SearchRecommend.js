import classNames from 'classnames/bind';
import styles from './Filter.module.scss';
import { useState, useEffect } from 'react';
import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import RecommendPopup from '../RecommendPopup/RecommendPopup';
import { useDebounce } from '~/hooks';
import { jobService } from '~/services';

const cx = classNames.bind(styles);

function SearchRecommend({ form, searchLabel }) {
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

    return (
        <RecommendPopup
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
                classNames={{
                    input: cx('search-input'),
                    root: cx('search-input-root'),
                    wrapper: cx('search-input-wrapper'),
                }}
            />
        </RecommendPopup>
    );
}

export default SearchRecommend;
