import React from 'react';
import styles from './Single.module.scss';
import classNames from 'classnames/bind';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { AiOutlineCalendar, AiOutlineLink, AiOutlinePhone, AiOutlineMail } from 'react-icons/ai';
import { IconBuildingCommunity, IconBriefcase, IconUsersGroup, IconWorld } from '@tabler/icons-react';

const cx = classNames.bind(styles);

const companyInfo = {
    name: 'Twitter',
    industry: 'Information Technology (IT)',
    description: `Fusce et erat in nibh maximus fermentum. Mauris ac justo nibh. Praesent nec lorem lorem. Donec ullamcorper lacus mollis tortor pretium malesuada. In quis porta nisl, quis fringilla orci. Donec quis orci, iaculis et rutrum dolor, ultricies purus erat. Etiam vulputate quam mi et felis. Sed ut posuere risus, vitae commodo erat. Nullam in lorem dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla tincidunt ac quam eu vehicula. Quisque suscipit elementum neque. Vivamus elementum ex nec orci gravida. Sed dignissim placerat donec, ac laoreet eros rutrum sit amet. Donec imperdiet in leo at imperdiet. In hac habitasse platea dictumst. Sed quis nisi molestie diam ullamcorper condimentum. Sed aliquet, orci eget rutrum bibendum, odio enim rutrum arcu, quis suscipit mauris turpis in neque. Vestibulum id vestibulum odio. Sed dolor felis, iaculis eget turpis eu, lobortis imperdiet massa.`,
    benefits: [
        'In hac habitasse platea dictumst.',
        'Sed aliquet, orci eget rutrum bibendum, odio enim rutrum arcu.',
        'Vestibulum id vestibulum odio.',
        'Etiam lorem ante accumsan id iaculis venenatis mollis vulputate nefft.',
        'Nam condimentum sit amet ipsum in malesuada.',
    ],
    vision: `Praesent ultrices mauris et nisl ultricies, et venenatis augue blandit. Etiam massa risus, accumsan nec tempus nec, venenatis in nisi. Maecenas nulla ex, blandit in magna id, pellentesque facilisis sapien. In feugiat auctor mi, eget commodo lectus convallis ac.`,
    contact: {
        website: 'www.estherhoward.com',
        phone: '+1-202-555-0141',
        email: 'esther.howard@gmail.com',
    },
    details: {
        date: '14 June, 2021',
        type: 'Private Company',
        vacancies: '120-300 Candidates',
        industry: 'Technology',
    },
    social: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        youtube: '#',
    },
};

export default function Single() {
    return (
        <div className={cx('container')}>
            <div className={cx('wrapperBox')}>
                {/* Header */}
                <div className={cx('header')} style={{ position: 'relative' }}>
                    <div className={cx('companyInfo')}>
                        <div className={cx('companyLogo')}>
                            <FaInstagram size={28} />
                        </div>
                        <div className={cx('companyDetails')}>
                            <div className={cx('companyName')}>{companyInfo.name}</div>
                            <div className={cx('industry')}>{companyInfo.industry}</div>
                        </div>
                    </div>

                    {/* Icon Instagram góc dưới bên phải */}
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '1rem',
                            right: '1rem',
                            width: '40px',
                            height: '40px',
                            color: '#E4405F', // màu Instagram
                        }}
                    >
                        <FaInstagram size={40} />
                    </div>
                </div>

                {/* Main Section */}
                <div className={cx('section')}>
                    {/* Left Column */}
                    <div className={cx('leftColumn')}>
                        <h3 className={cx('title1')}>Description</h3>
                        <p className={cx('description')}>{companyInfo.description}</p>

                        <h4 className={cx('title2')}>Company Benefits</h4>
                        <ul className={cx('benefitsList')}>
                            {companyInfo.benefits.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>

                        <h4 className={cx('title2')}>Company Vision</h4>
                        <p className={cx('companyVision')}>{companyInfo.vision}</p>
                        <div className={cx('shareProfile')}>
                            <button>
                                <FaFacebookF /> Facebook
                            </button>
                            <button>
                                <FaTwitter /> Twitter
                            </button>
                            <button>
                                <FaInstagram /> Pinterest
                            </button>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className={cx('rightColumn')}>
                        <div className={cx('card')}>
                            <div className={cx('cardRow')}>
                                <div className={cx('cardLabel')}>
                                    <AiOutlineCalendar className={cx('icon')} /> Founded
                                </div>
                                <div className={cx('cardValue')}>{companyInfo.details.date}</div>
                            </div>
                            <div className={cx('cardRow')}>
                                <div className={cx('cardLabel')}>
                                    <IconBuildingCommunity className={cx('icon')} /> Organization Type
                                </div>
                                <div className={cx('cardValue')}>{companyInfo.details.type}</div>
                            </div>
                            <div className={cx('cardRow')}>
                                <div className={cx('cardLabel')}>
                                    <IconUsersGroup className={cx('icon')} />
                                    Team Size
                                </div>
                                <div className={cx('cardValue')}>{companyInfo.details.vacancies}</div>
                            </div>
                            <div className={cx('cardRow')}>
                                <div className={cx('cardLabel')}>
                                    <IconBriefcase className={cx('icon')} />
                                    Industry Type
                                </div>
                                <div className={cx('cardValue')}>{companyInfo.details.industry}</div>
                            </div>
                        </div>

                        <div className={cx('card')}>
                            <h4 className={cx('cardTitle')}>Contact Information</h4>
                            <div className={cx('contactRow')}>
                                <IconWorld className={cx('icon')} />
                                <a href={`https://${companyInfo.contact.website}`} target="_blank" rel="noreferrer">
                                    <p className={cx('contactLabel')}>WEBSITE</p>
                                    <p className={cx('contactLink')}>{companyInfo.contact.website}</p>
                                </a>
                            </div>
                            <div className={cx('contactRow')}>
                                <AiOutlinePhone className={cx('icon')} />
                                <span>
                                    <p className={cx('contactLabel')}>PHONE</p>
                                    {companyInfo.contact.phone}
                                </span>
                            </div>
                            <div className={cx('contactRow')}>
                                <AiOutlineMail className={cx('icon')} />
                                <p href={`mailto:${companyInfo.contact.email}`}>
                                    <p className={cx('contactLabel')}>EMAIL ADDRESS</p>
                                    {companyInfo.contact.email}
                                </p>
                            </div>
                            <div className={cx('followUs')}>Follow us on:</div>
                            <div className={cx('socialLinks')}>
                                <a href={companyInfo.social.facebook} className={cx('socialLink')}>
                                    <FaFacebookF className={cx('icon')} />
                                </a>
                                <a href={companyInfo.social.twitter} className={cx('socialLink')}>
                                    <FaTwitter className={cx('icon')} />
                                </a>
                                <a href={companyInfo.social.instagram} className={cx('socialLink')}>
                                    <FaInstagram className={cx('icon')} />
                                </a>
                                <a href={companyInfo.social.youtube} className={cx('socialLink')}>
                                    <FaYoutube className={cx('icon')} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Main Section */}
            </div>
            <div className={cx('openings')}></div>
        </div>
    );
}
