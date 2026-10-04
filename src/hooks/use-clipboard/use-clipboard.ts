import { useEffect, useRef, useState } from 'react';
import { durations } from '@/constants/durations';

/**
 * Copies text to the clipboard and flags it as `copied` for a moment, long
 * enough for a "copied" feedback. Copying again restarts the moment.
 *
 * @param resetAfter - How long `copied` stays `true`, in milliseconds.
 * @returns `copied`, and `copy`, which resolves to whether the copy worked;
 * a refused copy (no permission, insecure context) leaves `copied` alone.
 */
export function useClipboard(resetAfter = durations.copyFeedback) {
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
