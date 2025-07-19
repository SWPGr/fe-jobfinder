import React, { useEffect } from 'react';
import { JobCard, JobSearchFilters } from '~/components';
import { BriefcaseIcon, StarIcon, ChevronRightIcon } from 'lucide-react';
import { useWindowScroll } from '@mantine/hooks';

// Sample job data
const jobs = [
    {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'TechCorp Solutions',
        location: 'San Francisco, CA',
        employmentType: 'Full-time',
        skills: ['React', 'TypeScript', 'Tailwind CSS'],
        logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVjaCUyMGxvZ298ZW58MHx8MHx8fDA%3D',
        postedDate: 'Posted 2 days ago',
        featured: true,
    },
    {
        id: 2,
        title: 'UX/UI Designer',
        company: 'Creative Design Studio',
        location: 'New York, NY',
        employmentType: 'Full-time',
        skills: ['Figma', 'UI Design', 'User Research'],
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29tcGFueSUyMGxvZ298ZW58MHx8MHx8fDA%3D',
        postedDate: 'Posted 3 days ago',
        featured: false,
    },
    {
        id: 3,
        title: 'DevOps Engineer',
        company: 'Cloud Systems Inc',
        location: 'Remote',
        employmentType: 'Full-time',
        skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNvbXBhbnklMjBsb2dvfGVufDB8fDB8fHww',
        postedDate: 'Posted 1 week ago',
        featured: false,
    },
    {
        id: 4,
        title: 'Marketing Specialist',
        company: 'Growth Marketing',
        location: 'Chicago, IL',
        employmentType: 'Part-time',
        skills: ['Social Media', 'Content Creation', 'Analytics'],
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvbXBhbnklMjBsb2dvfGVufDB8fDB8fHww',
        postedDate: 'Posted 5 days ago',
        featured: false,
    },
    {
        id: 5,
        title: 'Full Stack Developer',
        company: 'Innovate Tech',
        location: 'Austin, TX',
        employmentType: 'Contract',
        skills: ['JavaScript', 'Node.js', 'MongoDB', 'React'],
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaCUyMGxvZ298ZW58MHx8MHx8fDA%3D',
        postedDate: 'Posted 1 day ago',
        featured: true,
    },
    {
        id: 6,
        title: 'Data Scientist',
        company: 'Data Insights Co',
        location: 'Boston, MA',
        employmentType: 'Full-time',
        skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGVjaCUyMGxvZ298ZW58MHx8MHx8fDA%3D',
        postedDate: 'Posted 4 days ago',
        featured: false,
    },
];
// Featured companies
const featuredCompanies = [
    {
        id: 1,
        name: 'TechCorp Solutions',
        logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVjaCUyMGxvZ298ZW58MHx8MHx8fDA%3D',
        jobCount: 12,
    },
    {
        id: 2,
        name: 'Creative Design Studio',
        logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29tcGFueSUyMGxvZ298ZW58MHx8MHx8fDA%3D',
        jobCount: 8,
    },
    {
        id: 3,
        name: 'Innovate Tech',
        logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaCUyMGxvZ298ZW58MHx8MHx8fDA%3D',
        jobCount: 5,
    },
];
const JobListingsPage = () => {
    const [scroll, scrollTo] = useWindowScroll();
    useEffect(() => {
        scrollTo({ y: 0 });
    }, []);
    return (
        <div className="bg-gray-50 min-h-screen w-full">
            <div className="bg-blue-600 py-12">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Browse Job Opportunities</h1>
                        <p className="text-blue-100 text-lg">
                            Find your next career opportunity from thousands of job listings
                        </p>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <JobSearchFilters />
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main content - Job listings */}
                    <div className="lg:w-2/3">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">
                                <span className="text-blue-600">{jobs.length}</span> Jobs Available
                            </h2>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">Sort by:</span>
                                <select className="text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Most Recent</option>
                                    <option>Relevance</option>
                                    <option>Salary: High to Low</option>
                                    <option>Salary: Low to High</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 relative">
                            {jobs.map((job) => (
                                <JobCard key={job.id} {...job} />
                            ))}
                        </div>
                        <div className="mt-8 flex justify-center">
                            <button className="bg-white border border-gray-300 text-blue-600 font-medium px-6 py-3 rounded-md hover:bg-blue-50 transition-colors">
                                Load More Jobs
                            </button>
                        </div>
                    </div>
                    {/* Sidebar */}
                    <div className="lg:w-1/3 space-y-6">
                        {/* Featured Companies */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Featured Companies</h3>
                                <a href="#" className="text-blue-600 text-sm font-medium">
                                    View All
                                </a>
                            </div>
                            <div className="space-y-4">
                                {featuredCompanies.map((company) => (
                                    <div
                                        key={company.id}
                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={company.logo}
                                                alt={`${company.name} logo`}
                                                className="w-10 h-10 object-contain rounded"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900">{company.name}</p>
                                                <p className="text-sm text-gray-500">
                                                    {company.jobCount} open positions
                                                </p>
                                            </div>
                                        </div>
                                        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Job Categories */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Categories</h3>
                            <div className="space-y-2">
                                <a
                                    href="#"
                                    className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-gray-700">Software Development</span>
                                    <span className="text-sm text-gray-500">842</span>
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-gray-700">Design</span>
                                    <span className="text-sm text-gray-500">354</span>
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-gray-700">Marketing</span>
                                    <span className="text-sm text-gray-500">263</span>
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-gray-700">Sales</span>
                                    <span className="text-sm text-gray-500">198</span>
                                </a>
                                <a
                                    href="#"
                                    className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-gray-700">Customer Support</span>
                                    <span className="text-sm text-gray-500">176</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobListingsPage;
