import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
  <span className={className}>+</span>
);

export const MinusIcon: React.FC<IconProps> = ({ className }) => (
  <span className={className}>-</span>
);

export const CommitIcon: React.FC<IconProps> = ({ className }) => (
  <span className={className}>📝</span>
);

export const RefreshIcon: React.FC<IconProps> = ({ className }) => (
  <span className={className}>🔄</span>
);

export const TrendingUpIcon: React.FC<IconProps> = ({ className }) => (
  <span className={className}>📈</span>
);

export const TrendingDownIcon: React.FC<IconProps> = ({ className }) => (
  <span className={className}>📉</span>
);

export const CalendarIcon: React.FC<IconProps> = ({ className }) => (
  <span className={className}>📅</span>
);

export const UserIcon: React.FC<IconProps> = ({ className }) => (
  <span className={className}>👤</span>
);

export const HashIcon: React.FC<IconProps> = ({ className }) => (
  <span className={className}>#</span>
);

export const ClockIcon: React.FC<IconProps> = ({ className }) => (
  <span className={className}>🕒</span>
);

export const FileTextIcon: React.FC<IconProps> = ({ className }) => (
  <span className={className}>📄</span>
); 