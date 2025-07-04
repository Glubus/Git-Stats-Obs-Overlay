import React from 'react';
import { useSettings } from '../../../contexts/SettingsContext';
import { SettingsModal } from './SettingsModal';

export const SettingsManager: React.FC = () => {
  const { theme, layout, language, path, marquee, setTheme, setLayout, setLanguage, setPath, setMarqueeSettings, previewTheme } = useSettings();
  const [error, setError] = React.useState<string>();

  // Log initial settings state
  React.useEffect(() => {
    console.log('🔧 Settings state:', {
      theme,
      layout,
      language,
      marquee,
      path
    });
  }, [theme, layout, language, marquee, path]);

  const handlePathChange = (newPath: string) => {
    console.log('📁 Changing path to:', newPath);
    try {
      setPath(newPath);
      setError(undefined);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Une erreur est survenue';
      console.error('❌ Path change error:', errorMsg);
      setError(errorMsg);
    }
  };

  return (
    <SettingsModal
      currentPath={path}
      currentTheme={theme}
      currentLayout={layout}
      currentLanguage={language}
      currentMarquee={marquee}
      error={error}
      onPathChange={handlePathChange}
      onThemeChange={(newTheme) => {
        console.log('🎨 Changing theme to:', newTheme);
        setTheme(newTheme);
      }}
      onLayoutChange={(newLayout) => {
        console.log('📐 Changing layout to:', newLayout);
        setLayout(newLayout);
      }}
      onLanguageChange={(newLanguage) => {
        console.log('🌍 Changing language to:', newLanguage);
        setLanguage(newLanguage);
      }}
      onMarqueeChange={(newMarqueeSettings) => {
        console.log('✨ Updating marquee settings:', newMarqueeSettings);
        setMarqueeSettings(newMarqueeSettings);
      }}
      onPreviewTheme={(newTheme) => {
        console.log('👀 Previewing theme:', newTheme);
        previewTheme(newTheme);
      }}
    />
  );
}; 