import { use } from 'react';
import { WorkbenchContext } from './workbench-context';

/**
 * Reads the `WorkbenchContextValue` of the nearest `WorkbenchProvider`.
 *
 * @throws When rendered outside a `WorkbenchProvider`.
 */
export function useWorkbenchContext() {
  const context = use(WorkbenchContext);

  if (!context) {
    throw new Error(
      'useWorkbenchContext must be used inside a WorkbenchProvider',
    );
  }

  return context;
}
