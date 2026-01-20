export default function RangeSlider({
    value,
    onChange,
    min = 0,
    max = 100,
    minLabel = '',
    maxLabel = '',
    currentLabel = ''
}) {
    const percentage = ((value - min) / (max - min)) * 100;

    return (
        <div className="space-y-4">
            <div className="relative pt-1">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                        background: `linear-gradient(to right, #14B8A6 0%, #14B8A6 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`
                    }}
                />
            </div>

            {currentLabel && (
                <div className="text-center">
                    <span className="inline-block px-4 py-2 bg-teal-100 text-teal-700 rounded-lg font-semibold text-lg">
                        {currentLabel}
                    </span>
                </div>
            )}

            {(minLabel || maxLabel) && (
                <div className="flex justify-between text-sm text-slate-600">
                    <span>{minLabel}</span>
                    <span>{maxLabel}</span>
                </div>
            )}

            <style jsx>{`
                .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #14B8A6;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }

                .slider::-moz-range-thumb {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #14B8A6;
                    cursor: pointer;
                    border: none;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                }
            `}</style>
        </div>
    );
}
