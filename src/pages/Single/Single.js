import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { AiOutlineCalendar, AiOutlineMail } from 'react-icons/ai';
import { IconBuildingCommunity, IconBriefcase, IconUsersGroup, IconWorld } from '@tabler/icons-react';
import styles from './Single.module.scss';
import EmployerService from '~/services/EmployerService';

const cx = classNames.bind(styles);

export default function Single({ companyInfo: propsCompanyInfo }) {
  const [companyInfo, setCompanyInfo] = useState(propsCompanyInfo);
  const [loading, setLoading] = useState(!propsCompanyInfo);

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
            <div className={cx('companyLogo')}>
              {(companyInfo.logoUrl || companyInfo.avatarUrl) ? (
                <img
                  src={companyInfo.logoUrl || companyInfo.avatarUrl}
                  alt="Company Logo"
                  width={28}
                  height={28}
                />
              ) : (
                <div className={cx('logoPlaceholder')}>Logo</div>
              )}
            </div>
            <div className={cx('companyDetails')}>
              <div className={cx('companyName')}>
                {companyInfo.companyName || 'No company name'}
              </div>
              <div className={cx('industry')}>
                {companyInfo.organizationType || 'No organization type'}
              </div>
            </div>
          </div>
        </div>

        <div className={cx('section')}>
          <div className={cx('leftColumn')}>
            <div className={cx('infoBox')}>
              <h3 className={cx('title1')}>About Us</h3>
              <p className={cx('description')}>
                {companyInfo.description || 'No description available.'}
              </p>

              <h4 className={cx('title2')}>Company Vision</h4>
              <p className={cx('companyVision')}>
                <div dangerouslySetInnerHTML={{ __html: companyInfo.companyVision || 'No vision statement available.' }} />
              </p>

              <div className={cx('shareProfile')}>
                <button className={cx('linkButton', 'noUnderline')} aria-label="Facebook">
                  <FaFacebookF className={cx('socialIcon', 'facebook')} />
                  Facebook
                </button>
                <button className={cx('linkButton', 'noUnderline')} aria-label="Twitter">
                  <FaTwitter className={cx('socialIcon', 'twitter')} />
                  Twitter
                </button>
                <button className={cx('linkButton', 'noUnderline')} aria-label="Instagram">
                  <FaInstagram className={cx('socialIcon', 'instagram')} />
                  Instagram
                </button>
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
                  <IconBuildingCommunity className={cx('icon')} /> Organization Type
                </div>
                <div className={cx('cardValue')}>
                  {companyInfo.organizationType || 'N/A'}
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
                    aria-label="Youtube"
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
