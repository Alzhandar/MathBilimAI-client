import React, { useEffect, ReactNode } from 'react';

interface MathJaxComponentProps {
  children: ReactNode;
}

const MathJaxComponent: React.FC<MathJaxComponentProps> = ({ children }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).MathJax) {
      (window as any).MathJax.typesetPromise().catch((err: any) => console.error('MathJax typeset failed: ', err));
    }
  }, [children]);

  return (
    <div>
      {children}
    </div>
  );
};

export default MathJaxComponent;
