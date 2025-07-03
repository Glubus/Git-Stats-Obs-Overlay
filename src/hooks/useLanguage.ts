import { useLanguageContext } from '../i18n/LanguageContext';

export const useLanguage = () => {
  const { language, setLanguage: changeLanguage } = useLanguageContext();
  return { language, changeLanguage };
}; 