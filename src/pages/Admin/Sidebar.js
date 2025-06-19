import React from 'react';
import { LayoutDashboard, Briefcase, Users, FileText, Settings, HelpCircle, LogOut } from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab }) => {
    const navItems = [
        { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
        { id: 'employers', label: 'Employers', icon: <Briefcase size={20} /> },
        { id: 'jobseekers', label: 'Job Seekers', icon: <Users size={20} /> },
        { id: 'jobs', label: 'Jobs', icon: <FileText size={20} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
    ];
    return (
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
            <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-blue-600">JobFinder Admin</h1>
                </div>
                <nav className="flex-1 p-4">
                    <ul className="space-y-1">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center px-4 py-2.5 rounded-lg text-sm font-medium ${
                                        activeTab === item.id
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-gray-200">
                    <div className="space-y-1">
                        <button className="w-full flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100">
                            <span className="mr-3">
                                <HelpCircle size={20} />
                            </span>
                            Help & Support
                        </button>
                        <button className="w-full flex items-center px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100">
                            <span className="mr-3">
                                <LogOut size={20} />
                            </span>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};
