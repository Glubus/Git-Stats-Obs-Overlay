import React from 'react';
import { DashboardPage } from './pages/DashboardPage';
import { LanguageProvider } from './i18n/LanguageContext';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <DashboardPage />
    </LanguageProvider>
  );
}

export default App;
