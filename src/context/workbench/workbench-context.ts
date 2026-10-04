import { createContext } from 'react';
import type { Clipboard } from '@/hooks/use-clipboard';
import type { OpenWorkbenchFiles } from './hooks/use-open-files';
import type { StageMotion } from './hooks/use-stage-motion';

/**
 * State shared by the hero, the workbench, the status bar and, later, the
 * command palette: the open files, the hero ↔ workbench transition, and the
 * clipboard, whose "copied" feedback shows in the status bar wherever the
 * copy happened. Opening a file also shows the workbench.
 */
export type WorkbenchContextValue = OpenWorkbenchFiles &
  StageMotion & {
    clipboard: Clipboard;
  };

/** Holds the {@link WorkbenchContextValue} given by `WorkbenchProvider`. */
export const WorkbenchContext = createContext<WorkbenchContextValue | null>(
  null,
);
