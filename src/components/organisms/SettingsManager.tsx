import React, { useState } from 'react';
import { SettingsModal } from '../molecules/SettingsModal';

interface SettingsManagerProps {
  currentPath: string;
  currentTheme: string;
  currentLayout: 'horizontal' | 'vertical';
  onPathChange: (path: string) => void;
  onThemeChange: (theme: string) => void;
  onLayoutChange: (layout: 'horizontal' | 'vertical') => void;
}

export const SettingsManager: React.FC<SettingsManagerProps> = ({
  currentPath,
  currentTheme,
  currentLayout,
  onPathChange,
  onThemeChange,
  onLayoutChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState(currentPath);
  const [theme, setTheme] = useState(currentTheme);
  const [layout, setLayout] = useState(currentLayout);

  const handleSave = () => {
    onPathChange(path);
    onThemeChange(theme);
    onLayoutChange(layout);
    setIsOpen(false);
  };

  return (
    <SettingsModal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      path={path}
      theme={theme}
      layout={layout}
      onPathChange={setPath}
      onThemeChange={setTheme}
      onLayoutChange={setLayout}
      onSave={handleSave}
    />
  );
}; 