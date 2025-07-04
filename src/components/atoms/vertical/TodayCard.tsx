import React from 'react';
import { GitCommit, Plus, Minus } from 'lucide-react';

interface TodayCardProps {
  title: string;
  value: number;
  type: 'commits' | 'additions' | 'deletions';
}

export const TodayCard: React.FC<TodayCardProps> = ({ title, value, type }) => {
  const getIcon = () => {
    switch (type) {
      case 'commits':
        return <GitCommit className="w-6 h-6" />;
      case 'additions':
        return <Plus className="w-6 h-6" />;
      case 'deletions':
        return <Minus className="w-6 h-6" />;
    }
  };

  const getColorClass = () => {
    switch (type) {
      case 'commits':
        return 'text-primary';
      case 'additions':
        return 'text-success';
      case 'deletions':
        return 'text-error';
    }
  };

  return (
    <div className="stat p-4 w-full">
      <div className="flex justify-between items-center">
        <div>
          <div className="stat-title text-lg mb-1">{title}</div>
          <div className={`stat-value text-2xl ${getColorClass()}`}>{value}</div>
        </div>
        <div className={`stat-figure ${getColorClass()}`}>
          {getIcon()}
        </div>
      </div>
    </div>
  );
}; 