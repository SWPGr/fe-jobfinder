import React from 'react';
import { CalendarIcon, MapPinIcon, UsersIcon, ClockIcon } from 'lucide-react';

const EventInfoSection = () => {
    return (
        <section className="w-full bg-green-700 text-white py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Green Week 2023</h2>
                <p className="text-lg md:text-xl text-green-100 text-center mb-14 max-w-3xl mx-auto">
                    Join the activities and events of Green Week to promote a sustainable lifestyle
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-green-600 p-6 rounded-xl">
                        <h3 className="text-3xl font-bold mb-6">Event Information</h3>
                        <div className="space-y-5">
                            <div className="flex items-start">
                                <CalendarIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-lg font-semibold">Date</p>
                                    <p className="text-base md:text-lg text-green-100">
                                        September 15, 2023 - September 21, 2023
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MapPinIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-lg font-semibold">Location</p>
                                    <p className="text-base md:text-lg text-green-100">
                                        University of Social Sciences and Humanities - VNU-HCM
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <UsersIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-lg font-semibold">Participants</p>
                                    <p className="text-base md:text-lg text-green-100">
                                        Students, lecturers, and the community interested in the environment
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <ClockIcon className="w-6 h-6 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-lg font-semibold">Registration</p>
                                    <p className="text-base md:text-lg text-green-100">Open until September 10, 2023</p>
                                </div>
                            </div>
                        </div>
                        <button className="mt-8 bg-white text-green-700 px-6 py-3 rounded-md font-medium hover:bg-green-100 transition-colors w-full">
                            Register to Participate
                        </button>
                    </div>
                    <div className="bg-green-600 p-6 rounded-xl">
                        <h3 className="text-3xl font-bold mb-6">Main Activities</h3>
                        <ul className="space-y-4">
                            {[
                                'Seminar "Green Living in the Digital Age"',
                                'Exhibition of eco-friendly products',
                                'Workshop on recycling and reusing materials',
                                'Tree planting campaign on campus',
                                'Talk show with environmental experts',
                                'Environmental protection idea competition',
                            ].map((activity, index) => (
                                <li key={index} className="flex items-center">
                                    <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                                    <p className="text-base md:text-lg">{activity}</p>
                                </li>
                            ))}
                        </ul>
                        <button className="mt-8 border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-green-700 transition-colors w-full">
                            View Detailed Schedule
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EventInfoSection;
