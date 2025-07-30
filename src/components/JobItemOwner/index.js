import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './JobItemOwner.module.scss';
import {
  IconDotsVertical,
  IconCircleX,
  IconCircleCheck,
  IconPencil,
  IconX,
  IconRefreshDot
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
import { jobService } from '~/services';
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { useLoading } from '~/context/LoadingContext';



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

function JobItemOwner({ image = Images.default_image, jobDescription = {}, isVIP = false, setFlag = () => { }, }) {

  const [jobData, setJobData] = useState({ ...jobDescription });
  const { showError, showSuccess } = useNotification();
  const [modalType, setModalType] = useState(null); // 'view' | 'edit' | null
  const [showApplications, setShowApplications] = useState(false);
  const [type, setType] = useState('');
  const [opened, { open, close }] = useDisclosure(false);
  const { showLoading, hideLoading } = useLoading();




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
    try {
      showLoading();

      const data = await fetchJobDetailFake(jobData.id);

      hideLoading();
      if (isMounted.current) {
        setJobData((format.transformJobData(data)));
        setModalType(type);
      }
    } catch (error) {
      hideLoading();
      showError('Error loading job details.');
    }
  };

  const handleSave = async (updatedJob) => {
    if (!jobData?.id) {
      showError('Job ID is missing');
      return;
    }
    try {
      const payload = prepareUpdatePayload(updatedJob);
      const data = await fetchJobDetailFake(jobData.id, payload, false);
      if (!data) {
        showLoading();
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
      if (isMounted.current) hideLoading();
    }
  };

  const handleDelete = async () => {
    if (!jobData?.id) {
      showError('Job ID is missing');
      return;
    }

    try {
      showLoading();
      await fetchJobDetailFake(jobData.id, null, true);
      hideLoading();
      showSuccess('Job deleted successfully');
      if (isMounted.current) {
        setModalType(null);
      }
    } catch (error) {
      hideLoading();
      showError('Error deleting job.');
    } finally {
      if (isMounted.current) hideLoading();
    }
  };

  const repostJob = async () => {
    try {
      const data = await jobService.getJobById(jobData.id);
      const input = {
        title: data.title,
        description: data.description,
        salaryMin: data.salaryMin,
        salaryMax: data.salaryMax,
        categoryId: data.category?.id || data.category || null,
        jobLevelId: data.jobLevel?.id || data.jobLevel || null,
        jobTypeId: data.jobType?.id || data.jobType || null,
        educationId: data.education?.id || data.education || null,
        experienceId: data.experience?.id || data.experience || null,
        vacancy: data.vacancy,
        responsibility: data.responsibility,
        expiredDate: data.expiredDate,
      }
      await jobService.createJob(input);
      // console.log('input', input);

      showSuccess('Repost job successfully');
    } catch (error) {
      showError('Error repost job');
    }
  }

  const handleConfirm = async () => {
    if (type === 'delete') {
      await handleDelete();
    } else {
      setType('repost')
      openModal('edit')
      // await repostJob();
    }
    setFlag((prev) => !prev); // ✅ bây giờ đảm bảo setFlag sau khi xử lý xong
    setType('');
    close();
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
              {!jobData?.isActive &&
                <>
                  {/* <Menu.Item leftSection={<IconPencil size={20} />} onClick={() => openModal('edit')}>
                    Edit Job
                  </Menu.Item> */}
                  <Menu.Item leftSection={<IconRefreshDot size={20} />} onClick={() => {
                    setType('repost');
                    open();
                  }}>
                    Re-post job
                  </Menu.Item>
                </>
              }
              <Menu.Item leftSection={<EyeIcon size={20} />} onClick={() => openModal('view')}>
                View Job
              </Menu.Item>
              {jobData?.isActive && <Menu.Item leftSection={<IconX size={20} />} onClick={() => {
                setType('delete');
                open();
              }}>
                Close Job
              </Menu.Item>}
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>

      {/* Modal for View/Edit Job */}
      {modalType && jobData && (
        <div className={cx('modalOverlay')}>
          <div className={cx('modalBox')}>
            <button className={cx('closeBtn')} onClick={closeModal} aria-label="Close modal">&times;</button>
            {modalType === 'view' && <JobDetail key="view" job={jobData} />}
            {modalType === 'edit' && <JobDetail key="edit" closeModal={closeModal} job={jobData} editable onSave={handleSave} />}
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

      <>
        <Modal size={'auto'} classNames={{
          header: cx('modal-header'), modal: cx('modal'),
          content: cx('modal-content'),
          inner: cx('modal-inner'),
          body: cx('modal-body'),
          close: cx('modal-close-button')
        }} opened={opened} onClose={close} title={type === 'delete' ? 'Do you want to close this job?' : 'Do you want to re-post this job?'} centered>
          <div className='text-center mt-4'>
            <Button green_white onClick={handleConfirm}>Confirm</Button>
            <Button red_white onClick={close}>Cancel</Button>
          </div>
        </Modal>
      </>
      {/*  */}
    </>
  );
}

export default JobItemOwner;
