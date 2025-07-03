import React, { ReactNode } from 'react';

interface MainTemplateProps {
  theme: string;
  settingsComponent: ReactNode;
  mainContent: ReactNode;
}

export const MainTemplate: React.FC<MainTemplateProps> = ({
  theme,
  settingsComponent,
  mainContent
}) => {
  return (
    <div data-theme={theme} className="min-h-screen compact-layout">
      <div className="absolute bottom-4 left-4 z-10">
        {settingsComponent}
      </div>
      {mainContent}
    </div>
  );
}; 