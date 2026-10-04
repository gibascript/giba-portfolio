import { useState } from 'react';
import {
  workbenchFileIds,
  type WorkbenchFileId,
} from '@/constants/workbench-files';
import { cyclicStep } from '@/utils/cyclic-step';
import { closeTab, openFile, type OpenFiles } from '@/utils/open-files';

/**
 * Files open in the editor and how to move between them. `stepFile` opens the
 * file `delta` positions away in explorer order, wrapping at the ends.
 */
export type OpenWorkbenchFiles = {
  activeFile: WorkbenchFileId;
  openTabs: readonly WorkbenchFileId[];
  openFile: (id: WorkbenchFileId) => void;
  closeTab: (id: WorkbenchFileId) => void;
  stepFile: (delta: number) => void;
};

/**
 * Open files of the workbench, starting with the first file (about) alone.
 * Closing every tab reopens it.
 */
export function useOpenFiles(): OpenWorkbenchFiles {
  const [first] = workbenchFileIds;
  const [files, setFiles] = useState<OpenFiles<WorkbenchFileId>>({
    active: first,
    tabs: [first],
  });

  return {
    activeFile: files.active,
    openTabs: files.tabs,
    openFile: (id) => setFiles((current) => openFile(current, id)),
    closeTab: (id) => setFiles((current) => closeTab(current, id, first)),
    stepFile: (delta) =>
      setFiles((current) =>
        openFile(current, cyclicStep(workbenchFileIds, current.active, delta)),
      ),
  };
}
