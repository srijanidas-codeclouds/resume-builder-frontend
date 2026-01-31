import React from "react";

// --- Section Header ---
export const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-4 border-b border-gray-100 pb-2">
    <h3 className="text-lg font-bold text-gray-800">{title}</h3>
    {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
  </div>
);

// --- Text Input ---
export const Input = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  icon,
  disabled,
  className,
}) => (
  <div className={`w-full ${className || ""}`}>
    {label && (
      <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
    )}
    <div className="relative group">
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 select-none material-symbols-outlined text-[18px]">
          {icon}
        </span>
      )}
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full bg-white border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent block p-2.5 transition-all outline-none shadow-sm
          ${icon ? "pl-10" : ""} 
          ${disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "hover:border-blue-300"}
        `}
      />
    </div>
  </div>
);

// --- Text Area ---
export const TextArea = ({ label, value, onChange, rows = 4, placeholder }) => (
  <div className="w-full">
    {label && (
      <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
        {label}
      </label>
    )}
    <textarea
      rows={rows}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent block p-2.5 transition-all outline-none shadow-sm hover:border-blue-300 resize-y"
    />
  </div>
);

// --- Date Picker (Wrapper) ---
export const DatePicker = ({ label, value, onChange, disabled }) => (
  <Input
    type="date"
    label={label}
    value={value}
    onChange={onChange}
    disabled={disabled}
    // "calendar_month" is a valid Material Symbol icon name
    icon="calendar_month" 
  />
);