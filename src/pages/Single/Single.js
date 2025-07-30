import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { AiOutlineCalendar, AiOutlineMail } from 'react-icons/ai';
import { IconUsersGroup, IconWorld } from '@tabler/icons-react';
import styles from './Single.module.scss';
import EmployerService from '~/services/EmployerService';
import { BadgeCheck } from 'lucide-react';

const cx = classNames.bind(styles);

export default function Single({ companyInfo: propsCompanyInfo }) {
  const [companyInfo, setCompanyInfo] = useState(propsCompanyInfo);
  const [loading, setLoading] = useState(!propsCompanyInfo);
  const [isImageOpen, setIsImageOpen] = useState(false); // State to handle image click
  const [selectedImage, setSelectedImage] = useState(''); // State to store the selected image

  useEffect(() => {
    let isMounted = true;
    if (!propsCompanyInfo) {
      const getCompanyInfo = async () => {
        try {
          setLoading(true);
          let response = await EmployerService.fetchSettingFake();
          if (response?.result) response = response.result;
          if (Array.isArray(response)) response = response[0];
          if (isMounted) {
            setCompanyInfo(response || {});
          }
        } catch (error) {
          console.error('Error fetching company info:', error);
        } finally {
          if (isMounted) setLoading(false);
        }
      };
      getCompanyInfo();
    }
    return () => {
      isMounted = false;
    };
  }, [propsCompanyInfo]);

  if (loading) return <div className={cx('loading')}>Loading company info...</div>;
  if (!companyInfo) return <div className={cx('error')}>Company info not available.</div>;

  const social = {};
  if (Array.isArray(companyInfo.socialLinks)) {
    companyInfo.socialLinks.forEach(({ type, url }) => {
      if (type && url) social[type.toLowerCase()] = url;
    });
  }

  const openLink = (url) => {
    if (!url) return;
    const link = url.startsWith('http') ? url : `https://${url}`;
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  // Handle click on avatar to open large image
  const handleAvatarClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsImageOpen(true);
  };

  // Handle closing the large image view
  const handleCloseImage = () => {
    setIsImageOpen(false);
    setSelectedImage('');
  };

  return (
    <div className={cx('container')}>
      <div className={cx('wrapperBox')}>
        <div className={cx('header')}>
          {(companyInfo.banner || companyInfo.bannerUrl) ? (
            <img
              src={companyInfo.banner || companyInfo.bannerUrl}
              alt="Company Banner"
              className={cx('bannerImage')}
            />
          ) : (
            <div className={cx('bannerPlaceholder')}>No Banner Available</div>
          )}

          <div className={cx('companyInfo')}>
            <div
              className={cx('companyLogo')}
              onClick={() => handleAvatarClick(companyInfo.logoUrl || companyInfo.avatarUrl)} // Open large image on avatar click
            >
              {(companyInfo.logoUrl || companyInfo.avatarUrl) ? (
                <img
                  src={companyInfo.logoUrl || companyInfo.avatarUrl}
                  alt="Company Logo"
                  width={28}
                  height={28}
                  className={cx('logo')}
                />
              ) : (
                <div className={cx('logoPlaceholder')}>Logo</div>
              )}
            </div>
            <div className={cx('companyDetails')}>
              <div className={cx('companyName')}>
                {companyInfo.companyName || 'No company name'}
              </div>
            </div>
          </div>
        </div>

        {/* Image view modal */}
        {isImageOpen && (
          <div className={cx('imageModal')}>
            <div className={cx('overlay')} onClick={handleCloseImage}></div>
            <div className={cx('modalContent')}>
              <img src={selectedImage} alt="Company Logo" className={cx('modalImage')} />
              <button className={cx('closeBtn')} onClick={handleCloseImage}>X</button>
            </div>
          </div>
        )}

        <div className={cx('section')}>
          <div className={cx('leftColumn')}>
            <div className={cx('infoBox')}>
              <h3 className={cx('title1')}>About Us</h3>
              <div
                className={cx('description')}
                dangerouslySetInnerHTML={{ __html: companyInfo.description || 'No description available.' }}
              />

              <h4 className={cx('title2')}>Company Vision</h4>
              <div className={cx('companyVision')}>
                <div dangerouslySetInnerHTML={{ __html: companyInfo.companyVision || 'No vision statement available.' }} />
              </div>
            </div>
          </div>

          <div className={cx('rightColumn')}>
            <div className={cx('card')}>
              <div className={cx('cardRow')}>
                <div className={cx('cardLabel')}>
                  <AiOutlineCalendar className={cx('icon')} /> Founded
                </div>
                <div className={cx('cardValue')}>
                  {companyInfo.yearOfEstablishment || 'N/A'}
                </div>
              </div>

              <div className={cx('cardRow')}>
                <div className={cx('cardLabel')}>
                  <IconUsersGroup className={cx('icon')} /> Team Size
                </div>
                <div className={cx('cardValue')}>{companyInfo.teamSize || 'N/A'}</div>
              </div>
            </div>

            <div className={cx('card')}>
              <h4 className={cx('cardTitle')}>Contact Information</h4>
              <div className={cx('contactRow')}>
                <IconWorld className={cx('contactIcon')} />
                <button
                  className={cx('linkButton', 'noUnderline', 'websiteButton')}
                  onClick={() => openLink(companyInfo.companyWebsite)}
                >
                  <span className={cx('contactLabel')}>WEBSITE:</span>
                  <span className={cx('contactLink')}>
                    {companyInfo.website || 'N/A'}
                  </span>
                </button>
              </div>

              <div className={cx('contactRow')}>
                <AiOutlineMail className={cx('contactIcon')} />
                <button
                  className={cx('linkButton', 'noUnderline', 'emailButton')}
                  onClick={() => (window.location.href = `mailto:${companyInfo.email}`)}
                >
                  <span className={cx('contactLabel')}>EMAIL:</span>
                  <span className={cx('contactLink')}>
                    {companyInfo.email || 'N/A'}
                  </span>
                </button>
              </div>

              <div className={cx('socialLinks')}>
                {social.facebook && (
                  <button
                    className={cx('linkButton', 'noUnderline')}
                    onClick={() => openLink(social.facebook)}
                    aria-label="Facebook"
                  >
                    <FaFacebookF className={cx('icon')} />
                  </button>
                )}
                {social.twitter && (
                  <button
                    className={cx('linkButton', 'noUnderline')}
                    onClick={() => openLink(social.twitter)}
                    aria-label="Twitter"
                  >
                    <FaTwitter className={cx('icon')} />
                  </button>
                )}
                {social.instagram && (
                  <button
                    className={cx('linkButton', 'noUnderline')}
                    onClick={() => openLink(social.instagram)}
                    aria-label="Instagram"
                  >
                    <FaInstagram className={cx('icon')} />
                  </button>
                )}
                {social.youtube && (
                  <button
                    className={cx('linkButton', 'noUnderline')}
                    onClick={() => openLink(social.youtube)}
                    aria-label="YouTube"
                  >
                    <FaYoutube className={cx('icon')} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
