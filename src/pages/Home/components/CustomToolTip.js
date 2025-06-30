function CustomTooltip({ active, payload, label }) {
    if (!active || !payload || !payload.length || !payload[0].value) return null;
    const date = label;
    return (
        <div className="custom-tooltip bg-white p-2 border rounded shadow-sm">
            <p className="font-semibold">{payload[0].payload.name || date}</p>
            <p className="mb-0">{Number(payload[0].value).toLocaleString()}</p>
        </div>
    );
}

export default CustomTooltip;
