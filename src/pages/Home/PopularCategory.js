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

import { Button } from '~/components';
import ItemInfo from '../components/ItemInfo';

const cx = classNames.bind(styles);

function PopularCategory() {
    const categories = [
        { icon: <IconWand />, title: 'Design', total: 27 },
        { icon: <IconCode />, title: 'Development', total: 35 },
        { icon: <IconSpeakerphone />, title: 'Marketing', total: 20 },
        { icon: <IconBrandParsinta />, title: 'Sales', total: 15 },
        { icon: <IconMusic />, title: 'Music', total: 10 },
        { icon: <IconChartBarPopular />, title: 'Data Science', total: 18 },
        { icon: <IconFirstAidKit />, title: 'Health & Fitness', total: 12 },
        { icon: <IconDatabase />, title: 'Data & Science', total: 22 },
    ];

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

                <div className={cx('popular-category__list')}>
                    {categories.map((category, index) => (
                        <ItemInfo
                            key={index}
                            icon={category.icon}
                            title={category.title}
                            description={`${category.total} Open positions`}
                            className={cx('popular-category__item')}
                        />
                    ))}
                </div>
                {/*  */}
            </div>
        </div>
    );
}

export default PopularCategory;
