import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { IconArrowRight } from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';
import { motion } from 'framer-motion';
import { Button } from '~/components';
import ItemInfo from '../components/ItemInfo';
import { categoryService } from '~/services';
import { useNotification } from '~/hooks';

const cx = classNames.bind(styles);

// const mockData = [
//     { id: 11, name: 'Business Analysis' },
//     { id: 15, name: 'Cloud Computing' },
//     { id: 10, name: 'Content Writing' },
//     { id: 7, name: 'Customer Service' },
//     { id: 14, name: 'Cybersecurity' },
//     { id: 5, name: 'Data Science' },
//     { id: 13, name: 'DevOps' },
//     { id: 4, name: 'Finance' },
//     { id: 9, name: 'Graphic Design' },
//     { id: 20, name: 'Healthcare' },
//     { id: 3, name: 'Human Resources' },
//     { id: 19, name: 'Legal' },
//     { id: 2, name: 'Marketing' },
//     { id: 16, name: 'Network Administration' },
//     { id: 21, name: 'Other' },
//     { id: 18, name: 'Product Management' },
//     { id: 6, name: 'Project Management' },
//     { id: 12, name: 'Quality Assurance' },
//     { id: 8, name: 'Sales' },
//     { id: 1, name: 'Software Development' },
//     { id: 17, name: 'Technical Support' },
// ];

function PopularCategory() {
    const [categories, setCategories] = useState([]);
    const { showError } = useNotification();
    const size = 8;
    const numberOfPage = Math.ceil(categories.length / size);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryService.getAllCategory();
                const data = response.result;
                setCategories(data);
            } catch (error) {
                showError('Error fetching categories');
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className={cx('popular-category__wrapper')}>
            <div className={cx('popular-category__container')}>
                <div className={cx('popular-category__title')}>
                    <h1>Popular Category</h1>
                    <Button to={'/find-job'} rightIcon={<IconArrowRight />} blue_white>
                        View All
                    </Button>
                </div>

                <Carousel
                    withIndicators
                    classNames={{
                        indicator: cx('popular-category__indicator'),
                        control: cx('popular-category__control'),
                        controls: cx('popular-category__controls'),
                        slide: cx('popular-category__slide'),
                    }}
                >
                    {Array.from({ length: numberOfPage }).map((_, index) => (
                        <Carousel.Slide key={index}>
                            <div className={cx('popular-category__list')}>
                                {categories
                                    .slice(index * size, (index + 1) * size)
                                    .map((category, i) => (
                                        <motion.div
                                            key={category.id}
                                            className={cx('popular-category__item')}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, delay: i * 0.05 }}
                                        >
                                            <ItemInfo
                                                title={category.name}
                                                description={`9 Open positions`}
                                            />
                                        </motion.div>
                                    ))}
                            </div>
                        </Carousel.Slide>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

export default PopularCategory;