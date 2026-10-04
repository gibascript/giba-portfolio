import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useWorkbenchContext } from '@/context/workbench/use-workbench-context';
import { renderWithProviders } from '@/test/render-with-providers';
import AppStatus from './app-status';

function CopyEmailButton() {
  const workbench = useWorkbenchContext();

  return (
    <button
      type="button"
      onClick={() => workbench.clipboard.copy('alvesgilberto84@gmail.com')}
    >
      Copiar e-mail
    </button>
  );
}

describe('AppStatus', () => {
  it('switches the language of the page', async () => {
    renderWithProviders(<AppStatus />);

    expect(screen.getByRole('contentinfo')).toHaveTextContent('sobre.md');

    await userEvent.click(
      screen.getByRole('button', { name: 'Mudar idioma para inglês' }),
    );

    expect(screen.getByRole('contentinfo')).toHaveTextContent('about.md');
    expect(screen.getByRole('status')).toHaveTextContent('Ready');
    expect(
      screen.getByRole('button', { name: 'Switch language to Portuguese' }),
    ).toBeInTheDocument();
  });

  it('announces a copied e-mail wherever the copy happened', async () => {
    const user = userEvent.setup();
    renderWithProviders(
      <>
        <CopyEmailButton />
        <AppStatus />
      </>,
    );

    expect(screen.getByRole('status')).toHaveTextContent('Pronto');

    await user.click(screen.getByRole('button', { name: 'Copiar e-mail' }));

    await expect(navigator.clipboard.readText()).resolves.toBe(
      'alvesgilberto84@gmail.com',
    );
    expect(screen.getByRole('status')).toHaveTextContent('✓ E-mail copiado');
  });
});
