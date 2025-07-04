import React from 'react';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsProvider } from './contexts/SettingsContext';
import { LanguageProvider } from './i18n/LanguageContext';
import './App.css';

export const App: React.FC = () => {
  return (
    <SettingsProvider>
      <LanguageProvider>
        <DashboardPage />
      </LanguageProvider>
    </SettingsProvider>
  );
};
