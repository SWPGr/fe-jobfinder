import React, { useEffect } from 'react';
import { CandidateCard, UserSearchFilters } from '~/components';
import { UsersIcon, TrendingUpIcon, StarIcon } from 'lucide-react';
import { useWindowScroll } from '@mantine/hooks';

// Sample candidate data
const candidates = [
    {
        id: 1,
        name: 'Alex Johnson',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww',
        headline: 'Senior Frontend Developer',
        skills: ['React', 'TypeScript', 'UI/UX', 'GraphQL'],
        education: 'BS Computer Science, Stanford',
        experience: '7+ years experience',
        activelyLooking: true,
    },
    {
        id: 2,
        name: 'Sarah Miller',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww',
        headline: 'UX/UI Designer',
        skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
        education: 'MFA Design, RISD',
        experience: '5+ years experience',
        activelyLooking: false,
    },
    {
        id: 3,
        name: 'David Chen',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D',
        headline: 'Full Stack Developer',
        skills: ['Node.js', 'React', 'MongoDB', 'AWS'],
        education: 'MS Computer Engineering, MIT',
        experience: '4+ years experience',
        activelyLooking: true,
    },
    {
        id: 4,
        name: 'Emily Rodriguez',
        photo: 'https://images.unsplash.com/photo-1619946794135-5bc917a27793?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D',
        headline: 'Product Manager',
        skills: ['Product Strategy', 'Agile', 'User Stories', 'Roadmapping'],
        education: 'MBA, Harvard Business School',
        experience: '6+ years experience',
        activelyLooking: false,
    },
    {
        id: 5,
        name: 'Michael Taylor',
        photo: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D',
        headline: 'Data Scientist',
        skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
        education: 'PhD Statistics, Berkeley',
        experience: '3+ years experience',
        activelyLooking: true,
    },
    {
        id: 6,
        name: 'Jessica Lee',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D',
        headline: 'Marketing Specialist',
        skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
        education: 'BA Marketing, NYU',
        experience: '4+ years experience',
        activelyLooking: true,
    },
];
// Featured skills
const featuredSkills = [
    {
        name: 'React',
        count: 428,
    },
    {
        name: 'JavaScript',
        count: 856,
    },
    {
        name: 'Python',
        count: 512,
    },
    {
        name: 'UI/UX Design',
        count: 324,
    },
    {
        name: 'Product Management',
        count: 218,
    },
    {
        name: 'Data Science',
        count: 195,
    },
];
const CandidatesPage = () => {
    const [scroll, scrollTo] = useWindowScroll();
    useEffect(() => {
        scrollTo({ y: 0 });
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen w-full">
            <div className="bg-blue-600 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Browse Candidates</h1>
                        <p className="text-blue-100 text-lg">
                            Find the perfect talent to join your team from our pool of qualified candidates
                        </p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <UserSearchFilters />
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main content - Candidate listings */}
                    <div className="lg:w-2/3">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">
                                <span className="text-blue-600">{candidates.length}</span> Candidates Found
                            </h2>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Sort by:</span>
                                <select className="text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Most Relevant</option>
                                    <option>Recently Active</option>
                                    <option>Experience: High to Low</option>
                                    <option>Experience: Low to High</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 relative">
                            {candidates.map((candidate) => (
                                <CandidateCard key={candidate.id} {...candidate} />
                            ))}
                        </div>
                        <div className="mt-8 flex justify-center">
                            <button className="bg-white border border-gray-300 text-blue-600 font-medium px-6 py-3 rounded-md hover:bg-blue-50 transition-colors">
                                Load More Candidates
                            </button>
                        </div>
                    </div>
                    {/* Sidebar */}
                    <div className="lg:w-1/3 space-y-6">
                        {/* Talent Spotlight */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Talent Spotlight</h3>
                                <a href="#" className="text-blue-600 text-sm font-medium">
                                    View All
                                </a>
                            </div>
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <div className="flex items-start gap-4">
                                    <img
                                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D"
                                        alt="Featured candidate"
                                        className="w-16 h-16 object-cover rounded-full border-2 border-white"
                                    />
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold text-gray-900">Rachel Green</h4>
                                            <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                                                Premium
                                            </span>
                                        </div>
                                        <p className="text-blue-600 font-medium">Senior Product Designer</p>
                                        <p className="text-sm text-gray-600 mt-1">8+ years at top tech companies</p>
                                        <div className="mt-2">
                                            <button className="text-sm text-blue-600 font-medium">
                                                View Full Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Popular Skills */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Skills</h3>
                            <div className="space-y-2">
                                {featuredSkills.map((skill, index) => (
                                    <a
                                        key={index}
                                        href="#"
                                        className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-gray-700">{skill.name}</span>
                                        <span className="text-sm text-gray-500">{skill.count}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                        {/* Quick Filters */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Filters</h3>
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-between py-2.5 px-4 rounded-md hover:bg-blue-50 text-left border border-gray-200 hover:border-blue-300 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <StarIcon className="w-5 h-5 text-blue-600" />
                                        <span className="font-medium text-gray-800">Actively Looking</span>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {candidates.filter((c) => c.activelyLooking).length}
                                    </span>
                                </button>
                                <button className="w-full flex items-center justify-between py-2.5 px-4 rounded-md hover:bg-blue-50 text-left border border-gray-200 hover:border-blue-300 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <TrendingUpIcon className="w-5 h-5 text-blue-600" />
                                        <span className="font-medium text-gray-800">Senior Level (5+ yrs)</span>
                                    </div>
                                    <span className="text-sm text-gray-500">24</span>
                                </button>
                                <button className="w-full flex items-center justify-between py-2.5 px-4 rounded-md hover:bg-blue-50 text-left border border-gray-200 hover:border-blue-300 transition-colors">
                                    <div className="flex items-center gap-2">
                                        <UsersIcon className="w-5 h-5 text-blue-600" />
                                        <span className="font-medium text-gray-800">Recently Active</span>
                                    </div>
                                    <span className="text-sm text-gray-500">42</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidatesPage;
