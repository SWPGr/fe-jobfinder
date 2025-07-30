import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './PostJob.module.scss';
import SimpleRichTextEditor from '~/components/RichTextEditor/RichTextEditor';
import { Button } from '~/components';
import { useWindowScroll } from '@mantine/hooks';
import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

import { jobService } from '~/services';
import { useNotification } from '~/hooks';
import { useLoading } from '~/context/LoadingContext';

const cx = classNames.bind(styles);

const PostJob = () => {
    const [scroll, scrollTo] = useWindowScroll();
    const { showSuccess, showError } = useNotification();
    const { showLoading, hideLoading } = useLoading();
    const [errorMessage, setErrorMessage] = useState(null); // null = không hiển thị


    const [formData, setFormData] = useState({
        jobTitle: '',
        tags: '',
        jobRole: '',
        minSalary: '',
        maxSalary: '',
        education: '',
        experience: '',
        jobType: '',
        vacancy: '',
        expirationDate: '',
        jobLevel: '',
        description: '',
        responsibilities: '',
        isNegotiable: false,
    });

    const [formErrors, setFormErrors] = useState({});
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [dropdowns, setDropdowns] = useState({
        jobRoles: [],
        educations: [],
        experiences: [],
        jobTypes: [],
        jobLevels: [],
    });

    useEffect(() => {
        const getAllOptions = async () => {
            try {
                const response = await jobService.getAllOptions();
                setDropdowns({
                    jobRoles: response.categories,
                    educations: response.educations,
                    experiences: response.experiences,
                    jobTypes: response.jobTypes,
                    jobLevels: response.jobLevels,
                });
            } catch (error) {
                showError('Failed to load dropdown options');
            }
        };
        getAllOptions();
    }, []);

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
        setFormErrors({ ...formErrors, [field]: undefined, salaryRange: undefined });
    };

    const handleCheckboxChange = (field) => (e) => {
        const checked = e.target.checked;
        setFormData((prev) => ({
            ...prev,
            [field]: checked,
            ...(field === 'isNegotiable' && checked ? { minSalary: null, maxSalary: null } : {}),
        }));
        if (field === 'isNegotiable' && checked) {
            setFormErrors((prev) => ({
                ...prev,
                minSalary: null,
                maxSalary: null,
                salaryRange: undefined,
            }));
        }
    };

    const handleEditorChange = (field) => (value) => {
        setFormData({ ...formData, [field]: value });
        setFormErrors({ ...formErrors, [field]: undefined });
    };

    const validateForm = () => {
        const errors = {};
        const today = new Date().toISOString().split('T')[0];

        if (!formData.jobTitle.trim()) errors.jobTitle = 'Job title is required';
        if (!formData.jobRole) errors.jobRole = 'Job role is required';

        if (!formData.isNegotiable) {
            if (!formData.minSalary) errors.minSalary = 'Min salary is required';
            if (!formData.maxSalary) errors.maxSalary = 'Max salary is required';
            if (formData.minSalary && formData.maxSalary && Number(formData.minSalary) >= Number(formData.maxSalary)) {
                errors.salaryRange = 'Min salary must be less than max salary';
            }
        }

        if (!formData.expirationDate) errors.expirationDate = 'Expiration date is required';
        else if (formData.expirationDate < today) errors.expirationDate = 'Expiration date cannot be in the past';
        if (!formData.education) errors.education = 'Education is required';
        if (!formData.experience) errors.experience = 'Experience is required';
        if (!formData.jobType) errors.jobType = 'Job type is required';
        if (!formData.vacancy) errors.vacancy = 'Vacancies is required';
        if (!formData.jobLevel) errors.jobLevel = 'Job level is required';
        if (!formData.description) errors.description = 'Description is required';
        if (!formData.responsibilities) errors.responsibilities = 'Responsibilities is required';

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            setShowConfirmPopup(true);
        } else {
            // scrollTo({ y: 0 });
        }
    };

    const handleConfirm = async () => {
        setShowConfirmPopup(false);
        const {
            jobTitle,
            tags,
            jobRole,
            minSalary,
            maxSalary,
            education,
            experience,
            jobType,
            vacancy,
            expirationDate,
            jobLevel,
            description,
            responsibilities,
            isNegotiable,
        } = formData;

        const jobData = {
            title: jobTitle,
            tags,
            categoryId: jobRole,
            salaryMin: isNegotiable ? null : minSalary,
            salaryMax: isNegotiable ? null : maxSalary,
            educationId: education,
            experienceId: experience,
            jobTypeId: jobType,
            vacancy: vacancy,
            expiredDate: expirationDate,
            jobLevelId: jobLevel,
            description,
            responsibility: responsibilities,
            salaryType: isNegotiable ? 'NEGOTIABLE' : 'RANGE',
        };

        try {
            showLoading();
            await jobService.createJob(jobData);
            hideLoading();
            showSuccess('Job posted successfully!');
            setFormData({
                jobTitle: '',
                tags: '',
                jobRole: '',
                minSalary: '',
                maxSalary: '',
                education: '',
                experience: '',
                jobType: '',
                vacancy: '',
                expirationDate: '',
                jobLevel: '',
                description: '',
                responsibilities: '',
                isNegotiable: false,
            });
            setFormErrors({});
        } catch (error) {
            hideLoading();
            setErrorMessage(error.message);
            setTimeout(() => {
                setErrorMessage(null);
            }, 10000);
        }
    };

    const renderInput = (label, field, type = 'text') => (
        <div className={cx('inputGroup')}>
            <label>{label}</label>
            <input
                type={type}
                value={formData[field]}
                onChange={handleChange(field)}
                min={type === 'number' ? 0 : undefined}
                onKeyDown={(e) => {
                    if (!formData.isNegotiable && type === 'number' && (e.key === '-' || e.key === 'e'))
                        e.preventDefault();
                }}
            />
            {formErrors[field] && <div className={cx('error')}>{formErrors[field]}</div>}
        </div>
    );

    const renderSelect = (label, field, options) => (
        <div className={cx('inputGroup')}>
            <label>{label}</label>
            <select value={formData[field]} onChange={handleChange(field)}>
                <option value="">Select...</option>
                {options.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </select>
            {formErrors[field] && <div className={cx('error')}>{formErrors[field]}</div>}
        </div>
    );

    return (
        <>  {errorMessage && (
            <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999, // đảm bảo hiển thị trên mọi thứ
                width: '80%',
                maxWidth: '500px',
            }}
            >
                <Alert
                    variant="filled"
                    color="cyan"
                    title="Error"
                    icon={<IconInfoCircle />}
                    classNames={{ message: cx('error-message'), label: cx('error-label') }}
                    withCloseButton
                    onClose={() => setErrorMessage(null)} // đóng ngay khi nhấn dấu X
                >
                    {errorMessage}
                </Alert>
            </div >
        )}
            <form className={cx('postJobTab')} onSubmit={handleSubmit}>
                <div className={cx('pageTitle')}>Post a job</div>
                {renderInput('Job Title', 'jobTitle')}

                <div className={cx('row')}>
                    {renderInput('Tags', 'tags')}
                    {renderSelect('Job Role', 'jobRole', dropdowns.jobRoles)}
                </div>

                <div className={cx('sectionTitle')}>Salary</div>
                <div className={cx('inputGroup')}>
                    <label className={cx('checkboxLabel')}>
                        <input
                            type="checkbox"
                            checked={formData.isNegotiable}
                            onChange={handleCheckboxChange('isNegotiable')}
                        />
                        &nbsp; Negotiable salary
                    </label>
                </div>

                {!formData.isNegotiable && (
                    <>
                        <div className={cx('row')}>
                            {renderInput('Min Salary', 'minSalary', 'number')}
                            {renderInput('Max Salary', 'maxSalary', 'number')}
                        </div>
                        {formErrors.salaryRange && <div className={cx('error')}>{formErrors.salaryRange}</div>}
                    </>
                )}

                <div className={cx('sectionTitle')}>Advance Information</div>
                <div className={cx('row')}>
                    {renderSelect('Education', 'education', dropdowns.educations)}
                    {renderSelect('Experience', 'experience', dropdowns.experiences)}
                    {renderSelect('Job Type', 'jobType', dropdowns.jobTypes)}
                </div>

                <div className={cx('row')}>
                    {renderInput('Vacancies', 'vacancy', 'number')}
                    {renderInput('Expiration Date', 'expirationDate', 'date')}
                    {renderSelect('Job Level', 'jobLevel', dropdowns.jobLevels)}
                </div>

                <div className={cx('formGroup')}>
                    <label>Description</label>
                    <SimpleRichTextEditor
                        placeholder="Add your job description..."
                        onChange={handleEditorChange('description')}
                        value={formData.description}
                    />
                    {formErrors.description && <div className={cx('error')}>{formErrors.description}</div>}
                </div>

                <div className={cx('formGroup')}>
                    <label>Responsibilities</label>
                    <SimpleRichTextEditor
                        placeholder="Add your job responsibilities..."
                        onChange={handleEditorChange('responsibilities')}
                        value={formData.responsibilities}
                    />
                    {formErrors.responsibilities && <div className={cx('error')}>{formErrors.responsibilities}</div>}
                </div>

                <button type="submit" className={cx('saveNextBtn')}>
                    Post Job <span className={cx('arrow')}>&rarr;</span>
                </button>

                {Object.values(formErrors).some(Boolean) && (
                    <div className={cx('error', 'formSubmitError')}>
                        Please fix the above errors before submitting the form.
                    </div>
                )}

                {showConfirmPopup && (
                    <div className={cx('popupOverlay')}>
                        <div className={cx('popup')}>
                            <p>Do you want to post this job?</p>
                            <div className={cx('popupActions')}>
                                <Button green_white onClick={handleConfirm}>Yes</Button>
                                <Button red_white onClick={() => setShowConfirmPopup(false)}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </>
    );
};

export default PostJob;
