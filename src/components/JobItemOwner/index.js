import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './JobItemOwner.module.scss';
import {
  IconDotsVertical,
  IconCircleX,
  IconCircleCheck,
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
import { useNotification } from '~/hooks';
import { format } from '~/utils';


const cx = classNames.bind(styles);

const prepareUpdatePayload = (job) => ({
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
});

const fetchJobDetailFake = async (id, updatedData = null, deleteFlag = false) => {
  try {
    if (deleteFlag) {
      const response = await EmployerService.deleteJob(id);
      return response.data || {};
    }
    const response = await EmployerService.getJobDetail(id);
    console.log('response', response);

    return response || {};
  } catch (error) {
    if (error.response?.status === 404) {
      alert(`Job with ID ${id} not found.`);
      return null;
    }
    throw error;
  }
};

function JobItemOwner({ image = Images.default_image, jobDescription = {}, isVIP = false, onDeleteSuccess }) {

  const [jobData, setJobData] = useState({ ...jobDescription });
  const { showError } = useNotification();
  const [modalType, setModalType] = useState(null); // 'view' | 'edit' | null
  const [showApplications, setShowApplications] = useState(false);
  const [loading, setLoading] = useState(false);

  const isMounted = useRef(true);

  useEffect(() => {

    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);



  const openModal = async (type) => {
    if (!jobData?.id) {
      showError('Job ID is missing');
      return;
    }
    setLoading(true);
    try {
      const data = await fetchJobDetailFake(jobData.id);
      console.log('data', data);

      if (!data) {
        setLoading(false);
        return;
      }
      if (isMounted.current) {
        setJobData((format.transformJobData(data)));
        setModalType(type);
      }
    } catch (error) {
      showError('Error loading job details.');
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const handleSave = async (updatedJob) => {
    if (!jobData?.id) {
      alert('Job ID is missing');
      return;
    }
    setLoading(true);
    try {
      const payload = prepareUpdatePayload(updatedJob);
      const data = await fetchJobDetailFake(jobData.id, payload, false);
      if (!data) {
        setLoading(false);
        alert('Failed to save job because job does not exist.');
        return;
      }
      if (isMounted.current) {
        setJobData(format.transformJobData(data));
        setModalType(null);
      }
    } catch (error) {
      alert('Error saving job.');
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!jobData?.id) {
      alert('Job ID is missing');
      return;
    }
    if (window.confirm('Are you sure you want to delete this job?')) {
      setLoading(true);
      try {
        await fetchJobDetailFake(jobData.id, null, true);
        alert('Job deleted successfully');
        if (isMounted.current) {
          setModalType(null);
          onDeleteSuccess?.(jobData.id);
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
      <div className={cx('wrapper', { isVIP })}>
        <div className={cx('content')}>
          <div className={cx('logo-company')}>
            <img src={image} alt="Company logo" />
          </div>
          <div className={cx('job-description')}>
            <div className={cx('top')}>
              <div className={cx('title')}>{jobData?.jobTitle}</div>
            </div>
            <div className={cx('bottom')}>
              <div className={cx('work-time')}>
                {jobData?.workTime}
              </div>
              {/* <div className={cx('remain-date')}>
                {jobData.remainDay}
              </div> */}
            </div>
          </div>
        </div>
        <div className={cx('status')}>
          {jobData?.isActive ? (
            <p className={cx('active')}>
              <IconCircleCheck size={20} /> Active
            </p>
          ) : (
            <p className={cx('inactive')}>
              <IconCircleX size={20} /> Expired
            </p>
          )}
        </div>
        <div className={cx('applications')}>{jobData?.jobApplicationCounts} applications</div>
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

      {/* Loading Overlay */}
      {loading && (
        <div className={cx('loadingOverlay')}>
          <p>Loading...</p>
        </div>
      )}

      {/* Modal for View/Edit Job */}
      {modalType && jobData && (
        <div className={cx('modalOverlay')}>
          <div className={cx('modalBox')}>
            <button className={cx('closeBtn')} onClick={closeModal} aria-label="Close modal">&times;</button>
            {modalType === 'view' && <JobDetail key="view" job={jobData} />}
            {modalType === 'edit' && <JobDetail key="edit" job={jobData} editable onSave={handleSave} />}
          </div>
        </div>
      )}

      {/* Modal for Applications */}
      {showApplications && (
        <div className={cx('modalOverlay')}>
          <div className={cx('modalBox')}>
            <button className={cx('closeBtn')} onClick={closeApplications} aria-label="Close applications modal">
              &times;
            </button>
            <JobApplications jobId={jobData?.id} />
          </div>
        </div>
      )}
    </>
  );
}

export default JobItemOwner;
