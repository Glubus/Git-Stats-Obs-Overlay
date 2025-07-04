import React, { createContext, useContext, ReactNode } from 'react';
import type { Language } from '../types/settings';
import { useSettings } from '../contexts/SettingsContext';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { language, setLanguage } = useSettings();

  return (
    <LanguageContext.Provider value={{ 
      language, 
      changeLanguage: (lang: Language) => {
        console.log('🌍 Language - Changing to:', lang);
        setLanguage(lang);
      }
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 