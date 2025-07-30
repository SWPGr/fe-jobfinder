import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Pagination, Text } from '@mantine/core';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { CompanyItem } from '~/components';
import { Images } from '~/assets';
import { categoryService } from '~/services';
import { useNotification } from '~/hooks';

const cx = classNames.bind(styles);

function TopCompanies() {
    const [companies, setCompanies] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const { showError } = useNotification();

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

    useEffect(() => {
        const fetchTopCompanies = async () => {
            try {
                const response = await categoryService.getTopCompanies();
                const data = response.result || response;
                console.log('Top Companies:', data);
                setCompanies(data);
            } catch (error) {
                showError('Error fetching top companies');
                console.error('Error fetching top companies:', error);
            }
        };

        fetchTopCompanies();
    }, []);

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

                <div className={cx('top-companies__list')}>
                    {currentPageItems.map((company, index) => (
                        <motion.div
                            key={company.userId || index}
                            image={Images.google_image}
                            description={company}
                            className={cx('item')}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <CompanyItem
                                image={Images.google_image}
                                description={{
                                    companyName: company.companyName,
                                    location: company.userLocation,
                                    openJobs: company.totalApplications,
                                    id: company.userId
                                }}
                                isFeatured
                                saved
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TopCompanies;
