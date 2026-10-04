import { useEffect, useState } from 'react';

/** Fewest line numbers shown, even for a short file. */
const minLines = 40;

/** Height of a line number row: the 20px of `leading-code`. */
const lineHeight = 20;

/**
 * The `measure` callback, to pass as the content `ref`, and the count of line
 * numbers to show beside that content.
 */
export type LineCount = [
  measure: (element: HTMLElement | null) => void,
  lines: number,
];

/**
 * Counts the editor line numbers: one per 20px row of the element given to
 * `measure` (as its `ref`), never fewer than 40, updated as it resizes.
 */
export function useLineCount(): LineCount {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [lines, setLines] = useState(minLines);

  useEffect(() => {
    if (!element) {
      return;
    }

    const observer = new ResizeObserver(() => {
      setLines(
        Math.max(minLines, Math.ceil(element.offsetHeight / lineHeight)),
      );
    });
    observer.observe(element);

    return () => observer.disconnect();
  }, [element]);

  return [setElement, lines];
}
