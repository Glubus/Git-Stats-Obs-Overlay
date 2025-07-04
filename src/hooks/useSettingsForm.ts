import { useState, useCallback } from 'react';
import type { Theme, Layout, Language, MarqueeSettings } from '../types/settings';

interface UseSettingsFormProps {
  initialPath: string;
  initialTheme: Theme;
  initialLayout: Layout;
  initialLanguage: Language;
  initialMarquee: MarqueeSettings;
  onSave: (path: string) => void;
  onThemeChange: (theme: Theme) => void;
  onLayoutChange: (layout: Layout) => void;
  onLanguageChange: (language: Language) => void;
  onMarqueeChange: (settings: Partial<MarqueeSettings>) => void;
}

interface UseSettingsFormReturn {
  localPath: string;
  handlePathChange: (path: string) => void;
  handleSave: () => void;
}

export const useSettingsForm = ({
  initialPath,
  onSave,
}: UseSettingsFormProps): UseSettingsFormReturn => {
  const [localPath, setLocalPath] = useState(initialPath);

  const handlePathChange = useCallback((path: string) => {
    console.log('✏️ Local path change:', path);
    setLocalPath(path);
  }, []);

  const handleSave = useCallback(() => {
    console.log('💾 Saving settings...');
    onSave(localPath);
  }, [localPath, onSave]);

  return {
    localPath,
    handlePathChange,
    handleSave
  };
}; 