import React from 'react';
import { useTranslation } from '../../../i18n';
import { SettingsInput } from '../../atoms/settings/SettingsInput';
import { SettingsSelect } from '../../atoms/settings/SettingsSelect';
import { LANGUAGES, LAYOUTS, THEMES, type Theme, type Layout, type Language, type MarqueeSettings } from '../../../types/settings';

interface SettingsFormProps {
  path: string;
  theme: Theme;
  layout: Layout;
  language: Language;
  marquee: MarqueeSettings;
  error?: string;
  onPathChange: (path: string) => void;
  onThemeChange: (theme: Theme) => void;
  onLayoutChange: (layout: Layout) => void;
  onLanguageChange: (language: Language) => void;
  onMarqueeChange: (settings: Partial<MarqueeSettings>) => void;
  onSave: () => void;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  path,
  theme,
  layout,
  language,
  marquee,
  error,
  onPathChange,
  onThemeChange,
  onLayoutChange,
  onLanguageChange,
  onMarqueeChange,
  onSave
}) => {
  const { t } = useTranslation(language);

  // Log form state changes
  React.useEffect(() => {
    console.log('📝 Settings form current state:', {
      path,
      theme,
      layout,
      language,
      marquee,
      error
    });
  }, [path, theme, layout, language, marquee, error]);

  const translatedThemes = THEMES.map(theme => ({
    ...theme,
    label: t(theme.label)
  }));

  const translatedLayouts = LAYOUTS.map(layout => ({
    ...layout,
    label: t(layout.label)
  }));

  return (
    <div className="flex flex-col gap-4">
      <SettingsInput
        label={t('settings.gitPath')}
        value={path}
        onChange={(newPath) => {
          console.log('📁 Form path change:', newPath);
          onPathChange(newPath);
        }}
        error={error}
        type="path"
      />
      
      <SettingsSelect<Theme>
        label={t('settings.theme')}
        value={theme}
        options={translatedThemes}
        onChange={(newTheme) => {
          console.log('🎨 Form theme change:', newTheme);
          onThemeChange(newTheme);
        }}
      />
      
      <SettingsSelect<Layout>
        label={t('settings.layout')}
        value={layout}
        options={translatedLayouts}
        onChange={(newLayout) => {
          console.log('📐 Form layout change:', newLayout);
          onLayoutChange(newLayout);
        }}
      />
      
      <SettingsSelect<Language>
        label={t('settings.language')}
        value={language}
        options={LANGUAGES}
        onChange={(newLanguage) => {
          console.log('🌍 Form language change:', newLanguage);
          onLanguageChange(newLanguage);
        }}
        type="language"
      />

      <div className="divider">{t('settings.marquee.title')}</div>

      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">{t('settings.marquee.enabled')}</span>
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={marquee.enabled}
            onChange={(e) => {
              console.log('✨ Form marquee enabled change:', e.target.checked);
              onMarqueeChange({ enabled: e.target.checked });
            }}
          />
        </label>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">{t('settings.marquee.speed')}</span>
          <span className="label-text-alt">{marquee.speed}</span>
        </label>
        <input
          type="range"
          min="10"
          max="100"
          value={marquee.speed}
          onChange={(e) => {
            const newSpeed = parseInt(e.target.value, 10);
            console.log('🏃 Form marquee speed change:', newSpeed);
            onMarqueeChange({ speed: newSpeed });
          }}
          className="range range-primary"
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">{t('settings.marquee.minLength')}</span>
          <span className="label-text-alt">{marquee.minLengthToActivate}</span>
        </label>
        <input
          type="range"
          min="10"
          max="100"
          value={marquee.minLengthToActivate}
          onChange={(e) => {
            const newMinLength = parseInt(e.target.value, 10);
            console.log('📏 Form marquee min length change:', newMinLength);
            onMarqueeChange({ minLengthToActivate: newMinLength });
          }}
          className="range range-primary"
        />
      </div>

      <div className="modal-action mt-6">
        <button className="btn btn-primary w-full" onClick={() => {
          console.log('💾 Form save clicked');
          onSave();
        }}>
          {t('common.save')}
        </button>
      </div>
    </div>
  );
}; 