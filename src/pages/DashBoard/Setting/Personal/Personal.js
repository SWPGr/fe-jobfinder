import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Setting.module.scss';
import { Modal, TextInput, Button, Group, Text, Image } from '@mantine/core';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';

const cx = classNames.bind(styles);

function Personal() {
    const [modalOpened, setModalOpened] = useState(false);
    const [imageName, setImageName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState('');

    const handleImageChange = (files) => {
        if (!files || files.length === 0) {
            setImageFile(null);
            setImagePreview(null);
            return;
        }
        const file = files[0];
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleAddImage = () => {
        setError('');
        if (!imageName.trim()) {
            setError('Please enter image name.');
            return;
        }
        if (!imageFile) {
            setError('Please select an image file.');
            return;
        }

        alert(`Added image: ${imageName} with file: ${imageFile.name}`);
        setModalOpened(false);
    };

    return (
        <div className={cx('setting-content')}>
            <h2>Personal</h2>
            <section className={cx('basic-info')}>
                <h3>Basic Information</h3>
                <div className={cx('form-row')}>
                    <div
                        className={cx('profile-pic')}
                        onClick={() => setModalOpened(true)}
                        style={{ cursor: 'pointer' }}
                    >
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Profile"
                                style={{ width: 160, height: 160, objectFit: 'cover', borderRadius: 8 }}
                            />
                        ) : (
                            <>
                                <div className={cx('upload-icon')}>＋</div>
                                <p>Add Image</p>
                                <small>Browse image or drop here. Only png, jpg, jpeg</small>
                            </>
                        )}
                    </div>
                    <div className={cx('fields')}>
                        <input type="text" placeholder="Full name" />
                        <input type="text" placeholder="Title/Headline" />
                        <select>
                            <option value="">Select Experience</option>
                            <option value="1">1 year</option>
                            <option value="2">2 years</option>
                            <option value="3">3 years</option>
                        </select>
                        <select>
                            <option value="">Select Education</option>
                            <option value="bachelor">Bachelor</option>
                            <option value="master">Master</option>
                        </select>
                        <input type="text" placeholder="Personal Website" />
                    </div>
                </div>
                <button className={cx('save-btn')}>Save Changes</button>
            </section>

            <Modal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                title="Add Image"
                centered
                overlayBlur={3}
                overlayOpacity={0.55}
                closeButtonLabel="Close modal"
                size="sm"
            >
                <TextInput
                    label="Image Name"
                    placeholder="Enter image name"
                    value={imageName}
                    onChange={(event) => setImageName(event.currentTarget.value)}
                    mb="md"
                    required
                    error={error && !imageName.trim() ? error : null}
                />
                {imagePreview ? (
                    <Image
                        src={imagePreview}
                        alt="Preview"
                        radius="md"
                        mb="md"
                        style={{ maxHeight: 200, objectFit: 'contain', width: '100%' }}
                        withPlaceholder
                        onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                            setError('');
                        }}
                        sx={{ cursor: 'pointer' }}
                    />
                ) : (
                    <Dropzone
                        onDrop={handleImageChange}
                        onReject={() => setError('File type not accepted')}
                        maxSize={12 * 1024 ** 2}
                        accept={IMAGE_MIME_TYPE}
                        multiple={false}
                        styles={(theme) => ({
                            root: {
                                border: `2px dashed ${theme.colors.blue[6]}`,
                                borderRadius: theme.radius.md,
                                padding: theme.spacing.xl,
                                transition: 'border-color 150ms ease, background-color 150ms ease',
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: theme.colors.blue[0],
                                    borderColor: theme.colors.blue[7],
                                },
                            },
                            inner: {
                                minHeight: 140,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: theme.spacing.sm,
                            },
                            icon: {
                                width: 48,
                                height: 48,
                            },
                        })}
                    >
                        {(status) => (
                            <>
                                {status.accepted ? (
                                    <IconUpload size={48} color="#1c7ed6" />
                                ) : status.rejected ? (
                                    <IconX size={48} color="#fa5252" />
                                ) : (
                                    <IconPhoto size={48} color="#868e96" />
                                )}
                                <Text size="md" color="dimmed" align="center">
                                    Drag image here or click to select (PNG, JPG, JPEG). Max 12 MB.
                                </Text>
                            </>
                        )}
                    </Dropzone>
                )}
                <Text size="sm" color="red" mt="sm" mb="md">
                    {error}
                </Text>
                <Group position="right" spacing="md">
                    <Button variant="outline" onClick={() => setModalOpened(false)}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAddImage}
                        color="blue"
                        radius="md"
                        disabled={!imageFile || !imageName.trim()}
                    >
                        Add Image
                    </Button>
                </Group>
            </Modal>

            <section className={cx('cv-section')}>
                <h3>Your CV/Resume</h3>
                <div className={cx('cv-list')}>
                    <div className={cx('cv-item')}>
                        <span className={cx('cv-icon')}>📄</span>
                        <p className={cx('cv-title')}>Professional Resume</p>
                        <p className={cx('cv-size')}>3.5 MB</p>
                        <div className={cx('cv-actions')}>
                            <button>Edit Resume</button>
                            <button>Delete</button>
                        </div>
                    </div>
                    <div className={cx('cv-item')}>
                        <span className={cx('cv-icon')}>📄</span>
                        <p className={cx('cv-title')}>Product Designer</p>
                        <p className={cx('cv-size')}>4.7 MB</p>
                        <div className={cx('cv-actions')}>
                            <button>Edit Resume</button>
                            <button>Delete</button>
                        </div>
                    </div>
                    <div className={cx('cv-item')}>
                        <span className={cx('cv-icon')}>📄</span>
                        <p className={cx('cv-title')}>Visual Designer</p>
                        <p className={cx('cv-size')}>1.3 MB</p>
                        <div className={cx('cv-actions')}>
                            <button>Edit Resume</button>
                            <button>Delete</button>
                        </div>
                    </div>
                    <div className={cx('cv-add')}>
                        <span className={cx('cv-add-icon')}>＋</span>
                        <p>Add CV/Resume</p>
                        <small>Browse file or drop here. Only pdf</small>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Personal;
