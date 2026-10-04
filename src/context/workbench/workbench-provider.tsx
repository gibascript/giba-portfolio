import { useState, type PropsWithChildren } from 'react';
import type { WorkbenchFileId } from '@/constants/workbench-files';
import { useLocaleContext } from '@/context/locale/use-locale-context';
import { useClipboard } from '@/hooks/use-clipboard';
import { useHashSync } from './hooks/use-hash-sync';
import { useOpenFiles } from './hooks/use-open-files';
import { usePalette } from './hooks/use-palette';
import { useShortcutsPreference } from './hooks/use-shortcuts-preference';
import { useSingleKeyShortcuts } from './hooks/use-single-key-shortcuts';
import { useStageMotion } from './hooks/use-stage-motion';
import { fileFromHash } from './utils/file-hash';
import { WorkbenchContext } from './workbench-context';

/**
 * Provides the {@link WorkbenchContext}: open files, stage transition, command
 * palette, shortcuts preference and clipboard.
 *
 * @remarks
 * A URL naming a file (`#/projects`) opens straight on the workbench with that
 * file, and the hash follows the screen from then on. Opening or stepping to
 * a file from anywhere also brings the workbench up. The single-key shortcuts
 * listen while enabled and the palette is closed.
 */
export function WorkbenchProvider({ children }: PropsWithChildren) {
  const locale = useLocaleContext();
  const [initialFile] = useState(() => fileFromHash(window.location.hash));
  const openFiles = useOpenFiles(initialFile ?? undefined);
  const stageMotion = useStageMotion(initialFile ? 'workbench' : 'hero');
  const palette = usePalette();
  const shortcuts = useShortcutsPreference();
  const clipboard = useClipboard();

  const openFile = (id: WorkbenchFileId) => {
    openFiles.openFile(id);
    stageMotion.showStage('workbench');
  };
  const stepFile = (delta: number) => {
    openFiles.stepFile(delta);
    stageMotion.showStage('workbench');
  };
  const showHero = () => stageMotion.showStage('hero');

  useHashSync({
    restingStage:
      stageMotion.heroVisible === stageMotion.workbenchVisible
        ? null
        : stageMotion.stage,
    activeFile: openFiles.activeFile,
    openFile,
    showHero,
  });
  useSingleKeyShortcuts({
    enabled: shortcuts.shortcutsEnabled && !palette.paletteOpen,
    stage: stageMotion.stage,
    handlers: {
      toggleLocale: locale.toggleLocale,
      openWorkbench: () => stageMotion.showStage('workbench'),
      openFile,
      stepFile,
      goHome: showHero,
    },
  });

  return (
    <WorkbenchContext
      value={{
        ...openFiles,
        ...stageMotion,
        ...palette,
        ...shortcuts,
        clipboard,
        openFile,
        stepFile,
      }}
    >
      {children}
    </WorkbenchContext>
  );
}
