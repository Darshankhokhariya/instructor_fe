import React from "react";

const countryCodes = [
    { code: "+91" },
    { code: "+1" },
    { code: "+44" },
    { code: "+61" },
    { code: "+971" },
];

const PhoneInput = ({ label, name, value, onChange, required, placeholder }) => {
    const handleCodeChange = (e) => {
        const newCode = e.target.value;
        const phoneOnly = value.replace(/^\+\d+\s?/, ""); // remove old code
        onChange({ target: { name, value: `${newCode} ${phoneOnly}` } });
    };

    const handlePhoneChange = (e) => {
        const phoneOnly = e.target.value.replace(/\D/g, ""); // numbers only
        const currentCode = value.split(" ")[0] || "+91";
        onChange({ target: { name, value: `${currentCode} ${phoneOnly}` } });
    };

    const selectedCode = value.split(" ")[0] || "+91";
    const phoneOnly = value.split(" ")[1] || "";

    return (
        <div className="flex flex-col w-full gap-1">
            <label className="text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div className="flex gap-2">
                {/* Country Code Selector */}
                <select
                    value={selectedCode}
                    onChange={handleCodeChange}
                    className="w-28 px-2 py-2 border rounded-lg bg-white text-gray-700"
                >
                    {countryCodes.map((item) => (
                        <option key={item.code} value={item.code}>
                            {item.code}
                        </option>
                    ))}
                </select>

                {/* Phone Number Input */}
                <input
                    type="tel"
                    value={phoneOnly}
                    onChange={handlePhoneChange}
                    className="flex-1 px-3 py-2 border rounded-lg"
                    placeholder={placeholder}
                    required={required}
                />
            </div>
        </div>
    );
};

export default PhoneInput;
