import { en } from './translations/en';
import { fr } from './translations/fr';
import { zh } from './translations/zh';

export type Language = 'en' | 'fr' | 'zh';

const translations = {
  en,
  fr,
  zh,
};

export const useTranslation = (lang: Language = 'fr') => {
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[lang];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return value || key;
  };

  return { t };
}; 