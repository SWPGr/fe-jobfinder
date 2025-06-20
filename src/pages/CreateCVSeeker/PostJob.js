import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './PostJob.module.scss';
import SimpleRichTextEditor from '~/components/RichTextEditor/RichTextEditor';
const cx = classNames.bind(styles);

function PostJob() {
  const [jobTitle, setJobTitle] = useState('');
  const [tags, setTags] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [maxSalary, setMaxSalary] = useState('');
  const [salaryType, setSalaryType] = useState('');
  const [education, setEducation] = useState('');
  const [experience, setExperience] = useState('');
  const [jobType, setJobType] = useState('');
  const [vacancies, setVacancies] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [jobLevel, setJobLevel] = useState('');
  const [applyJobOn, setApplyJobOn] = useState('onJobpilot');
  const [description, setDescription] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const [salaryError, setSalaryError] = useState('');

  const handleMinSalaryChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setMinSalary(value);
    if (maxSalary && value !== '' && Number(value) >= Number(maxSalary)) {
      setSalaryError('Min Salary phải nhỏ hơn Max Salary!');
    } else {
      setSalaryError('');
    }
  };

  const handleMaxSalaryChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setMaxSalary(value);
    if (minSalary && value !== '' && Number(minSalary) >= Number(value)) {
      setSalaryError('Max Salary phải lớn hơn Min Salary!');
    } else {
      setSalaryError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (salaryError) return;
    alert('Job posted successfully!');
  };

  return (
    <form className={cx('postJobTab')} onSubmit={handleSubmit}>
      <div className={cx('pageTitle')}>Post a job</div>

      <div className={cx('formGroup')}>
        <label>Job Title</label>
        <input
          type="text"
          placeholder="Add job title, role, vacancies etc"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />
      </div>

      <div className={cx('row')}>
        <div className={cx('inputGroup')}>
          <label>Tags</label>
          <input
            type="text"
            placeholder="Job keyword, tags etc..."
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className={cx('inputGroup')}>
          <label>Job Role</label>
          <select value={jobRole} onChange={(e) => setJobRole(e.target.value)}>
            <option value="">Select...</option>
            <option value="role1">Role 1</option>
            <option value="role2">Role 2</option>
          </select>
        </div>
      </div>

      <div className={cx('sectionTitle')}>Salary</div>
      <div className={cx('row')}>
        <div className={cx('inputGroup')} style={{ position: 'relative' }}>
          <label>Min Salary</label>
          <input
            type="number"
            min="0"
            placeholder="Minimum salary..."
            value={minSalary}
            onChange={handleMinSalaryChange}
            required
          />
          <span className={cx('currency')}>USD</span>
        </div>
        <div className={cx('inputGroup')} style={{ position: 'relative' }}>
          <label>Max Salary</label>
          <input
            type="number"
            min="0"
            placeholder="Maximum salary..."
            value={maxSalary}
            onChange={handleMaxSalaryChange}
            required
          />
          <span className={cx('currency')}>USD</span>
        </div>
        <div className={cx('inputGroup')}>
          <label>Salary Type</label>
          <select value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
            <option value="">Select...</option>
            <option value="monthly">Monthly</option>
            <option value="hourly">Hourly</option>
          </select>
        </div>
      </div>
      {salaryError && (
        <div style={{ color: 'red', marginBottom: 10 }}>{salaryError}</div>
      )}

      <div className={cx('sectionTitle')}>Advance Information</div>
      <div className={cx('row')}>
        <div className={cx('inputGroup')}>
          <label>Education</label>
          <select value={education} onChange={(e) => setEducation(e.target.value)}>
            <option value="">Select...</option>
            <option value="highschool">High School</option>
            <option value="bachelor">Bachelor</option>
            <option value="master">Master</option>
          </select>
        </div>
        <div className={cx('inputGroup')}>
          <label>Experience</label>
          <select value={experience} onChange={(e) => setExperience(e.target.value)}>
            <option value="">Select...</option>
            <option value="0-1">0-1 years</option>
            <option value="1-3">1-3 years</option>
            <option value="3+">3+ years</option>
          </select>
        </div>
        <div className={cx('inputGroup')}>
          <label>Job Type</label>
          <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
            <option value="">Select...</option>
            <option value="fulltime">Full Time</option>
            <option value="parttime">Part Time</option>
            <option value="intern">Internship</option>
          </select>
        </div>
      </div>

      <div className={cx('row')}>
        <div className={cx('inputGroup')}>
          <label>Vacancies</label>
          <select value={vacancies} onChange={(e) => setVacancies(e.target.value)}>
            <option value="">Select...</option>
            <option value="1">1</option>
            <option value="2-5">2-5</option>
            <option value="5+">5+</option>
          </select>
        </div>
        <div className={cx('inputGroup')}>
          <label>Expiration Date</label>
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
          />
        </div>
        <div className={cx('inputGroup')}>
          <label>Job Level</label>
          <select value={jobLevel} onChange={(e) => setJobLevel(e.target.value)}>
            <option value="">Select...</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior</option>
          </select>
        </div>
      </div>

      <fieldset className={cx('applyJobOn')}>
        <legend>Apply Job on:</legend>
        <label className={cx({ activeRadioLabel: applyJobOn === 'onJobpilot' })}>
          <input
            type="radio"
            name="applyJob"
            value="onJobpilot"
            checked={applyJobOn === 'onJobpilot'}
            onChange={(e) => setApplyJobOn(e.target.value)}
          />
          <strong>On Jobpilot</strong>
          <p>Candidate will apply job using jobpilot & all application will show on your dashboard.</p>
        </label>
        <label className={cx({ activeRadioLabel: applyJobOn === 'externalPlatform' })}>
          <input
            type="radio"
            name="applyJob"
            value="externalPlatform"
            checked={applyJobOn === 'externalPlatform'}
            onChange={(e) => setApplyJobOn(e.target.value)}
          />
          <strong>External Platform</strong>
          <p>Candidate apply job on your website, all application on your own website.</p>
        </label>
        <label className={cx({ activeRadioLabel: applyJobOn === 'onYourEmail' })}>
          <input
            type="radio"
            name="applyJob"
            value="onYourEmail"
            checked={applyJobOn === 'onYourEmail'}
            onChange={(e) => setApplyJobOn(e.target.value)}
          />
          <strong>On Your Email</strong>
          <p>Candidate apply job on your email address, and all application in your email.</p>
        </label>
      </fieldset>

      <div className={cx('sectionTitle')}>Description & Responsibility</div>
      <div className={cx('formGroup')}>
        <label>Description</label>
        <SimpleRichTextEditor
          placeholder="Add your job description..."
          onChange={setDescription}
        />
      </div>
      <div className={cx('formGroup')}>
        <label>Responsibilities</label>
        <SimpleRichTextEditor
          placeholder="Add your job responsibilities..."
          onChange={setResponsibilities}
        />
      </div>

      <button type="submit" className={cx('saveNextBtn')} disabled={!!salaryError}>
        Post Job <span className={cx('arrow')}>&rarr;</span>
      </button>
    </form>
  );
}

export default PostJob;
