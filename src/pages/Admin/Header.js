import React from 'react';
import { Bell, Search, Menu, User } from 'lucide-react';

export const Header = () => {
    return (
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
            <div className="flex items-center md:hidden">
                <button className="text-gray-500 hover:text-gray-600">
                    <Menu size={24} />
                </button>
            </div>
            <div className="hidden md:flex items-center flex-1 max-w-md">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button className="text-gray-500 hover:text-gray-600 relative">
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/2 -translate-y-1/2"></span>
                </button>
                <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                        <User size={18} />
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700 hidden md:inline">Admin User</span>
                </div>
            </div>
        </header>
    );
};
