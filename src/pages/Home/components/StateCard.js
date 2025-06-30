import { NumberFormatter } from '@mantine/core';

const StatCard = ({ number, label }) => (
    <div className="bg-opacity-20 bg-white backdrop-blur-sm rounded-lg p-4 flex flex-col">
        <span className="text-3xl font-bold text-white">
            <NumberFormatter thousandSeparator="." decimalSeparator="," value={number} />
        </span>
        <span className="text-sm text-white mt-1">{label}</span>
    </div>
);

export default StatCard;
