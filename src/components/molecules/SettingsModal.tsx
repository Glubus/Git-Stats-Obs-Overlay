import React from 'react';
import { Settings } from 'lucide-react';
import type { Language } from '../../i18n';
import { useTranslation } from '../../i18n';

interface SettingsModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  path: string;
  theme: string;
  layout: 'horizontal' | 'vertical';
  language: Language;
  onPathChange: (path: string) => void;
  onThemeChange: (theme: string) => void;
  onLayoutChange: (layout: 'horizontal' | 'vertical') => void;
  onLanguageChange: (lang: Language) => void;
  onSave: () => void;
}

const THEMES = [
  'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave',
  'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua',
  'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula',
  'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee',
  'winter', 'dim', 'nord', 'sunset'
];

const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onOpenChange,
  path,
  theme,
  layout,
  language,
  onPathChange,
  onThemeChange,
  onLayoutChange,
  onLanguageChange,
  onSave
}) => {
  const { t } = useTranslation(language);

  return (
    <>
      <button 
        className="btn btn-circle btn-ghost"
        onClick={() => onOpenChange(true)}
      >
        <Settings className="w-6 h-6" />
      </button>

      <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">{t('settings.title')}</h3>
          
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">{t('settings.projectPath')}</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={path}
              onChange={(e) => onPathChange(e.target.value)}
              placeholder="Chemin vers le projet Git"
            />
          </div>

          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">{t('settings.theme')}</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={theme}
              onChange={(e) => onThemeChange(e.target.value)}
            >
              {THEMES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">{t('settings.layout')}</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={layout}
              onChange={(e) => onLayoutChange(e.target.value as 'horizontal' | 'vertical')}
            >
              <option value="horizontal">{t('settings.layoutHorizontal')}</option>
              <option value="vertical">{t('settings.layoutVertical')}</option>
            </select>
          </div>

          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Language</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>{lang.label}</option>
              ))}
            </select>
          </div>

          <div className="modal-action">
            <button className="btn" onClick={() => onOpenChange(false)}>{t('settings.cancel')}</button>
            <button className="btn btn-primary" onClick={onSave}>{t('settings.save')}</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => onOpenChange(false)}>close</button>
        </form>
      </dialog>
    </>
  );
}; 