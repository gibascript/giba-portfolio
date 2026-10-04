import { useEffect, useState } from 'react';

/**
 * The current date, refreshed every `interval` milliseconds.
 *
 * @param interval - Refresh period; one second for a clock with seconds.
 */
export function useNow(interval = 1000) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), interval);

    return () => window.clearInterval(timer);
  }, [interval]);

  return now;
}
