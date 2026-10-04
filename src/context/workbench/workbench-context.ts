import { createContext } from 'react';
import type { Clipboard } from '@/hooks/use-clipboard';
import type { OpenWorkbenchFiles } from './hooks/use-open-files';

/**
 * State shared by the workbench, the status bar and, later, the hero and the
 * command palette: the open files, and the clipboard, whose "copied" feedback
 * shows in the status bar wherever the copy happened.
 */
export type WorkbenchContextValue = OpenWorkbenchFiles & {
  clipboard: Clipboard;
};

/** Holds the {@link WorkbenchContextValue} given by `WorkbenchProvider`. */
export const WorkbenchContext = createContext<WorkbenchContextValue | null>(
  null,
);
