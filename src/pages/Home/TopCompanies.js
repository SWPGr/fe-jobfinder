import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Pagination, Text } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

import { CompanyItem } from '~/components';
import { Images } from '~/assets';

const cx = classNames.bind(styles);

const companies = [
    { companyName: 'Google asdasjd ajsdhkajd asdja skjdask djasdkjs', location: 'United States ' },
    { companyName: 'Facebook', location: 'United States' },
    { companyName: 'Amazon', location: 'United States' },
    { companyName: 'Microsoft', location: 'United States' },
    { companyName: 'Netflix', location: 'United States' },
    { companyName: 'Airbnb', location: 'United States' },
    { companyName: 'Tesla', location: 'United States' },
    { companyName: 'Spotify', location: 'Sweden' },
    { companyName: 'Dropbox', location: 'United States' },
    { companyName: 'Salesforce', location: 'United States' },
    { companyName: 'Intel', location: 'United States' },
    { companyName: 'IBM', location: 'United States' },
    { companyName: 'Adobe', location: 'United States' },
    { companyName: 'Alibaba', location: 'China' },
    { companyName: 'Tencent', location: 'China' },
];

function TopCompanies() {
    const [activePage, setActivePage] = useState(1);

    const pageSize = 8;
    const total = companies.length;
    const totalPages = Math.ceil(total / pageSize);

    const startIndex = (activePage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const currentPageItems = companies.slice(startIndex, endIndex);
    const message = `Showing ${pageSize * (activePage - 1) + 1} – ${Math.min(
        total,
        pageSize * activePage,
    )} of ${total}`;

    return (
        <div className={cx('top-companies__wrapper')}>
            <div className={cx('top-companies__container')}>
                <div className={cx('top-companies__title')}>
                    <h1>Top Companies</h1>
                    <div className={cx('pagination')}>
                        <Text classNames={{ root: cx('top-companies__message') }}>{message}</Text>
                        <Pagination
                            total={totalPages}
                            value={activePage}
                            onChange={(page) => setActivePage(page)}
                            withPages={false}
                            nextIcon={IconArrowRight}
                            previousIcon={IconArrowLeft}
                            classNames={{ control: cx('top-companies__pagination') }}
                        />
                    </div>
                </div>
                {/*  */}
                <div className={cx('top-companies__list')}>
                    {currentPageItems.map((company, index) => (
                        <CompanyItem
                            key={index}
                            image={Images.google_image}
                            description={company}
                            isFeatured
                            saved
                            className={cx('item')}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TopCompanies;
