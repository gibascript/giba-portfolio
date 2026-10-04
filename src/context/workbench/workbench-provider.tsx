import type { PropsWithChildren } from 'react';
import { useClipboard } from '@/hooks/use-clipboard';
import { useOpenFiles } from './hooks/use-open-files';
import { useStageMotion } from './hooks/use-stage-motion';
import { WorkbenchContext } from './workbench-context';

/**
 * Provides the {@link WorkbenchContext}: open files, stage transition and
 * clipboard. Opening or stepping to a file from anywhere (the hero list
 * included) also brings the workbench up.
 */
export function WorkbenchProvider({ children }: PropsWithChildren) {
  const openFiles = useOpenFiles();
  const stageMotion = useStageMotion();
  const clipboard = useClipboard();

  return (
    <WorkbenchContext
      value={{
        ...openFiles,
        ...stageMotion,
        clipboard,
        openFile: (id) => {
          openFiles.openFile(id);
          stageMotion.showStage('workbench');
        },
        stepFile: (delta) => {
          openFiles.stepFile(delta);
          stageMotion.showStage('workbench');
        },
      }}
    >
      {children}
    </WorkbenchContext>
  );
}
