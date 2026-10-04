import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  workbenchFileIds,
  workbenchFiles,
  type WorkbenchFileId,
} from '@/constants/workbench-files';
import { renderWithProviders } from '@/test/render-with-providers';
import Workbench from './workbench';

const files = Object.fromEntries(
  workbenchFileIds.map((id) => [
    id,
    () => <h2>{workbenchFiles[id].title.pt}</h2>,
  ]),
) as Record<WorkbenchFileId, () => React.JSX.Element>;

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
    renderWithProviders(<Workbench files={files} />);

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
    renderWithProviders(<Workbench files={files} />);

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
