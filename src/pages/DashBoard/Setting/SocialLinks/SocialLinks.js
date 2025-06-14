import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../Setting.module.scss';

const cx = classNames.bind(styles);

// Giả định component SaveNextButton (bạn cần định nghĩa riêng nếu chưa có)
const SaveNextButton = ({ onClick }) => (
    <button className={cx('saveNextBtn')} onClick={onClick}>
        Save & Next
    </button>
);

// Tùy chọn cho select
const socialOptions = [
    { value: 'Facebook', label: 'Facebook' },
    { value: 'Twitter', label: 'Twitter' },
    { value: 'Instagram', label: 'Instagram' },
    { value: 'YouTube', label: 'YouTube' },
];

function SocialLinks({ onSave, goToNextTab }) {
    const [socialLinks, setSocialLinks] = useState([
        { id: 1, type: 'Facebook', url: '' },
        { id: 2, type: 'Twitter', url: '' },
        { id: 3, type: 'Instagram', url: '' },
        { id: 4, type: 'YouTube', url: '' },
    ]);

    const handleSocialTypeChange = (id, value) => {
        setSocialLinks(socialLinks.map((link) => (link.id === id ? { ...link, type: value } : link)));
    };

    const handleSocialUrlChange = (id, value) => {
        setSocialLinks(socialLinks.map((link) => (link.id === id ? { ...link, url: value } : link)));
    };

    const handleRemoveSocialLink = (id) => {
        setSocialLinks(socialLinks.filter((link) => link.id !== id));
    };

    const handleAddSocialLink = () => {
        const newId = socialLinks.length + 1;
        setSocialLinks([...socialLinks, { id: newId, type: 'Facebook', url: '' }]);
    };

    const handleSave = () => {
        if (onSave) onSave(socialLinks); // Gọi callback để lưu dữ liệu nếu có
    };

    return (
        <div className={cx('socialLinksContainer')}>
            {socialLinks.map((link, idx) => (
                <div key={link.id} className={cx('socialLinkRow')}>
                    <label>{`Social Link ${idx + 1}`}</label>
                    <div className={cx('socialLinkInputs')}>
                        <select
                            value={link.type}
                            onChange={(e) => handleSocialTypeChange(link.id, e.target.value)}
                            className={cx('socialSelect')}
                        >
                            {socialOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
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
                        <button
                            type="button"
                            className={cx('removeBtn')}
                            onClick={() => handleRemoveSocialLink(link.id)}
                            aria-label={`Remove Social Link ${idx + 1}`}
                        >
                            ×
                        </button>
                    </div>
                </div>
            ))}
            <button type="button" className={cx('addSocialBtn')} onClick={handleAddSocialLink}>
                + Add New Social Link
            </button>
            <div style={{ marginTop: 20 }}>
                <SaveNextButton
                    onClick={() => {
                        handleSave();
                        if (goToNextTab) goToNextTab();
                    }}
                />
            </div>
        </div>
    );
}

export default SocialLinks;
