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
    <div className="flex flex-col gap-1">
        <label
            htmlFor={name}
            className="text-sm font-medium text-gray-600"
        >
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
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
            className={`
        w-full rounded-lg border px-4 py-2 text-sm text-gray-800
        transition-all duration-200
        placeholder:text-gray-400
        placeholder:capitalize
        focus:outline-none focus:ring-2
        ${error
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/40"
                    : "border-gray-300 focus:border-primary focus:ring-primary/40"
                }
      `}
        />

        {error && (
            <span className="text-xs font-medium text-red-500">
                {error}
            </span>
        )}
    </div>
);

export default Input;
