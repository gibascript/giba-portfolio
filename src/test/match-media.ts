import { vi } from 'vitest';

/**
 * Replaces `window.matchMedia`, which jsdom lacks, with a fake whose answer
 * the test controls.
 *
 * @param matches - Whether every query matches at first.
 * @returns `setMatches`, which changes the answer and notifies the listeners.
 */
export function mockMatchMedia(matches = false) {
  let current = matches;
  const listeners = new Set<EventListener>();

  vi.stubGlobal('matchMedia', (query: string): Partial<MediaQueryList> => ({
    media: query,
    get matches() {
      return current;
    },
    addEventListener: (_type: string, listener: EventListener) => {
      listeners.add(listener);
    },
    removeEventListener: (_type: string, listener: EventListener) => {
      listeners.delete(listener);
    },
  }));

  return {
    setMatches(next: boolean) {
      current = next;
      listeners.forEach((listener) => listener(new Event('change')));
    },
  };
}
