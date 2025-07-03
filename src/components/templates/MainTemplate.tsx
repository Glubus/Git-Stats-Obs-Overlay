import React, { ReactNode } from 'react';

interface MainTemplateProps {
  theme: string;
  header?: ReactNode;
  children: ReactNode;
}

export const MainTemplate: React.FC<MainTemplateProps> = ({
  theme,
  header,
  children
}) => {
  return (
    <div data-theme={theme} className="min-h-screen compact-layout">
      <div className="container mx-auto">
        {children}
      </div>
      {header && (
        <div className="fixed bottom-4 right-4">
          {header}
        </div>
      )}
    </div>
  );
}; 