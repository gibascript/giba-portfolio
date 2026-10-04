import type { PropsWithChildren } from 'react';
import { useLineCount } from './hooks/use-line-count';

/**
 * The editor area: line numbers on the left, as tall as the content, and the
 * open file (`children`) beside them, up to 980px wide. Remount it per file
 * (`key`) to start each file scrolled to the top, with its reveal.
 */
export function WorkbenchEditor({ children }: PropsWithChildren) {
  const [measureContent, lines] = useLineCount();

  return (
    <main className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto">
      <div className="flex min-h-full">
        <div
          aria-hidden
          className="flex w-gutter shrink-0 flex-col items-end overflow-hidden pr-5 font-mono text-lg leading-code text-faint select-none"
        >
          {Array.from({ length: lines }, (_, index) => (
            <span key={index}>{index + 1}</span>
          ))}
        </div>
        <div
          ref={measureContent}
          className="max-w-editor min-w-0 flex-1 self-start pr-8 pb-20"
        >
          {children}
        </div>
      </div>
    </main>
  );
}
