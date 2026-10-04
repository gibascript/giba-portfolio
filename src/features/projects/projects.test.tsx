import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/render-with-providers';
import Projects from './projects';

describe('Projects', () => {
  it('shows every project as an article, in the locale', () => {
    renderWithProviders(<Projects />, { locale: 'en' });

    expect(screen.getAllByRole('article')).toHaveLength(4);
    expect(
      screen
        .getAllByRole('heading', { level: 3 })
        .map((title) => title.textContent),
    ).toEqual([
      'Microfrontends with Module Federation',
      'Interoperability platform',
      'Cross-team Design System',
      'Real-time operations dashboard',
    ]);
  });
});
