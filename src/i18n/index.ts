import en from './translations/en';
import fr from './translations/fr';
import zh from './translations/zh';

const translations = {
    en,
    fr,
    zh
};

export type Language = keyof typeof translations;

export const useTranslation = (language: Language) => {
    return {
        t: (key: string) => {
            const keys = key.split('.');
            let value: any = translations[language];
            
            for (const k of keys) {
                if (value && typeof value === 'object') {
                    value = value[k];
                } else {
                    return key;
                }
            }
            
            return typeof value === 'string' ? value : key;
        }
    };
}; 