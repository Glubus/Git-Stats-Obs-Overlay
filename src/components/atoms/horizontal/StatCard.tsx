import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  className = ''
}) => {
  return (
    <div className={`card ${className}`}>
      <div className="card-body p-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4" />
            <div className="text-sm">{label}</div>
          </div>
          <div className="text-lg font-bold">{value}</div>
        </div>
      </div>
    </div>
  );
}; 