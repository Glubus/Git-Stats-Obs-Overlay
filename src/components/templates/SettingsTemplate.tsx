import React from 'react';
import { Settings } from 'lucide-react';
import { useTranslation } from '../../i18n';
import { SettingsForm } from '../molecules/settings/SettingsForm';
import type { MarqueeSettings, Theme, Layout, Language } from '../../types/settings';
import { useSettingsForm } from '../../hooks/useSettingsForm';

interface SettingsTemplateProps {
  currentPath: string;
  currentTheme: Theme;
  currentLayout: Layout;
  currentLanguage: Language;
  currentMarquee: MarqueeSettings;
  error?: string;
  onPathChange: (path: string) => void;
  onThemeChange: (theme: Theme) => void;
  onLayoutChange: (layout: Layout) => void;
  onLanguageChange: (language: Language) => void;
  onMarqueeChange: (settings: Partial<MarqueeSettings>) => void;
  onPreviewTheme: (theme: Theme) => void;
}

export const SettingsTemplate: React.FC<SettingsTemplateProps> = ({
  currentPath,
  currentTheme,
  currentLayout,
  currentLanguage,
  currentMarquee,
  error,
  onPathChange,
  onThemeChange,
  onLayoutChange,
  onLanguageChange,
  onMarqueeChange,
  onPreviewTheme
}) => {
  const { t } = useTranslation(currentLanguage);
  const [isOpen, setIsOpen] = React.useState(false);

  const { localPath, handlePathChange, handleSave } = useSettingsForm({
    initialPath: currentPath,
    initialTheme: currentTheme,
    initialLayout: currentLayout,
    initialLanguage: currentLanguage,
    initialMarquee: currentMarquee,
    onSave: (path) => {
      onPathChange(path);
      setIsOpen(false);
    },
    onThemeChange,
    onLayoutChange,
    onLanguageChange,
    onMarqueeChange
  });

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          className="btn btn-circle btn-ghost bg-base-200 hover:bg-base-300"
          onClick={() => setIsOpen(true)}
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>

      <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">{t('settings.title')}</h3>
          
          <SettingsForm
            path={localPath}
            theme={currentTheme}
            layout={currentLayout}
            language={currentLanguage}
            marquee={currentMarquee}
            error={error}
            onPathChange={handlePathChange}
            onThemeChange={onThemeChange}
            onLayoutChange={onLayoutChange}
            onLanguageChange={onLanguageChange}
            onMarqueeChange={onMarqueeChange}
            onSave={handleSave}
          />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setIsOpen(false)}>close</button>
        </form>
      </dialog>
    </>
  );
}; 