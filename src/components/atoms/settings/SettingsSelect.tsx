import React from 'react';
import type { SettingsOption, LanguageOption } from '../../../types/settings';

interface SettingsSelectProps<T extends string> {
  label: string;
  value: T;
  options: (SettingsOption<T> | LanguageOption)[];
  onChange: (value: T) => void;
  className?: string;
  type?: 'language' | 'default';
}

export const SettingsSelect = <T extends string>({
  label,
  value,
  options,
  onChange,
  className = '',
  type = 'default'
}: SettingsSelectProps<T>) => {
  const isLanguageOption = (option: SettingsOption<T> | LanguageOption): option is LanguageOption => {
    return type === 'language' && 'flag' in option;
  };

  return (
    <div className={`form-control w-full ${className}`}>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="select select-bordered w-full"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {isLanguageOption(option) ? `${option.flag} ${option.label}` : option.label}
          </option>
        ))}
      </select>
    </div>
  );
}; 