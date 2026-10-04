import { useSyncExternalStore } from 'react';

/**
 * Whether the document matches the media `query`, updated when it changes
 * (window resize, motion preference…).
 *
 * @param query - A media query, e.g. one of `mediaQueries`.
 * @returns `true` while the query matches.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', onChange);

      return () => list.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
  );
}
