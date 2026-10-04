import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PropsWithChildren } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  workbenchFileIds,
  workbenchFiles,
  type WorkbenchFileId,
} from '@/constants/workbench-files';
import { LocaleProvider } from '@/context/locale/locale-provider';
import { WorkbenchProvider } from '@/context/workbench/workbench-provider';
import Workbench from './workbench';

const files = Object.fromEntries(
  workbenchFileIds.map((id) => [
    id,
    () => <h2>{workbenchFiles[id].title.pt}</h2>,
  ]),
) as Record<WorkbenchFileId, () => React.JSX.Element>;

function Providers({ children }: PropsWithChildren) {
  return (
    <LocaleProvider>
      <WorkbenchProvider>{children}</WorkbenchProvider>
    </LocaleProvider>
  );
}

function openTabs() {
  return within(screen.getByRole('group', { name: 'Arquivos abertos' }))
    .getAllByRole('button', { name: /^(?!Fechar)/ })
    .map((tab) => tab.textContent);
}

describe('Workbench', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {}
        disconnect() {}
      },
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('opens a file from the explorer in a new tab', async () => {
    render(<Workbench files={files} />, { wrapper: Providers });

    const explorer = screen.getByRole('navigation', { name: 'Explorer' });
    await userEvent.click(
      within(explorer).getByRole('button', { name: 'projetos.tsx' }),
    );

    expect(
      screen.getByRole('heading', { name: 'Projetos' }),
    ).toBeInTheDocument();
    expect(openTabs()).toEqual(['sobre.md', 'projetos.tsx']);
    expect(screen.getByRole('banner')).toHaveTextContent(
      'projetos.tsx — portfolio',
    );
  });

  it('goes back to the previous tab when the open one is closed', async () => {
    render(<Workbench files={files} />, { wrapper: Providers });

    await userEvent.click(
      screen.getByRole('button', { name: 'Próximo arquivo: experiencia.ts' }),
    );
    await userEvent.click(
      screen.getByRole('button', { name: 'Fechar experiencia.ts' }),
    );

    expect(screen.getByRole('heading', { name: 'Sobre' })).toBeInTheDocument();
    expect(openTabs()).toEqual(['sobre.md']);
  });
});
