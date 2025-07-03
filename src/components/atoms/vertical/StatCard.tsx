import React from 'react';
import { Icon } from '../../atoms/vertical/Icon';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  className = ''
}) => {
  return (
    <div className={`stats shadow ${className}`}>
      <div className="stat px-2 py-1">
        <div className="stat-figure">
          <Icon icon={icon} className="w-4 h-4" />
        </div>
        <div className="stat-title text-xs">{label}</div>
        <div className="stat-value text-lg">{value}</div>
      </div>
    </div>
  );
}; 