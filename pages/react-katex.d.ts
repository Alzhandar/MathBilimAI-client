declare module 'react-katex' {
    import { ComponentType } from 'react';
  
    interface KatexProps {
      children?: string;
      displayMode?: boolean;
      errorColor?: string;
      renderError?: (error: Error) => React.ReactNode;
      throwOnError?: boolean;
      macros?: { [key: string]: string };
      strict?: boolean | 'warn' | 'error' | 'ignore';
      trust?: boolean | ((context: { command: string; url: string }) => boolean);
    }
  
    export const InlineMath: ComponentType<KatexProps>;
    export const BlockMath: ComponentType<KatexProps>;
  }
  