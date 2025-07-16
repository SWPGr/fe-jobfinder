import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './JobItemOwner.module.scss';
import {
  IconDotsVertical,
  IconCircleX,
  IconCircleCheck,
  IconUsers,
  IconPencil,
  IconX,
} from '@tabler/icons-react';
import { Menu } from '@mantine/core';
import { Images } from '~/assets';
import { Button } from '~/components';
import { EyeIcon } from 'lucide-react';
import JobDetail from '~/pages/JobDetail/JobDetail';
import JobApplications from '~/pages/CreateCVSeeker/Application';
import EmployerService from '~/services/EmployerService';

const cx = classNames.bind(styles);

// Hàm tính số ngày giữa 2 ngày
const calcDaysBetween = (startDateStr, endDateStr) => {
  if (!startDateStr || !endDateStr) return null;
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const diffTime = end - start;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Chuẩn hóa dữ liệu job nhận từ API
const normalizeJobData = (data) => {
  const expiredDateStr = data.expiredDate;
  const createdAtStr = data.createdAt;

  let isActive = false;
  if (expiredDateStr) {
    const today = new Date();
    const expiredDate = new Date(expiredDateStr);
    isActive = expiredDate >= today;
  }

  const workTime = createdAtStr ? calcDaysBetween(createdAtStr, new Date().toISOString()) : null;
  const remainDay = (expiredDateStr && new Date(expiredDateStr) > new Date())
    ? calcDaysBetween(new Date().toISOString(), expiredDateStr)
    : 0;

  // Chuẩn hóa các trường category, jobLevel, jobType nếu là object hoặc id
  const normalizeField = (field) => {
    if (!field) return null;
    if (typeof field === 'object') return field;
    return { id: field, name: '' };
  };

  return {
    id: data.id,
    title: data.title || '',
    description: data.description || '',
    location: data.location || '',
    salaryMin: data.salaryMin || 0,
    salaryMax: data.salaryMax || 0,
    responsibility: data.responsibility || '',
    expiredDate: expiredDateStr,
    createdAt: createdAtStr,
    category: normalizeField(data.category),
    jobLevel: normalizeField(data.jobLevel),
    jobType: normalizeField(data.jobType),
    isActive,
    numberApplications: data.numberApplications || 0,
    workTime,
    remainDay,
    company: data.employer
      ? {
          name: data.employer.companyName || '',
          description: data.employer.description || '',
          phone: data.employer.phone || '',
          email: data.employer.email || '',
          website: data.employer.website || '',
          founded: data.employer.yearOfEstablishment || '',
          organization: data.employer.organizationType || '',
          size: data.employer.teamSize || '',
          avatarUrl: data.employer.avatarUrl || '',
          logoUrl: data.employer.avatarUrl || '',
        }
      : null,
    badges: data.badges || null,
  };
};

// Hàm chuẩn hóa dữ liệu trước khi gửi update lên backend
const prepareUpdatePayload = (job) => {
  return {
    title: job.title,
    description: job.description,
    location: job.location,
    salaryMin: job.salaryMin,
    salaryMax: job.salaryMax,
    responsibility: job.responsibility,
    expiredDate: job.expiredDate,
    categoryId: job.category?.id || job.category || null,
    jobLevelId: job.jobLevel?.id || job.jobLevel || null,
    jobTypeId: job.jobType?.id || job.jobType || null,
    // Thêm các trường khác nếu backend yêu cầu
  };
};

// Hàm fetch tổng quát
const fetchJobDetailFake = async (id, updatedData = null, deleteFlag = false) => {
  try {
    if (deleteFlag) {
      const response = await EmployerService.deleteJob(id);
      return response.data || {};
    }
    if (updatedData) {
      const response = await EmployerService.updateJob(id, updatedData);
      return response.data || {};
    }
    const response = await EmployerService.getJobDetail(id);
    return response.data || {};
  } catch (error) {
    if (error.response?.status === 404) {
      alert(`Job with ID ${id} not found.`);
      return null;
    }
    console.error('Error fetching/updating/deleting job:', error);
    throw error;
  }
};

function JobItemOwner({
  image = Images.default_image,
  jobDescription = {},
  isVIP = false,
  onDeleteSuccess,
}) {
  const [jobData, setJobData] = useState(() => {
    if (jobDescription && !jobDescription.id && jobDescription.jobId) {
      return { ...jobDescription, id: jobDescription.jobId };
    }
    return jobDescription;
  });

  const [modalType, setModalType] = useState(null);
  const [showApplications, setShowApplications] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchDetailOnInit = async () => {
      if (jobDescription && jobDescription.id) {
        setLoading(true);
        try {
          const data = await fetchJobDetailFake(jobDescription.id);
          if (data) {
            setJobData(normalizeJobData(data));
          } else {
            setJobData(jobDescription);
          }
        } catch {
          setJobData(jobDescription);
        } finally {
          setLoading(false);
        }
      } else if (jobDescription && jobDescription.jobId && !jobDescription.id) {
        setJobData({ ...jobDescription, id: jobDescription.jobId });
      } else {
        setJobData(jobDescription);
      }
    };
    fetchDetailOnInit();
  }, [jobDescription]);

  const classes = cx('wrapper', { isVIP });
  const { title, workTime, remainDay, isActive, numberApplications, id } = jobData || {};

  const openModal = async (type) => {
    if (!id) {
      alert('Job ID is missing');
      return;
    }
    setLoading(true);
    try {
      const data = await fetchJobDetailFake(id);
      if (!data) {
        setLoading(false);
        return;
      }
      if (isMounted.current) {
        const normalized = normalizeJobData(data);
        setJobData(prev => ({
          ...prev,
          ...normalized,
        }));
        setModalType(type);
      }
    } catch (error) {
      alert('Error loading job details.');
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const handleSave = async (updatedJob) => {
    if (!id) {
      alert('Job ID is missing');
      return;
    }
    setLoading(true);
    try {
      // Chuẩn hóa dữ liệu gửi lên API
      const payload = prepareUpdatePayload(updatedJob);
      const data = await fetchJobDetailFake(id, payload, false);
      if (!data) {
        setLoading(false);
        alert('Failed to save job because job does not exist.');
        return;
      }
      if (isMounted.current) {
        setJobData(normalizeJobData(data));
        setModalType(null);
      }
    } catch (error) {
      alert('Error saving job.');
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) {
      alert('Job ID is missing');
      return;
    }
    if (window.confirm('Are you sure you want to delete this job?')) {
      setLoading(true);
      try {
        await fetchJobDetailFake(id, null, true);
        alert('Job deleted successfully');
        if (isMounted.current) {
          setModalType(null);
          if (typeof onDeleteSuccess === 'function') {
            onDeleteSuccess(id);
          }
        }
      } catch (error) {
        alert('Error deleting job.');
      } finally {
        if (isMounted.current) setLoading(false);
      }
    }
  };

  const closeModal = () => setModalType(null);
  const closeApplications = () => setShowApplications(false);

  return (
    <>
      <div className={classes}>
        <div className={cx('content')}>
          <div className={cx('logo-company')}>
            <img src={image} alt="Company logo" />
          </div>
          <div className={cx('job-description')}>
            <div className={cx('top')}>
              <div className={cx('title')}>{title}</div>
            </div>
            <div className={cx('bottom')}>
              <div className={cx('work-time')}>
                {workTime !== null ? `${workTime} days posted` : ''}
              </div>
              <div className={cx('remain-date')}>
                {remainDay !== null ? `${remainDay} days remaining` : ''}
              </div>
            </div>
          </div>
        </div>

        <div className={cx('status')}>
          {isActive ? (
            <p className={cx('active')}>
              <IconCircleCheck size={20} /> Active
            </p>
          ) : (
            <p className={cx('inactive')}>
              <IconCircleX size={20} /> Expire
            </p>
          )}
        </div>

        <div className={cx('applications')}>
          {numberApplications} applications
        </div>

        <div className={cx('action')}>
          <Button className={cx('view-applications')} onClick={() => setShowApplications(true)}>
             Applications
          </Button>
          <Menu
            shadow="md"
            position="bottom-end"
            classNames={{ item: cx('item-main'), itemLabel: cx('item-label'), dropdown: cx('dropdown') }}
          >
            <Menu.Target>
              <div className={cx('options')}>
                <IconDotsVertical size={24} />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<IconPencil size={20} />} onClick={() => openModal('edit')}>
                Edit Job
              </Menu.Item>
              <Menu.Item leftSection={<EyeIcon size={20} />} onClick={() => openModal('view')}>
                View Job
              </Menu.Item>
              <Menu.Item leftSection={<IconX size={20} />} onClick={handleDelete}>
                Delete Job
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>

      {loading && (
        <div className={cx('loadingOverlay')}>
          <p>Loading...</p>
        </div>
      )}

      {modalType && jobData && (
        <div className={cx('modalOverlay')}>
          <div className={cx('modalBox')}>
            <button className={cx('closeBtn')} onClick={closeModal}>
              ×
            </button>

            {modalType === 'view' && <JobDetail key="view" job={jobData} />}
            {modalType === 'edit' && <JobDetail key="edit" job={jobData} editable onSave={handleSave} />}
          </div>
        </div>
      )}

      {showApplications && (
        <div className={cx('modalOverlay')}>
          <div className={cx('modalBox')}>
            <button className={cx('closeBtn')} onClick={closeApplications}>
              ×
            </button>
            <JobApplications />
          </div>
        </div>
      )}
    </>
  );
}

export default JobItemOwner;


