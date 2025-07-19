import React from 'react';
import { LeafIcon } from 'lucide-react';
import banner from '~/assets/Images/Banner.png';

const HeroSection = () => {
    return (
        <section className="w-full bg-gradient-to-r from-green-700 to-green-500 text-white py-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-10 md:mb-0">
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-snug">
                            Live Green - From Simple Things
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                            The journey to build a sustainable future for our planet
                        </p>
                        <div className="flex space-x-4">
                            <button className="bg-white text-green-700 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
                                Learn More
                            </button>
                            <button className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-green-700 transition-colors">
                                Join Now
                            </button>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <div className="relative">
                            <div className="absolute -top-10 -left-10 w-20 h-20 bg-green-300 rounded-full opacity-20"></div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-300 rounded-full opacity-20"></div>
                            <img
                                src={banner}
                                alt="Green Week"
                                className="rounded-lg shadow-xl w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
