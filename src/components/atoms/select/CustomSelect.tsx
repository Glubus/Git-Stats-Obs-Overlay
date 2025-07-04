import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useClickOutside } from '../../../hooks/useClickOutside';

export interface CustomSelectOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

interface CustomSelectProps<T extends string = string> {
  value: T;
  options: CustomSelectOption<T>[];
  onChange: (value: T) => void;
  className?: string;
  renderOption?: (option: CustomSelectOption<T>) => React.ReactNode;
}

export const CustomSelect = <T extends string = string>({
  value,
  options,
  onChange,
  className = '',
  renderOption
}: CustomSelectProps<T>) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false));

  const currentOption = options.find(opt => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      <button
        type="button"
        className="select select-bordered w-full flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
          {renderOption ? renderOption(currentOption!) : currentOption?.label}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <ul className="absolute z-50 w-full mt-1 bg-base-100 rounded-lg shadow-lg border border-base-300 max-h-60 overflow-auto">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={`w-full px-4 py-2 text-left hover:bg-base-200 flex items-center gap-2 ${
                  option.value === value ? 'bg-base-200' : ''
                }`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {renderOption ? renderOption(option) : option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}; 