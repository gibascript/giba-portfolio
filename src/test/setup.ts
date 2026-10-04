import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';
import { mockMatchMedia } from './match-media';

// jsdom has no matchMedia; tests start with no media query matching.
beforeEach(() => {
  mockMatchMedia(false);
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.unstubAllGlobals();
});
