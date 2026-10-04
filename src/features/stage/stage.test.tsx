import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useWorkbenchContext } from '@/context/workbench/use-workbench-context';
import { mockMatchMedia } from '@/test/match-media';
import { renderWithProviders } from '@/test/render-with-providers';
import Stage from './stage';

function HeroScreen() {
  const workbench = useWorkbenchContext();

  return (
    <button type="button" onClick={() => workbench.showStage('workbench')}>
      Abrir workbench
    </button>
  );
}

function WorkbenchScreen() {
  const workbench = useWorkbenchContext();

  return (
    <button type="button" onClick={() => workbench.showStage('hero')}>
      Início
    </button>
  );
}

function renderStage() {
  renderWithProviders(
    <Stage heroScreen={<HeroScreen />} workbenchScreen={<WorkbenchScreen />} />,
  );

  return {
    open: screen.getByRole('button', { name: 'Abrir workbench' }),
    home: screen.getByRole('button', { name: 'Início' }),
  };
}

describe('Stage', () => {
  it('starts on the hero, with the workbench inert', () => {
    const { open, home } = renderStage();

    expect(open.closest('[inert]')).toBeNull();
    expect(home.closest('[inert]')).not.toBeNull();
  });

  it('swaps the inert screen, moving focus to the one shown', async () => {
    mockMatchMedia(true);
    const { open, home } = renderStage();

    await userEvent.click(open);

    expect(open.closest('[inert]')).not.toBeNull();
    expect(home.closest('[inert]')).toBeNull();
    expect(home.parentElement).toHaveFocus();

    await userEvent.click(home);

    expect(open.parentElement).toHaveFocus();
  });
});
