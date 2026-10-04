import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/render-with-providers';
import About from './about';

describe('About', () => {
  it('is named by its lead and pairs each fact with its value', () => {
    renderWithProviders(<About />, { locale: 'en' });

    expect(
      screen.getByRole('region', {
        name: 'I build scalable, accessible software for critical and government platforms.',
      }),
    ).toBeInTheDocument();
    const terms = screen.getAllByRole('term').map((term) => term.textContent);
    const definitions = screen
      .getAllByRole('definition')
      .map((definition) => definition.textContent);
    expect(terms[0]).toBe('experience:');
    expect(definitions[0]).toBe('8 years');
  });
});
