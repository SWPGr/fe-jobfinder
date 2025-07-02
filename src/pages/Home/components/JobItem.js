import { Images } from '~/assets';

function JobItem({ job }) {
    const handleErrorImage = () => {
        return (event) => {
            event.target.src = Images.default_image;
        };
    };
    return (
        <div
            key={job.id}
            className="flex bg-white bg-opacity-10 rounded-lg p-3 hover:bg-opacity-20 transition-all cursor-pointer"
        >
            <div className="w-20 h-20 rounded overflow-hidden bg-[#f1f2f4] p-1 mr-3 flex-shrink-0">
                <img
                    src={job.logo}
                    alt={job.companyName}
                    onError={handleErrorImage}
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-xl font-size-18 text-white text-sm line-clamp-2">{job.jobTitle}</h4>
                <p className="text-l text-gray-300 mt-1 line-clamp-1">{job.companyName}</p>
                <p className="text-xs text-gray-400 mt-1">{job.companyAddress}</p>
            </div>
        </div>
    );
}

export default JobItem;
