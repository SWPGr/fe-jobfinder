import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './JobDetail.module.scss';
import EmployerService from '~/services/EmployerService';
import {
  IconWallet,
  IconMapPin,
  IconUsers,
  IconBookmarkFilled,
  IconBookmark,
} from '@tabler/icons-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import SimpleRichTextEditor from 'src/components/RichTextEditor/RichTextEditor.js';

import { useWindowScroll } from '@mantine/hooks';

import ApplyButton from '~/components/Button/ApplyButton';
import { useAuth } from '~/context/AuthContext';
import { useNotification } from '~/hooks';
import ReportButton from '~/components/Button/ReportButton';
import { format } from '~/utils';
import { useLoading } from '~/context/LoadingContext';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const noop = () => undefined;

const JobDetail = ({
  job = null,
  editable = false,
  onSave = noop,
  onCancel = noop,
  isApplied = false,
}) => {
  const { id } = useParams();
  const { user } = useAuth();
  const isJOB_SEEKER = user?.role === 'JOB_SEEKER';

  const [save, setSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const jobDetailRef = useRef(null);
  const { showLoading, hideLoading } = useLoading();

  const IconComponent = save ? IconBookmarkFilled : IconBookmark;
  const [scroll, scrollTo] = useWindowScroll();
  const { showSuccess, showError } = useNotification();
  const [salaryError, setSalaryError] = useState('');
  const navigate = useNavigate();

  const validateSalaryRange = () => {
    const min = Number(formData.salaryMin) || 0;
    const max = Number(formData.salaryMax) || 0;
    if (min >= max) {
      showError('Minimum Salary must be less than Maximum Salary');
      return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        showLoading();
        let jobData = await EmployerService.getJobDetail(id || job?.id);
        console.log('jobData', format.transformJobData(jobData));

        hideLoading();
        setFormData(format.transformJobData(jobData));
      } catch (error) {
        hideLoading();
        setFormData(null);
        showError('Job not foundasd');
        navigate('/')
      }
    };
    fetchJob();
  }, [id, job]);

  useEffect(() => {
    scrollTo({ y: 0 });
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (jobDetailRef.current && !jobDetailRef.current.contains(e.target) && editable) {
        onCancel();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [editable, onCancel]);

  if (!formData) return <div>Loading...</div>;

  const handleCreateJob = async () => {
    if (salaryError || !validateSalaryRange()) return;
    setLoading(true);
    try {
      const created = await EmployerService.fetchPostJobFake(formData);
      setFormData(created);
      showSuccess('Job created successfully');
    } catch (error) {
      showError('Failed to create job');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateJob = async () => {
    if (!formData.id || salaryError || !validateSalaryRange()) return;
    setLoading(true);
    try {
      const payload = {
        ...formData,
        title: formData.title,
        expiredDate: formData.expiredDate?.includes('T')
          ? formData.expiredDate
          : `${formData.expiredDate}T00:00:00`,
        education: formData.education?.id || null,
        experience: formData.experience?.id || null,
        jobTypeId: formData.jobType?.id || null,
        jobTypeName: formData.jobType?.name || null,
        jobLevelId: formData.jobLevel?.id || null,
        jobLevelName: formData.jobLevel?.name || null,
        category: formData.category?.id || null,
        company: { ...formData.company },
      };

      const updated = await EmployerService.updateJob(formData.id, payload);
      setFormData(updated || formData);
      showSuccess('Job updated successfully');
      onSave(formData);
    } catch (error) {
      showError('Failed to update job');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveJob = async () => {
    try {
      setSave(true);
      showSuccess('Save job successfully');
    } catch (error) {
      showError('Save job failed');
      console.error(error);
    }
  };

  const handleUnsaveJob = async () => {
    try {
      setSave(false);
      showSuccess('Unsave job successfully');
    } catch (error) {
      showError('Unsave job failed');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'expiredDate') {
      const formattedValue = value ? `${value}T00:00:00` : '';
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleChangeRichText = (name, value) => {
    console.log(name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={cx('container', { 'editable-container': editable })} ref={jobDetailRef}>
      {/* Bên trái */}
      <div className={cx('left')}>
        <div className={cx('header')}>
          <img
            src={
              formData.companyLogo ||
              'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/120px-Instagram_logo_2016.svg.png'
            }
            alt={formData.company?.companyName || 'Company Logo'}
            className={cx('logo')}
          />
          <div className={cx('job-info')}>
            {editable ? (
              <input
                className={cx('job-info__title', 'job-title')}
                name="title"
                value={formData?.title || formData?.jobTitle}
                onChange={(e) => handleChange(e)}
              />
            ) : (
              <div className={cx('job-info__title')}>
                <div className={cx('job-info__title__name')}>
                  {formData.title || formData.jobTitle}
                  {formData.badges?.featured && (
                    <span className={cx('job-info__badge', 'job-info__badge--featured')}>
                      Featured
                    </span>
                  )}
                  <span className={cx('job-info__badge', 'job-info__badge--fulltime')}>
                    {formData.workTime}
                  </span>

                </div>
                {!editable &&
                  !isApplied &&
                  isJOB_SEEKER && ( // Show save button by default, hide when viewOnly is true
                    <div className={cx('action-btn')}>
                      <div
                        className={cx('save-job')}
                        onClick={() => {
                          save ? handleUnsaveJob() : handleSaveJob();
                        }}
                      >
                        <IconComponent size={22} color="#0a65cc" />
                      </div>
                      <ApplyButton
                        classname={cx('job-info__apply')}
                        title={formData.title || 'Software Engineer'}
                        jobId={id || job?.id}
                      />
                    </div>
                  )}
              </div>
            )}

          </div>
        </div>

        {/* Job Description */}
        <div className={cx('job-description')}>
          <div className={cx('job-description__title')}>Job Description</div>
          {editable ? (
            <SimpleRichTextEditor
              placeholder="Add your job description..."
              onChange={(value) => handleChangeRichText('description', value)}
              content={formData.job_description || ''}
              value={formData.job_description || ''}
            />
          ) : (
            <div
              className={cx('job-description__content')}
              dangerouslySetInnerHTML={{ __html: formData.job_description || '' }}
            />
          )}
        </div>

        {/* Responsibilities */}
        <div className={cx('responsibilities')}>
          <div className={cx('responsibilities__title')}>Responsibilities</div>
          {editable ? (
            <SimpleRichTextEditor
              placeholder="Add your job responsibilities..."
              onChange={(value) => handleChangeRichText('responsibility', value)}
              content={formData.responsibility || ''}
              value={formData.responsibility || ''}
            />
          ) : (
            <div
              className={cx('responsibilities__content')}
              dangerouslySetInnerHTML={{ __html: formData.responsibility || '' }}
            />
          )}
        </div>

        {/* Share Buttons */}
        <div className={cx('share')}>
          <span className={cx('share__label')}>Share this job:</span>
          <div className={cx('share-buttons')}>
            <button className={cx('share-buttons__btn', 'facebook')}>Facebook</button>
            <button className={cx('share-buttons__btn', 'twitter')}>Twitter</button>
            <button className={cx('share-buttons__btn', 'pinterest')}>Pinterest</button>
          </div>
        </div>


        {/*Report Button  */}
        {isJOB_SEEKER && <ReportButton />}
      </div>

      {/* Bên phải */}
      <div className={cx('right')}>
        <div className={cx('job-overview')}>
          <div className={cx('job-overview__title')}>Job Overview</div>
          <div className={cx('job-overview__items', !editable && 'editable')}>
            {[
              {
                key: 'salaryMin',
                label: 'Minimum Salary',
                icon: <IconWallet />,
                render: () => `${formData?.salaryMin || ''}`,
              },
              {
                key: 'salaryMax',
                label: 'Maximum Salary',
                icon: <IconWallet />,
                render: () => `${formData?.salaryMax || ''}`,
              },
              {
                key: 'companyAddress',
                label: 'Location',
                icon: <IconMapPin />,
                render: () => `${formData?.companyAddress}`,
              },
              {
                key: 'vacancy',
                label: 'Vacancies',
                icon: <IconUsers />,
                render: () => `${formData?.vacancy || ''}`,
              },
              {
                key: 'expiredDate',
                label: 'Expired Date',
                icon: <IconBookmark />,
                render: () => `${formData.expiredDate || ''}`,
              },
            ].map(({ key, label, icon, options, render }) => (
              <div key={key} className={cx('overview-item')}>
                <span className={cx('overview-item__icon')}>{icon}</span>
                <div className={cx('overview-item__content', editable && 'editable_content')}>
                  <p className={cx('overview-item__label')}>{label}:</p>
                  {editable ? (
                    key === 'expiredDate' ? (
                      <input
                        type="date"
                        name="expiredDate"
                        value={formData.expiredDate ? formData.expiredDate.slice(0, 10) : ''}
                        onChange={(e) => {
                          const selectedDate = e.target.value;
                          const formattedDate = selectedDate ? `${selectedDate}T00:00:00` : '';
                          setFormData((prev) => ({
                            ...prev,
                            expiredDate: formattedDate,
                          }));
                        }}
                        className={cx('editable-input', 'overview-item__value')}
                      />
                    ) : options ? (
                      <select
                        name={key}
                        value={formData[key]?.id || ''}
                        onChange={handleChange}
                        className={cx('editable-input', 'overview-item__value')}
                      >
                        <option value="">Select...</option>
                        {options.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={
                          key === 'salaryMin' || key === 'salaryMax' || key === 'vacancy'
                            ? 'number'
                            : 'text'
                        }
                        name={key}
                        value={formData[key] || ''}
                        onChange={handleChange}
                        className={cx('editable-input', 'overview-item__value')}
                      />
                    )
                  ) : (
                    <strong className={cx('overview-item__value')}>
                      {render
                        ? render(formData[key])
                        : formData[key]?.name || formData[key] || ''}
                    </strong>
                  )}
                </div>
              </div>
            ))}

          </div>
        </div>
        {!editable && <div className={cx('company-info')}>
          <div className={cx('company-info__title')}>
            {formData.companyName || formData.company?.name}
          </div>

          <div className={cx('company-details')}>
            {[
              { label: 'Founded in:', key: 'yearOfEstablishment' },
              { label: 'Company size:', key: 'teamSize' },
              { label: 'Phone:', key: 'phone' },
              { label: 'Email:', key: 'email' },
              { label: 'Website:', key: 'website' },
            ].map(({ label, key }) => (
              <p key={key}>
                <b>{label}</b>{' '}
                {editable ? (
                  <input
                    type="text"
                    name={`company.${key}`}
                    value={formData.company?.[key] || ''}
                    onChange={handleChange}
                    className={cx('editable-input')}
                  />
                ) : (
                  formData.company?.[key]
                )}
              </p>
            ))}
          </div>

          <div className={cx('social-icons')}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={cx('social-icon')}
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className={cx('social-icon')}
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={cx('social-icon')}
            >
              <FaInstagram />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className={cx('social-icon')}
            >
              <FaYoutube />
            </a>
          </div>
        </div>
        }


        {editable && (
          <div style={{ marginTop: 20 }}>
            {!formData.id ? (
              <button onClick={handleCreateJob} className={cx('save-btn')} disabled={loading}>
                {loading ? 'Creating...' : 'Create Job'}
              </button>
            ) : (
              <>
                <button onClick={handleUpdateJob} className={cx('save-btn')} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={onCancel}
                  className={cx('cancel-btn')}
                  style={{ marginLeft: 10 }}
                  disabled={loading}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
