import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { AiOutlineCalendar, AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';
import { IconBuildingCommunity, IconBriefcase, IconUsersGroup, IconWorld } from '@tabler/icons-react';
import styles from './Single.module.scss';
import EmployerService from '~/services/EmployerService'; // Import EmployerService để sử dụng fetchEmployerProfileFake

const cx = classNames.bind(styles);

export default function Single({ companyInfo: propsCompanyInfo }) {
  const [companyInfo, setCompanyInfo] = useState(propsCompanyInfo);

  useEffect(() => {
    if (!propsCompanyInfo) {
      const getCompanyInfo = async () => {
        try {
          // Gọi fetchEmployerProfileFake từ EmployerService
          const response = await EmployerService.fetchEmployerProfileFake();
          setCompanyInfo(response || {});  // Cập nhật lại dữ liệu công ty
        } catch (error) {
          console.error('Error fetching company info:', error);
        }
      };

      getCompanyInfo();  // Gọi hàm lấy thông tin công ty nếu không có props
    }
  }, [propsCompanyInfo]);  // Chạy lại khi propsCompanyInfo thay đổi

  if (!companyInfo) {
    return <div>Loading...</div>;  // Hiển thị Loading nếu chưa có dữ liệu
  }

  return (
    <div className={cx('container')}>
      <div className={cx('wrapperBox')}>
        <div className={cx('header')} style={{ position: 'relative' }}>
          <div className={cx('companyInfo')}>
            <div className={cx('companyLogo')}>
              <img src={companyInfo.avatarUrl} alt="Company Logo" width={28} height={28} />
            </div>
            <div className={cx('companyDetails')}>
              <div className={cx('companyName')}>{companyInfo.companyName}</div>
              <div className={cx('industry')}>{companyInfo.organizationType}</div>
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              right: '1rem',
              width: '40px',
              height: '40px',
              color: '#E4405F', // Màu Instagram
            }}
          >
            <FaInstagram size={40} />
          </div>
        </div>

        <div className={cx('section')}>
          <div className={cx('leftColumn')}>
            <h3 className={cx('title1')}>About Us</h3>
            <p className={cx('description')}>{companyInfo.description}</p>

            <h4 className={cx('title2')}>Company Benefits</h4>
            <ul className={cx('benefitsList')}>
              {companyInfo.benefits?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h4 className={cx('title2')}>Company Vision</h4>
            <p className={cx('companyVision')}>{companyInfo.vision}</p>
            <div className={cx('shareProfile')}>
              <button className={cx('linkButton')}>
                <FaFacebookF /> Facebook
              </button>
              <button className={cx('linkButton')}>
                <FaTwitter /> Twitter
              </button>
              <button className={cx('linkButton')}>
                <FaInstagram /> Pinterest
              </button>
            </div>
          </div>

          <div className={cx('rightColumn')}>
            <div className={cx('card')}>
              <div className={cx('cardRow')}>
                <div className={cx('cardLabel')}>
                  <AiOutlineCalendar className={cx('icon')} /> Founded
                </div>
                <div className={cx('cardValue')}>{companyInfo.yearOfEstablishment}</div>
              </div>
              <div className={cx('cardRow')}>
                <div className={cx('cardLabel')}>
                  <IconBuildingCommunity className={cx('icon')} /> Organization Type
                </div>
                <div className={cx('cardValue')}>{companyInfo.organizationType}</div>
              </div>
              <div className={cx('cardRow')}>
                <div className={cx('cardLabel')}>
                  <IconUsersGroup className={cx('icon')} />
                  Team Size
                </div>
                <div className={cx('cardValue')}>{companyInfo.teamSize}</div>
              </div>
              <div className={cx('cardRow')}>
                <div className={cx('cardLabel')}>
                  <IconBriefcase className={cx('icon')} />
                  Industry Type
                </div>
                <div className={cx('cardValue')}>{companyInfo.industry}</div>
              </div>
            </div>

            <div className={cx('card')}>
              <h4 className={cx('cardTitle')}>Contact Information</h4>
              <div className={cx('contactRow')}>
                <IconWorld className={cx('icon')} />
                <button
                  className={cx('linkButton')}
                  onClick={() => window.open(`https://${companyInfo.website}`, '_blank')}
                >
                  <p className={cx('contactLabel')}>WEBSITE</p>
                  <p className={cx('contactLink')}>{companyInfo.website}</p>
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
                  <button
                    className={cx('linkButton')}
                    onClick={() => window.location.href = `mailto:${companyInfo.email}`}
                  >
                    {companyInfo.email}
                  </button>
                </div>
              </div>
              <div className={cx('followUs')}>Follow us on:</div>
              <div className={cx('socialLinks')}>
                <button
                  className={cx('linkButton')}
                  onClick={() => window.open(companyInfo.social?.facebook, '_blank')}
                >
                  <FaFacebookF className={cx('icon')} />
                </button>
                <button
                  className={cx('linkButton')}
                  onClick={() => window.open(companyInfo.social?.twitter, '_blank')}
                >
                  <FaTwitter className={cx('icon')} />
                </button>
                <button
                  className={cx('linkButton')}
                  onClick={() => window.open(companyInfo.social?.instagram, '_blank')}
                >
                  <FaInstagram className={cx('icon')} />
                </button>
                <button
                  className={cx('linkButton')}
                  onClick={() => window.open(companyInfo.social?.youtube, '_blank')}
                >
                  <FaYoutube className={cx('icon')} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
