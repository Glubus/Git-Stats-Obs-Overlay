import React, { useState } from 'react';
import { SettingsModal } from '../molecules/SettingsModal';

interface SettingsManagerProps {
  currentPath: string;
  currentTheme: string;
  onPathChange: (path: string) => void;
  onThemeChange: (theme: string) => void;
}

export const SettingsManager: React.FC<SettingsManagerProps> = ({
  currentPath,
  currentTheme,
  onPathChange,
  onThemeChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState(currentPath);
  const [theme, setTheme] = useState(currentTheme);

  const handleSave = () => {
    onPathChange(path);
    onThemeChange(theme);
    setIsOpen(false);
  };

  return (
    <SettingsModal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      path={path}
      theme={theme}
      onPathChange={setPath}
      onThemeChange={setTheme}
      onSave={handleSave}
    />
  );
}; 