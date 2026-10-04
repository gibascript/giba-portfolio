import type { PropsWithChildren } from 'react';
import { useClipboard } from '@/hooks/use-clipboard';
import { useOpenFiles } from './hooks/use-open-files';
import { WorkbenchContext } from './workbench-context';

/** Provides the {@link WorkbenchContext}: open files and clipboard. */
export function WorkbenchProvider({ children }: PropsWithChildren) {
  const openFiles = useOpenFiles();
  const clipboard = useClipboard();

  return (
    <WorkbenchContext value={{ ...openFiles, clipboard }}>
      {children}
    </WorkbenchContext>
  );
}
