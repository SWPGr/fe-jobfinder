import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Pagination, Text } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { CompanyItem } from '~/components';
import { Images } from '~/assets';

const cx = classNames.bind(styles);

const companies = [
    { company_name: 'Google asdasjd ajsdhkajd asdja skjdask djasdkjs', location: 'United States ' },
    { company_name: 'Facebook', location: 'United States' },
    { company_name: 'Amazon', location: 'United States' },
    { company_name: 'Microsoft', location: 'United States' },
    { company_name: 'Netflix', location: 'United States' },
    { company_name: 'Airbnb', location: 'United States' },
    { company_name: 'Tesla', location: 'United States' },
    { company_name: 'Spotify', location: 'Sweden' },
    { company_name: 'Dropbox', location: 'United States' },
    { company_name: 'Salesforce', location: 'United States' },
    { company_name: 'Intel', location: 'United States' },
    { company_name: 'IBM', location: 'United States' },
    { company_name: 'Adobe', location: 'United States' },
    { company_name: 'Alibaba', location: 'China' },
    { company_name: 'Tencent', location: 'China' },
];

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A component that displays a list of companies in a pagination layout.
 *
 * @returns {React.ReactElement} A React component that renders a list of companies in a pagination layout.
 */
/*******  49c283de-0a70-475b-959e-d1cef89cc028  *******/ function TopCompanies() {
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
                        <motion.div
                            key={index}
                            image={Images.google_image}
                            description={company}
                            isFeatured
                            saved
                            className={cx('item')}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <CompanyItem image={Images.google_image} company_description={company} isFeatured saved />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TopCompanies;
