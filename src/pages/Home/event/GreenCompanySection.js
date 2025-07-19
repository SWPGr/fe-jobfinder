import React from 'react';
import { LeafIcon } from 'lucide-react';

import event4 from '~/assets/Images/event4.png';
import event5 from '~/assets/Images/event5.png';
import event6 from '~/assets/Images/event6.png';
import event7 from '~/assets/Images/event7.png';

const companies = [
    {
        name: 'EcoFuture Co.',
        description: 'Specializes in biodegradable packaging and sustainable product design.',
        logo: event4,
        isGreen: true,
    },
    {
        name: 'GreenBuild Ltd.',
        description: 'Green construction and eco-friendly building materials.',
        logo: event5,
        isGreen: true,
    },
    {
        name: 'CleanTech Vietnam',
        description: 'Renewable energy solutions and environmental consulting services.',
        logo: event6,
        isGreen: true,
    },
    {
        name: 'Logix Inc.',
        description: 'Logistics services with gradual shift to sustainable operations.',
        logo: event7,
        isGreen: false,
    },
];

const GreenCompanySection = () => {
    return (
        <section className="w-full py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-green-700 mb-4">Partner Companies</h2>
                <p className="text-lg md:text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                    These companies are working together to promote sustainability and green living.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {companies.map((company, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                        >
                            {/* Image full width */}
                            <div className="relative w-full h-48 overflow-hidden">
                                <img src={company.logo} alt={company.name} className="w-full h-full object-cover" />
                                {company.isGreen && (
                                    <div className="absolute top-2 right-2">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-green-500 rounded-full blur-sm opacity-30 scale-110"></div>
                                            <div className="relative bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full p-2.5 shadow-lg">
                                                <LeafIcon className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 border-t border-gray-100">
                                <h3 className="text-xl font-bold text-green-800 mb-2">{company.name}</h3>
                                <p className="text-gray-600">{company.description}</p>
                            </div>

                            <div className="px-6 pb-4">
                                <button className="text-green-600 hover:text-green-800 font-medium text-sm flex items-center">
                                    Learn More
                                    <svg
                                        className="w-4 h-4 ml-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GreenCompanySection;
