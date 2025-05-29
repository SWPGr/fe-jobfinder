import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Testimonial } from '~/components';

const cx = classNames.bind(styles);

const comments = [
    {
        value: 5,
        comment: 'Great job platform, helped me find my dream job!',
        username: 'alice123',
        position: 'Software Engineer',
    },
    {
        value: 4,
        comment: 'Good variety of jobs but UI could be improved.',
        username: 'bob_the_builder',
        position: 'Project Manager',
    },
    {
        value: 5,
        comment: 'Very responsive support team and useful features.',
        username: 'charlie88',
        position: 'Data Analyst',
    },
    {
        value: 3,
        comment: 'Found some jobs, but application process was slow.',
        username: 'diana.prince',
        position: 'Marketing Specialist',
    },
    {
        value: 4,
        comment: 'Nice filters and search options.',
        username: 'edward_snow',
        position: 'Cybersecurity Expert',
    },
    {
        value: 5,
        comment: 'Easy to use and great job matches.',
        username: 'frank_the_tank',
        position: 'DevOps Engineer',
    },
    {
        value: 2,
        comment: 'Too many irrelevant job suggestions.',
        username: 'grace_hopper',
        position: 'Software Developer',
    },
    {
        value: 4,
        comment: 'Good platform, but mobile app needs improvement.',
        username: 'hannah_m',
        position: 'Product Owner',
    },
    {
        value: 5,
        comment: 'Loved the notifications for new jobs.',
        username: 'ian_malcolm',
        position: 'UX Designer',
    },
    {
        value: 3,
        comment: 'Useful, but could add more company reviews.',
        username: 'jessica_l',
        position: 'HR Specialist',
    },
];

function ClientsTestimonial() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };
    return (
        <div className={cx('clients-testimonial')}>
            <div className={cx('clients-testimonial__container', 'slider-container')}>
                <div className={cx('clients-testimonial__title')}>Clients Testimonial</div>
                <Slider {...settings}>
                    {comments.map((comment, index) => (
                        <div key={index}>
                            <Testimonial
                                value={comment.value}
                                comment={comment.comment}
                                user={{ username: comment.username, position: comment.position }}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default ClientsTestimonial;
