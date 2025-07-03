import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface IconProps {
  icon: LucideIcon;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ icon: IconComponent, className = '' }) => {
  return <IconComponent className={className} />;
}; 