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

    const categoriesList = [
        { icon: <IconWand />, title: 'Design' },
        { icon: <IconCode />, title: 'Development' },
        { icon: <IconSpeakerphone />, title: 'Marketing' },
        { icon: <IconBrandParsinta />, title: 'Sales' },
        { icon: <IconMusic />, title: 'Music' },
        { icon: <IconChartBarPopular />, title: 'Data Science' },
        { icon: <IconFirstAidKit />, title: 'Health & Fitness' },
        { icon: <IconDatabase />, title: 'Data & Science' },
    ];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryService.getAllCategory();
                const data = response.result;
                console.log('Categories:', data);
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
                {/*  */}

                {/* <div className={cx('popular-category__list')}>
                    {categoriesList.map((category, index) => (
                        <ItemInfo
                            key={index}
                            icon={category.icon}
                            title={category.title}
                            description={`${category.total} Open positions`}
                            className={cx('popular-category__item')}
                        />
                    ))}
                </div> */}
                {/*  */}
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
                                    <ItemInfo
                                        key={index}
                                        title={category.name}
                                        description={`${category.total} Open positions`}
                                        className={cx('popular-category__item')}
                                    />
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
