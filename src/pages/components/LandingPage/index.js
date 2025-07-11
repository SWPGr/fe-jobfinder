import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './LandingPage.module.scss';
import { TextInput } from '@mantine/core';
import { IconSearch, IconMapPin, IconBriefcase, IconBuildingCommunity, IconUsers } from '@tabler/icons-react';

import { Button } from '~/components';
import { Images } from '~/assets';
import ItemInfo from '../ItemInfo';
import RecommendPopup from '~/components/RecommendPopup/RecommendPopup';
import { useDebounce } from '~/hooks';
import { jobService } from '~/services';

const cx = classNames.bind(styles);

function LandingPage() {
    const [searchJob, setSearchJob] = useState('');
    const [location, setLocation] = useState('');
    const [showRecommendPopup, setShowRecommendPopup] = useState(false);
    const [popupContent, setPopupContent] = useState([]);

    const debounceValue = useDebounce(searchJob, 500);

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

    const itemsInfo = [
        {
            icon: <IconBriefcase />,
            title: '1,75,324',
            description: 'Live Job',
        },
        {
            icon: <IconBuildingCommunity />,
            title: '1,23,456',
            description: 'Companies',
        },
        {
            icon: <IconUsers />,
            title: '2,34,567',
            description: 'Candidates',
        },
        {
            icon: <IconBriefcase />,
            title: '5,324',
            description: 'New Jobs',
        },
    ];

    const handleShowPopup = () => setShowRecommendPopup(true);
    const handleHidePopup = () => setShowRecommendPopup(false);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {/* Top */}
                <div className={cx('top')}>
                    <div className={cx('search-field')}>
                        <h1 className={cx('title')}>Find a job that suits your interest & skills.</h1>
                        <p className={cx('description')}>
                            Aliquam vitae turpis in diam convallis finibus in at risus. Nullam in scelerisque leo, eget
                            sollicitudin velit bestibulum.
                        </p>
                        <div className={cx('search-input')}>
                            <RecommendPopup
                                visible={showRecommendPopup}
                                handleShowPopup={handleShowPopup}
                                handleHidePopup={handleHidePopup}
                                className={cx('popup')}
                                y={40}
                                items={popupContent}
                                forwardLink={'/find-job'}
                            >
                                <TextInput
                                    placeholder="Job tittle, Keyword..."
                                    variant="unstyled"
                                    leftSection={<IconSearch size={90} />}
                                    value={searchJob}
                                    onChange={(e) => setSearchJob(e.target.value)}
                                    onFocus={handleShowPopup}
                                    classNames={{
                                        input: cx('input'),
                                        wrapper: cx('input-wrapper'),
                                        root: cx('input-root'),
                                        section: cx('icon'),
                                    }}
                                ></TextInput>
                            </RecommendPopup>
                            <TextInput
                                placeholder="Your Location"
                                variant="unstyled"
                                leftSection={<IconMapPin size={28} />}
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                classNames={{
                                    input: cx('input'),
                                    wrapper: cx('input-wrapper'),
                                    root: cx('input-root'),
                                    section: cx('icon'),
                                }}
                            ></TextInput>
                            <Button
                                className={cx('button')}
                                large
                                disabled={searchJob.trim() === '' && location.trim() === ''}
                            >
                                Find Job
                            </Button>
                        </div>
                    </div>
                    {/*  */}

                    <div className={cx('banner')}>
                        <img src={Images.banner} alt="Landing Page" />
                    </div>
                </div>

                {/* Bottom */}
                <div className={cx('bottom')}>
                    {itemsInfo.map((item, index) => (
                        <ItemInfo key={index} icon={item.icon} title={item.title} description={item.description} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
