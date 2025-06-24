import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { useForm } from '@mantine/form';
import { useWindowScroll } from '@mantine/hooks';
import { TextInput, Checkbox, Radio, Pagination, Select } from '@mantine/core';
import { IconSearch, IconMapPin, IconStack2, IconAdjustments, IconAdjustmentsOff } from '@tabler/icons-react';
import classNames from 'classnames/bind';
import styles from './Filter.module.scss';

import { useAuth } from '~/context/AuthContext';
import { Button } from '~/components';
import { JobItemList } from '~/components';

const cx = classNames.bind(styles);

// Tạo danh sách công việc giả
const fakeJobs = [
    {
        id: 1,
        jobTitle: 'Software Engineer',
        companyName: 'Google',
        companyAddress: 'Mountain View, CA',
        salary: '$100,000 - $150,000',
        dueDate: '2025-06-15',
    },
    {
        id: 2,
        jobTitle: 'Product Manager',
        companyName: 'Facebook',
        companyAddress: 'Menlo Park, CA',
        salary: '$110,000 - $160,000',
        dueDate: '2025-07-01',
        isVIP: true,
    },
    {
        id: 3,
        jobTitle: 'Data Scientist',
        companyName: 'Amazon',
        companyAddress: 'Seattle, WA',
        salary: '$90,000 - $130,000',
        dueDate: '2025-06-30',
    },
    {
        id: 4,
        jobTitle: 'UX Designer',
        companyName: 'Microsoft',
        companyAddress: 'Redmond, WA',
        salary: '$95,000 - $140,000',
        dueDate: '2025-07-15',
    },
    {
        id: 5,
        jobTitle: 'DevOps Engineer',
        companyName: 'Netflix',
        companyAddress: 'Los Gatos, CA',
        salary: '$120,000 - $170,000',
        dueDate: '2025-08-01',
    },
    {
        id: 6,
        jobTitle: 'Marketing Specialist',
        companyName: 'Airbnb',
        companyAddress: 'San Francisco, CA',
        salary: '$70,000 - $110,000',
        dueDate: '2025-06-20',
    },
    {
        id: 7,
        jobTitle: 'Electrical Engineer',
        companyName: 'Tesla',
        companyAddress: 'Palo Alto, CA',
        salary: '$105,000 - $150,000',
        dueDate: '2025-07-10',
    },
    {
        id: 8,
        jobTitle: 'Content Strategist',
        companyName: 'Spotify',
        companyAddress: 'New York, NY',
        salary: '$65,000 - $95,000',
        dueDate: '2025-06-25',
    },
    {
        id: 9,
        jobTitle: 'Customer Support',
        companyName: 'Dropbox',
        companyAddress: 'San Francisco, CA',
        salary: '$50,000 - $70,000',
        dueDate: '2025-07-05',
        isVIP: true,
    },
    {
        id: 10,
        jobTitle: 'Sales Manager',
        companyName: 'Salesforce',
        companyAddress: 'San Francisco, CA',
        salary: '$90,000 - $140,000',
        dueDate: '2025-07-30',
    },
    {
        id: 11,
        jobTitle: 'Hardware Engineer',
        companyName: 'Intel',
        companyAddress: 'Santa Clara, CA',
        salary: '$95,000 - $145,000',
        dueDate: '2025-08-05',
    },
    {
        id: 12,
        jobTitle: 'Cloud Solutions Architect',
        companyName: 'IBM',
        companyAddress: 'Armonk, NY',
        salary: '$120,000 - $180,000',
        dueDate: '2025-08-20',
    },
    {
        id: 13,
        jobTitle: 'Graphic Designer',
        companyName: 'Adobe',
        companyAddress: 'San Jose, CA',
        salary: '$70,000 - $100,000',
        dueDate: '2025-06-28',
    },
    {
        id: 14,
        jobTitle: 'Operations Manager',
        companyName: 'Uber',
        companyAddress: 'San Francisco, CA',
        salary: '$85,000 - $130,000',
        dueDate: '2025-07-18',
    },
    {
        id: 15,
        jobTitle: 'Software Engineer',
        companyName: 'LinkedIn',
        companyAddress: 'Sunnyvale, CA',
        salary: '$110,000 - $160,000',
        dueDate: '2025-07-22',
    },
    {
        id: 15,
        jobTitle: 'Software Engineer',
        companyName: 'LinkedIn',
        companyAddress: 'Sunnyvale, CA',
        salary: '$110,000 - $160,000',
        dueDate: '2025-07-22',
    },
    {
        id: 15,
        jobTitle: 'Software Engineer',
        companyName: 'LinkedIn',
        companyAddress: 'Sunnyvale, CA',
        salary: '$110,000 - $160,000',
        dueDate: '2025-07-22',
    },
    {
        id: 15,
        jobTitle: 'Software Engineer',
        companyName: 'LinkedIn',
        companyAddress: 'Sunnyvale, CA',
        salary: '$110,000 - $160,000',
        dueDate: '2025-07-22',
    },
    {
        id: 15,
        jobTitle: 'Software Engineer',
        companyName: 'LinkedIn',
        companyAddress: 'Sunnyvale, CA',
        salary: '$110,000 - $160,000',
        dueDate: '2025-07-22',
    },
    {
        id: 15,
        jobTitle: 'Software Engineer',
        companyName: 'LinkedIn',
        companyAddress: 'Sunnyvale, CA',
        salary: '$110,000 - $160,000',
        dueDate: '2025-07-22',
    },
    {
        id: 15,
        jobTitle: 'Software Engineer',
        companyName: 'LinkedIn',
        companyAddress: 'Sunnyvale, CA',
        salary: '$110,000 - $160,000',
        dueDate: '2025-07-22',
    },
    {
        id: 15,
        jobTitle: 'Software Engineer',
        companyName: 'LinkedIn',
        companyAddress: 'Sunnyvale, CA',
        salary: '$110,000 - $160,000',
        dueDate: '2025-07-22',
    },
    {
        id: 15,
        jobTitle: 'Software Engineer',
        companyName: 'LinkedIn',
        companyAddress: 'Sunnyvale, CA',
        salary: '$110,000 - $160,000',
        dueDate: '2025-07-22',
    },
    {
        id: 15,
        jobTitle: 'Software Engineer',
        companyName: 'LinkedIn',
        companyAddress: 'Sunnyvale, CA',
        salary: '$110,000 - $160,000',
        dueDate: '2025-07-22',
    },
    {
        id: 15,
        jobTitle: 'Software Engineer',
        companyName: 'LinkedIn',
        companyAddress: 'Sunnyvale, CA',
        salary: '$110,000 - $160,000',
        dueDate: '2025-07-22',
    },
];

function Filter({ filters = {}, categoryOptions = [], buttonLabel = 'Find Job', onSearch = () => {} }) {
    const { user } = useAuth();
    const [scroll, scrollTo] = useWindowScroll();
    const [additionalFilter, setAdditionalFilter] = useState('None');
    //This will sort the list data follow these type of filters :Newest, Oldest, Most Viewed....
    const resultRef = useRef(null); // This will hold the location of the search result
    const [page, setActivePage] = useState(1);
    const pageSize = 12; // Số lượng công việc mỗi trang
    const totalPages = Math.ceil(fakeJobs.length / pageSize);

    useEffect(() => {
        scrollTo({ y: 0 });
    }, []);

    // Tính toán dữ liệu trên mỗi trang
    const startIndex = (page - 1) * pageSize;
    const currentJobs = fakeJobs.slice(startIndex, startIndex + pageSize);

    const form = useForm({
        initialValues: {
            search: '',
            location: '',
            category: '',
            ...Object.keys(filters).reduce((acc, key) => {
                // Initialize values: empty string for Radio, empty array for Checkbox
                acc[key] = filters[key].type === 'Checkbox' ? [] : '';
                return acc;
            }, {}),
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
    };

    const handleSearch = () => {
        onSearch(form.values);
    };

    // Giữ nguyên giá trị của 'category' và reset các field khác về initialValues
    const resetExceptCategory = () => {
        const newValues = {
            ...Object.keys(filters).reduce((acc, key) => {
                acc[key] = filters[key].type === 'Checkbox' ? [] : '';
                return acc;
            }, {}),
            search: form.values.search, // giữ nguyên search hiện tại
            location: form.values.location, // giữ nguyên location hiện tại
            category: form.values.category, // giữ nguyên category hiện tại
        };
        setAdditionalFilter('None');
        console.log(newValues);

        form.setValues(newValues);
    };

    return (
        <>
            {/* Search inputs */}
            <div className={cx('search__wrapper')}>
                <div className={cx('search__container')}>
                    <form className={cx('search-form')} onSubmit={(e) => e.preventDefault()}>
                        <TextInput
                            placeholder="Enter job title"
                            {...form.getInputProps('search')}
                            leftSection={<IconSearch />}
                            classNames={{
                                input: cx('search-input'),
                                root: cx('search-input-root'),
                                wrapper: cx('search-input-wrapper'),
                            }}
                        />

                        <TextInput
                            placeholder="Enter location"
                            {...form.getInputProps('location')}
                            leftSection={<IconMapPin />}
                            classNames={{
                                input: cx('search-input'),
                                root: cx('search-input-root'),
                                wrapper: cx('search-input-wrapper'),
                            }}
                        />

                        <Select
                            placeholder="Select category"
                            data={categoryOptions}
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
                            {Object.entries(filters).map(([key, { type, options, grid }]) => (
                                <div key={key} className={cx('filter__item')}>
                                    <div className={cx('filter__item-title')}>
                                        <h3>{key}</h3>
                                    </div>
                                    <div className={cx('filter__item-content')}>
                                        {type === 'Radio' ? (
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
                                                        key={option}
                                                        value={option}
                                                        label={option}
                                                        classNames={{ inner: cx('inner'), body: cx('body') }}
                                                    />
                                                ))}
                                            </Radio.Group>
                                        ) : (
                                            <div
                                                className={cx('checkbox-container', {
                                                    grid: grid,
                                                })}
                                            >
                                                {options.map((option) => (
                                                    <Checkbox
                                                        key={option}
                                                        label={option}
                                                        checked={form.values[key]?.includes(option)}
                                                        onChange={() => toggleCheckbox(key, option)}
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
                            {currentJobs.map((job, index) => (
                                <JobItemList key={index} jobDescription={job} isVIP={job.isVIP} isLogin />
                            ))}
                        </div>
                        <div className={cx('pagination')}>
                            <Pagination
                                total={totalPages}
                                onChange={(page) => {
                                    setActivePage(page);
                                    scrollTo({ y: resultRef.current.getBoundingClientRect().top - 210 });
                                }}
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
