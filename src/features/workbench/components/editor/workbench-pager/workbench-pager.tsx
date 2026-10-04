import { Kbd } from '@/components/kbd';
import {
  workbenchFileIds,
  workbenchFiles,
  type WorkbenchFileId,
} from '@/constants/workbench-files';
import { workbenchText } from '@/features/workbench/constants/workbench-text';
import { cyclicStep } from '@/utils/cyclic-step';
import type { Locale } from '@/utils/locale';

type WorkbenchPagerProps = {
  locale: Locale;
  activeFile: WorkbenchFileId;
  onStep: (delta: number) => void;
};

/**
 * Previous and next file links under the open file, with their `[` and `]`
 * keys. The ends wrap: after the last file comes the first.
 */
export function WorkbenchPager({
  locale,
  activeFile,
  onStep,
}: WorkbenchPagerProps) {
  const text = workbenchText[locale];
  const previous =
    workbenchFiles[cyclicStep(workbenchFileIds, activeFile, -1)].name[locale];
  const next =
    workbenchFiles[cyclicStep(workbenchFileIds, activeFile, 1)].name[locale];

  return (
    <nav
      aria-label={text.pager}
      className="mt-16 flex justify-between gap-4 border-t border-subtle pt-5 font-mono text-md"
    >
      <button
        type="button"
        aria-label={text.previousFile(previous)}
        onClick={() => onStep(-1)}
        className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-strong"
      >
        <Kbd>[</Kbd>
        <span>← {previous}</span>
      </button>
      <button
        type="button"
        aria-label={text.nextFile(next)}
        onClick={() => onStep(1)}
        className="flex items-center gap-2 rounded-sm px-2 py-1.5 text-muted transition-colors hover:bg-surface-hover hover:text-strong"
      >
        <span>{next} →</span>
        <Kbd>]</Kbd>
      </button>
    </nav>
  );
}
