import type { PropsWithChildren } from 'react';
import { LocaleProvider } from '@/context/locale/locale-provider';
import { WorkbenchProvider } from '@/context/workbench/workbench-provider';

/** The providers of `app.tsx`, for tests that render a feature alone. */
export function AppProviders({ children }: PropsWithChildren) {
  return (
    <LocaleProvider>
      <WorkbenchProvider>{children}</WorkbenchProvider>
    </LocaleProvider>
  );
}
