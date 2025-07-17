import React from 'react';
import { Search, Users, Briefcase, RefreshCw } from 'lucide-react';

const NoResultsFound = ({ searchType, searchQuery, onRetry, onClearSearch }) => {
    const getIcon = () => {
        switch (searchType) {
            case 'jobs':
                return <Briefcase className="w-16 h-16 text-gray-300" />;
            case 'candidates':
                return <Users className="w-16 h-16 text-gray-300" />;
            case 'companies':
                return <Search className="w-16 h-16 text-gray-300" />;
            default:
                return <Search className="w-16 h-16 text-gray-300" />;
        }
    };

    const getTitle = () => {
        switch (searchType) {
            case 'jobs':
                return 'No matching jobs found';
            case 'candidates':
                return 'No suitable candidates found';
            case 'companies':
                return 'No matching companies found';
            default:
                return 'No results found';
        }
    };

    const getDescription = () => {
        switch (searchType) {
            case 'jobs':
                return 'We couldn’t find any jobs that match your search criteria.';
            case 'candidates':
                return 'We couldn’t find any candidates that meet your requirements.';
            case 'companies':
                return 'We couldn’t find any companies that match your search.';
            default:
                return 'We couldn’t find any results that match your search.';
        }
    };

    const getSuggestions = () => {
        switch (searchType) {
            case 'jobs':
                return [
                    'Try searching with different keywords',
                    'Expand the location range',
                    'Adjust the expected salary range',
                    'Consider similar job titles',
                ];
            case 'candidates':
                return [
                    'Try using different skills',
                    'Widen the experience range',
                    'Adjust the education level requirement',
                    'Consider candidates from related fields',
                ];
            case 'companies':
                return [
                    'Try searching with a different company name',
                    'Expand the industry scope',
                    'Adjust the company size filter',
                    'Consider nearby companies',
                ];
            default:
                return [
                    'Try using different keywords',
                    'Check for spelling mistakes',
                    'Use more general keywords',
                    'Contact support if the issue persists',
                ];
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-6 px-6 text-center">
            {/* Icon */}
            <div className="mb-6 p-4 bg-gray-50 rounded-full">{getIcon()}</div>

            {/* Title */}
            <h2 className="text-4xl font-bold text-gray-800 mb-3">{getTitle()}</h2>

            {/* Search Query Display */}
            {searchQuery && (
                <p className="text-gray-600 mb-4">
                    Search results for: <span className="font-semibold text-gray-800">"{searchQuery}"</span>
                </p>
            )}

            {/* Description */}
            <p className="text-2xl text-gray-600 mb-8 max-w-2xl">{getDescription()}</p>

            {/* Suggestions */}
            <div className="mb-8 max-w-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-left">Tips to improve your search:</h3>
                <ul className="text-left space-y-2">
                    {getSuggestions().map((suggestion, index) => (
                        <li key={index} className="text-xl flex items-start space-x-2">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-gray-600">{suggestion}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 group"
                    >
                        <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                        Try Again
                    </button>
                )}

                {onClearSearch && (
                    <button
                        onClick={onClearSearch}
                        className="flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                    >
                        <Search className="w-5 h-5 mr-2" />
                        New Search
                    </button>
                )}
            </div>

            {/* Additional Help */}
        </div>
    );
};

export default NoResultsFound;
