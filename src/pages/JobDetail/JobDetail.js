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

// Giả định 'get' là hàm fetch API GET, bạn có thể thay thế bằng axios hoặc fetch tùy dự án
const get = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return { result: [] };
  }
};


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
  const [formData, setFormData] = useState(null);
  const jobDetailRef = useRef(null);
  const IconComponent = save ? IconBookmarkFilled : IconBookmark;
  const [, scrollTo] = useWindowScroll();
  const { showSuccess, showError } = useNotification();

  // States chứa dữ liệu phụ trợ
  const [educations, setEducations] = useState([]);
  const [jobTypes, setJobTypes] = useState([]);
  const [jobLevels, setJobLevels] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [categories, setCategories] = useState([]);

  // Lấy dữ liệu job khi mount hoặc khi job/jobId thay đổi
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await EmployerService.getJobDetail(id);
        const data = response.data || {};
        setFormData(data);
      } catch (error) {
        console.error('Error fetching job detail:', error);
        setFormData(null);
      }
    };

    if (job) {
      setFormData(job);
    } else if (id) {
      fetchJob();
    } else {
      // Nếu không có id và không có job thì khởi tạo form rỗng để tạo mới
      setFormData({
        title: '',
        description: '',
        location: '',
        salaryMin: '',
        salaryMax: '',
        responsibility: '',
        expiredDate: '',
        category: '',
        jobLevel: '',
        jobType: '',
        education: '',
        experience:'',
        company: {
          name: '',
          description: '',
          founded: '',
          organization: '',
          size: '',
          phone: '',
          email: '',
          website: '',
          avatarUrl: '',
          logoUrl: '',
        },
        badges: null,
        tags: '',
        jobRole: '',
        contactUrl: '',
        phone: '',
        email: '',
        vacancies: '',
      });
    }
  }, [job, id]);

  // Lấy dữ liệu phụ trợ khi component mount
  useEffect(() => {
    const fetchAuxiliaryData = async () => {
      try {
        const [edus, types, levels, exps, cats] = await Promise.all([
          EmployerService.fetchEducationFake(),
          EmployerService.fetchJobTypesFake(),
          EmployerService.fetchJobLevelFake(),
          EmployerService.fetchExperienceFake(),
          EmployerService.fetchCategoriesFake(),
        ]);
        setEducations(edus);
        setJobTypes(types);
        setJobLevels(levels);
        setExperiences(exps);
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching auxiliary data:', error);
      }
    };

    fetchAuxiliaryData();
  }, []);

  // Scroll lên đầu khi component mount
  useEffect(() => {
    scrollTo({ y: 0 });
  }, [scrollTo]);

  // Đóng modal khi click ngoài (chỉ khi editable)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (jobDetailRef.current && !jobDetailRef.current.contains(event.target) && editable) {
        onCancel();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [editable, onCancel]);

  if (!formData) return <div>Loading...</div>;

  // Xử lý thay đổi input
  const handleChange = (e, section = null) => {
    const { name, value } = e.target;

    if (section === 'description' || section === 'responsibility') {
      setFormData((prev) => ({ ...prev, [section]: value }));
      return;
    }

    if (name?.startsWith('overview.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        overview: { ...prev.overview, [key]: value },
      }));
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

    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Gọi hàm onSave từ cha
  const handleSave = () => {
    onSave(formData);
  };

  // Hàm tạo job mới (POST)
  const handleCreateJob = async () => {
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

  // Xử lý lưu job (update)
  const handleUpdateJob = async () => {
    if (!formData.id) {
      showError('Job ID missing for update');
      return;
    }
    setLoading(true);
    try {
      const updated = await EmployerService.updateJob(formData.id, formData);
      setFormData(updated.data || formData);
      showSuccess('Job updated successfully');
      if (onSave) onSave(formData);
    } catch (error) {
      showError('Failed to update job');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleDownloadJobDetails = async () => {
    const zip = new JSZip();

    const jobContent = `
Job Title: ${formData.title || formData.jobTitle || ''}
Tags: ${formData.tags || ''}
Job Role: ${formData.jobRole || ''}
Salary: ${formData.salaryMin || formData.minSalary || ''} - ${formData.salaryMax || formData.maxSalary || ''} ${formData.salaryType || ''}
Education: ${getDisplayValue(formData.education)}
Experience: ${getDisplayValue(formData.experience)}
Job Type: ${getDisplayValue(formData.jobType)}
Vacancies: ${formData.vacancies || ''}
Expiration Date: ${formData.expiredDate || formData.expirationDate || ''}
Job Level: ${getDisplayValue(formData.jobLevel)}
Contact URL: ${formData.contactUrl || ''}
Phone: ${formData.phone || ''}
Email: ${formData.email || ''}
Job Description: ${formData.description || ''}
Responsibilities: ${formData.responsibility || ''}
Overview:
  Posted: ${formData.overview?.posted || ''}
  Expire: ${formData.overview?.expire || ''}
  Education: ${formData.overview?.education || ''}
  Salary: ${formData.overview?.salary || ''}
  Location: ${formData.overview?.location || ''}
  Job Type: ${formData.overview?.jobType || ''}
  Experience: ${formData.overview?.experience || ''}
  Vacancies: ${formData.overview?.vacancies || ''}
  Job Level: ${formData.overview?.jobLevel || ''}
Company:
  Name: ${formData.company?.name || ''}
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
      {/* Phần bên trái */}
      <div className={cx('left')}>
        <div className={cx('header')}>
          <img
            src={
              formData.company?.avatarUrl ||
              formData.company?.logoUrl ||
              'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/120px-Instagram_logo_2016.svg.png'
            }
            alt={formData.company?.name || 'Company Logo'}
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

      {/* Right Section */}
      <div className={cx('right')}>
        <div className={cx('job-overview')}>
          <div className={cx('job-overview__title')}>Job Overview</div>
          <div className={cx('job-overview__items', !editable && 'editable')}>
            {[
              { key: 'posted', label: 'Job Posted', icon: <CalendarIcon /> },
              { key: 'expiredDate', label: 'Job Expire', icon: <IconStopwatch /> },
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
            ].map(({ key, label, icon, options }) => (
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
                    <strong className={cx('overview-item__value')}>{getDisplayValue(formData[key])}</strong>
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
              <button
                onClick={handleCreateJob}
                className={cx('save-btn')}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Job'}
              </button>
            ) : (
              <>
                <button
                  onClick={handleUpdateJob}
                  className={cx('save-btn')}
                  disabled={loading}
                >
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
