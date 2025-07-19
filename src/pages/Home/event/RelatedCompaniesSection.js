import { LeafIcon } from 'lucide-react';

const companies = [
    {
        name: 'EcoTech Vietnam',
        description: 'Specializing in solar energy and green tech solutions.',
        logo: 'https://via.placeholder.com/80x80?text=EcoTech',
        isGreenPartner: true,
    },
    {
        name: 'GreenHome Co.',
        description: 'Provides sustainable household products.',
        logo: 'https://via.placeholder.com/80x80?text=GreenHome',
        isGreenPartner: true,
    },
    {
        name: 'UrbanBuild',
        description: 'Urban infrastructure and development firm.',
        logo: 'https://via.placeholder.com/80x80?text=UrbanBuild',
        isGreenPartner: false,
    },
];

const RelatedCompaniesSection = () => {
    return (
        <section className="w-full py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Related Green Companies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {companies.map((company, i) => (
                        <div
                            key={i}
                            className="relative bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition"
                        >
                            {company.isGreenPartner && (
                                <span className="absolute top-4 right-4 bg-green-100 text-green-600 rounded-md p-1 shadow-sm">
                                    <LeafIcon className="w-5 h-5" />
                                </span>
                            )}
                            <img
                                src={company.logo}
                                alt={company.name}
                                className="w-16 h-16 object-cover rounded-full mb-4"
                            />
                            <h3 className="text-xl font-semibold">{company.name}</h3>
                            <p className="text-gray-600 mt-2">{company.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedCompaniesSection;
