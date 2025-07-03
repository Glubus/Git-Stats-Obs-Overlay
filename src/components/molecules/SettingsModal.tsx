import React from 'react';
import { Settings } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  path: string;
  theme: string;
  layout: 'horizontal' | 'vertical';
  onPathChange: (path: string) => void;
  onThemeChange: (theme: string) => void;
  onLayoutChange: (layout: 'horizontal' | 'vertical') => void;
  onSave: () => void;
}

const THEMES = [
  'light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave',
  'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua',
  'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula',
  'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee',
  'winter', 'dim', 'nord', 'sunset'
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onOpenChange,
  path,
  theme,
  layout,
  onPathChange,
  onThemeChange,
  onLayoutChange,
  onSave
}) => {
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
          <h3 className="font-bold text-lg mb-4">Paramètres</h3>
          
          <div className="form-control w-full mb-4">
            <label className="label">
              <span className="label-text">Chemin du projet</span>
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
              <span className="label-text">Thème</span>
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
              <span className="label-text">Disposition</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={layout}
              onChange={(e) => onLayoutChange(e.target.value as 'horizontal' | 'vertical')}
            >
              <option value="horizontal">Horizontale</option>
              <option value="vertical">Verticale</option>
            </select>
          </div>

          <div className="modal-action">
            <button className="btn" onClick={() => onOpenChange(false)}>Annuler</button>
            <button className="btn btn-primary" onClick={onSave}>Sauvegarder</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => onOpenChange(false)}>close</button>
        </form>
      </dialog>
    </>
  );
}; 