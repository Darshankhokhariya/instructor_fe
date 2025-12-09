import React from "react";
import { FaChevronDown } from "react-icons/fa";

const Selector = ({
    label,
    name,
    value,
    onChange,
    options = [],
    required,
    placeholder = "Select an option",
    error,
    disabled = false,
}) => {
    return (
        <div className="flex flex-col w-full gap-1">
            {/* Label */}
            {label && (
                <label
                    htmlFor={name}
                    className="text-sm font-medium text-gray-700"
                >
                    {label}{" "}
                    {required && <span className="text-red-500">*</span>}
                </label>
            )}

            {/* Wrapper for icon */}
            <div className="relative">
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`w-full appearance-none rounded-lg border bg-white px-4 py-2 pr-10 text-gray-800 transition-all shadow-sm
                        focus:outline-none 
                        ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
                        ${error ? "border-red-500 focus:ring-2 focus:ring-red-300" : "border-gray-300 focus:ring-2 focus:ring-primary/40"}
                    `}
                >
                    <option value="" >
                        {placeholder}
                    </option>

                    {options.map((opt) => (
                        <option className="!text-black" key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>

                {/* Dropdown icon */}
                <FaChevronDown
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />
            </div>

            {/* Error message */}
            {error && (
                <p className="text-xs text-red-500 mt-0.5">{error}</p>
            )}
        </div>
    );
};

export default Selector;
