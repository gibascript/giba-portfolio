import { screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/render-with-providers';
import Education from './education';

describe('Education', () => {
  it('lists each course under its school, latest first', () => {
    renderWithProviders(<Education />, { locale: 'en' });

    const [latest] = within(
      screen.getByRole('region', { name: 'Education' }),
    ).getAllByRole('listitem');
    expect(
      within(latest).getByRole('heading', {
        name: 'Universidade Católica de Brasília',
      }),
    ).toBeInTheDocument();
    expect(latest).toHaveTextContent(
      'Postgraduate degree (Lato Sensu), Software Engineering',
    );
  });
});
