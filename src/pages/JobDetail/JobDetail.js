import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './JobDetail.module.scss';
import EmployerService from '~/services/EmployerService';
import {
  IconBriefcase,
  IconWallet,
  IconMapPin,
  IconUsers,
  IconBrightnessAuto,
  IconBookmarkFilled,
  IconBookmark,
} from '@tabler/icons-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import SimpleRichTextEditor from 'src/components/RichTextEditor/RichTextEditor.js';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useWindowScroll } from '@mantine/hooks';

import ApplyButton from '~/components/Button/ApplyButton';
import { useAuth } from '~/context/AuthContext';
import { useNotification } from '~/hooks';
import ReportButton from '~/components/Button/ReportButton';

const cx = classNames.bind(styles);

const noop = () => undefined;

// Helper: Lấy object theo id hoặc name từ danh sách phụ trợ
const findObjectByIdOrName = (list, val) => {
  if (!val) return null;
  if (typeof val === 'object' && val !== null) return val;
  const valStr = val.toString();
  return list.find((item) => item.id?.toString() === valStr || item.name === valStr) || null;
};

const JobDetail = ({
  job = null,
  editable = false,
  onSave = noop,
  onCancel = noop,
  isApplied = false, // New prop, default to false, hide Apply and Save when true
}) => {
  const { id } = useParams();
  const { user } = useAuth();
  const isJOB_SEEKER = user?.role === 'JOB_SEEKER';

  const [save, setSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAuxiliary, setLoadingAuxiliary] = useState(true);
  const [loadingJob, setLoadingJob] = useState(true);
  const [formData, setFormData] = useState(null);
  const jobDetailRef = useRef(null);

  const IconComponent = save ? IconBookmarkFilled : IconBookmark;
  const [, scrollTo] = useWindowScroll();
  const { showSuccess, showError } = useNotification();

  // Dữ liệu phụ trợ cho dropdown
  const [educations, setEducations] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [jobLevels, setJobLevels] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [categories, setCategories] = useState([]);
  const [salaryError, setSalaryError] = useState('');

  // Load dữ liệu phụ trợ
  useEffect(() => {
    const fetchAuxiliaryData = async () => {
      try {
        const educationRes = await EmployerService.fetchEducationFake();
        const jobTypesRes = await EmployerService.fetchJobTypesFake();
        const jobLevelsRes = await EmployerService.fetchJobLevelFake();
        const experiencesRes = await EmployerService.fetchExperienceFake();
        const categoriesRes = await EmployerService.fetchCategoriesFake();

        setEducations(educationRes.result || educationRes || []);
        setJobTypes(jobTypesRes.result || jobTypesRes || []);
        setJobLevels(jobLevelsRes.result || jobLevelsRes || []);
        setExperiences(experiencesRes.result || experiencesRes || []);
        setCategories(categoriesRes.result || categoriesRes || []);
      } catch (error) {
        console.error('Error fetching auxiliary data:', error);
      } finally {
        setLoadingAuxiliary(false);
      }
    };
    fetchAuxiliaryData();
  }, []);

  // Chuẩn hóa dữ liệu job
  const normalizeData = (data) => {
    if (!data) return null;

    return {
      ...data,
      salaryMin: data.salaryMin ?? '',
      salaryMax: data.salaryMax ?? '',
      email: data.email || data.employer?.email || '',
      roleName: data.roleName || data.employer?.roleName || '',
      phone: data.phone || data.employer?.phone || '',
      education: findObjectByIdOrName(educations, data.education),
      experience: findObjectByIdOrName(experiences, data.experience),
      jobLevel: findObjectByIdOrName(jobLevels, data.jobLevel),
      jobType: findObjectByIdOrName(jobTypes, data.jobType),
      responsibility: data.responsibility || data.responsibility || '',
      description: data.description || data.jobDescription || '',
      company: {
        avatarUrl: data.company?.avatarUrl || data.employer?.avatarUrl || '',
        logoUrl: data.company?.logoUrl || data.employer?.avatarUrl || '',
        companyName: data.company?.companyName || data.company?.name || data.employer?.companyName || '',
        description: data.company?.description || data.employer?.description || '',
        founded: data.company?.founded || data.employer?.yearOfEstablishment || '',
        organization: data.company?.organization || data.employer?.organizationType || '',
        size: data.company?.size || data.employer?.teamSize || '',
        phone: data.company?.phone || data.employer?.phone || '',
        email: data.company?.email || data.employer?.email || '',
        website: data.company?.website || data.employer?.website || '',
      },
      badges: data.badges || null,
      tags: data.tags || '',
      jobRole: data.jobRole || '',
      contactUrl: data.contactUrl || '',
      createdAt: data.createdAt || data.postedAt || '',
    };
  };

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
    if (loadingAuxiliary) return;

    const fetchJob = async () => {
      if (!id && !job) {
        setFormData(null);
        setLoadingJob(false);
        return;
      }

      setLoadingJob(true);

      try {
        let jobData;
        if (job) {
          jobData = job;
        } else {
          const response = await EmployerService.getJobDetail(id);
          console.log('Response from getJobDetail:', response);
          jobData = response;
        }
        console.log('Fetched job data:', jobData);

        setFormData(normalizeData(jobData));
      } catch (error) {
        console.error('Error fetching job detail:', error);
        setFormData(null);
      } finally {
        setLoadingJob(false);
      }
    };

    fetchJob();
  }, [id, job, loadingAuxiliary, educations, jobTypes, jobLevels, experiences]);

  // Scroll to top when opening
  useEffect(() => {
    scrollTo({ y: 0 });
  }, [scrollTo]);

  // Close modal on outside click (if editable)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (jobDetailRef.current && !jobDetailRef.current.contains(e.target) && editable) {
        onCancel();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [editable, onCancel]);

  if (loadingAuxiliary || loadingJob || !formData) return <div>Loading...</div>;

  // Handle form changes
  const handleChange = (e, section = null) => {
    const { name, value } = e.target;
    if (section === 'description' || section === 'responsibility') {
      setFormData((prev) => ({ ...prev, [section]: value }));
      return;
    }

    if (name?.startsWith('company.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        company: { ...prev.company, [key]: value },
      }));
      return;
    }
    if (name === 'salaryMin' || name === 'salaryMax') {
      const min = name === 'salaryMin' ? Number(value) : Number(formData.salaryMin || 0);
      const max = name === 'salaryMax' ? Number(value) : Number(formData.salaryMax || 0);

      if (min >= max && max !== 0) {
        setSalaryError('Maximum Salary must be greater than Minimum Salary');
      } else {
        setSalaryError('');
      }
    }

    if (section === 'description' || section === 'responsibility') {
      setFormData((prev) => ({ ...prev, [section]: value }));
      return;
    }

    if (name?.startsWith('company.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        company: { ...prev.company, [key]: value },
      }));
      return;
    }

    // Các select trường object map theo id
    if (name === 'education') {
      const selected = educations.find((e) => e.id === Number(value));
      setFormData((prev) => ({ ...prev, education: selected || { id: Number(value) } }));
      return;
    }
    if (name === 'experience') {
      const selected = experiences.find((e) => e.id === Number(value));
      setFormData((prev) => ({ ...prev, experience: selected || { id: Number(value) } }));
      return;
    }
    if (name === 'jobLevel') {
      const selected = jobLevels.find((j) => j.id === Number(value));
      setFormData((prev) => ({ ...prev, jobLevel: selected || { id: Number(value) } }));
      return;
    }
    if (name === 'jobType') {
      console.log('Job Type changed:', value);

      const selected = jobTypes.find((j) => j.id === Number(value));
      setFormData((prev) => ({ ...prev, jobType: selected || { id: Number(value) } }));
      return;
    }

    // Các input bình thường
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Tạo job mới
  const handleCreateJob = async () => {
    if (salaryError) {
      showError('Please fix salary errors before saving');
      return;
    }
    if (!validateSalaryRange()) return;

    setLoading(true);
    try {
      const created = await EmployerService.fetchPostJobFake(formData);
      setFormData(normalizeData(created));
      showSuccess('Job created successfully');
    } catch (error) {
      showError('Failed to create job');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật job
  const handleUpdateJob = async () => {
    if (!formData.id) {
      showError('Job ID missing for update');
      return;
    }

    if (salaryError) {
      showError('Please fix salary errors before saving');
      return;
    }
    if (!validateSalaryRange()) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        education: formData.education?.id || null,
        experience: formData.experience?.id || null,
        jobTypeId: formData.jobType?.id || null,
        jobTypeName: formData.jobType?.name || null,
        jobLevelId: formData.jobLevel?.id || null,
        jobLevelName: formData.jobLevel?.name || null,
        category: formData.category?.id || null,
        company: { ...formData.company },
      };
      delete payload.createdAt;
      delete payload.badges;
      delete payload.expiredDate;

      const updated = await EmployerService.updateJob(formData.id, payload);
      setFormData(normalizeData(updated.data || formData));
      showSuccess('Job updated successfully');
      if (onSave) onSave(formData);
    } catch (error) {
      showError('Failed to update job');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Lưu / bỏ lưu job
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

  // Tải chi tiết job dạng zip
  const handleDownloadJobDetails = async () => {
    const zip = new JSZip();

    const jobContent = `
  Job Title: ${formData.title || formData.jobTitle || ''}
  Tags: ${formData.tags || ''}
  Job Role: ${formData.jobRole || ''}
  Salary: ${formData.salaryMin || ''} - ${formData.salaryMax || ''} ${formData.salaryType || ''}
  Education: ${formData.education?.name || ''}
  Experience: ${formData.experience?.name || ''}
  Job Type: ${formData.jobType?.name || ''}
  Vacancies: ${formData.vacancy || ''}
  Expiration Date: ${formData.expiredDate || ''}
  Job Level: ${formData.jobLevel?.name || ''}
  Contact URL: ${formData.contactUrl || ''}
  Phone: ${formData.phone || ''}
  Email: ${formData.email || ''}
  Job Description: ${formData.description || ''}
  Responsibilities: ${formData.responsibility || ''}
  Overview:
  Posted: ${formData.createdAt ? new Date(formData.createdAt).toLocaleDateString() : ''}
  Education: ${formData.education?.name || ''}
  Salary: ${formData.salaryMin || ''} - ${formData.salaryMax || ''}
  Location: ${formData.location || ''}
  Job Type: ${formData.jobType?.name || ''}
  Experience: ${formData.experience?.name || ''}
  Vacancies: ${formData.vacancy || ''}
  Job Level: ${formData.jobLevel?.name || ''}
Company:
  Name: ${formData.company?.companyName || formData.company?.name || ''}
  Description: ${formData.company?.description || ''}
  Founded: ${formData.company?.founded || ''}
  Organization: ${formData.company?.organization || ''}
  Size: ${formData.company?.size || ''}
  Phone: ${formData.company?.phone || ''}
  Email: ${formData.company?.email || ''}
  Website: ${formData.company?.website || ''}
    `;

    zip.file(`${formData.title || formData.jobTitle || 'job'}_details.txt`, jobContent);
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, `${formData.title || formData.jobTitle || 'job'}_details.zip`);
  };

  return (
    <div className={cx('container', { 'editable-container': editable })} ref={jobDetailRef}>
      {/* Bên trái */}
      <div className={cx('left')}>
        <div className={cx('header')}>
          <img
            src={
              formData.company?.avatarUrl ||
              formData.company?.logoUrl ||
              'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/120px-Instagram_logo_2016.svg.png'
            }
            alt={formData.company?.companyName || formData.company?.name || 'Company Logo'}
            className={cx('logo')}
          />
          <div className={cx('job-info')}>
            {editable ? (
              <input
                className={cx('job-info__title', 'job-title')}
                name="title"
                value={formData.title || ''}
                onChange={handleChange}
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
                  {formData.badges?.fulltime && (
                    <span className={cx('job-info__badge', 'job-info__badge--fulltime')}>
                      {formData.badges.fulltime}
                    </span>
                  )}
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
            {/* <div className={cx('contact')}>
              {editable ? (
                <>
                  <input
                    type="text"
                    name="contactUrl"
                    value={formData.contactUrl || ''}
                    onChange={handleChange}
                    className={cx('contact__link')}
                  />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    className={cx('editable-input')}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    className={cx('editable-input')}
                  />
                </>
              ) : (
                <>
                  <a
                    href={formData.contactUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cx('contact__link')}
                  >
                    <IconCirclesRelation className={cx('contact__icon')} />
                    {formData.contactUrl}
                  </a>
                  <span className={cx('contact__phone')}>
                    <IconPhone className={cx('contact__icon')} /> {formData.phone}
                  </span>
                  <span className={cx('contact__email')}>
                    <IconMailOpened className={cx('contact__icon')} /> {formData.email}
                  </span>
                </>
              )}
            </div> */}
            {/* {editable ? (
              <>
                <div className={cx('inputgroup')}>
                  <label>Tags:</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags || ''}
                    onChange={handleChange}
                    placeholder="Job keyword, tags etc..."
                  />
                </div>
                <div className={cx('inputgroup')}>
                  <label>Job Role:</label>
                  <select name="jobRole" value={formData.jobRole || ''} onChange={handleChange}>
                    <option value="">Select...</option>
                    <option value="Designer">Designer</option>
                    <option value="Developer">Developer</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
              </>
            ) : (
              <div className={cx('additional-info')}>
                <p>
                  <strong>Tags:</strong> {formData.tags}
                </p>
                <p>
                  <strong>Job Role:</strong> {formData.jobRole}
                </p>
              </div>
            )} */}
          </div>
        </div>

        {/* Job Description */}
        <div className={cx('job-description')}>
          <div className={cx('job-description__title')}>Job Description</div>
          {editable ? (
            <SimpleRichTextEditor
              placeholder="Add your job description..."
              onChange={(value) => handleChange({ target: { value } }, 'description')}
              content={formData.description || ''}
              value={formData.description || ''}
            />
          ) : (
            <div
              className={cx('job-description__content')}
              dangerouslySetInnerHTML={{ __html: formData.description || '' }}
            />
          )}
        </div>

        {/* Responsibilities */}
        <div className={cx('responsibilities')}>
          <div className={cx('responsibilities__title')}>Responsibilities</div>
          {editable ? (
            <SimpleRichTextEditor
              placeholder="Add your job responsibilities..."
              onChange={(value) => handleChange({ target: { value } }, 'responsibility')}
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
                render: () => `${formData.salaryMin || ''}`,
              },
              {
                key: 'salaryMax',
                label: 'Maxmimum Salary',
                icon: <IconWallet />,
                render: () => `${formData.salaryMax || ''}`,
              },
              {
                key: 'location',
                label: 'Location',
                icon: <IconMapPin />,
              },
              {
                key: 'jobType',
                label: 'Job Type',
                icon: <IconBriefcase />,
                options: jobTypes,
              },
              {
                key: 'vacancy',
                label: 'Vacancies',
                icon: <IconUsers />,
              },
              {
                key: 'jobLevel',
                label: 'Job Level',
                icon: <IconBrightnessAuto />,
                options: jobLevels,
              },
            ].map(({ key, label, icon, options, render }) => (
              <div key={key} className={cx('overview-item')}>
                <span className={cx('overview-item__icon')}>{icon}</span>
                <div className={cx('overview-item__content', editable && 'editable_content')}>
                  <p className={cx('overview-item__label')}>{label}:</p>
                  {editable ? (
                    options ? (
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
                    ) : key === 'vacancy' ? (
                      <input
                        name={key}
                        value={formData[key] || ''}
                        onChange={handleChange}
                        className={cx('editable-input', 'overview-item__value')}
                      />
                    ) : (
                      <input
                        type={
                          key === 'salaryMin' || key === 'salaryMax' || key === 'vacancy'
                            ? 'number'
                            : key === 'expiredDate'
                              ? 'date'
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
                      {
                        render
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
            {formData.company?.companyName || formData.company?.name}
          </div>
          <p
            className={cx('company-info__desc')}
            dangerouslySetInnerHTML={{ __html: formData.company?.description || '' }}
          ></p>
          <div className={cx('company-details')}>
            {[
              { label: 'Founded in:', key: 'founded' },
              { label: 'Company size:', key: 'size' },
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

        <button onClick={handleDownloadJobDetails} className={cx('apply-btn')}>
          Download Job Details
        </button>
      </div>
    </div>
  );
};

export default JobDetail;
