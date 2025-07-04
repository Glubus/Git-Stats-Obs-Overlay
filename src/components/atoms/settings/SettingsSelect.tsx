import React from 'react';
import { FR, GB, CN } from 'country-flag-icons/react/3x2';
import type { SettingsOption, LanguageOption } from '../../../types/settings';
import { LabeledSelect } from '../../molecules/select/LabeledSelect';
import type { CustomSelectOption } from '../select/CustomSelect';

interface SettingsSelectProps<T extends string> {
  label: string;
  value: T;
  options: (SettingsOption<T> | LanguageOption)[];
  onChange: (value: T) => void;
  className?: string;
  type?: 'language' | 'default';
}

const FlagIcon: React.FC<{ language: string }> = ({ language }) => {
  switch (language) {
    case 'fr':
      return <FR className="w-6 h-4" />;
    case 'en':
      return <GB className="w-6 h-4" />;
    case 'zh':
      return <CN className="w-6 h-4" />;
    default:
      return null;
  }
};

export const SettingsSelect = <T extends string>({
  label,
  value,
  options,
  onChange,
  className = '',
  type = 'default'
}: SettingsSelectProps<T>) => {
  const customOptions = options.map(option => ({
    value: option.value,
    label: option.label,
    icon: type === 'language' ? <FlagIcon language={option.value} /> : undefined
  })) as CustomSelectOption<T>[];

  const renderOption = (option: CustomSelectOption<T>) => (
    <span className="flex items-center gap-2">
      {option.icon}
      {option.label}
    </span>
  );

  return (
    <LabeledSelect
      label={label}
      value={value}
      options={customOptions}
      onChange={onChange}
      className={className}
      renderOption={type === 'language' ? renderOption : undefined}
    />
  );
}; 