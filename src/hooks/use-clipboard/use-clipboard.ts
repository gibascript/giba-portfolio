import { useEffect, useRef, useState } from 'react';
import { durations } from '@/constants/durations';

/**
 * Clipboard state: `copied` stays `true` for a moment after a copy, and `copy`
 * resolves to whether the copy worked.
 */
export type Clipboard = {
  copied: boolean;
  copy: (text: string) => Promise<boolean>;
};

/**
 * Copies text to the clipboard and flags it as `copied` for a moment, long
 * enough for a "copied" feedback. Copying again restarts the moment; a refused
 * copy (no permission, insecure context) leaves `copied` alone.
 *
 * @param resetAfter - How long `copied` stays `true`, in milliseconds.
 */
export function useClipboard(resetAfter = durations.copyFeedback): Clipboard {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return false;
    }

    clearTimeout(timer.current);
    setCopied(true);
    timer.current = window.setTimeout(() => setCopied(false), resetAfter);

    return true;
  };

  return { copied, copy };
}
