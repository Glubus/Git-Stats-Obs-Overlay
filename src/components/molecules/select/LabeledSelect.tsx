import React from 'react';
import { CustomSelect, type CustomSelectOption } from '../../atoms/select/CustomSelect';

interface LabeledSelectProps<T extends string = string> {
  label: string;
  value: T;
  options: CustomSelectOption<T>[];
  onChange: (value: T) => void;
  className?: string;
  renderOption?: (option: CustomSelectOption<T>) => React.ReactNode;
}

export const LabeledSelect = <T extends string = string>({
  label,
  value,
  options,
  onChange,
  className = '',
  renderOption
}: LabeledSelectProps<T>) => {
  return (
    <div className={`form-control w-full ${className}`}>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <CustomSelect
        value={value}
        options={options}
        onChange={onChange}
        renderOption={renderOption}
      />
    </div>
  );
}; 