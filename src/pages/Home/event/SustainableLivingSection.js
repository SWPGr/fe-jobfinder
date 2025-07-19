import React from 'react';
import { HomeIcon, UtensilsIcon, LeafIcon, RecycleIcon } from 'lucide-react';
import banner from '~/assets/Images/Banner.png';

const SustainableLivingSection = () => {
    return (
        <section className="w-full py-20 bg-white text-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">What is Green Living?</h2>
                <p className="text-lg md:text-xl text-gray-600 text-center mb-14 max-w-3xl mx-auto">
                    Green living is a healthy, sustainable lifestyle that minimizes the use of natural resources. This
                    lifestyle aims to meet current needs without depleting resources for future generations.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    <div className="bg-green-50 p-6 rounded-xl">
                        <HomeIcon className="w-10 h-10 text-green-600 mb-4" />
                        <h3 className="text-2xl font-bold mb-3">Green Living in Daily Life</h3>
                        <p className="text-lg text-gray-700">
                            Change daily habits, choose eco-friendly handmade items, and limit the use of chemical-based
                            cleaning products.
                        </p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl">
                        <UtensilsIcon className="w-10 h-10 text-green-600 mb-4" />
                        <h3 className="text-2xl font-bold mb-3">Eat Green - Clean Eating</h3>
                        <p className="text-lg text-gray-700">
                            Choose fresh, locally-sourced food, reduce food waste, and use reusable storage containers
                            instead of single-use plastics.
                        </p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl">
                        <LeafIcon className="w-10 h-10 text-green-600 mb-4" />
                        <h3 className="text-2xl font-bold mb-3">Save Energy and Resources</h3>
                        <p className="text-lg text-gray-700">
                            Use electricity wisely, participate in Earth Hour, conserve water, and use public
                            transportation.
                        </p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl">
                        <RecycleIcon className="w-10 h-10 text-green-600 mb-4" />
                        <h3 className="text-2xl font-bold mb-3">Reuse and Recycle</h3>
                        <p className="text-lg text-gray-700">
                            Reuse plastic items, limit single-use plastics, and sort waste to facilitate recycling.
                        </p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl">
                        <LeafIcon className="w-10 h-10 text-green-600 mb-4" />
                        <h3 className="text-2xl font-bold mb-3">Plant Trees</h3>
                        <p className="text-lg text-gray-700">
                            Plant more trees in living and working spaces to improve air quality, absorb CO₂, and
                            provide O₂.
                        </p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl">
                        <HomeIcon className="w-10 h-10 text-green-600 mb-4" />
                        <h3 className="text-2xl font-bold mb-3">Sustainable Fashion</h3>
                        <p className="text-lg text-gray-700">
                            Choose clothing made from natural materials, use eco-friendly detergents, and consider
                            buying second-hand clothing.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-center bg-green-100 rounded-xl overflow-hidden">
                    <div className="md:w-1/2 p-8">
                        <h3 className="text-4xl md:text-5xl font-bold mb-6">Small Actions, Big Impact</h3>
                        <p className="text-xl md:text-2xl text-gray-700 mb-5">
                            "Take your time. One day, looking back, you'll be amazed by the wonderful changes
                            happening." - Frances Hodgson Burnett
                        </p>
                        <p className="text-xl md:text-2xl text-gray-700">
                            Each of us is a small part of this planet, but with collective small actions, we can make
                            the planet more beautiful and healthier. Live simply, live green!
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        <img src={banner} alt="Green Living" className="w-full h-auto object-cover" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SustainableLivingSection;
