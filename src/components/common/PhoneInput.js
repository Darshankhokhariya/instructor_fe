import React from "react";

const countryCodes = [
  { code: "+91", maxLength: 10 }, // India
  { code: "+1", maxLength: 10 }, // USA / Canada
  { code: "+44", maxLength: 10 }, // UK
  { code: "+61", maxLength: 9 }, // Australia
  { code: "+971", maxLength: 9 }, // UAE
];
const PhoneInput = ({
  label,
  name,
  value = "",
  onChange,
  required = false,
  placeholder = "Enter phone number",
}) => {
  // Extract country code & number
  const selectedCode = value.split(" ")[0] || "+91";
  const phoneOnly = value.split(" ")[1] || "";

  const selectedCountry =
    countryCodes.find((c) => c.code === selectedCode) || countryCodes[0];

  // Handle country code change
  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    onChange({
      target: {
        name,
        value: `${newCode} ${phoneOnly}`,
      },
    });
  };

  // Handle phone number change (digits only + length limit)
  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "");

    if (digits.length <= selectedCountry.maxLength) {
      onChange({
        target: {
          name,
          value: `${selectedCode} ${digits}`,
        },
      });
    }
  };

  return (
    <div className="flex flex-col w-full gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <div className="flex gap-2">
        {/* Country Code */}
        <select
          value={selectedCode}
          onChange={handleCodeChange}
          className="w-28 px-2 py-2 border border-slate-200 rounded-lg bg-white text-gray-700"
        >
          {countryCodes.map((item) => (
            <option key={item.code} value={item.code}>
              {item.code}
            </option>
          ))}
        </select>

        {/* Phone Number */}
        <input
          type="tel"
          value={phoneOnly}
          onChange={handlePhoneChange}
          className="flex-1 px-3 py-2 border border-slate-200 rounded-lg"
          placeholder={placeholder}
          required={required}
          maxLength={selectedCountry.maxLength}
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </div>
    </div>
  );
};

export default PhoneInput;
