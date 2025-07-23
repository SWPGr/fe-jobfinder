import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './LandingPage.module.scss';
import { TextInput, Select } from '@mantine/core';
import { IconSearch, IconMapPin, IconBriefcase, IconBuildingCommunity, IconUsers } from '@tabler/icons-react';

import { Button } from '~/components';
import { Images } from '~/assets';
import ItemInfo from '../ItemInfo';
import RecommendPopup from '~/components/RecommendPopup/RecommendPopup';
import { useDebounce } from '~/hooks';
import { jobService } from '~/services';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

const locations = [
    { id: 1, name: 'Hà Nội' },
    { id: 2, name: 'Huế' },
    { id: 3, name: 'Quảng Ninh' },
    { id: 4, name: 'Cao Bằng' },
    { id: 5, name: 'Lạng Sơn' },
    { id: 6, name: 'Lai Châu' },
    { id: 7, name: 'Điện Biên' },
    { id: 8, name: 'Sơn La' },
    { id: 9, name: 'Thanh Hóa' },
    { id: 10, name: 'Nghệ An' },
    { id: 11, name: 'Hà Tĩnh' },
    { id: 12, name: 'Tuyên Quang' },
    { id: 13, name: 'Lào Cai' },
    { id: 14, name: 'Thái Nguyên' },
    { id: 15, name: 'Phú Thọ' },
    { id: 16, name: 'Bắc Ninh' },
    { id: 17, name: 'Hưng Yên' },
    { id: 18, name: 'Hải Phòng' },
    { id: 19, name: 'Ninh Bình' },
    { id: 20, name: 'Quảng Trị' },
    { id: 21, name: 'Đà Nẵng' },
    { id: 22, name: 'Quảng Ngãi' },
    { id: 23, name: 'Gia Lai' },
    { id: 24, name: 'Khánh Hòa' },
    { id: 25, name: 'Lâm Đồng' },
    { id: 26, name: 'Đắk Lắk' },
    { id: 27, name: 'TP Hồ Chí Minh' },
    { id: 28, name: 'Đồng Nai' },
    { id: 29, name: 'Tây Ninh' },
    { id: 30, name: 'TP Cần Thơ' },
    { id: 31, name: 'Vĩnh Long' },
    { id: 32, name: 'Đồng Tháp' },
    { id: 33, name: 'Cà Mau' },
    { id: 34, name: 'An Giang' },
];

function LandingPage() {
    const { user } = useAuth();
    const [searchJob, setSearchJob] = useState('');
    const [location, setLocation] = useState('');
    const [showRecommendPopup, setShowRecommendPopup] = useState(false);
    const [popupContent, setPopupContent] = useState([]);
    const debounceValue = useDebounce(searchJob, 500);
    const navigate = useNavigate();

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

    const handleShowPopup = () => setShowRecommendPopup(true);
    const handleHidePopup = () => setShowRecommendPopup(false);

    const handleSearch = () => {
        const params = new URLSearchParams();

        if (searchJob.trim()) {
            params.set('search', searchJob.trim());
        }

        if (location.trim()) {
            params.set('location', location.trim());
        }

        navigate(`/find-job?${params.toString()}`);
    };

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

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {/* Top */}
                <div className={cx('top')}>
                    <div className={cx('search-field')}>
                        <h1 className={cx('title')}>Find a job that suits your interest & skills.</h1>
                        <p className={cx('description')}>
                            Explore thousands of job opportunities tailored to your passion and strengths. Start
                            building the career you deserve today.
                        </p>

                        <div className={cx('search-input')}>
                            {user?.role ? (
                                <RecommendPopup
                                    visible={showRecommendPopup}
                                    handleShowPopup={handleShowPopup}
                                    handleHidePopup={handleHidePopup}
                                    className={cx('popup')}
                                    y={40}
                                    items={popupContent}
                                    forwardLink={'/find-job'}
                                    type={'job'}
                                >
                                    <TextInput
                                        placeholder="Job title, Keyword..."
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
                                    />
                                </RecommendPopup>
                            ) : (
                                <TextInput
                                    placeholder="Job title, Keyword..."
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
                                />
                            )}

                            <Select
                                placeholder="Select location"
                                data={locations.map((option) => ({ value: option.name, label: option.name }))}
                                value={location}
                                onChange={setLocation}
                                leftSection={<IconMapPin />}
                                classNames={{
                                    input: cx('input'),
                                    wrapper: cx('input-wrapper'),
                                    root: cx('input-root'),
                                    section: cx('icon'),
                                    option: cx('select-option'),
                                    dropdown: cx('select-dropdown'),
                                }}
                            />

                            <Button
                                className={cx('button')}
                                large
                                disabled={searchJob.trim() === '' && location.trim() === ''}
                                onClick={handleSearch}
                            >
                                Find Job
                            </Button>
                        </div>
                    </div>

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
