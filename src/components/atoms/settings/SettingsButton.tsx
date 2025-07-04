import React from 'react';
import { Settings } from 'lucide-react';

interface SettingsButtonProps {
  onClick: () => void;
  className?: string;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`btn btn-ghost btn-circle ${className}`}
      aria-label="Ouvrir les paramètres"
    >
      <Settings className="w-5 h-5" />
    </button>
  );
}; 