const TextArea = ({
  label,
  name,
  value,
  onChange,
  required,
  placeholder,
  rows = 3,
  error,
}) => (
  <div className="flex flex-col">
    <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      rows={rows}
      className={`resize-none rounded-lg border px-4 py-2 text-gray-700 shadow-sm focus:outline-none  
             ${
               error
                 ? "border-red-500 focus:ring-2 focus:ring-red-300"
                 : "border-gray-300 focus:ring-2 focus:ring-primary/40"
             }
        `}
    />
    {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
  </div>
);

export default TextArea;
