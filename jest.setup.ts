import '@testing-library/jest-dom';
import React from 'react';

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    const { priority, ...rest } = props;
    return React.createElement('img', rest);
  },
}))

// Mock framer-motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ whileHover, whileTap, children, ...props }: any) =>
      React.createElement('div', props, children),
    article: ({ whileHover, whileTap, children, ...props }: any) =>
      React.createElement('article', props, children),
    header: ({ whileHover, whileTap, children, ...props }: any) =>
      React.createElement('header', props, children),
  },
  AnimatePresence: ({ children }: any) => React.createElement(React.Fragment, null, children),
}));

// Mock window.open
Object.defineProperty(window, "open", {
  writable: true,
  value: jest.fn(),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  root = null;
  rootMargin = '';
  thresholds = [];
  takeRecords() { return []; }
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}