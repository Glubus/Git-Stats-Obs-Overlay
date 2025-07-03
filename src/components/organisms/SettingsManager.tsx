import React, { useState } from 'react';
import { SettingsModal } from '../molecules/SettingsModal';
import { useLanguage } from '../../hooks/useLanguage';
import type { Language } from '../../i18n';

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
  const { language, changeLanguage } = useLanguage();

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
      language={language}
      onPathChange={setPath}
      onThemeChange={setTheme}
      onLayoutChange={setLayout}
      onLanguageChange={changeLanguage}
      onSave={handleSave}
    />
  );
}; 