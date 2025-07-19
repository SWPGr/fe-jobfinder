import React from 'react';
import CountUp from 'react-countup';

const StatCard = ({ number, label, animate }) => {
    return (
        <div className="bg-opacity-20 bg-white backdrop-blur-sm rounded-lg p-4 flex flex-col">
            <span className="text-3xl font-bold text-white">
                {animate ? (
                    <CountUp
                        end={number}
                        duration={2}
                        separator="."
                        decimals={0}
                        formattingFn={(val) => new Intl.NumberFormat('de-DE').format(val)}
                    />
                ) : (
                    new Intl.NumberFormat('de-DE').format(number)
                )}
            </span>
            <span className="text-sm text-white mt-1">{label}</span>
        </div>
    );
};

export default StatCard;
