import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './JobDetail.module.scss';
import EmployerService from '~/services/EmployerService';
import {
  IconCirclesRelation,
  IconPhone,
  IconMailOpened,
  IconStopwatch,
  IconBriefcase,
  IconWallet,
  IconMapPin,
  IconBooks,
  IconBrain,
  IconUsers,
  IconBrightnessAuto,
  IconBookmarkFilled,
  IconBookmark,
} from '@tabler/icons-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import SimpleRichTextEditor from 'src/components/RichTextEditor/RichTextEditor.js';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { CalendarIcon } from 'lucide-react';
import { useWindowScroll } from '@mantine/hooks';

import ApplyButton from '~/components/Button/ApplyButton';
import { useAuth } from '~/context/AuthContext';
import { useNotification } from '~/hooks';

const cx = classNames.bind(styles);

const noop = () => undefined;

// Lấy tên nếu value là object, ngược lại trả value trực tiếp
const getDisplayValue = (value) => {
  if (typeof value === 'object' && value !== null) {
    return value.name || '';
  }
  return value || '';
};

const JobDetail = ({ job = null, editable = false, onSave = noop, onCancel = noop }) => {
  const { id } = useParams();
  const { user } = useAuth();
  const isJOB_SEEKER = user?.role === 'JOB_SEEKER';
  const [save, setSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAuxiliary, setLoadingAuxiliary] = useState(true);
  const [formData, setFormData] = useState(null);
  const jobDetailRef = useRef(null);
  const IconComponent = save ? IconBookmarkFilled : IconBookmark;
  const [, scrollTo] = useWindowScroll();
  const { showSuccess, showError } = useNotification();

  // Dữ liệu phụ trợ cho các dropdown
  const [educations, setEducations] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [jobLevels, setJobLevels] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [categories, setCategories] = useState([]);

  // Helper tìm object trong danh sách theo id hoặc name
  const findObject = (list, val) => {
    if (!val) return '';
    if (typeof val === 'object') return val;
    const valNum = Number(val);
    return (
      list.find((item) => item.id === valNum || item.name === val) ||
      { name: val }
    );
  };

  // Chuẩn hóa dữ liệu, map các trường thành object nếu có trong danh sách phụ trợ
  const normalizeData = (data) => {
    if (!data) return null;
    return {
      ...data,
      salaryMin: data.salaryMin ?? '',
      salaryMax: data.salaryMax ?? '',
      expiredDate: data.expiredDate || '',
      email: data.email || data.employer?.email || '',
      roleName: data.roleName || data.employer?.roleName || '',
      phone: data.phone || data.employer?.phone || '',
      education: findObject(educations, data.education),
      experience: findObject(experiences, data.experience),
      jobLevel: findObject(jobLevels, data.jobLevel),
      jobType: findObject(jobTypes, data.jobType),
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
      vacancies: data.vacancies || '',
      createdAt: data.createdAt || data.postedAt || '',
    };
  };

  // Load dữ liệu phụ trợ trước (lấy riêng result từ API response)
  useEffect(() => {
    const fetchAuxiliaryData = async () => {
      try {
        const educationResponse = await EmployerService.fetchEducationFake();
        const jobTypesResponse = await EmployerService.fetchJobTypesFake();
        const jobLevelsResponse = await EmployerService.fetchJobLevelFake();
        const experienceResponse = await EmployerService.fetchExperienceFake();
        const categoriesResponse = await EmployerService.fetchCategoriesFake();

        setEducations(educationResponse.result || educationResponse || []);
        setJobTypes(jobTypesResponse.result || jobTypesResponse || []);
        setJobLevels(jobLevelsResponse.result || jobLevelsResponse || []);
        setExperiences(experienceResponse.result || experienceResponse || []);
        setCategories(categoriesResponse.result || categoriesResponse || []);
      } catch (error) {
        console.error('Error fetching auxiliary data:', error);
      } finally {
        setLoadingAuxiliary(false);
      }
    };
    fetchAuxiliaryData();
  }, []);

  // Load chi tiết job sau khi dữ liệu phụ trợ có đầy đủ
  useEffect(() => {
    if (loadingAuxiliary && !job) return;

    const fetchJob = async () => {
      if (!id) return;
      try {
        const response = await EmployerService.getJobDetail(id);
        const data = normalizeData(response.data || {});
        setFormData(data);
      } catch (error) {
        console.error('Error fetching job detail:', error);
        setFormData(null);
      }
    };

    if (educations.length && experiences.length && jobLevels.length && jobTypes.length) {
      if (job) {
        setFormData(normalizeData(job));
      } else {
        fetchJob();
      }
    }
  }, [id, job, educations, experiences, jobLevels, jobTypes, loadingAuxiliary]);

  // Scroll lên đầu trang khi mở component
  useEffect(() => {
    scrollTo({ y: 0 });
  }, [scrollTo]);

  // Đóng modal khi click ra ngoài (chỉ với editable)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (jobDetailRef.current && !jobDetailRef.current.contains(e.target) && editable) {
        onCancel();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [editable, onCancel]);

  if (loadingAuxiliary || !formData) return <div>Loading...</div>;

  // Xử lý thay đổi input, xử lý select các trường object
  const handleChange = (e, section = null) => {
    const { name, value } = e.target;

    if (section === 'description' || section === 'responsibility') {
      setFormData(prev => ({ ...prev, [section]: value }));
      return;
    }

    if (name?.startsWith('overview.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        overview: { ...prev.overview, [key]: value },
      }));
      return;
    }

    if (name?.startsWith('company.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        company: { ...prev.company, [key]: value },
      }));
      return;
    }

    if (name === 'experience') {
      const selected = experiences.find(exp => exp.name === value);
      setFormData(prev => ({ ...prev, experience: selected || { name: value } }));
      return;
    }
    if (name === 'education') {
      const selected = educations.find(edu => edu.name === value);
      setFormData(prev => ({ ...prev, education: selected || { name: value } }));
      return;
    }
    if (name === 'jobLevel') {
      const selected = jobLevels.find(level => level.name === value);
      setFormData(prev => ({ ...prev, jobLevel: selected || { name: value } }));
      return;
    }
    if (name === 'jobType') {
      const selected = jobTypes.find(type => type.name === value);
      setFormData(prev => ({ ...prev, jobType: selected || { name: value } }));
      return;
    }

    if (name) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Tạo job mới
  const handleCreateJob = async () => {
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
    setLoading(true);
    try {
      // Chuyển các trường object thành id gửi backend
      const payload = {
        ...formData,
        education: formData.education?.id || null,
        experience: formData.experience?.id || null,
        jobLevel: formData.jobLevel?.id || null,
        jobType: formData.jobType?.id || null,
        category: formData.category?.id || null,
        company: { ...formData.company },
      };
      delete payload.createdAt;
      delete payload.badges;

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
  const handelSaveJob = async () => {
    try {
      setSave(true);
      showSuccess('Save job successfully');
    } catch (error) {
      showError('Save job failed');
      console.error(error);
    }
  };

  const handelUnsaveJob = async () => {
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
Education: ${getDisplayValue(formData.education)}
Experience: ${getDisplayValue(formData.experience)}
Job Type: ${getDisplayValue(formData.jobType)}
Vacancies: ${formData.vacancies || ''}
Expiration Date: ${formData.expiredDate || ''}
Job Level: ${getDisplayValue(formData.jobLevel)}
Contact URL: ${formData.contactUrl || ''}
Phone: ${formData.phone || ''}
Email: ${formData.email || ''}
Job Description: ${formData.description || ''}
Responsibilities: ${formData.responsibility || ''}
Overview:
  Posted: ${formData.createdAt ? new Date(formData.createdAt).toLocaleDateString() : ''}
  Expire: ${formData.expiredDate || ''}
  Education: ${getDisplayValue(formData.education)}
  Salary: ${formData.salaryMin || ''} - ${formData.salaryMax || ''}
  Location: ${formData.location || ''}
  Job Type: ${getDisplayValue(formData.jobType)}
  Experience: ${getDisplayValue(formData.experience)}
  Vacancies: ${formData.vacancies || ''}
  Job Level: ${getDisplayValue(formData.jobLevel)}
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
                    <span className={cx('job-info__badge', 'job-info__badge--featured')}>Featured</span>
                  )}
                  {formData.badges?.fulltime && (
                    <span className={cx('job-info__badge', 'job-info__badge--fulltime')}>
                      {formData.badges.fulltime}
                    </span>
                  )}
                </div>
                {!editable && (
                  <div className={cx('action-btn')}>
                    <div
                      className={cx('save-job')}
                      onClick={() => {
                        save ? handelUnsaveJob() : handelSaveJob();
                      }}
                    >
                      {isJOB_SEEKER && <IconComponent size={22} color="#0a65cc" />}
                    </div>
                    <ApplyButton classname={cx('job-info__apply')} title="Software Engineer" jobId={id} />
                  </div>
                )}
              </div>
            )}
            <div className={cx('contact')}>
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
                  <a href={formData.contactUrl} target="_blank" rel="noreferrer" className={cx('contact__link')}>
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
            </div>
            {editable ? (
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
            )}
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
      </div>

      {/* Bên phải */}
      <div className={cx('right')}>
        <div className={cx('job-overview')}>
          <div className={cx('job-overview__title')}>Job Overview</div>
          <div className={cx('job-overview__items', !editable && 'editable')}>
            {[
              {
                key: 'createdAt',
                label: 'Job Posted',
                icon: <CalendarIcon />,
                render: (value) => (value ? new Date(value).toLocaleDateString() : ''),
              },
              {
                key: 'expiredDate',
                label: 'Job Expire',
                icon: <IconStopwatch />,
              },
              {
                key: 'education',
                label: 'Education',
                icon: <IconBooks />,
                options: educations,
              },
              {
                key: 'salary',
                label: 'Salary',
                icon: <IconWallet />,
                render: () => `${formData.salaryMin || ''} - ${formData.salaryMax || ''}`,
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
                key: 'experience',
                label: 'Experience',
                icon: <IconBrain />,
                options: experiences,
              },
              {
                key: 'vacancies',
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
                        value={getDisplayValue(formData[key])}
                        onChange={handleChange}
                        className={cx('editable-input', 'overview-item__value')}
                      >
                        <option value="">Select...</option>
                        {options.map((opt) => (
                          <option key={opt.id || opt} value={opt.name || opt}>
                            {opt.name || opt}
                          </option>
                        ))}
                      </select>
                    ) : key === 'vacancies' ? (
                      <select
                        name={key}
                        value={formData[key] || ''}
                        onChange={handleChange}
                        className={cx('editable-input', 'overview-item__value')}
                      >
                        <option value="">Select...</option>
                        <option value="1">1</option>
                        <option value="2-5">2-5</option>
                        <option value="5+">5+</option>
                      </select>
                    ) : (
                      <input
                        type={key === 'expiredDate' ? 'date' : 'text'}
                        name={key}
                        value={formData[key] || ''}
                        onChange={handleChange}
                        className={cx('editable-input', 'overview-item__value')}
                      />
                    )
                  ) : (
                    <strong className={cx('overview-item__value')}>
                      {render ? render(formData[key]) : getDisplayValue(formData[key])}
                    </strong>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={cx('company-info')}>
          <div className={cx('company-info__title')}>
            {formData.company?.companyName || formData.company?.name}
          </div>
          <p className={cx('company-info__desc')}>
            {editable ? (
              <input
                type="text"
                name="company.description"
                value={formData.company?.description || ''}
                onChange={handleChange}
                className={cx('editable-input')}
              />
            ) : (
              formData.company?.description
            )}
          </p>
          <div className={cx('company-details')}>
            {[
              { label: 'Founded in:', key: 'founded' },
              { label: 'Organization type:', key: 'organization' },
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
