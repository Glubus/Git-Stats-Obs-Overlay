import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Theme, Layout, Language, Settings, MarqueeSettings } from '../types/settings';

interface SettingsContextType extends Settings {
  setTheme: (theme: Theme) => void;
  setLayout: (layout: Layout) => void;
  setLanguage: (language: Language) => void;
  setPath: (path: string) => void;
  setMarqueeSettings: (settings: Partial<MarqueeSettings>) => void;
  previewTheme: (theme: Theme) => void;
}

const DEFAULT_SETTINGS: Settings = {
  theme: 'dark',
  layout: 'horizontal',
  language: 'fr',
  path: '.',
  marquee: {
    speed: 40,
    enabled: true,
    minLengthToActivate: 30
  }
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const setTheme = useCallback((theme: Theme) => {
    console.log('🎨 Settings - Setting theme:', theme);
    setSettings(prev => ({ ...prev, theme }));
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  const setLayout = useCallback((layout: Layout) => {
    console.log('📐 Settings - Setting layout:', layout);
    setSettings(prev => ({ ...prev, layout }));
  }, []);

  const setLanguage = useCallback((language: Language) => {
    console.log('🌍 Settings - Setting language:', language);
    setSettings(prev => ({ ...prev, language }));
  }, []);

  const setPath = useCallback((path: string) => {
    console.log('📁 Settings - Setting path:', path);
    setSettings(prev => ({ ...prev, path }));
  }, []);

  const setMarqueeSettings = useCallback((marqueeSettings: Partial<MarqueeSettings>) => {
    console.log('✨ Settings - Updating marquee settings:', marqueeSettings);
    setSettings(prev => ({
      ...prev,
      marquee: { ...prev.marquee, ...marqueeSettings }
    }));
  }, []);

  const previewTheme = useCallback((theme: Theme) => {
    console.log('👀 Settings - Previewing theme:', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  const value = {
    ...settings,
    setTheme,
    setLayout,
    setLanguage,
    setPath,
    setMarqueeSettings,
    previewTheme
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}; 