import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { useWindowScroll } from '@mantine/hooks';
import { Checkbox, Radio, Pagination, Select } from '@mantine/core';
import { IconMapPin, IconStack2, IconAdjustments, IconAdjustmentsOff } from '@tabler/icons-react';
import classNames from 'classnames/bind';
import styles from './Filter.module.scss';

import { Button } from '~/components';
import { JobItemList } from '~/components';
import RecommendPopup from '../RecommendPopup/RecommendPopup';
import SearchRecommend from './SearchRecommend';

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
    { id: 18, name: 'TP Hải Phòng' },
    { id: 19, name: 'Ninh Bình' },
    { id: 20, name: 'Quảng Trị' },
    { id: 21, name: 'TP Đà Nẵng' },
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

function Filter({
    filters = {},
    dataset = [],
    categoryOptions = [],
    buttonLabel = 'Find Job',
    onSearch = async () => {},
}) {
    const [scroll, scrollTo] = useWindowScroll();
    const [additionalFilter, setAdditionalFilter] = useState('None');
    //This will sort the list data follow these type of filters :Newest, Oldest, Most Viewed....
    const resultRef = useRef(null); // This will hold the location of the search result
    const [activePage, setActivePage] = useState(1);
    const pageSize = 12; // Số lượng công việc mỗi trang
    const totalPages = Math.ceil(dataset.length / pageSize);

    useEffect(() => {
        console.log('filter', filters);
        scrollTo({ y: 0 });
    }, []);

    const [searchParams, setSearchParams] = useSearchParams();

    const form = useForm({
        initialValues: {
            keyword: searchParams.get('keyword') || '',
            location: searchParams.get('location') || '',
            categoryId: searchParams.get('categoryId') || '',
            min: searchParams.get('min') || '',
            max: searchParams.get('max') || '',
            page: searchParams.get('page') || '1',
            salary: searchParams.get('salary') || '',
            educationId: searchParams.get('educationId') || '',
            experienceId: searchParams.get('experienceId') || '',
            jobTypeId: searchParams.get('jobTypeId') || '',
            jobLevelId: searchParams.get('jobLevelId') || '',
            organizationTypeId: searchParams.get('organizationId') || '',

            // ...Object.keys(filters).reduce((acc, key) => {
            //     // Initialize values: empty string for Radio, empty array for Checkbox
            //     acc[key] = filters[key].type === 'Checkbox' ? [] : '';
            //     return acc;
            // }, {}),
        },
    });

    // Thêm/xóa option checkbox cho các trường dạng mảng
    const toggleCheckbox = (field, value) => {
        const current = form.values[field] || [];
        if (current.includes(value)) {
            form.setFieldValue(
                field,
                current.filter((v) => v !== value),
            );
        } else {
            form.setFieldValue(field, [...current, value]);
        }
    };

    // Thay đổi radio (cho các trường string)
    const handleRadioChange = (field, value) => {
        form.setFieldValue(field, value);
        if (field === 'salary') {
            form.setFieldValue('min', filters['salary'].options[value - 1].min + '');
            form.setFieldValue('max', filters['salary'].options[value - 1].max + '');
        }
    };

    // Xử lý nút tìm kiếm
    const handleSearch = async () => {
        const entries = Object.entries(form.values).filter(([_, v]) => v !== '');
        console.log(entries);

        await onSearch(entries); // gửi lên FindJob để gọi setSearchParams
    };

    // Giữ nguyên giá trị của 'category' và reset các field khác về initialValues
    const resetExceptCategory = () => {
        const newValues = {
            ...Object.keys(filters).reduce((acc, key) => {
                acc[key] = filters[key].type === 'Checkbox' ? [] : '';
                return acc;
            }, {}),
            keyword: form.values.keyword, // giữ nguyên search hiện tại
            location: form.values.location, // giữ nguyên location hiện tại
            categoryId: form.values.categoryId, // giữ nguyên category hiện tại
        };
        setAdditionalFilter('None');
        console.log(newValues);

        form.setValues(newValues);
    };

    const matchSalaryOption = (min, max) => {
        const matched = filters.salary.options.find((opt) => {
            return Number(min) === opt.min && Number(max) === opt.max;
        });
        return matched ? String(matched.id) : '';
    };

    const handleSalaryMinChange = (e) => {
        const newMin = e.target.value;
        const currentMax = form.values.max;

        form.setFieldValue('min', newMin);

        const matchedRadio = matchSalaryOption(newMin, currentMax);
        form.setFieldValue('salary', matchedRadio);
    };

    const handleSalaryMaxChange = (e) => {
        const newMax = e.target.value;
        const currentMin = form.values.min;

        form.setFieldValue('max', newMax);

        const matchedRadio = matchSalaryOption(currentMin, newMax);
        form.setFieldValue('salary', matchedRadio);
    };
    const handlePageChange = (page) => {
        setActivePage(page);
        form.setFieldValue('page', page);
        const params = new URLSearchParams(searchParams);
        params.set('page', page);
        setSearchParams(params);
    };

    return (
        <>
            {/* Search inputs */}
            <div className={cx('search__wrapper')}>
                <div className={cx('search__container')}>
                    <form className={cx('search-form')} onSubmit={(e) => e.preventDefault()}>
                        <SearchRecommend {...form.getInputProps('keyword')} />

                        <Select
                            placeholder="Select location"
                            data={locations.map((option) => ({ value: option.name + '', label: option.name }))}
                            value={form.values.location}
                            // onChange={(_value, option) => form.setFieldValue('location', option.name)}
                            {...form.getInputProps('location')}
                            leftSection={<IconMapPin />}
                            classNames={{
                                input: cx('search-input'),
                                root: cx('search-input-root'),
                                wrapper: cx('search-input-wrapper'),
                                option: cx('select-option'),
                                dropdown: cx('select-dropdown'),
                            }}
                        />

                        <Select
                            placeholder="Select category"
                            data={categoryOptions.map((option) => ({ value: option.id + '', label: option.name }))}
                            value={form.values.category}
                            onChange={(_value, option) => form.setFieldValue('category', option.value)}
                            {...form.getInputProps('category')}
                            leftSection={<IconStack2 />}
                            classNames={{
                                input: cx('search-input'),
                                root: cx('search-input-root'),
                                wrapper: cx('search-input-wrapper'),
                                option: cx('select-option'),
                                dropdown: cx('select-dropdown'),
                            }}
                        />

                        <Button className={cx('find-job')} onClick={handleSearch}>
                            {buttonLabel}
                        </Button>
                    </form>
                </div>
            </div>

            {/* Filter options and results */}
            <div className={cx('body__wrapper')}>
                <div className={cx('body__container')}>
                    <div className={cx('filter__container')}>
                        <div className={cx('filter__action')}>
                            <Button leftIcon={<IconAdjustments />} onClick={handleSearch} className={cx('filter-btn')}>
                                Filter
                            </Button>
                            <Button
                                red_white
                                leftIcon={<IconAdjustmentsOff />}
                                onClick={resetExceptCategory}
                                className={cx('clear-filter-btn')}
                            >
                                Clear
                            </Button>
                        </div>

                        <div className={cx('filter__content')}>
                            {Object.entries(filters).map(([key, { name, type, options, grid }]) => (
                                <div key={key} className={cx('filter__item')}>
                                    <div className={cx('filter__item-title')}>
                                        <h3>{name}</h3>
                                    </div>
                                    <div className={cx('filter__item-content')}>
                                        {type === 'Radio' ? (
                                            <>
                                                <Radio.Group
                                                    name={key}
                                                    value={form.values[key]}
                                                    onChange={(value) => handleRadioChange(key, value)}
                                                    classNames={{
                                                        root: cx('filter-root', {
                                                            grid: grid,
                                                        }),
                                                    }}
                                                >
                                                    {options.map((option) => (
                                                        <Radio
                                                            key={`${key}-${option.id}`}
                                                            value={String(option.id)}
                                                            label={option.name}
                                                            classNames={{ inner: cx('inner'), body: cx('body') }}
                                                        />
                                                    ))}
                                                </Radio.Group>
                                                {key === 'salary' && (
                                                    <div className={cx('salary-range')}>
                                                        <input
                                                            {...form.getInputProps('min')}
                                                            className={cx('salary-input')}
                                                            type="number"
                                                            min={0}
                                                            max={100000}
                                                            placeholder="from"
                                                            onInput={(e) => handleSalaryMinChange(e)}
                                                        />{' '}
                                                        -{' '}
                                                        <input
                                                            {...form.getInputProps('max')}
                                                            className={cx('salary-input')}
                                                            type="number"
                                                            min={0}
                                                            max={100000}
                                                            placeholder="to"
                                                            onInput={(e) => handleSalaryMaxChange(e)}
                                                        />
                                                        $
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div
                                                className={cx('checkbox-container', {
                                                    grid: grid,
                                                })}
                                            >
                                                {options.map((option) => (
                                                    <Checkbox
                                                        key={key}
                                                        value={option.id}
                                                        label={option.name}
                                                        checked={form.values[key]?.includes(option.id)}
                                                        onChange={() => toggleCheckbox(key, option.id)}
                                                        classNames={{ inner: cx('inner'), body: cx('body') }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Results */}
                    <div className={cx('result__container')}>
                        <div className={cx('filter__action')}>
                            <Select
                                checkIconPosition="right"
                                placeholder="Sort by"
                                data={['None', 'Newest', 'Oldest', 'Most View']}
                                value={additionalFilter}
                                comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
                                onChange={(value) => setAdditionalFilter(value)}
                                classNames={{
                                    input: cx('select-filter-input'),
                                    section: cx('select-filter-section'),
                                    options: cx('select-filter-options'),
                                    option: cx('select-filter-option'),
                                }}
                            />
                        </div>
                        <div className={cx('result__content')} ref={resultRef}>
                            {/* Bạn có thể render danh sách kết quả thực tế ở đây */}
                            {dataset && dataset.map((job, index) => <JobItemList key={index} jobDescription={job} />)}
                        </div>
                        <div className={cx('pagination')}>
                            <Pagination
                                total={totalPages}
                                onChange={handlePageChange}
                                radius="xl"
                                classNames={{ root: cx('pagination-root'), control: cx('control') }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Filter;
