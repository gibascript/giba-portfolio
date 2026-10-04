import { useState } from 'react';
import type { WorkbenchFileId } from '@/constants/workbench-files';

/** Whether the explorer drawer is open, and how to toggle or close it. */
export type ExplorerDrawer = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};

/**
 * The explorer as a drawer, below the `md` breakpoint (wider, it is always
 * shown by CSS). The drawer remembers the file it was opened over, so opening
 * another file from anywhere (explorer, palette, pager) also closes it.
 *
 * @param activeFile - File open in the editor.
 */
export function useExplorerDrawer(activeFile: WorkbenchFileId): ExplorerDrawer {
  const [openOver, setOpenOver] = useState<WorkbenchFileId | null>(null);
  const open = openOver === activeFile;

  return {
    open,
    toggle: () => setOpenOver(open ? null : activeFile),
    close: () => setOpenOver(null),
  };
}
