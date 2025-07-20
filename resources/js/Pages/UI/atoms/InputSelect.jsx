import React from "react";

const InputSelect = ({options, value, onChange, className = "",name, required = false, disabled = false }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <select
        name={name}
        onChange={onChange}
        value={value}
        required={required}
        className="p-1 rounded-lg bg-[#ececec] focus:outline-none focus:ring-2 focus:ring-[#598c77]"
      >
        <option value="" disabled={disabled}>-- Pilih --</option>
        {options.map((option, index) => (
          <option key={index} value={option.value ?? option}>
            {option.label ?? option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
