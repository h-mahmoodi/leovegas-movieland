/* eslint-disable @typescript-eslint/no-unused-vars */
import '@testing-library/jest-dom';

// import '@testing-library/jest-dom/extend-expect';

import dotenv from 'dotenv';

// Load .env.test file
dotenv.config({ path: '.env.test' });

class IntersectionObserverMock {
  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {}
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});
Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});
