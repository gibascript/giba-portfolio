import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeroFileLink } from './hero-file-link';

describe('HeroFileLink', () => {
  it('is named by the file alone, without its number or icon', () => {
    render(
      <HeroFileLink number="03" icon="react">
        projetos.tsx
      </HeroFileLink>,
    );

    expect(
      screen.getByRole('button', { name: 'projetos.tsx' }),
    ).toBeInTheDocument();
  });
});
