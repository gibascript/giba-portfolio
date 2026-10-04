import { createContext } from 'react';
import type { Clipboard } from '@/hooks/use-clipboard';
import type { OpenWorkbenchFiles } from './hooks/use-open-files';
import type { Palette } from './hooks/use-palette';
import type { StageMotion } from './hooks/use-stage-motion';

/**
 * State shared by the hero, the workbench, the command palette and the status
 * bar: the open files, the hero ↔ workbench transition, the palette, and the
 * clipboard, whose "copied" feedback shows in the status bar wherever the copy
 * happened. Opening a file also shows the workbench.
 */
export type WorkbenchContextValue = OpenWorkbenchFiles &
  StageMotion &
  Palette & {
    clipboard: Clipboard;
  };

/** Holds the {@link WorkbenchContextValue} given by `WorkbenchProvider`. */
export const WorkbenchContext = createContext<WorkbenchContextValue | null>(
  null,
);
