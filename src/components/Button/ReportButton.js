import { useEffect, useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useParams } from 'react-router-dom';
import { useNotification } from '~/hooks';
import { TextInput, Select, Textarea } from '@mantine/core';
import classNames from 'classnames/bind';
import styles from './ReportButton.module.scss';

import { reportService } from '~/services';

const cx = classNames.bind(styles);


function ReportButton() {
    const [opened, { open, close }] = useDisclosure(false);
    const { showError, showSuccess } = useNotification();
    const [loading, setLoading] = useState(false);
    const [reportTypes, setReportTypes] = useState([]);
    const { id } = useParams();
    const form = useForm({
        initialValues: {
            jobId: id,
            reportTypeId: '',
            subject: '',
            content: '',
        },
        validate: {
            reportTypeId: (value) => (value ? null : 'Please select a report type'),
            subject: (value) => (value ? null : 'Subject is required'),
            content: (value) => (value ? null : 'Content is required'),
        },
    })

    useEffect(() => {
        const fetchReportTypes = async () => {
            try {
                const response = await reportService.getAllReportTypes();
                setReportTypes(response);
                console.log(response);
            } catch (error) {
                console.error('Error fetching report types:', error);
            }
        }
        if (opened) { fetchReportTypes(); }

    }, [opened]);



    useEffect(() => {
        form.setValues({
            reportTypeId: '',
            subject: '',
            content: '',
        });
    }, [opened, form]);

    if (!id) {
        showError('Job id is missing');
        return null;
    }

    const handleSubmitForm = async (values) => {
        try {
            setLoading(true);
            await reportService.createReport(values);
            showSuccess('Report job successfully');
            setLoading(false);
            close();
        } catch (error) {
            setLoading(false);
            showError('Report job failed');
        }
    }
    return (
        <div className={cx('wrapper')}>
            <Modal size={'lg'} opened={opened} onClose={close} title="Report" classNames={{ title: cx('title') }}>
                <form className={cx('form')} onSubmit={form.onSubmit((values) => handleSubmitForm(values))}>
                    <Select {...form.getInputProps('reportTypeId')} label="Choose your report type" placeholder='Select report type' size='lg' data={reportTypes.map((option) => ({ value: option.id + '', label: option.name }))} error={!!form.errors.reportTypeId} classNames={{ error: cx('hidden-error') }} // ẩn dòng báo lỗi
                    />
                    <TextInput
                        {...form.getInputProps('subject')}
                        label="Subject" placeholder="Input component" size='lg' error={!!form.errors.subject} classNames={{ error: cx('hidden-error') }} // ẩn dòng báo lỗi
                    />
                    <Textarea {...form.getInputProps('content')} label="Content" placeholder="Input component" size='lg' error={!!form.errors.content} classNames={{ error: cx('hidden-error') }} // ẩn dòng báo lỗi
                    />

                    {/* Submit button */}
                    <div className={cx('btn-submit')}>
                        <Button type="submit" size='md' className={cx('submit')} loading={loading}>
                            Submit
                        </Button>
                    </div>
                </form>
            </Modal>

            <Button variant="outline" size="lg" color='red' onClick={open}>
                Report
            </Button>
        </div>
    );
}

export default ReportButton;