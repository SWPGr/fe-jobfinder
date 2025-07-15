import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { AiOutlineCalendar, AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';
import { IconBuildingCommunity, IconBriefcase, IconUsersGroup, IconWorld } from '@tabler/icons-react';
import styles from './Single.module.scss';
import EmployerService from '~/services/EmployerService'; // dùng fetchSettingFake lấy profile

const cx = classNames.bind(styles);

export default function Single({ companyInfo: propsCompanyInfo }) {
  const [companyInfo, setCompanyInfo] = useState(propsCompanyInfo);

  useEffect(() => {
    if (!propsCompanyInfo) {
      const getCompanyInfo = async () => {
        try {
          let response = await EmployerService.fetchSettingFake();
          if (response?.result) response = response.result;
          if (Array.isArray(response)) response = response[0];
          setCompanyInfo(response || {});
        } catch (error) {
          console.error('Error fetching company info:', error);
        }
      };
      getCompanyInfo();
    }
  }, [propsCompanyInfo]);

  if (!companyInfo) return <div>Loading...</div>;

  // Chuẩn hóa social links thành object { facebook: url, twitter: url, ... }
  const social = {};
  if (Array.isArray(companyInfo.socialLinks)) {
    companyInfo.socialLinks.forEach(({ type, url }) => {
      social[type] = url;
    });
  }

  return (
    <div className={cx('container')}>
      <div className={cx('wrapperBox')}>
        <div className={cx('header')}>
          {/* Banner bao phủ full khung header */}
          {(companyInfo.banner || companyInfo.bannerUrl) && (
            <img
              src={companyInfo.banner || companyInfo.bannerUrl}
              alt="Company Banner"
              className={cx('bannerImage')}
            />
          )}

          <div className={cx('companyInfo')}>
            <div className={cx('companyLogo')}>
              <img
                src={companyInfo.logoUrl || companyInfo.avatarUrl}
                alt="Company Logo"
                width={28}
                height={28}
              />
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

              <h4 className={cx('title2')}>Company Benefits</h4>
              <ul className={cx('benefitsList')}>
                {companyInfo.benefits && companyInfo.benefits.length > 0 ? (
                  companyInfo.benefits.map((item, i) => <li key={i}>{item}</li>)
                ) : (
                  <li>No benefits listed.</li>
                )}
              </ul>

              <h4 className={cx('title2')}>Company Vision</h4>
              <p className={cx('companyVision')}>
                {companyInfo.vision || 'No vision statement available.'}
              </p>

              <div className={cx('shareProfile')}>
                <button className={cx('linkButton')}>
                  <FaFacebookF /> Facebook
                </button>
                <button className={cx('linkButton')}>
                  <FaTwitter /> Twitter
                </button>
                <button className={cx('linkButton')}>
                  <FaInstagram /> Instagram
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
              <div className={cx('cardRow')}>
                <div className={cx('cardLabel')}>
                  <IconBriefcase className={cx('icon')} /> Industry Type
                </div>
                <div className={cx('cardValue')}>
                  {companyInfo.industryTypes || 'N/A'}
                </div>
              </div>
            </div>

            <div className={cx('card')}>
              <h4 className={cx('cardTitle')}>Contact Information</h4>
              <div className={cx('contactRow')}>
                <IconWorld className={cx('icon')} />
                <button
                  className={cx('linkButton')}
                  onClick={() =>
                    window.open(
                      companyInfo.companyWebsite?.startsWith('http')
                        ? companyInfo.companyWebsite
                        : `https://${companyInfo.companyWebsite}`,
                      '_blank'
                    )
                  }
                >
                  <p className={cx('contactLabel')}>WEBSITE</p>
                  <p className={cx('contactLink')}>
                    {companyInfo.companyWebsite || 'N/A'}
                  </p>
                </button>
              </div>
              <div className={cx('contactRow')}>
                <AiOutlinePhone className={cx('icon')} />
                <span>
                  <p className={cx('contactLabel')}>PHONE</p>
                  {companyInfo.phone || 'N/A'}
                </span>
              </div>
              <div className={cx('contactRow')}>
                <AiOutlineMail className={cx('icon')} />
                <div>
                  <p className={cx('contactLabel')}>EMAIL ADDRESS</p>
                  {companyInfo.email ? (
                    <button
                      className={cx('linkButton')}
                      onClick={() => (window.location.href = `mailto:${companyInfo.email}`)}
                    >
                      {companyInfo.email}
                    </button>
                  ) : (
                    'N/A'
                  )}
                </div>
              </div>

              <div className={cx('followUs')}>Follow us on:</div>
              <div className={cx('socialLinks')}>
                {social.facebook && (
                  <button
                    className={cx('linkButton')}
                    onClick={() => window.open(social.facebook, '_blank')}
                    aria-label="Facebook"
                  >
                    <FaFacebookF className={cx('icon')} />
                  </button>
                )}
                {social.twitter && (
                  <button
                    className={cx('linkButton')}
                    onClick={() => window.open(social.twitter, '_blank')}
                    aria-label="Twitter"
                  >
                    <FaTwitter className={cx('icon')} />
                  </button>
                )}
                {social.instagram && (
                  <button
                    className={cx('linkButton')}
                    onClick={() => window.open(social.instagram, '_blank')}
                    aria-label="Instagram"
                  >
                    <FaInstagram className={cx('icon')} />
                  </button>
                )}
                {social.youtube && (
                  <button
                    className={cx('linkButton')}
                    onClick={() => window.open(social.youtube, '_blank')}
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
