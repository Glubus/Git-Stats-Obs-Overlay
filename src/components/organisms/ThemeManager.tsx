import React from 'react';

interface ThemeManagerProps {
  theme: string;
}

export const ThemeManager: React.FC<ThemeManagerProps> = ({ theme }) => {
  return (
    <div data-theme={theme} className="w-full h-full">
      {/* Le thème est maintenant géré par le composant parent */}
    </div>
  );
}; 