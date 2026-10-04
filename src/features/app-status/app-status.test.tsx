import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useWorkbenchContext } from '@/context/workbench/use-workbench-context';
import { mockMatchMedia } from '@/test/match-media';
import { renderWithProviders } from '@/test/render-with-providers';
import AppStatus from './app-status';

function WorkbenchActions() {
  const workbench = useWorkbenchContext();

  return (
    <>
      <button
        type="button"
        onClick={() => workbench.clipboard.copy('alvesgilberto84@gmail.com')}
      >
        Copiar e-mail
      </button>
      <button type="button" onClick={() => workbench.openFile('stack')}>
        Abrir stack.yaml
      </button>
    </>
  );
}

function renderStatus(locale: 'pt' | 'en' = 'pt') {
  return renderWithProviders(
    <>
      <WorkbenchActions />
      <AppStatus />
    </>,
    { locale },
  );
}

describe('AppStatus', () => {
  it('switches the language of the page', async () => {
    renderStatus();

    await userEvent.click(
      screen.getByRole('button', { name: 'Mudar idioma para inglês' }),
    );

    expect(screen.getByRole('status')).toHaveTextContent('Ready');
    expect(
      screen.getByRole('button', { name: 'Switch language to Portuguese' }),
    ).toBeInTheDocument();
  });

  it('shows the hero path, then the open file, which leads back home', async () => {
    mockMatchMedia(true);
    renderStatus();

    expect(screen.getByRole('contentinfo')).toHaveTextContent(
      '~/gilberto-alves',
    );

    await userEvent.click(
      screen.getByRole('button', { name: 'Abrir stack.yaml' }),
    );
    await userEvent.click(
      screen.getByRole('button', { name: 'stack.yaml — Início' }),
    );

    expect(screen.getByRole('contentinfo')).toHaveTextContent(
      '~/gilberto-alves',
    );
  });

  it('announces a copied e-mail wherever the copy happened', async () => {
    const user = userEvent.setup();
    renderStatus();

    expect(screen.getByRole('status')).toHaveTextContent('Pronto');

    await user.click(screen.getByRole('button', { name: 'Copiar e-mail' }));

    await expect(navigator.clipboard.readText()).resolves.toBe(
      'alvesgilberto84@gmail.com',
    );
    expect(screen.getByRole('status')).toHaveTextContent('✓ E-mail copiado');
  });
});
