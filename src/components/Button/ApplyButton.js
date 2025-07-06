import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Text, TextInput, Textarea } from '@mantine/core';
import {
    IconUpload,
    IconX,
    IconFileTypePdf,
    IconFeatherFilled,
    IconFileCvFilled,
    IconFileText,
    IconTrash,
} from '@tabler/icons-react';
import { Dropzone, PDF_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import classNames from 'classnames/bind';
import styles from './ApplyButton.module.scss';
import { useRef } from 'react';

import { validator } from '~/utils';
import Button from '.';
import { jobService } from '~/services';
import { useNotification } from '~/hooks';
import { useLoading } from '~/context/LoadingContext';

const cx = classNames.bind(styles);

function ApplyButton({ classname, onClick = () => {}, title, jobId }) {
    const [opened, { open, close }] = useDisclosure(false);
    const { showLoading, hideLoading } = useLoading();
    const { showSuccess, showError } = useNotification();
    const openRef = useRef(null);

    const form = useForm({
        initialValues: {
            resume: null,
            fullname: '',
            email: '',
            phone: '',
            coverLetter: '',
        },

        validate: {
            resume: (value) => (value ? null : 'Please upload a resume file'),
            fullname: (value) => validator.validateUsername(value),
            email: (value) => validator.validateEmail(value),
            phone: (value) => validator.validatePhoneNumber(value),
        },
    });

    const handleSubmit = async (values) => {
        console.log(values);

        const formData = new FormData();
        formData.append('jobId', jobId);
        formData.append('resume', values.resume);
        formData.append('fullname', values.fullname);
        formData.append('email', values.email);
        formData.append('phone', values.phone);
        formData.append('coverLetter', values.coverLetter);

        try {
            showLoading(); // Bắt đầu loading

            const data = await jobService.applyJob(formData); // Gửi API
            console.log(data);

            showSuccess('Apply job successfully!');
            onClick(); // Gọi callback nếu có
            close(); // Đóng modal
        } catch (error) {
            console.log(error);
            showError('Apply job failed!');
        } finally {
            hideLoading(); // Dù thành công hay lỗi đều tắt loading
        }
    };

    const handleOnClickApply = () => {
        open();
    };

    return (
        <>
            <Modal
                classNames={{
                    modal: cx('modal'),
                    content: cx('modal-content'),
                    inner: cx('modal-inner'),
                    header: cx('modal-header'),
                    body: cx('modal-body'),
                }}
                size="auto"
                opened={opened}
                onClose={close}
                title={
                    <div className={cx('modal-title')}>
                        Apply for <span className={cx('job-title')}>{title}</span>
                    </div>
                }
            >
                <div className={cx('apply-form-body')}>
                    <div className={cx('cover-letter-header', 'header')}>
                        <IconFileCvFilled className={cx('cover-letter-icon')} />
                        <p className={cx('cover-letter-title')}>Choose application for job</p>
                    </div>

                    <div className={cx('apply-form-container')}>
                        <div className={cx('apply-form')}>
                            <div className={cx('dropzone')}>
                                <Dropzone
                                    openRef={openRef}
                                    {...form.getInputProps('resume')}
                                    key={form.values.resume}
                                    onDrop={(files) => {
                                        console.log('accepted files', files[0]);

                                        form.setFieldValue('resume', files[0]);
                                    }}
                                    onReject={(files) => {
                                        console.log('rejected files', files);
                                        form.setFieldError('resume', 'File is not proper format or too big!');
                                    }}
                                    maxSize={20 * 1024 ** 2}
                                    accept={PDF_MIME_TYPE}
                                    multiple={false}
                                    classNames={{
                                        root: cx('dropzone-root'),
                                        dropzone: cx('dropzone'),
                                        input: cx('dropzone-input'),
                                    }}
                                >
                                    <Group justify="center" gap="xl" mih={220} className={cx('dropzone-content')}>
                                        <Dropzone.Accept>
                                            <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
                                        </Dropzone.Accept>
                                        <Dropzone.Reject>
                                            <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
                                        </Dropzone.Reject>
                                        <Dropzone.Idle>
                                            <IconFileTypePdf
                                                size={52}
                                                color="var(--mantine-color-dimmed)"
                                                stroke={1.5}
                                            />
                                        </Dropzone.Idle>

                                        <div>
                                            <Text size="xl" inline>
                                                Drag pdf file here or click to select files
                                            </Text>
                                            <Text size="lg" c="dimmed" inline mt={7}>
                                                Support PDF files up to 10MB
                                            </Text>
                                        </div>
                                    </Group>
                                </Dropzone>

                                {/* 👇 Phần này nằm ngoài Dropzone */}
                                <div className={cx('file')}>
                                    {form.values.resume && (
                                        <>
                                            <div className={cx('file-name')}>
                                                <IconFileText />
                                                <p className={cx('file-name-text')}>{form.values.resume?.name}</p>
                                            </div>
                                            <div
                                                className={cx('file-delete')}
                                                onClick={() => form.setFieldValue('resume', null)}
                                            >
                                                <IconTrash className={cx('file-delete-icon')} />
                                            </div>
                                        </>
                                    )}
                                    <Button className={cx('file-button')} onClick={() => openRef.current?.()}>
                                        Select CV
                                    </Button>
                                </div>
                                {form.errors.resume && <p className={cx('error-message')}>{form.errors.resume}</p>}
                            </div>

                            <p className={cx('apply-form-title')}>Please fill in your information</p>
                            <div className={cx('input-group')}>
                                <TextInput
                                    label="Full Name"
                                    required
                                    size="xl"
                                    key={form.key.fullname} // Unique key
                                    {...form.getInputProps('fullname')}
                                    placeholder="Enter your full name"
                                    classNames={{ root: cx('fullname') }}
                                />
                                <TextInput
                                    label="Email"
                                    required
                                    size="xl"
                                    key={form.key.email} // Unique key
                                    {...form.getInputProps('email')}
                                    placeholder="Enter your email here"
                                    classNames={{ root: cx('email') }}
                                />
                                <TextInput
                                    label="Phone number"
                                    required
                                    size="xl"
                                    key={form.key.phone} // Unique key
                                    {...form.getInputProps('phone')}
                                    placeholder="phone number"
                                    classNames={{ root: cx('phone') }}
                                />
                            </div>
                        </div>
                        {/* Cover letter */}
                        <div className={cx('cover-letter')}>
                            <div className={cx('cover-letter-header')}>
                                <IconFeatherFilled className={cx('cover-letter-icon')} />
                                <p className={cx('cover-letter-title')}>Cover letter:</p>
                            </div>
                            <p className={cx('cover-letter-description')}>
                                A brief, well-written cover letter will help you appear more professional and make a
                                better impression on the employer.
                            </p>
                            <Textarea
                                placeholder="Input placeholder"
                                size="lg"
                                classNames={{ input: cx('cover-letter-textarea') }}
                                {...form.getInputProps('coverLetter')}
                                key={form.key.coverLetter} // Unique key
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className={cx('apply-form-footer')}>
                    <Button black_white className={cx('btn')} onClick={close}>
                        Cancel
                    </Button>
                    <Button
                        className={cx('btn', 'apply-btn')}
                        onClick={form.onSubmit((values) => handleSubmit(values))}
                    >
                        Submit the application
                    </Button>
                </div>
            </Modal>
            <Button blue_white className={classname} onClick={handleOnClickApply}>
                Apply Now
            </Button>
        </>
    );
}

export default ApplyButton;
