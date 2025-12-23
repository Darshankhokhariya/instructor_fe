
const Input = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    required,
    placeholder,
    min,
    max,
    error,
    disabled
}) => (
    <div className="flex flex-col">
        <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
            {label} : {required && <span className="text-red-500">*</span>}
        </label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            min={min}
            max={max}
            disabled={disabled}
            onWheel={(event) => event.target.blur()}
            className={`rounded-lg disabled:cursor-not-allowed border px-4 py-2 text-gray-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 ${error ? "border-red-500" : "border-gray-300"
                }`}
        />
        {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
    </div>
);

export default Input;