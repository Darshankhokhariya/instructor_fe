const SmartSelect = ({ label, options, selectedValues = [], onToggle }) => (
    <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
            {label}
        </label>

        <div className="flex flex-wrap gap-2">
            {options.map((option) => {
                const value = typeof option === "string" ? option : option.value;
                const displayLabel = typeof option === "string" ? option : option.label;

                const isSelected = selectedValues.includes(value);

                return (
                    <button
                        key={value}
                        type="button"
                        onClick={() => onToggle(value)}
                        className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors border ${isSelected
                                ? "bg-primary text-white border-primary"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                            }`}
                    >
                        {displayLabel}
                    </button>
                );
            })}
        </div>
    </div>
);

export default SmartSelect;
