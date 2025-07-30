import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from '../Setting.module.scss';
import JobSeekerProfileService from '~/services/JobSeekerProfileService';
import useNotification from '~/hooks/userNotification';
import { FaRegEdit } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const cx = classNames.bind(styles);

// Giả định component SaveButton (bạn cần định nghĩa riêng nếu chưa có)
const SaveButton = ({ onClick, loading }) => (
    <button className={cx('saveNextBtn')} onClick={onClick} disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
    </button>
);

function SocialLinks({ onSave }) {
    const [socialLinks, setSocialLinks] = useState([]);
    const [socialTypes, setSocialTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [userId, setUserId] = useState(null);
    const [originalLinks, setOriginalLinks] = useState([]); // Lưu trữ data gốc
    const [duplicateType, setDuplicateType] = useState(null); // Lưu socialType bị trùng
    const { showSuccess, showError, showInfo } = useNotification();

    // Fetch social types và existing social links khi component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [types, existingLinks, profile] = await Promise.all([
                    JobSeekerProfileService.getSocialTypes(),
                    JobSeekerProfileService.getMySocialLinks(),
                    JobSeekerProfileService.getProfile(),
                ]);
                setSocialTypes(types);

                // Đảm bảo lấy đúng userId từ profile
                const currentUserId = profile.id || profile.userId || profile.user?.id;
                console.log('Profile data:', profile);
                console.log('Current user ID:', currentUserId);
                setUserId(currentUserId);

                // Lưu trữ data gốc
                setOriginalLinks(existingLinks);

                // Convert existing links thành format cho form
                const formattedLinks = existingLinks.map((link, index) => ({
                    id: index + 1,
                    type: link.socialTypeName,
                    url: link.url,
                    existingId: link.id, // để track link đã tồn tại
                }));
                setSocialLinks(formattedLinks);
            } catch (err) {
                console.error('Error fetching data:', err);
                showError('Failed to load social data');
            }
        };
        fetchData();
    }, []);

    const handleSocialTypeChange = (id, value) => {
        setSocialLinks(socialLinks.map((link) => (link.id === id ? { ...link, type: value } : link)));
        setDuplicateType(null); // Reset cảnh báo khi user sửa
    };

    const handleSocialUrlChange = (id, value) => {
        setSocialLinks(socialLinks.map((link) => (link.id === id ? { ...link, url: value } : link)));
        setDuplicateType(null); // Reset cảnh báo khi user sửa
    };

    const handleRemoveSocialLink = (id) => {
        setSocialLinks(socialLinks.filter((link) => link.id !== id));
    };

    const handleAddSocialLink = () => {
        // Đếm số loại đã có (existing + new)
        const usedTypes = [
            ...socialLinks.map(l => l.type)
        ];
        const availableTypes = socialTypes.filter(type => !usedTypes.includes(type.name));
        if (availableTypes.length === 0) {
            showInfo('You have reached the maximum number of social links allowed.');
            return;
        }
        const newId = socialLinks.length + 1;
        setSocialLinks([...socialLinks, { id: newId, type: '', url: '' }]);
    };

    const handleEditSocialLink = (id) => {
        // TODO: Implement edit functionality
        showInfo('Edit functionality will be implemented later');
    };

    const handleToggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleDeleteExistingLink = async (id) => {
        try {
            // Tìm link cần xóa để lấy existingId
            const linkToDelete = socialLinks.find(link => link.id === id);
            if (!linkToDelete || !linkToDelete.existingId) {
                showError('Link not found or cannot be deleted');
                return;
            }

            // Gọi API xóa social link
            await JobSeekerProfileService.deleteSocialLink(linkToDelete.existingId);
            showSuccess(`Successfully deleted ${linkToDelete.type} link`);

            // Xóa link khỏi state
            setSocialLinks(socialLinks.filter(link => link.id !== id));

            // Refresh data để đảm bảo đồng bộ với server
            const fetchData = async () => {
                try {
                    const [types, existingLinks] = await Promise.all([
                        JobSeekerProfileService.getSocialTypes(),
                        JobSeekerProfileService.getMySocialLinks(),
                    ]);
                    setSocialTypes(types);

                    // Lưu trữ data gốc
                    setOriginalLinks(existingLinks);

                    // Convert existing links thành format cho form
                    const formattedLinks = existingLinks.map((link, index) => ({
                        id: index + 1,
                        type: link.socialTypeName,
                        url: link.url,
                        existingId: link.id,
                    }));
                    setSocialLinks(formattedLinks);
                } catch (err) {
                    showError('Failed to refresh social data after deletion');
                }
            };
            await fetchData();
        } catch (err) {
            console.error('Error deleting social link:', err);
            showError(`Failed to delete link: ${err.message || 'Unknown error'}`);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // Lọc ra những link có đủ thông tin và chưa tồn tại (không có existingId)
            const newLinks = socialLinks.filter(link =>
                link.type && link.url && !link.existingId
            );

            // Lọc ra những link đã tồn tại và có thay đổi thực sự trong edit mode
            const updatedLinks = editMode ? socialLinks.filter(link => {
                if (!link.type || !link.url || !link.existingId) return false;

                // Tìm link gốc để so sánh
                const originalLink = originalLinks.find(existing => existing.id === link.existingId);
                if (!originalLink) {
                    console.log('No original link found for:', link);
                    return false;
                }

                // Debug chi tiết
                console.log('Comparing link:', {
                    current: { type: link.type, url: link.url },
                    original: { type: originalLink.socialTypeName, url: originalLink.url },
                    hasTypeChange: link.type !== originalLink.socialTypeName,
                    hasUrlChange: link.url !== originalLink.url
                });

                // Chỉ cập nhật nếu có thay đổi thực sự
                return link.type !== originalLink.socialTypeName || link.url !== originalLink.url;
            }) : [];

            console.log('New links to create:', newLinks);
            console.log('Updated links to save:', updatedLinks);
            console.log('All social links:', socialLinks);
            console.log('Existing links:', originalLinks);

            if (newLinks.length === 0 && updatedLinks.length === 0) {
                // showInfo('No social links to save'); // Bỏ notification này
                setLoading(false);
                return;
            }

            let hasErrors = false;

            // Tạo từng social link mới
            for (const link of newLinks) {
                try {
                    // Tìm socialTypeId từ tên
                    const socialType = socialTypes.find(type => type.name === link.type);
                    if (socialType) {
                        await JobSeekerProfileService.createSocialLink(socialType.id, link.url);
                        showSuccess(`Successfully created ${link.type} link`);
                    }
                } catch (err) {
                    if (err.code === 7101) {
                        // Hiển thị message cụ thể hơn với tên social type
                        const socialTypeName = link.type;
                        showInfo(`You already have a link for ${socialTypeName}`);
                        setDuplicateType(socialTypeName); // Đánh dấu cảnh báo
                    } else {
                        showError(`Failed to create ${link.type} link: ${err.message || 'Unknown error'}`);
                    }
                    hasErrors = true;
                }
            }

            // Cập nhật từng social link đã tồn tại có thay đổi
            for (const link of updatedLinks) {
                try {
                    // Tìm socialTypeId từ tên
                    const socialType = socialTypes.find(type => type.name === link.type);
                    if (socialType) {
                        console.log('Updating social link:', {
                            socialLinkId: link.existingId,
                            socialTypeId: socialType.id,
                            url: link.url
                        });
                        await JobSeekerProfileService.updateSocialLink(link.existingId, socialType.id, link.url);
                        showSuccess(`Successfully updated ${link.type} link`);
                    }
                } catch (err) {
                    console.error('Error updating social link:', err);
                    showError(`Failed to update ${link.type} link: ${err.message || 'Unknown error'}`);
                    hasErrors = true;
                }
            }

            // Refresh data sau khi lưu
            if (!hasErrors) {
                const fetchData = async () => {
                    try {
                        const [types, existingLinks] = await Promise.all([
                            JobSeekerProfileService.getSocialTypes(),
                            JobSeekerProfileService.getMySocialLinks(),
                        ]);
                        setSocialTypes(types);

                        // Lưu trữ data gốc
                        setOriginalLinks(existingLinks);

                        // Convert existing links thành format cho form
                        const formattedLinks = existingLinks.map((link, index) => ({
                            id: index + 1,
                            type: link.socialTypeName,
                            url: link.url,
                            existingId: link.id,
                        }));
                        setSocialLinks(formattedLinks);
                        setEditMode(false); // Tắt edit mode sau khi lưu thành công
                        setDuplicateType(null); // Reset cảnh báo khi lưu thành công
                    } catch (err) {
                        showError('Failed to refresh social data');
                        hasErrors = true;
                    }
                };
                await fetchData();
            }

            if (onSave) onSave([...newLinks, ...updatedLinks]);
        } catch (err) {
            showError('Failed to save social links');
        } finally {
            setLoading(false);
        }
    };

    // Tách existing links và new links
    const existingLinks = socialLinks.filter(link => link.existingId);
    const newLinks = socialLinks.filter(link => !link.existingId);

    return (
        <div className={cx('socialLinksContainer')}>
            {/* Nếu không có social links nào, hiển thị trạng thái */}
            {existingLinks.length === 0 && newLinks.length === 0 && (
                <div style={{ color: 'red', fontSize: 14, textAlign: 'center', margin: '32px 0' }}>
                    You have not added any social links yet.
                </div>
            )}
            {/* Existing Social Links Section */}
            {existingLinks.length > 0 && (
                <>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                        gap: '10px'
                    }}>
                        <div className={cx('socialLinksTitle')}>
                            Your Current Social Links
                        </div>
                        <button
                            type="button"
                            onClick={handleToggleEditMode}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '5px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            title={editMode ? 'Cancel Edit' : 'Edit All'}
                        >
                            <FaRegEdit style={{
                                color: editMode ? '#dc3545' : '#007bff',
                                fontSize: '16px'
                            }} />
                        </button>
                    </div>
                    {existingLinks.map((link, idx) => (
                        <div key={link.id} className={cx('socialLinkRow')}>
                            <label className={cx('socialLinkLabel')}>{`Social Link ${idx + 1}`}</label>
                            <div className={cx('socialLinkInputs')}>
                                <select
                                    value={link.type}
                                    disabled={!editMode}
                                    onChange={editMode ? (e) => handleSocialTypeChange(link.id, e.target.value) : undefined}
                                    className={cx('socialSelect')}
                                    style={{
                                        appearance: editMode ? 'auto' : 'none',
                                        backgroundImage: editMode ? 'auto' : 'none'
                                    }}
                                >
                                    <option value="">Select social type...</option>
                                    {socialTypes.map((type) => (
                                        <option key={type.id} value={type.name}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    type="text"
                                    placeholder="Profile link/url..."
                                    value={link.url}
                                    disabled={!editMode}
                                    onChange={editMode ? (e) => handleSocialUrlChange(link.id, e.target.value) : undefined}
                                    className={cx('socialInput')}
                                    style={{
                                        cursor: editMode ? 'text' : 'default',
                                        backgroundColor: editMode ? 'var(--white)' : 'var(--gray-50)'
                                    }}
                                />
                            </div>
                            {duplicateType && link.type === duplicateType && (
                                <div style={{ color: 'red', fontSize: 13, marginTop: 4 }}>
                                    You already have this social link.
                                </div>
                            )}
                            {editMode && (
                                <button
                                    type="button"
                                    className={cx('deleteBtn')}
                                    onClick={() => handleDeleteExistingLink(link.id)}
                                    style={{
                                        marginTop: '4px',
                                        padding: '8px 10px',
                                        background: 'none',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        color: 'var(--gray-600)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        alignSelf: 'flex-start', // Ensure left alignment
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = 'var(--gray-800)';
                                        e.target.style.background = 'var(--gray-50)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = 'var(--gray-600)';
                                        e.target.style.background = 'none';
                                    }}
                                >
                                    <FaTrashCan /> Remove
                                </button>
                            )}
                        </div>
                    ))}
                </>
            )}

            {/* Divider */}
            {existingLinks.length > 0 && newLinks.length > 0 && (
                <div style={{
                    margin: '30px 0',
                    borderTop: '1px solid #e0e0e0',
                    paddingTop: '10px'
                }}>
                    <div className={cx('addSocialLinksTitle')}>
                        Add New Social Links
                    </div>
                </div>
            )}

            {/* New Social Links Section */}
            {newLinks.length > 0 && (
                <>
                    {existingLinks.length === 0 && (
                        <div className={cx('addSocialLinksTitle')}>
                            Add New Social Links
                        </div>
                    )}
                    {newLinks.map((link, idx) => {
                        // Lấy danh sách type đã có (trừ chính dòng này)
                        const usedTypes = [
                            ...existingLinks.map(l => l.type),
                            ...newLinks.filter((l, i) => i !== idx).map(l => l.type)
                        ];
                        const availableTypes = socialTypes.filter(type => !usedTypes.includes(type.name));
                        return (
                            <div key={link.id} className={cx('socialLinkRow')}>
                                <label className={cx('socialLinkLabel')}>{`Social Link ${existingLinks.length + idx + 1}`}</label>
                                <div className={cx('socialLinkInputs')}>
                                    <select
                                        value={link.type}
                                        onChange={(e) => handleSocialTypeChange(link.id, e.target.value)}
                                        className={cx('socialSelect')}
                                    >
                                        <option value="">Select social type...</option>
                                        {availableTypes.map((type) => (
                                            <option key={type.id} value={type.name}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Profile link/url..."
                                        value={link.url}
                                        onChange={(e) => handleSocialUrlChange(link.id, e.target.value)}
                                        className={cx('socialInput')}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className={cx('removeBtn')}
                                    onClick={() => handleRemoveSocialLink(link.id)}
                                    style={{
                                        marginTop: '0px',
                                        padding: '12px 20px',
                                        background: 'none',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                        color: 'var(--gray-600)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        alignSelf: 'flex-start', // Ensure left alignment
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.color = 'var(--gray-800)';
                                        e.target.style.background = 'var(--gray-50)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.color = 'var(--gray-600)';
                                        e.target.style.background = 'none';
                                    }}
                                >
                                    <FaTrashCan /> Remove
                                </button>
                            </div>
                        );
                    })}
                </>
            )}

            <button type="button" className={cx('addSocialBtn')} onClick={handleAddSocialLink}>
                + Add New Social Link
            </button>
            <div style={{ marginTop: 20 }}>
                <SaveButton
                    onClick={handleSave}
                    loading={loading}
                />
            </div>
        </div>
    );
}

export default SocialLinks;
