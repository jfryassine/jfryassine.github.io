declare module '*.svg' {
  import type { FunctionComponent, SVGProps } from 'react';
  export const ReactComponent: FunctionComponent<SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.scss' {
  const content: { [className: string]: string } | string;
  export default content;
}

declare module '*.css';

declare module 'radium' {
  import type { ComponentType, PropsWithChildren } from 'react';
  export function StyleRoot(props: PropsWithChildren<unknown>): JSX.Element;
  export function keyframes(animation: unknown, name?: string): string;
  export default function Radium<T extends ComponentType<any>>(component: T): T;
}

declare module 'react-animations' {
  export const fadeIn: unknown;
  export const slideInLeft: unknown;
  export const slideInRight: unknown;
  export const slideInUp: unknown;
}

declare module 'smoothscroll-polyfill' {
  const smoothscroll: {
    polyfill: () => void;
  };
  export default smoothscroll;
}

declare module 'ityped' {
  type InitOptions = {
    backDelay?: number;
    backSpeed?: number;
    showCursor?: boolean;
    strings: string[];
  } & Record<string, unknown>;
  export function init(element: HTMLElement, options: InitOptions): void;
}
