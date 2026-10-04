import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useWorkbenchContext } from '@/context/workbench/use-workbench-context';
import { mockMatchMedia } from '@/test/match-media';
import { renderWithProviders } from '@/test/render-with-providers';
import Hero from './hero';

function StageProbe() {
  const workbench = useWorkbenchContext();

  return (
    <p data-testid="probe">
      {workbench.stage}/{workbench.activeFile}
    </p>
  );
}

describe('Hero', () => {
  it('introduces Gilberto with the name as the page heading', () => {
    renderWithProviders(<Hero />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Gilberto Alves.' }),
    ).toBeInTheDocument();
  });

  it('opens the workbench from the call to action', async () => {
    mockMatchMedia(true);
    renderWithProviders(
      <>
        <Hero />
        <StageProbe />
      </>,
      { locale: 'en' },
    );

    await userEvent.click(
      screen.getByRole('button', { name: 'Open workbench' }),
    );

    expect(screen.getByTestId('probe')).toHaveTextContent('workbench/about');
  });

  it('opens a section straight from its explorer', async () => {
    mockMatchMedia(true);
    renderWithProviders(
      <>
        <Hero />
        <StageProbe />
      </>,
    );

    const sections = screen.getByRole('navigation', { name: 'Seções' });
    await userEvent.click(screen.getByRole('button', { name: 'contato.sh' }));

    expect(sections).toBeInTheDocument();
    expect(screen.getByTestId('probe')).toHaveTextContent('workbench/contact');
  });
});
