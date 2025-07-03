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
      {header && (
        <div className="absolute top-4 right-4 z-10">
          {header}
        </div>
      )}
      {children}
    </div>
  );
}; 