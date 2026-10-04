import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderWithProviders } from '@/test/render-with-providers';
import Stack from './stack';

describe('Stack', () => {
  it('titles each group of technologies', () => {
    renderWithProviders(<Stack />);

    expect(
      screen
        .getAllByRole('heading', { level: 3 })
        .map((group) => group.textContent),
    ).toEqual([
      'front-end:',
      'back-end:',
      'auth e apis:',
      'qualidade:',
      'acessibilidade:',
      'ferramentas:',
    ]);
  });
});
