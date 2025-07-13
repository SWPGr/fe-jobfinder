import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './PostJob.module.scss';
import SimpleRichTextEditor from '~/components/RichTextEditor/RichTextEditor';
import { Button } from '~/components';
import { useWindowScroll } from '@mantine/hooks';
import EmployerService from '~/services/EmployerService';
import { useNotification } from '~/hooks';
import { useLoading } from '~/context/LoadingContext';

const cx = classNames.bind(styles);

const PostJob = () => {
  const [scroll, scrollTo] = useWindowScroll();
  const { showSuccess, showError } = useNotification();
  const { showLoading, hideLoading } = useLoading();

  const [formData, setFormData] = useState({
    jobTitle: '',
    categoryId: '',         // thêm categoryId
    minSalary: '',
    maxSalary: '',
    education: '',
    experience: '',
    jobType: '',
    vacancies: '',
    expirationDate: '',
    jobLevel: '',
    description: '',
    responsibilities: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const [dropdowns, setDropdowns] = useState({
    categories: [],         // thêm categories
    educations: [],
    experiences: [],
    jobTypes: [],
    jobLevels: [],
  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [categories, jobTypes, jobLevels, educations, experiences] = await Promise.all([
          EmployerService.fetchCategoriesFake(),   // giả sử bạn có hàm fetch này
          EmployerService.fetchJobTypesFake(),
          EmployerService.fetchJobLevelFake(),
          EmployerService.fetchEducationFake(),
          EmployerService.fetchExperienceFake(),
        ]);
        setDropdowns({
          categories: categories || [],
          jobTypes: jobTypes || [],
          jobLevels: jobLevels || [],
          educations: educations || [],
          experiences: experiences || [],
        });
      } catch (error) {
        console.error('Failed to fetch dropdown data:', error);
      }
    };

    fetchDropdownData();
  }, []);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setFormErrors({ ...formErrors, [field]: undefined, salaryRange: undefined });
  };

  const handleEditorChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
    setFormErrors({ ...formErrors, [field]: undefined });
  };

  const validateForm = () => {
    const errors = {};
    const today = new Date().toISOString().split('T')[0];

    if (!formData.jobTitle.trim()) errors.jobTitle = 'Job title is required';
    if (!formData.categoryId) errors.categoryId = 'Category is required';    // validate categoryId
    if (!formData.minSalary) errors.minSalary = 'Min salary is required';
    if (!formData.maxSalary) errors.maxSalary = 'Max salary is required';
    if (
      formData.minSalary &&
      formData.maxSalary &&
      Number(formData.minSalary) >= Number(formData.maxSalary)
    ) {
      errors.salaryRange = 'Min salary must be less than max salary';
    }
    if (!formData.expirationDate) errors.expirationDate = 'Expiration date is required';
    else if (formData.expirationDate < today)
      errors.expirationDate = 'Expiration date cannot be in the past';
    if (!formData.education) errors.education = 'Education is required';
    if (!formData.experience) errors.experience = 'Experience is required';
    if (!formData.jobType) errors.jobType = 'Job type is required';
    if (!formData.vacancies) errors.vacancies = 'Vacancies is required';
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
      scrollTo({ y: 0 });
    }
  };

  const handleConfirm = async () => {
    setShowConfirmPopup(false);

    const {
      jobTitle,
      categoryId,
      minSalary,
      maxSalary,
      education,
      experience,
      jobType,
      vacancies,
      expirationDate,
      jobLevel,
      description,
      responsibilities,
    } = formData;

    const jobData = {
      title: jobTitle.trim(),
      categoryId: Number(categoryId),      // gửi categoryId
      description: description.trim(),
      salaryMin: Number(minSalary),
      salaryMax: Number(maxSalary),
      jobLevelId: Number(jobLevel),
      jobTypeId: Number(jobType),
      educationId: Number(education),
      experienceId: Number(experience),
      vacancy: Number(vacancies),
      responsibility: responsibilities.trim(),
      expiredDate: expirationDate,
    };

    console.log('Posting job data:', jobData);

    try {
      showLoading();
      const response = await EmployerService.fetchPostJobFake(jobData);
      hideLoading();
      showSuccess('Job posted successfully!');
      setFormData({
        jobTitle: '',
        categoryId: '',
        minSalary: '',
        maxSalary: '',
        education: '',
        experience: '',
        jobType: '',
        vacancies: '',
        expirationDate: '',
        jobLevel: '',
        description: '',
        responsibilities: '',
      });
      setFormErrors({});
    } catch (error) {
      hideLoading();
      showError(error.message || 'Failed to post job');
      console.error('Error posting job:', error);
    }
  };

  const renderInput = (label, field, type = 'text') => (
    <div className={cx('inputGroup')}>
      <label>{label}</label>
      <input
        type={type}
        value={formData[field]}
        onChange={handleChange(field)}
        onKeyDown={(e) => {
          if (type === 'number' && (e.key === '-' || e.key === 'e')) e.preventDefault();
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
            {item.category_name || item.name}
          </option>
        ))}
      </select>
      {formErrors[field] && <div className={cx('error')}>{formErrors[field]}</div>}
    </div>
  );

  return (
    <form className={cx('postJobTab')} onSubmit={handleSubmit}>
      <div className={cx('pageTitle')}>Post a job</div>
      {renderInput('Job Title', 'jobTitle')}

      {/* Dropdown chọn Category */}
      {renderSelect('Category', 'categoryId', dropdowns.categories)}

      <div className={cx('sectionTitle')}>Salary</div>
      <div className={cx('row')}>
        {renderInput('Min Salary', 'minSalary', 'number')}
        {renderInput('Max Salary', 'maxSalary', 'number')}
      </div>
      {formErrors.salaryRange && <div className={cx('error')}>{formErrors.salaryRange}</div>}

      <div className={cx('sectionTitle')}>Advance Information</div>
      <div className={cx('row')}>
        {renderSelect('Education', 'education', dropdowns.educations)}
        {renderSelect('Experience', 'experience', dropdowns.experiences)}
        {renderSelect('Job Type', 'jobType', dropdowns.jobTypes)}
      </div>
      <div className={cx('row')}>
        {renderInput('Vacancies', 'vacancies', 'number')}
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
        Post Job <span className={cx('arrow')}>→</span>
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
              <Button onClick={handleConfirm}>Yes</Button>
              <Button red onClick={() => setShowConfirmPopup(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default PostJob;
