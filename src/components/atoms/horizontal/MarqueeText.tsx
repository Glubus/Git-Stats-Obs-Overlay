import React from 'react';
import Marquee from 'react-fast-marquee';
import { useSettings } from '../../../contexts/SettingsContext';

interface MarqueeTextProps {
  text: string;
  className?: string;
}

export const MarqueeText: React.FC<MarqueeTextProps> = ({ text, className = '' }) => {
  const { marquee } = useSettings();

  if (!marquee.enabled || text.length < marquee.minLengthToActivate) {
    return (
      <div className={`${className} truncate`}>
        <span className="px-4">{text}</span>
      </div>
    );
  }

  // Convert speed to match react-fast-marquee expectations (higher = faster)
  const marqueeSpeed = Math.max(5, Math.min(200, marquee.speed * 2));

  // Create a unique key based on marquee settings to force recreation when they change
  const settingsKey = `${marquee.enabled}-${marquee.speed}-${marquee.minLengthToActivate}`;

  return (
    <div className={className}>
      <Marquee
        key={settingsKey}
        play={marquee.enabled}
        speed={marqueeSpeed}
        gradient={false}
        pauseOnHover
      >
        <span className="px-4">{text}</span>
      </Marquee>
    </div>
  );
}; 