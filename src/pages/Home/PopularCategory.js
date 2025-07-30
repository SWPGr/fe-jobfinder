import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import {
    IconArrowRight,
    IconWand,
    IconCode,
    IconSpeakerphone,
    IconBrandParsinta,
    IconMusic,
    IconChartBarPopular,
    IconFirstAidKit,
    IconDatabase,
} from '@tabler/icons-react';
import { Carousel } from '@mantine/carousel';
import { motion } from 'framer-motion';
import { Button } from '~/components';
import ItemInfo from '../components/ItemInfo';
import { categoryService } from '~/services';
import { useNotification } from '~/hooks';

const cx = classNames.bind(styles);

function PopularCategory() {
    const [categories, setCategories] = useState([]);
    const { showError } = useNotification();
    const size = 8;
    const numberOfPage = Math.ceil(categories.length / size);

    // Icon mapping cho từng category
    const iconMapping = {
        'Design': <IconWand />,
        'Development': <IconCode />,
        'Marketing': <IconSpeakerphone />,
        'Sales': <IconBrandParsinta />,
        'Music': <IconMusic />,
        'Data Science': <IconChartBarPopular />,
        'Health & Fitness': <IconFirstAidKit />,
        'Data & Science': <IconDatabase />,
        'Finance': <IconChartBarPopular />, // Thêm icon cho Finance
    };

    // Hàm lấy icon dựa trên category name
    const getIconForCategory = (categoryName) => {
        return iconMapping[categoryName] || <IconWand />; // Default icon nếu không tìm thấy
    };

    useEffect(() => {
        const fetchTopCategories = async () => {
            try {
                const response = await categoryService.getTopCategories();
                const data = response.result || response;
                console.log('Top Categories:', data);
                setCategories(data);
            } catch (error) {
                showError('Error fetching top categories');
                console.error('Error fetching top categories:', error);
            }
        };

        fetchTopCategories();
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
                    {[...Array(numberOfPage)].map((_, index) => (
                        <Carousel.Slide key={index}>
                            <div className={cx('popular-category__list')}>
                                {categories.slice(index * size, (index + 1) * size).map((category, index) => (
                                    <motion.div
                                        key={category.categoryId || index}
                                        className={cx('popular-category__item')}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: index * 0.05 }}
                                    >
                                        <ItemInfo
                                            icon={getIconForCategory(category.categoryName)}
                                            title={category.categoryName}
                                            description={`${category.jobCount} Open positions`}
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
