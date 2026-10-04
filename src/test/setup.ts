import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeEach, vi } from 'vitest';
import { installDialogPolyfill } from './dialog';
import { mockMatchMedia } from './match-media';

installDialogPolyfill();

// jsdom has no matchMedia; tests start with no media query matching.
beforeEach(() => {
  mockMatchMedia(false);
});

afterEach(() => {
  cleanup();
  localStorage.clear();
  window.history.replaceState(null, '', '/');
  vi.unstubAllGlobals();
});
