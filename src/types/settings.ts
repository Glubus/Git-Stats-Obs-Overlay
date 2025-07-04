export type Language = 'en' | 'fr' | 'zh';
export type Layout = 'horizontal' | 'vertical';
export type Theme =
  | 'light'
  | 'dark'
  | 'cupcake'
  | 'bumblebee'
  | 'emerald'
  | 'corporate'
  | 'synthwave'
  | 'retro'
  | 'cyberpunk'
  | 'valentine'
  | 'halloween'
  | 'garden'
  | 'forest'
  | 'aqua'
  | 'lofi'
  | 'pastel'
  | 'fantasy'
  | 'wireframe'
  | 'black'
  | 'luxury'
  | 'dracula'
  | 'cmyk'
  | 'autumn'
  | 'business'
  | 'acid'
  | 'lemonade'
  | 'night'
  | 'coffee'
  | 'winter'
  | 'dim'
  | 'nord'
  | 'sunset';

export interface MarqueeSettings {
  speed: number;
  enabled: boolean;
  minLengthToActivate: number;
}

export interface Settings {
  theme: Theme;
  layout: Layout;
  language: Language;
  path: string;
  marquee: MarqueeSettings;
}

export interface SettingsOption<T extends string> {
  value: T;
  label: string;
  icon?: string;
}

export interface LanguageOption extends SettingsOption<Language> {
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { value: 'en', label: 'English', flag: '🇬🇧' },
  { value: 'fr', label: 'Français', flag: '🇫🇷' },
  { value: 'zh', label: '中文', flag: '🇨🇳' }
] as const;

export const LAYOUTS: SettingsOption<Layout>[] = [
  { value: 'horizontal', label: 'settings.layouts.horizontal' },
  { value: 'vertical', label: 'settings.layouts.vertical' }
] as const;

export const THEMES: SettingsOption<Theme>[] = [
  { value: 'light', label: 'settings.themes.light' },
  { value: 'dark', label: 'settings.themes.dark' },
  { value: 'cupcake', label: 'settings.themes.cupcake' },
  { value: 'bumblebee', label: 'settings.themes.bumblebee' },
  { value: 'emerald', label: 'settings.themes.emerald' },
  { value: 'corporate', label: 'settings.themes.corporate' },
  { value: 'synthwave', label: 'settings.themes.synthwave' },
  { value: 'retro', label: 'settings.themes.retro' },
  { value: 'cyberpunk', label: 'settings.themes.cyberpunk' },
  { value: 'valentine', label: 'settings.themes.valentine' },
  { value: 'halloween', label: 'settings.themes.halloween' },
  { value: 'garden', label: 'settings.themes.garden' },
  { value: 'forest', label: 'settings.themes.forest' },
  { value: 'aqua', label: 'settings.themes.aqua' },
  { value: 'lofi', label: 'settings.themes.lofi' },
  { value: 'pastel', label: 'settings.themes.pastel' },
  { value: 'fantasy', label: 'settings.themes.fantasy' },
  { value: 'wireframe', label: 'settings.themes.wireframe' },
  { value: 'black', label: 'settings.themes.black' },
  { value: 'luxury', label: 'settings.themes.luxury' },
  { value: 'dracula', label: 'settings.themes.dracula' },
  { value: 'cmyk', label: 'settings.themes.cmyk' },
  { value: 'autumn', label: 'settings.themes.autumn' },
  { value: 'business', label: 'settings.themes.business' },
  { value: 'acid', label: 'settings.themes.acid' },
  { value: 'lemonade', label: 'settings.themes.lemonade' },
  { value: 'night', label: 'settings.themes.night' },
  { value: 'coffee', label: 'settings.themes.coffee' },
  { value: 'winter', label: 'settings.themes.winter' },
  { value: 'dim', label: 'settings.themes.dim' },
  { value: 'nord', label: 'settings.themes.nord' },
  { value: 'sunset', label: 'settings.themes.sunset' }
] as const; 