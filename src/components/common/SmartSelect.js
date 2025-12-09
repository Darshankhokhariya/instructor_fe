
const SmartSelect = ({ label, options, selectedValues, onToggle }) => (
    <div className="mb-4">
        {/* Make sure <Label> is defined or imported */}
        <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>

        <div className="flex flex-wrap gap-2">
            {options.map((option) => {
                const isSelected = selectedValues.includes(option);
                return (
                    <button
                        key={option}
                        type="button"
                        onClick={() => onToggle(option)}
                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors border ${isSelected
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                            }`}
                    >
                        {option}
                    </button>
                );
            })}
        </div>
    </div>
);

export default SmartSelect;