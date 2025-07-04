import React from 'react';

interface SettingsInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: 'text' | 'path';
  className?: string;
}

export const SettingsInput: React.FC<SettingsInputProps> = ({
  label,
  value,
  onChange,
  error,
  type = 'text',
  className = ''
}) => {
  return (
    <div className={`form-control w-full ${className}`}>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`input input-bordered w-full ${error ? 'input-error' : ''}`}
        data-input-type={type}
      />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
}; 