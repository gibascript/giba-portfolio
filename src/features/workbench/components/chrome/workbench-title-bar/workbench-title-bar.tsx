import { Button } from '@/components/button';
import { links } from '@/constants/links';
import { uiText } from '@/constants/ui-text';
import { projectName } from '@/features/workbench/constants/workbench-text';
import type { Locale } from '@/utils/locale';

type WorkbenchTitleBarProps = {
  locale: Locale;
  fileName: string;
  explorerId: string;
  explorerOpen: boolean;
  onToggleExplorer: () => void;
  onHome: () => void;
};

/**
 * The 38px title bar: explorer toggle (below `md` only), the wordmark, which
 * goes back to the hero, the open file in the middle and the CV download.
 */
export function WorkbenchTitleBar({
  locale,
  fileName,
  explorerId,
  explorerOpen,
  onToggleExplorer,
  onHome,
}: WorkbenchTitleBarProps) {
  const ui = uiText[locale];

  return (
    <header className="flex h-title-bar shrink-0 items-center gap-3 border-b border-subtle pr-2 pl-3">
      <button
        type="button"
        aria-label={ui.explorer}
        aria-expanded={explorerOpen}
        aria-controls={explorerId}
        onClick={onToggleExplorer}
        className="flex size-7 items-center justify-center rounded-sm text-prose text-body transition-colors hover:bg-surface-hover hover:text-strong md:hidden"
      >
        <span aria-hidden>☰</span>
      </button>
      <button
        type="button"
        aria-label={`gilberto-alves. — ${ui.home}`}
        title={ui.home}
        onClick={onHome}
        className="rounded-sm px-1.5 py-1 font-display text-lg font-semibold tracking-display whitespace-nowrap text-strong transition-colors hover:bg-surface-hover"
      >
        gilberto-alves<span className="text-accent">.</span>
      </button>
      <p className="min-w-0 flex-1 truncate text-center text-md text-muted">
        {fileName} — {projectName}
      </p>
      <Button as="a" href={links.cv.url} download={links.cv.fileName} size="sm">
        {ui.downloadCv}
      </Button>
    </header>
  );
}
