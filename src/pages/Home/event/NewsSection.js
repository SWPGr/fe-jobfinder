import React from 'react';
import { ArrowRightIcon } from 'lucide-react';

// Import images
import plasticImg from '~/assets/Images/event1.png';
import gardenImg from '~/assets/Images/event2.png';
import fairImg from '~/assets/Images/event3.png';

const NewsSection = () => {
    const newsData = [
        {
            title: 'Vietnam Launches National Campaign for Plastic Waste Reduction',
            desc: 'The Ministry of Natural Resources and Environment kicks off a nationwide campaign encouraging citizens to reduce single-use plastic and adopt eco-friendly alternatives...',
            image: plasticImg,
        },
        {
            title: 'Students Transform Urban Spaces with Vertical Gardens',
            desc: 'A group of university students has launched an initiative turning unused walls in Hanoi into vertical gardens, promoting green living in urban areas...',
            image: gardenImg,
        },
        {
            title: 'Eco-Fair Showcases Local Green Innovations',
            desc: 'The Green Living Fair 2025 highlighted solar-powered appliances, composting solutions, and zero-waste lifestyle products made by Vietnamese startups...',
            image: fairImg,
        },
    ];

    return (
        <section className="w-full py-20 bg-white text-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Latest News</h2>
                <p className="text-lg md:text-xl text-gray-600 text-center mb-14 max-w-3xl mx-auto">
                    Stay updated with the latest information on the environment and nature conservation activities
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsData.map((news, i) => (
                        <div
                            key={i}
                            className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                        >
                            <img src={news.image} alt={news.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl md:text-2xl font-bold mb-3">{news.title}</h3>
                                <p className="text-base md:text-lg text-gray-600 mb-4">{news.desc}</p>
                                <a
                                    href="#"
                                    className="flex items-center text-green-600 font-medium hover:text-green-700"
                                >
                                    Read More <ArrowRightIcon className="w-4 h-4 ml-1" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsSection;
