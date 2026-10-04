import { useEffect } from 'react';

/**
 * Calls `onToggle` on ⌘K (Apple) or Ctrl K (elsewhere), anywhere on the page,
 * instead of the browser default for that shortcut.
 */
export function usePaletteShortcut(onToggle: () => void) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const modified = event.metaKey || event.ctrlKey;

      if (modified && !event.altKey && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onToggle();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onToggle]);
}
