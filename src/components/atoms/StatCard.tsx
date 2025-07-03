import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass: string;
  bgClass: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  colorClass,
  bgClass
}) => {
  return (
    <div className={`stat ${bgClass} rounded-lg p-4`}>
      <div className={`stat-figure ${colorClass}`}>
        {icon}
      </div>
      <div className="stat-title text-sm">{title}</div>
      <div className={`stat-value ${colorClass} text-2xl`}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
    </div>
  );
}; 