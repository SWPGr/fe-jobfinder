import classNames from 'classnames/bind';
import styles from './Filter.module.scss';
import { useState } from 'react';
import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import RecommendPopup from '../RecommendPopup/RecommendPopup';

const cx = classNames.bind(styles);

function SearchRecommend(props) {
    const [showRecommendPopup, setShowRecommendPopup] = useState(false);
    const handleShowPopup = () => setShowRecommendPopup(true);
    const handleHidePopup = () => setShowRecommendPopup(false);

    return (
        <RecommendPopup visible={showRecommendPopup} onClickOutside={handleHidePopup}>
            <TextInput
                placeholder="Enter job title"
                {...props}
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
