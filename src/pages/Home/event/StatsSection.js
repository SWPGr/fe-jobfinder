import React from 'react';
import { DropletIcon, CloudIcon, ThermometerIcon } from 'lucide-react';

function StatsSection() {
    return (
        <section className="py-20 bg-white text-gray-800">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">The Earth is Sounding the Alarm</h2>
                <p className="text-xl md:text-2xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
                    Severe pollution and rapid depletion of natural resources are occurring. The world's population is
                    expected to reach 9.7 billion by 2050.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4" />
                        <h3 className="text-3xl font-semibold mb-2">8.6 million</h3>
                        <p className="text-lg text-gray-700">hectares of forest lost annually worldwide</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <DropletIcon className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-3xl font-semibold mb-2">2.2 billion</h3>
                        <p className="text-lg text-gray-700">people lack access to safe drinking water</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CloudIcon className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-3xl font-semibold mb-2">36.8 billion</h3>
                        <p className="text-lg text-gray-700">tons of CO₂ emitted into the environment annually</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6 text-center">
                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ThermometerIcon className="w-8 h-8 text-orange-600" />
                        </div>
                        <h3 className="text-3xl font-semibold mb-2">1.5°C</h3>
                        <p className="text-lg text-gray-700">
                            global temperature increase to limit to avoid catastrophe
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default StatsSection;
