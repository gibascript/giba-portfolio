import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PropsWithChildren } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LocaleProvider } from '@/context/locale/locale-provider';
import { useWorkbenchContext } from '@/context/workbench/use-workbench-context';
import { WorkbenchProvider } from '@/context/workbench/workbench-provider';
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

function Providers({ children }: PropsWithChildren) {
  return (
    <LocaleProvider>
      <WorkbenchProvider>
        <CopyEmailButton />
        {children}
      </WorkbenchProvider>
    </LocaleProvider>
  );
}

describe('AppStatus', () => {
  afterEach(() => {
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  it('switches the language of the page', async () => {
    render(<AppStatus />, { wrapper: Providers });

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
    render(<AppStatus />, { wrapper: Providers });

    expect(screen.getByRole('status')).toHaveTextContent('Pronto');

    await user.click(screen.getByRole('button', { name: 'Copiar e-mail' }));

    await expect(navigator.clipboard.readText()).resolves.toBe(
      'alvesgilberto84@gmail.com',
    );

    expect(screen.getByRole('status')).toHaveTextContent('✓ E-mail copiado');
  });
});
