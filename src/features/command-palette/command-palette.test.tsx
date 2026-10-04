import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useWorkbenchContext } from '@/context/workbench/use-workbench-context';
import { mockMatchMedia } from '@/test/match-media';
import { renderWithProviders } from '@/test/render-with-providers';
import CommandPalette from './command-palette';

function WorkbenchProbe() {
  const workbench = useWorkbenchContext();

  return (
    <p data-testid="probe">
      {workbench.stage}/{workbench.activeFile}
    </p>
  );
}

function renderPalette() {
  mockMatchMedia(true);
  renderWithProviders(
    <>
      <CommandPalette />
      <WorkbenchProbe />
    </>,
  );
}

async function openPalette() {
  await userEvent.keyboard('{Control>}k{/Control}');

  return screen.getByRole('combobox', {
    name: 'Ir para seção ou executar comando…',
  });
}

describe('CommandPalette', () => {
  it('opens with Ctrl K, focused on the search', async () => {
    renderPalette();

    const search = await openPalette();

    expect(search).toHaveFocus();
    expect(screen.getAllByRole('option')).toHaveLength(15);
  });

  it('runs the command picked with the arrows and Enter', async () => {
    renderPalette();
    await openPalette();

    await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}');

    expect(screen.getByTestId('probe')).toHaveTextContent('workbench/projects');
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });

  it('filters without accents and marks the first match as active', async () => {
    renderPalette();
    const search = await openPalette();

    await userEvent.type(search, 'certificacoes');

    const [match] = screen.getAllByRole('option');
    expect(match).toHaveTextContent('Certificações');
    expect(match).toHaveAttribute('aria-selected', 'true');
    expect(search).toHaveAttribute('aria-activedescendant', match.id);
  });

  it('says so when nothing matches', async () => {
    renderPalette();
    const search = await openPalette();

    await userEvent.type(search, 'kubernetes');

    expect(screen.queryByRole('option')).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(
      'Nenhum comando encontrado',
    );
  });

  it('closes on a second Ctrl K', async () => {
    renderPalette();
    await openPalette();

    await userEvent.keyboard('{Control>}k{/Control}');

    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });
});
