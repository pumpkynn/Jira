/// <reference types="react-scripts" />

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare module 'react-dom' {
  export function render(element: any, container: any): any;
}