const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#06b6d4', '#eab308'];

const CustomLegend = ({ payload }) => (
    <div className="flex flex-wrap mt-4 gap-4 justify-center">
        {payload?.map((entry, index) => (
            <div key={`legend-item-${index}`} className="flex items-center text-white text-sm">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: colors[index] }} />
                <span>{entry.payload.name}</span>
            </div>
        ))}
    </div>
);

export default CustomLegend;
