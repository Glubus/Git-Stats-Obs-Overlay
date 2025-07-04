import React from 'react';
import { MainTemplate } from './components/templates/MainTemplate';
import { SettingsProvider } from './contexts/SettingsContext';
import { LanguageProvider } from './i18n/LanguageContext';
import './App.css';

export const App: React.FC = () => {
  return (
    <SettingsProvider>
      <LanguageProvider>
        <MainTemplate />
      </LanguageProvider>
    </SettingsProvider>
  );
};
