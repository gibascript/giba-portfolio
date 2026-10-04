import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { links } from '@/constants/links';
import { renderWithProviders } from '@/test/render-with-providers';
import Contact from './contact';

describe('Contact', () => {
  it('copies the e-mail and confirms it on the row', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.click(
      screen.getByRole('button', {
        name: '$ mail alvesgilberto84@gmail.com Copiar e-mail',
      }),
    );

    await expect(navigator.clipboard.readText()).resolves.toBe(links.email);
    expect(
      screen.getByRole('button', {
        name: '$ mail alvesgilberto84@gmail.com ✓ E-mail copiado',
      }),
    ).toBeInTheDocument();
  });

  it('opens the profiles in a new tab and downloads the CV', () => {
    renderWithProviders(<Contact />, { locale: 'en' });

    expect(
      screen.getByRole('link', {
        name: '$ open github.com/gibascript (opens in a new tab)',
      }),
    ).toHaveAttribute('target', '_blank');
    expect(
      screen.getByRole('link', { name: '$ curl -O gilberto-alves-cv.pdf' }),
    ).toHaveAttribute('download', links.cv.fileName);
  });
});
