import { useEffect, useState } from 'react';

/** Typewriter timing, in milliseconds. */
const timing = {
  start: 400,
  type: 55,
  hold: 1800,
  erase: 24,
  pause: 280,
};

/**
 * Types each of `words` letter by letter, holds it, erases it and moves to the
 * next, looping. While `enabled` is false (reduced motion), it shows the first
 * word whole instead. Remount (`key`) to restart with new words.
 *
 * @param words - Words to type, in order; must not be empty.
 * @param enabled - Whether to animate.
 * @returns The text typed so far.
 */
export function useTypewriter(words: readonly string[], enabled: boolean) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let index = 0;
    let length = 0;
    let erasing = false;
    let timer = 0;

    const tick = () => {
      const word = words[index % words.length];
      length += erasing ? -1 : 1;
      setText(word.slice(0, length));

      let delay = erasing ? timing.erase : timing.type;
      if (!erasing && length >= word.length) {
        erasing = true;
        delay = timing.hold;
      } else if (erasing && length <= 0) {
        erasing = false;
        index += 1;
        delay = timing.pause;
      }
      timer = window.setTimeout(tick, delay);
    };

    timer = window.setTimeout(tick, timing.start);

    return () => window.clearTimeout(timer);
  }, [words, enabled]);

  return enabled ? text : words[0];
}
