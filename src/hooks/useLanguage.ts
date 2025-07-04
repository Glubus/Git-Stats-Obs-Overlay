import { useLanguage as useLanguageContext } from '../i18n/LanguageContext';

export const useLanguage = () => {
    const { language, changeLanguage } = useLanguageContext();
    return {
        language,
        changeLanguage
    };
}; 