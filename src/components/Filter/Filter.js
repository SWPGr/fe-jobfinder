import React from 'react';
import { useForm } from '@mantine/form';
import { TextInput, Checkbox, Group, Chip, Button } from '@mantine/core';
import classNames from 'classnames/bind';
import styles from './Filter.module.scss';

const cx = classNames.bind(styles);

function Filter() {
    const form = useForm({
        initialValues: {
            search: '',
            location: '',
            category: '',
            experience: '',
            salary: '',
            jobType: [],
            education: [],
            jobLevel: '',
        },
    });

    const jobTypeOptions = ['Full-time', 'Part-time', 'Contract'];
    const educationOptions = ['High School', 'Bachelor', 'Master', 'PhD'];

    // Thêm/xóa option checkbox
    const toggleCheckbox = (field, value) => {
        const current = form.values[field];
        if (current.includes(value)) {
            form.setFieldValue(
                field,
                current.filter((v) => v !== value),
            );
        } else {
            form.setFieldValue(field, [...current, value]);
        }
    };

    // Xử lý tìm kiếm khi nhấn nút
    const handleSearch = () => {
        // Lấy toàn bộ giá trị người dùng nhập/chọn
        const values = form.values;
        console.log('Search with filters:', values);

        // TODO: gọi API hoặc xử lý dữ liệu filter tại đây
    };

    return (
        <form className={cx('filter-form')} onSubmit={(e) => e.preventDefault()}>
            <TextInput label="Job Title" placeholder="Enter job title" {...form.getInputProps('search')} />

            <TextInput label="Location" placeholder="Enter location" {...form.getInputProps('location')} />

            {/* Job Type */}
            <div className={cx('checkbox-group')}>
                <label>Job Type</label>
                <Group>
                    {jobTypeOptions.map((option) => (
                        <Checkbox
                            key={option}
                            label={option}
                            checked={form.values.jobType.includes(option)}
                            onChange={() => toggleCheckbox('jobType', option)}
                        />
                    ))}
                </Group>
            </div>

            {/* Education */}
            <div className={cx('checkbox-group')}>
                <label>Education</label>
                <Group>
                    {educationOptions.map((option) => (
                        <Checkbox
                            key={option}
                            label={option}
                            checked={form.values.education.includes(option)}
                            onChange={() => toggleCheckbox('education', option)}
                        />
                    ))}
                </Group>
            </div>

            {/* Hiển thị các tag filter đã chọn */}
            <div className={cx('selected-tags')}>
                <label>Selected Filters:</label>
                <Group spacing="xs" mt="xs">
                    {form.values.search && <Chip>{form.values.search}</Chip>}
                    {form.values.location && <Chip>{form.values.location}</Chip>}
                    {form.values.jobType.map((item) => (
                        <Chip key={item}>{item}</Chip>
                    ))}
                    {form.values.education.map((item) => (
                        <Chip key={item}>{item}</Chip>
                    ))}
                </Group>
            </div>

            {/* Nút tìm kiếm */}
            <Button mt="md" onClick={handleSearch}>
                Search
            </Button>
        </form>
    );
}

export default Filter;
