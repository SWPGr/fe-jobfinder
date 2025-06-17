import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import Term from '~/pages/Term/Term';
import {
    IconBrandFacebookFilled,
    IconBrandYoutubeFilled,
    IconBrandInstagram,
    IconBrandTwitterFilled,
} from '@tabler/icons-react';

import { Images } from '~/assets';

const cx = classNames.bind(styles);

function Footer({ dark }) {
    const list = [
        {
            title: 'Quick Link',
            items: [
                ['Home', '/'],
                ['About', '/about'],
                ['Contact', '/contact'],
                ['Pricing', '/pricing'],
                ['Blog', '/blog'],
            ],
        },
        {
            title: 'Candidate',
            items: [
                ['Browse Jobs', '/jobs'],
                ['Browse Employers', '/employers'],
                ['Candidate Dashboard', '/candidate-dashboard'],
                ['Saved Jobs', '/saved-jobs'],
            ],
        },
        {
            title: 'Employer',
            items: [
                ['Post a Job', '/post-job'],
                ['Browse Candidates', '/candidates'],
                ['Employer Dashboard', '/employer-dashboard'],
                ['Applications', '/applications'],
            ],
        },
        {
            title: 'Support',
            items: [
                ['Help Center', '/help'],
                ['Privacy Policy', '/privacy'],
                ['Terms of Use', '/term'],
                ['Contact Us', '/contact'],
            ],
        },
    ];

    const classes = cx('footer__wrapper', { dark });

    return (
        <div className={classes}>
            {/* TOP */}
            <div className={cx('footer__top')}>
                <div className={cx('footer__top-container')}>
                    <div className={cx('footer__top-left')}>
                        <div className={cx('logo')}>
                            <img src={Images.logo} alt="logo" />
                            <h1>JobFinder</h1>
                        </div>
                        <div className={cx('contact_info')}>
                            <span className={cx('contact_phone')}>
                                Call now: <p>+1 234 567 890</p>
                            </span>
                            <p className={cx('address')}>
                                6391 Elgin St. Celina, Delaware 10299, New York, United States of America
                            </p>
                        </div>
                    </div>
                    <div className={cx('footer__top-right')}>
                        {list.map((item, index) => (
                            <div className={cx('footer__top-right-items')} key={index}>
                                <h3>{item.title}</h3>
                                <div className={cx('items')}>
                                    {item.items.map((subItem, subIndex) => (
                                        Array.isArray(subItem) ? (
                                            <Link to={subItem[1]} className={cx('item', 'link')} key={subIndex}>
                                                {subItem[0]}
                                            </Link>
                                        ) : (
                                            <p className={cx('item')} key={subIndex}>
                                                {subItem}
                                            </p>
                                        )
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* BOTTOM */}
            <div className={cx('footer__bottom')}>
                <div className={cx('footer__bottom-container')}>
                    <div className={cx('footer__bottom-left')}>
                        <p>© 2025 JobFinder. All rights reserved.</p>
                    </div>
                    <div className={cx('footer__bottom-right')}>
                        <IconBrandFacebookFilled />
                        <IconBrandYoutubeFilled />
                        <IconBrandInstagram />
                        <IconBrandTwitterFilled />
                    </div>
                </div>
            </div>
            {/* BOTTOM */}
        </div>
    );
}

export default Footer;
